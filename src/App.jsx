import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import PipelineRunDiff from './Diff';
import Modal from './Modal';
import { fetchPipelineRunsGraph } from './DataFetcher';
import { cytoscapeLayout, cytoscapeStyle, compareButtonStyle } from './AppStyling';

cytoscape.use(dagre);

function App() {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [elements, setElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const pipelineId = "pipeline-1";
  
  useEffect(() => {
    const getElements = async () => {
      const elements = await fetchPipelineRunsGraph(pipelineId);
      setElements(elements);
      setLoading(false);
    };

    getElements();
  }, []);
  
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
      setShowModal(true);
    }
  };

  return (
    <>
    <Routes>
      <Route path="/" element={
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <div style={{ flex: '0 1 auto', padding: '10px', textAlign: 'center', backgroundColor: ' #e0edf9', border: '1px solid #aad1f7', borderRadius: '10px', margin: '0 10px' }}>
            <button
              onClick={handleCompareClick}
              style={compareButtonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
              Compare Runs
            </button>
          </div>
          <div style={{ flex: '1 1 auto', position: 'relative', border: '1px solid #aad1f7', borderRadius: '1px', margin: '10px 10px' }}>
            {loading ? (
                  <div>Loading...</div>
            ) : (<CytoscapeComponent
              elements={elements}
              style={{ width: '100%', height: '100%' }}
              layout={cytoscapeLayout}
              stylesheet={cytoscapeStyle}
              cy={(cy) => {
                cy.on('select', 'node', handleNodeClick);
                cy.on('unselect', 'node', handleNodeUnselect);
              }}
            />
            )}
          </div>
        </div>
      } />
      <Route path="/diff/:id1/:id2" element={<PipelineRunDiff />} />
    </Routes>
    <Modal show={showModal}
        onClose={() => setShowModal(false)}
        title="Selection Error" >
        <p>Please select exactly two runs to compare. You have selected {selectedNodes.length}.</p>
      </Modal>
  </>    
  );
}

export default App;