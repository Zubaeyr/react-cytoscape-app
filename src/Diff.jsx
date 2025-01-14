import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { html } from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import DOMPurify from 'dompurify';
import { createTwoFilesPatch } from 'diff';

function PipelineRunDiff() {
  const { id1, id2 } = useParams();
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [loading, setLoading] = useState(true);

  const dataTypes = ['metadata', 'logs', 'config', 'results']; // List of data types

  useEffect(() => {
    const fetchMetadata = async (id) => {
      return { id, label: `Node ${id}`, data: `Some metadata for node ${id}` };
    };

    const fetchLogs = async (id) => {
      return { id, label: `Node ${id}`, logs: `Some logs for node ${id}` };
    };

    const fetchConfig = async (id) => {
      return { id, label: `Node ${id}`, config: `Some config for node ${id}` };
    };

    const fetchResults = async (id) => {
      return { id, label: `Node ${id}`, results: `Some results for node ${id}` };
    };

    const fetchData = async (id, type) => {
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

    const fetchAllData = async () => {
      const data1 = {};
      const data2 = {};
      for (const type of dataTypes) {
        data1[type] = await fetchData(id1, type);
        data2[type] = await fetchData(id2, type);
      }
      setData1(data1);
      setData2(data2);
      setLoading(false);
    };

    fetchAllData();
  }, [id1, id2]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <div style={{ flex: '0 1 auto', padding: '10px', textAlign: 'left', backgroundColor: '#e0edf9', border: '1px solid #aad1f7', borderRadius: '10px', margin: '10px' }}>
        <h4 style={{ margin: '0', fontSize: '1.5em' }}>Comparing Pipeline Runs: '{id1}' and '{id2}'</h4>
      </div>
        
      {dataTypes.map((type) => {
        const diffText = createTwoFilesPatch(type, type, JSON.stringify(data1[type], null, 2), JSON.stringify(data2[type], null, 2));
        const diffHtml = html(diffText, { inputFormat: 'diff', showFiles: true, drawFileList: false, matching: 'words', outputFormat: 'side-by-side' });
        const sanitizedHtml = DOMPurify.sanitize(diffHtml);

        return (
          <div key={type} style={{ marginBottom: '20px' }}>
            <div style={{ marginTop: '20px', margin: '10px' }}>
              <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'auto', maxHeight: '80vh', padding: '10px', backgroundColor: '#f9f9f9' }}>
                <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
              </div>
            </div>
          </div>
        );

      })}
    </div>
  );
}

export default PipelineRunDiff;