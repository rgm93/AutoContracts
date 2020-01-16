import React, { Component } from 'react';
import { contract } from './AssignmentContract/mockups/mockupContract.js';
import CKEditor from 'ckeditor4-react';

import "./AssignmentContract/contract/AssignmentContract.css";

export default class PDFEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.data[0] === 'form' ? contract(this.props.data[1]) 
				: this.props.data[0] === 'html' ? this.props.data[1] 
				: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.onEditorChange = this.onEditorChange.bind(this);
	}

	onEditorChange(evt) {
		this.setState( {
			data: evt.editor.getData()
		} );
	}

	handleChange(changeEvent) {
		this.setState( {
			data: changeEvent.target.value
		} );
	}

	handleDataContent = () => {
		this.props.handleHTML(this.state.data)
		this.props.changeView('preview')
	}

	render() {
		return (
			<div>
				<div style={{overflow: 'auto', marginTop: '25px', border: '4px solid gray'}}>
					<CKEditor
                        data={this.state.data}
                        config={{
                            toolbar: [
                                [ 'Bold', 'Italic', 'Strike', 'SpecialChar', '-'],
                                [ 'Cut', 'Copy', 'Undo', 'Redo', 'Anchor' ],
                                [ 'Styles', 'Format', 'ColorButton', 'ColorDialog'],
								[ 'NumberedList', 'BulletedList', '-', 'Indent', 'Outdent', 'Blockquote'],
								[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
                                [ 'Table', 'HorizontalRule'],
                                [ 'Source', 'Maximize', 'Print', 'PageBreak']
							],
							extraPlugins: 'liststyle, justify, indent, indentblock, print, pagebreak',
                            width: 'auto',
                            height: '25em'
                        }}
						onChange={this.onEditorChange}
						style={{
                            width: 'auto',
                            height: 'auto'
						}}
						onBeforeLoad={(CKEDITOR) => (CKEDITOR.disableAutoInline = true)}
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