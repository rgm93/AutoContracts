import React from "react";
import moment from 'moment';
import { logo } from "assets/img/scapeshift/sc_logo.js"
import { SphereSpinner } from "react-spinners-kit";
import html2pdf from 'html2pdf.js';
import { resolve } from "url";

//var fs = require("fs");
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
    //console.log('z', this.props.data)
    this.state.renderDoc(this.props.data);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loading !== prevState.loading) return null
    return { document: prevState.renderDoc(nextProps.document) }
  }
 
  renderDocument = doc => {
    var date = moment().format('DD/MM/YYYY');
    var image = logo
    var html = htmlToPdfmake(doc);
    var docDefinition = {
      info: {
        title: "sscontract",
        author: "scapeshift",
        subject: "documento",
        keywords: "1a2b3c4d5e6f7g8h9i"
      },
      compress: true,
      background: [
        {
            image: image,
            width: 200,
            marginTop: 500,
            marginLeft: 200,
            opacity: 0.2
        }
      ],
      /*watermark: { text: 'SCAPESHIFT ADA', color: 'grey', opacity: 0.2, bold: true, italics: false },*/
      content: html,
      styles: {
        b: { bold: true },
        strong: { bold: true },
        u: { decoration: "underline" },
        s: { decoration: "lineThrough" },
        em: { italics: true },
        i: { italics: true },
        h1: { fontSize: 30, bold: true, marginBottom: 5 },
        h2: { fontSize: 22, bold: true, marginBottom: 5 },
        h3: { fontSize: 20, bold: false, marginBottom: 5 },
        h4: { fontSize: 18, bold: false, marginBottom: 5 },
        h5: { fontSize: 16, bold: true, marginBottom: 5 },
        h6: { fontSize: 14, bold: true, marginBottom: 5 },
        a: { color: "blue", decoration: "underline" },
        strike: { decoration: "lineThrough" },
        p: { margin: [0, 5, 0, 10] },
        ul: { marginBottom: 5 },
        li: { marginLeft: 5 },
        table: { marginBottom: 5, align: "center" },
        th: { bold: true, fillColor: "#EEEEEE" },
        /*'html-div':{
          //height: 200,
          //margin: 300,
          height: 30,
          background: "blue",
          display: "block",
          width: 100,
          //pageBreakAfter: "always"
          //width: "auto",
          //pageBreakAfter: "always"
          //pageBreakBefore: "always"
        },*/
      },
      pageSize: "A4",
      pageMargins: [40, 60, 40, 60],
      footer: function(currentPage) {
        return {
          margin: [20, 20, 20, 20],
          fontSize: 8,
          columns: [
            {
              text: "" + date,
              alignment: "left",
              bold: true,
              marginLeft: 5
            },
            {
              text: currentPage.toString(),
              alignment: "center",
              bold: true
            },
            {
              text: "SCAPESHIFT S.L",
              alignment: "right",
              bold: true,
              marginRight: 5
            }
          ]
        };
      },
      header: currentPage => {
        if (currentPage !== 1) {
          return {
            margin: [20, 20, 20, 0],
            fontSize: 8,
            columns: [
              {
                alignment: "left",
                image: image,
                height: 30,
                width: 30
              }
            ]
          };
        } else {
          return {
            margin: [20, 20, 20, 0],
            fontSize: 8,
            columns: [
              {
                text: "",
                alignment: "left",
                bold: true,
                marginLeft: 5
              },
              {
                alignment: "center",
                image: image,
                height: 70,
                width: 70
              },
              {
                text: "",
                alignment: "right",
                bold: true,
                marginRight: 5
              }
            ]
          };
        }
      },
      pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
        //console.log('curr', currentNode)
        //if (currentNode.style && currentNode.style.find(el => el === 'html-div')) {
          //console.log('node', currentNode.style.find(el => el == 'html-div'))
        //return currentNode.style && currentNode.style.find(el => el === 'html-div') > 0
        //console.log('id', currentNode.style)
        //console.log('ff', followingNodesOnPage.length)

        /*if(currentNode.style && currentNode.style.find(el => el == 'html-div')) {
          console.log('object', currentNode.style.find(el => el === "html-div") && followingNodesOnPage.length !== 0)
          //return currentNode.style.find(el => el === "html-div") && followingNodesOnPage.length !== 0
          console.log('find', currentNode.style.find(el => el === "html-div"))
          console.log('includes', currentNode.style.includes("html-div"))
        }*/
        return currentNode.style && followingNodesOnPage.length === 0
        
        //}
        //return currentNode.style && currentNode.style.find(el => el == 'html-div')
      },
      /*pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
        
        console.log('contador', currentNode)
        //console.log('pageBreak', currentNode.style
        /*if(currentNode.style && currentNode.style.find(el => el == 'html-div')) {
          currentNode.style.pageBreakAfter = "always"
          return currentNode.style && currentNode.style.find(el => el == 'html-div')
        }
        //return currentNode.style && currentNode.style.indexOf('hola') > -1;
        //return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
        //return currentNode.startPosition.top >= 650;
      }*/
    };
    var pdfDocGenerator = pdfMake.createPdf(docDefinition)
    /*var opt = {
      margin:       1,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    var worker = html2pdf().set(opt).from(doc, 'string').then(function(pdf) {
      resolve(pdf)
    });
    console.log('worker', worker)*/
    //html2pdf.
    //var h2p = new html2pdf.Worker;
    //h2p.set(opt).from(html);
    //console.log("h2p", h2p.toPdf())
    pdfDocGenerator.getDataUrl((dataUrl) => {
      //console.log('dataURL', dataUrl)
      this.setState({document: dataUrl, loading: false})
    });
  };

  onDocumentLoad = ({ numPages }) => {
    const { pageNumber } = this.state

    this.setState({
      numPages,
      pageNumber: Math.min(pageNumber, numPages)
    })
  }

  render() {
    const { /*pageNumber, numPages,*/ loading, document } = this.state;
    //console.log('doccc', this.state.document)
    let hght = this.props.height !== undefined ? this.props.height : "400px"
    console.log('h', this.props.height)
    console.log('loading', loading)
    return(
        <div>
           {
             loading ? (
                <div style={{padding: "20% 0px 0% 40%", margin: "10% 0 40% 0"}}>
                  <SphereSpinner
                    size={60}
                    color="#00a6ac"
                    loading
                  />
                </div>
              ) : (
                <div>
                    <iframe title="pdf" src={document} style={{width: "100%", height: hght}} />
                </div>
              )
            } 
        </div>
    )
  }
}

export default PDFContractViewer;
