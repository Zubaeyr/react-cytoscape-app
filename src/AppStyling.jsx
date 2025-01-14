  export const cytoscapeLayout = {
    name: 'dagre',
    rankDir: 'LR', // Left to Right
    nodeDimensionsIncludeLabels: true,
    rankSep: 100, // Separation between ranks
    edgeSep: 50, // Separation between edges
    nodeSep: 50, // Separation between nodes
  };
  
  export const cytoscapeStyle = [
    {
      selector: 'node',
      style: {
        'background-color': '#11479e',
        'label': 'data(label)',
        'shape': 'ellipse',
        'font-size': '8px', // Small label size
        'border-width': '2px',
        'border-color': '#000',
      },
    },
    {
      selector: 'node:selected',
      style: {
        'background-color': '#ff0000', // Highlight color
        'border-width': '4px',
        'border-color': '#ff0000',
      },
    },
    {
      selector: 'edge',
      style: {
        'width': 0.5,
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
        'target-arrow-shape': 'triangle',
        'curve-style': 'taxi',
        'font-size': '8px', // Small label size
      },
    },
  ];

  export const compareButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  };