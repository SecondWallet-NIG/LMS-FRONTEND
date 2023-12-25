import * as html2pdf from 'html2pdf.js';
export const formatDate = (inputDate) => {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const dateParts = inputDate.split('-');
    const year = dateParts[0];
    const monthIndex = parseInt(dateParts[1], 10) - 1; // Month is zero-based
    const day = dateParts[2];
  
    const formattedDate = `${months[monthIndex]}, ${day} ${year}`;
  
    return formattedDate;
  }


  export const formatTimeToAMPM = (timestamp) => {
    const date = new Date(timestamp);
  
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'UTC', // Assuming the input timestamp is in UTC
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  // export const exportToPDF = (id) => {
  //   const element = document.getElementById("repaymentId");

  //   // Check if the element exists
  //   if (!element) {
  //     console.error('Element with ID "exportDiv" not found.');
  //     return;
  //   }

  //   // Options for html2pdf
  //   const options = {
  //     margin: 10,
  //     filename: 'exported_document.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  //   };

  //   // Use html2pdf to export the div content as a PDF
  //   html2pdf().from(element).set(options).outputPdf().then((pdf) => {
  //     // You can save or display the PDF here
  //     console.log('PDF export success', pdf);
  //   });
  // };

  export const exportToPDF = (id) => {
    const element = document.getElementById(id);

    // Check if the element exists
    if (!element) {
      console.error('Element with ID "exportDiv" not found.');
      return;
    }

    // Options for html2pdf
    const options = {
      margin: 10,
      filename: 'exported_document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };

    // Use html2pdf to export the div content as a PDF
    html2pdf(element, options).then((pdf) => {
      // Save the PDF
      saveAs(pdf, 'exported_document.pdf');
      console.log('PDF export success');
    });
  };