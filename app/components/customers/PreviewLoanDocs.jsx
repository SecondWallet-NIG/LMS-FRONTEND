// import React from 'react'

// import PDFViewer from 'pdf-viewer-reactjs'

// const PreviewLoanDocs = (url) => {
//     return (
//         <PDFViewer
//             document={{
//                 url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf',
//             }}
//         />
//     )
// }

// export default PreviewLoanDocs

import React from "react";



const PreviewLoanDocs = (_url) => {
  console.log({ _url });

  return (
    <div>
      {_url ? (
        <iframe
          src={_url}
          height="600"
          width="600"
          title="Iframe Example"
        ></iframe>
      ) : null}
    </div>
  );
};

export default PreviewLoanDocs;
