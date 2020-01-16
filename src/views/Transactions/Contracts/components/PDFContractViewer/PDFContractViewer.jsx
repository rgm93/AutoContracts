import React from "react";
import { Document, Page } from "react-pdf";
import { pdf } from "@react-pdf/renderer";
//import { PDFViewer } from "mgr-pdf-viewer-react"
import { PDFReader } from 'react-read-pdf';
import PDFViewer from "./index.js"

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
      loading: true
    };
  }

  componentDidMount() {
    this.renderDocument(this.props.data);
  }

  componentWillReceiveProps(newProps) {
    // Don't update if document didn't change
    if (this.props.data === newProps.data) return;

    this.renderDocument(newProps.data);
  }

  renderDocument = doc => {
    if (!doc) {
        this.setState({ document: null })
        return
    }

    this.setState({ loading: true })
  
    try {
      const a = atob(this.generateFinalContract(doc));

      this.setState({ document: a, loading: false });
      console.log("a", a);
      /*pdf(a)
        .toBlob()
        .then(blob => {
          const url = URL.createObjectURL(blob);

          /*if (this.props.onUrlChange) {
            this.props.onUrlChange(url);
          }
          console.log('urlrlrlrlr', url)
          this.setState({ document: url, loading: false });
        });*/
    } catch (error) {
      //this.props.onRenderError && this.props.onRenderError(error.message);
      console.log("error", error.message);
    }
  };

  generateFinalContract = data => {
    //console.log("dCC", data);
    //var bff = ''
    var html = htmlToPdfmake(data);
    var docDefinition = {
      content: [html],
      pageBreakBefore: function(currentNode) {
        return (
          currentNode.style &&
          currentNode.style.indexOf("pdf-pagebreak-before") > -1
        );
      },
      styles: {
        b: { bold: true },
        strong: { bold: true },
        u: { decoration: "underline" },
        s: { decoration: "lineThrough" },
        em: { italics: true },
        i: { italics: true },
        h1: { fontSize: 24, bold: true, marginBottom: 5 },
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
      }
    };

    var pdfDocGenerator = pdfMake.createPdf(docDefinition);
    //return pdfDocGenerator
    console.log("doc", typeof pdfDocGenerator);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      console.log('dataURL', dataUrl)
      return dataUrl
    });
    /*pdfDocGenerator.getBuffer(
      function(buffer) {
        console.log("buff", buffer);
        //fs.writeFileSync('example.pdf', buffer);
        bff = buffer;
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
    const { pageNumber, numPages, loading } = this.state;
    //console.log('doccc', this.state.document)
    console.log('loading', loading)
    return(
        <div>
           {
                !loading ? (
                    <div>
                        {/*<Document file={{url: this.state.document}} />*/}
                        <PDFViewer document={{base64: this.state.document}} />
                        {/*<PDFReader data={this.state.document} /> */}
                    </div>
                ) : null
            } 
        </div>
    )
  }
}

export default PDFContractViewer;
