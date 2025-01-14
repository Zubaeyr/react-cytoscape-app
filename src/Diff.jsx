import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parse, html } from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import DOMPurify from 'dompurify';
import { createTwoFilesPatch } from 'diff';

function PipelineRunDiff() {
  const { id1, id2 } = useParams();
  const [metadata1, setMetadata1] = useState(null);
  const [metadata2, setMetadata2] = useState(null);

  useEffect(() => {
    // Fetch or compute metadata for the nodes
    const fetchMetadata = async (id) => {
      // Replace this with actual metadata fetching logic
      return { id, label: `Node ${id}`, data: `Some metadata for node ${id}` };
    };

    const fetchData = async () => {
      const data1 = await fetchMetadata(id1);
      const data2 = await fetchMetadata(id2);
      setMetadata1(data1);
      setMetadata2(data2);
    };

    fetchData();
  }, [id1, id2]);

  if (!metadata1 || !metadata2) {
    return <div>Loading...</div>;
  }

  var diffText = createTwoFilesPatch("metadata1", "metadata2", JSON.stringify(metadata1, null, 2), JSON.stringify(metadata2, null, 2));
  const diffHtml = html(diffText, { inputFormat: 'diff', showFiles: true, matching: 'words', outputFormat: 'side-by-side' });
  const sanitizedHtml = DOMPurify.sanitize(diffHtml);
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <div style={{ flex: '0 1 auto', padding: '10px', textAlign: 'left', backgroundColor: '#e0edf9', border: '1px solid #aad1f7', borderRadius: '10px', margin: '10px' }}>
        <h4 style={{ margin: '0', fontSize: '1.5em' }}>Comparing Pipeline Runs '{id1}' and '{id2}'</h4>
      </div>
      <div style={{ marginTop: '20px', margin: '10px' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'auto', maxHeight: '80vh', padding: '10px', backgroundColor: '#f9f9f9' }}>
          <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        </div>
      </div>
    </div>
  );
}

export default PipelineRunDiff;


// import React from 'react';
// import { useParams } from 'react-router-dom';

// function PipelineRunDiff() {
//   const { id1, id2 } = useParams();

//   return (
//     <div>
//       <h1>Pipeline Run Diff</h1>
//       <p>Selected Run-1 ID: {id1}</p>
//       <p>Selected Run-2 ID: {id2}</p>
//       {/* Add more data or components here */}
//     </div>
//   );
// }

// export default PipelineRunDiff;



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import ReactDiffViewer from 'react-diff-viewer';

// function PipelineRunDiff() {
//   const { id1, id2 } = useParams();
//   const [metadata1, setMetadata1] = useState(null);
//   const [metadata2, setMetadata2] = useState(null);

//   useEffect(() => {
//     // Fetch or compute metadata for the nodes
//     const fetchMetadata = async (id) => {
//       // Replace this with actual metadata fetching logic
//       return { id, label: `Node ${id}`, data: `Some metadata for node ${id}` };
//     };

//     const fetchData = async () => {
//       const data1 = await fetchMetadata(id1);
//       const data2 = await fetchMetadata(id2);
//       setMetadata1(data1);
//       setMetadata2(data2);
//     };

//     fetchData();
//   }, [id1, id2]);

//   if (!metadata1 || !metadata2) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Comparing Nodes {id1} and {id2}</h1>
//       <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'auto', maxHeight: '80vh' }}>
//         <ReactDiffViewer
//           oldValue={JSON.stringify(metadata1, null, 2)}
//           newValue={JSON.stringify(metadata2, null, 2)}
//           splitView={true}
//           styles={customStyles}
//         />
//       </div>
//     </div>
//   );

  
// }

// export default PipelineRunDiff;
