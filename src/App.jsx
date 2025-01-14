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
    { data: { id: 'one', label: 'Node 1' } },
    { data: { id: 'two', label: 'Node 2' } },
    { data: { id: 'three', label: 'Node 3' } },
    { data: { id: 'four', label: 'Node 4' } },
    { data: { id: 'five', label: 'Node 5' } },
    { data: { id: 'six', label: 'Node 6' } },
    { data: { id: 'seven', label: 'Node 7' } },
    { data: { id: 'eight', label: 'Node 8' } },
    { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
    { data: { source: 'one', target: 'three', label: 'Edge from Node1 to Node3' } },
    { data: { source: 'two', target: 'four', label: 'Edge from Node2 to Node4' } },
    { data: { source: 'two', target: 'five', label: 'Edge from Node2 to Node5' } },
    { data: { source: 'three', target: 'six', label: 'Edge from Node3 to Node6' } },
    { data: { source: 'three', target: 'seven', label: 'Edge from Node3 to Node7' } },
    { data: { source: 'four', target: 'eight', label: 'Edge from Node4 to Node8' } },
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