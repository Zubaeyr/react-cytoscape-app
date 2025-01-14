
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

  export const fetchPipelineRunsGraph = async (pipelineId) => {  
    return [
      { data: { id: 'a1b2', label: 'Run 1' } },
      { data: { id: 'c3d4', label: 'Run 2' } },
      { data: { id: 'e5f6', label: 'Run 3' } },
      { data: { id: 'g7h8', label: 'Run 4' } },
      { data: { id: 'i9j0', label: 'Run 5' } },
      { data: { id: 'k1l2', label: 'Run 6' } },
      { data: { id: 'm3n4', label: 'Run 7' } },
      { data: { id: 'o5p6', label: 'Run 8' } },
      { data: { source: 'a1b2', target: 'c3d4', label: 'Edge from Run 1 to Run 2' } },
      { data: { source: 'a1b2', target: 'e5f6', label: 'Edge from Run 1 to Run 3' } },
      { data: { source: 'c3d4', target: 'g7h8', label: 'Edge from Run 2 to Run 4' } },
      { data: { source: 'c3d4', target: 'i9j0', label: 'Edge from Run 2 to Run 5' } },
      { data: { source: 'e5f6', target: 'k1l2', label: 'Edge from Run 3 to Run 6' } },
      { data: { source: 'e5f6', target: 'm3n4', label: 'Edge from Run 3 to Run 7' } },
      { data: { source: 'g7h8', target: 'o5p6', label: 'Edge from Run 4 to Run 8' } },
    ];
  };