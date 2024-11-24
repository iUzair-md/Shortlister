// import * as pdfjsLib from 'pdfjs-dist';
import pkg from 'pdfjs-dist';

const { getDocument } = pkg;

// Rest of your code using getDocument
const pdfjs = pdfjsLib;

export const parsePdf = async (pdfBlob) => {
  try {
    // Convert the pdfBlob to a Uint8Array
    const dataArray = new Uint8Array(pdfBlob.buffer);

    const pdfDoc = await pdfjs.getDocument({ data: dataArray }).promise;

    const numPages = pdfDoc.numPages; // Ensure numPages is defined

    let text = '';
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(' ');
    }



    return text; // Return the entire text content of the PDF
  } catch (error) {
    console.error('Error parsing PDF:', error.message); // Improved logging
    throw new Error('Error parsing PDFf: ' + error.message);
  }
};




