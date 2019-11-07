/*import React, { Component } from 'react';
import fs from 'fs';
import pdf from 'pdf-parse';
 
const pdfparser = () => {
    
    let dataBuffer = fs.readFileSync('path to PDF file...')
 
    pdf(dataBuffer).then(function(data) {
    
        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata); 
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text); 
            
    });
}*/