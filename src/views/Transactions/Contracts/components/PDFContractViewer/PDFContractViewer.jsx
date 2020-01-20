import React from "react";
import { BlobProvider, PDFViewer } from "@react-pdf/renderer";
import { Document, Page } from 'react-pdf';
import { pdf } from "@react-pdf/renderer";
//import { PDFViewer } from "mgr-pdf-viewer-react"
//import { PDFReader } from 'react-read-pdf';
//import PDFViewer from "./index.js"
//import PDFViewer from "pdf-viewer-reactjs"

var fs = require("fs");
var pdfMake = require("pdfmake/build/pdfmake");
var pdfFonts = require("pdfmake/build/vfs_fonts");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
var htmlToPdfmake = require("html-to-pdfmake");


class PDFContractViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      document: null,
      loading: true,
      renderDoc: this.renderDocument.bind(this)
    };
  }

  componentDidMount() {
    this.state.renderDoc(this.props.data);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loading !== prevState.loading) return null
    return { document: prevState.renderDoc(nextProps.document) }
  }
 
  renderDocument = doc => {
    try {
      this.generateFinalContract(doc);
      //console.log('a', a)
      //this.setState({ document: a, loading: false });
      //this.setState({ document: pdf(a), loading: false });
      /*pdf(a)
        .toBlob()
        .then(blob => {
          const url = URL.createObjectURL(blob);
          //const url = blob
          console.log('blob', blob)

          console.log('urlrlrlrlr', url)
          this.setState({ document: url, loading: false });
        });*/
    } catch (error) {
      //this.props.onRenderError && this.props.onRenderError(error.message);
      console.log("error => ", error);
    }
  };

  generateFinalContract = data => {
    //console.log("dCC", data);
    var html = htmlToPdfmake(data);
    var docDefinition = {
      content: [html],
      styles: {
        b: { bold: true },
        strong: { bold: true },
        u: { decoration: "underline" },
        s: { decoration: "lineThrough" },
        em: { italics: true },
        i: { italics: true },
        h1: { fontSize: 30, bold: true, marginBottom: 5 },
        h2: { fontSize: 22, bold: true, marginBottom: 5 },
        h3: { fontSize: 20, bold: true, marginBottom: 5 },
        h4: { fontSize: 18, bold: true, marginBottom: 5 },
        h5: { fontSize: 16, bold: true, marginBottom: 5 },
        h6: { fontSize: 14, bold: true, marginBottom: 5 },
        a: { color: "blue", decoration: "underline" },
        strike: { decoration: "lineThrough" },
        p: { margin: [0, 5, 0, 10] },
        ul: { marginBottom: 5 },
        li: { marginLeft: 5 },
        table: { marginBottom: 5 },
        th: { bold: true, fillColor: "#EEEEEE" }
      },
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      /*pageBreakBefore: function(currentNode) {
        if (currentNode.id === 'breaking' && currentNode.pageNumbers.length != 1) {
          return true;
        }
        return false;
      },*/
    };

    var pdfDocGenerator = pdfMake.createPdf(docDefinition)
    //return pdfDocGenerator

    /*pdfDocGenerator.getBuffer((data) => { 
      console.log('base64', data)
      return data 
    })*/
    pdfDocGenerator.getDataUrl((dataUrl) => {
      //console.log('dataURL', dataUrl)
      this.setState({document: dataUrl, loading: false})
    });

    //return 'no'
    //console.log("doc", pdfDocGenerator);
    //console.log('blob', pdfDocGenerator.getBlob())
    //console.log('base64', pdfDocGenerator.getBase64())
    //console.log('stream', pdfDocGenerator.getStream())

    //return pdfDocGenerator
    /*pdfDocGenerator.getBuffer(
      function(buffer) {
        console.log("buff", buffer);
        return new Blob(buffer, {type: 'application/pdf'});
        //console.log('--> example.pdf')
      });*/

    //this.setState({htmlFinal: pdfDocGenerator})
    //return bff
  };

  onDocumentLoad = ({ numPages }) => {
    const { pageNumber } = this.state

    this.setState({
      numPages,
      pageNumber: Math.min(pageNumber, numPages)
    })
  }

  render() {
    const { pageNumber, numPages, loading, document } = this.state;
    //console.log('doccc', this.state.document)
    console.log('loading', loading)
    console.log('document', document)
    return(
        <div>
           {
                !loading ? (
                    <div>
                        <iframe src={document} style={{width: "100%", height: "400px"}}/>
                        {/*<Document file={{url: document}} />*/}
                    </div>
                ) : (
                  <h2>Cargando....</h2>
                )
            } 
        </div>
    )
  }
}

export default PDFContractViewer;
