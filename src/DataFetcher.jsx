
  export const fetchMetadata = async (id) => {
    return { id, label: `Node ${id}`, data: `Some metadata for node ${id}` };
  };
  
  export const fetchLogs = async (id) => {
    return { id, label: `Node ${id}`, logs: `Some logs for node ${id}` };
  };
  
  export const fetchConfig = async (id) => {
    return { id, label: `Node ${id}`, config: `Some config for node ${id}` };
  };
  
  export const fetchResults = async (id) => {
    return { id, label: `Node ${id}`, results: `Some results for node ${id}` };
  };
  
  export const fetchDataForDiff = async (id, type) => {
    switch (type) {
      case 'metadata':
        return await fetchMetadata(id);
      case 'logs':
        return await fetchLogs(id);
      case 'config':
        return await fetchConfig(id);
      case 'results':
        return await fetchResults(id);
      default:
        throw new Error('Unknown data type');
    }
  };