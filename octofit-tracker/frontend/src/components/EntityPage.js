import { useCallback, useEffect, useMemo, useState } from 'react';

function parseApiResponse(data) {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.results)) {
    return data.results;
  }
  if (data) {
    return [data];
  }
  return [];
}

function getBaseUrl() {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (!codespace) {
    console.warn('REACT_APP_CODESPACE_NAME is not defined; using http://localhost:8000 fallback');
    return 'http://localhost:8000';
  }
  return `https://${codespace}-8000.app.github.dev`;
}

function getTableHeaders(items) {
  if (!items || items.length === 0) {
    return [];
  }
  const firstItem = items.find((item) => item && typeof item === 'object');
  if (!firstItem) {
    return ['Data'];
  }
  return Object.keys(firstItem).slice(0, 10);
}

function renderCell(value) {
  if (value === null || value === undefined) {
    return '-';
  }
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  return String(value);
}

export default function EntityPage({ title, endpointName }) {
  const [items, setItems] = useState([]);
  const [rawData, setRawData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterText, setFilterText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const endpoint = `${getBaseUrl()}/api/${endpointName}/`;

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    console.log('Fetching endpoint', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`Fetched data for ${title}`, data);
        setRawData(data);
        setItems(parseApiResponse(data));
      })
      .catch((fetchError) => {
        console.error(`Fetch error for ${title}:`, fetchError);
        setError(fetchError.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint, title]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredItems = useMemo(() => {
    if (!filterText) {
      return items;
    }
    const query = filterText.toLowerCase();
    return items.filter((item) => JSON.stringify(item).toLowerCase().includes(query));
  }, [items, filterText]);

  const headers = getTableHeaders(filteredItems.length ? filteredItems : items);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4">
          <div>
            <h2 className="h4 mb-2">{title}</h2>
            <p className="text-muted mb-0">
              REST API endpoint: <code>{endpoint}</code>
            </p>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={fetchData}>
              Refresh
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(true)}>
              View JSON
            </button>
          </div>
        </div>

        <form className="row g-2 align-items-center mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="col-sm-8 col-md-6">
            <label htmlFor={`${endpointName}-filter`} className="form-label visually-hidden">
              Filter
            </label>
            <input
              id={`${endpointName}-filter`}
              type="search"
              className="form-control"
              placeholder="Search table data..."
              value={filterText}
              onChange={(event) => setFilterText(event.target.value)}
            />
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-outline-primary" onClick={() => setFilterText('')}>
              Clear Filter
            </button>
          </div>
        </form>

        {loading && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && filteredItems.length === 0 && (
          <div className="alert alert-warning">No {title.toLowerCase()} found.</div>
        )}

        {!loading && !error && filteredItems.length > 0 && (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  {headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, rowIndex) => (
                  <tr key={item.id ?? item.pk ?? rowIndex}>
                    {headers.map((header) => (
                      <td key={`${rowIndex}-${header}`}>{renderCell(item[header])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title} JSON</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)} />
                </div>
                <div className="modal-body">
                  <pre>{JSON.stringify(rawData, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setShowModal(false)} />
        </>
      )}
    </div>
  );
}
