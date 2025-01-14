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
    <div>
      <h1>Comparing Nodes {id1} and {id2}</h1>
        <div style={{ border: '1px solid #ddd', borderRadius: '5px', overflow: 'auto', maxHeight: '80vh' }}>
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
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
