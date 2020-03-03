import React, { Component } from 'react';
import { contract } from '../../views/AssignmentContract/mockups/mockupContract.js';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
//import DecoupledEditor from '@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor';

import "./AssignmentContract/contract/AssignmentContract.css";

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
//import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
//import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
//import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
/*import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';*/
import List from '@ckeditor/ckeditor5-list/src/list';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak';

import '@ckeditor/ckeditor5-build-classic/build/translations/es';

const editorConfiguration = {
	extraAllowedContent: 'div(*)',
	allowedContent: true,
	language: 'es',
	plugins: [ Essentials, Paragraph, Bold, Italic, BlockQuote, Heading, List, Paragraph, PageBreak ],
	toolbar: [ 'heading', '|', 'bold', 'italic', 'blockQuote', '|', 'list', 'paragraph', '|', 'pageBreak' ],
	width: 'auto',
	height: '25em'
};

export default class PDFEditor5 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data[0] === 'form' ? contract(this.props.data[1]) 
				: this.props.data[0] === 'html' ? this.props.data[1] 
				: ''
		};
	}

	handleDataContent = () => {
		this.props.handleHTML(this.state.data)
		this.props.changeView('preview')
	}

	render() {
		return (
			<div>
				<div style={{overflow: 'auto', marginTop: '25px', border: '2px solid gray', height: '400px'}}>
					<CKEditor
						editor={ClassicEditor}
						config={editorConfiguration}
						data={this.state.data}
						style={{
                            width: 'auto',
                            height: 'auto'
						}}
						onChange={(event, editor) => this.setState({data: editor.getData()} )}
					/>
				</div>
				<div className="buttons">
					<button className="buttonStepsBack" onClick={() => this.props.changeView('preview')}>Atrás</button>
					<button className="buttonGeneratePDF" onClick={() => this.handleDataContent('preview')}>Generar borrador</button>
				</div>
			</div>
		);
	}
}