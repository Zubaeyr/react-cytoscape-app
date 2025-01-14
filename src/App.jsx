import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import PipelineRunDiff from './Diff';

cytoscape.use(dagre);

function App() {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const navigate = useNavigate();

  const elements = [
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

  const layout = {
    name: 'dagre',
    rankDir: 'LR', // Left to Right
    nodeDimensionsIncludeLabels: true,
    rankSep: 100, // Separation between ranks
    edgeSep: 50, // Separation between edges
    nodeSep: 50, // Separation between nodes
  };

  const style = [
    {
      selector: 'node',
      style: {
        'background-color': '#11479e',
        'label': 'data(label)',
        'shape': 'ellipse',
        'font-size': '8px', // Small label size
        'border-width': '2px',
        'border-color': '#000'
      }
    },
    {
      selector: 'node:selected',
      style: {
        'background-color': '#ff0000', // Highlight color
        'border-width': '4px',
        'border-color': '#ff0000'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 0.5,
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
        'target-arrow-shape': 'triangle',
        'curve-style': 'taxi',
        'font-size': '8px' // Small label size
      }
    }
  ];

  const handleNodeClick = (event) => {
    const nodeId = event.target.id();
    setSelectedNodes((prevSelectedNodes) => {
      
      if (prevSelectedNodes.includes(nodeId)) {
        return prevSelectedNodes;
      } else {
        const newSelectedNodes = [...prevSelectedNodes, nodeId];
        return newSelectedNodes;
      }
    });
  };

  const handleNodeUnselect = (event) => {
    const nodeId = event.target.id();
    setSelectedNodes((prevSelectedNodes) => {
      return prevSelectedNodes.filter(id => id !== nodeId);
    });
  };

  const handleCompareClick = () => {
    if (selectedNodes.length === 2) {
      navigate(`/diff/${selectedNodes[0]}/${selectedNodes[1]}`);
      setSelectedNodes([]);
    } else {
      alert('Please select exactly two runs to compare..' + selectedNodes.length);
    }
  };

  return (
    <Routes>
      <Route path="/" element={
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <div style={{ flex: '0 1 auto', padding: '10px', textAlign: 'center', backgroundColor: ' #e0edf9', border: '1px solid #aad1f7', borderRadius: '10px', margin: '0 10px' }}>
            <button
              onClick={handleCompareClick}
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              Compare Runs
            </button>
          </div>
          <div style={{ flex: '1 1 auto', position: 'relative', border: '1px solid #aad1f7', borderRadius: '1px', margin: '10px 10px' }}>
            <CytoscapeComponent
              elements={elements}
              style={{ width: '100%', height: '100%' }}
              layout={layout}
              stylesheet={style}
              cy={(cy) => {
                cy.on('select', 'node', handleNodeClick);
                cy.on('unselect', 'node', handleNodeUnselect);
              }}
            />
          </div>
        </div>
      } />
      <Route path="/diff/:id1/:id2" element={<PipelineRunDiff />} />
    </Routes>
  );
}

export default App;