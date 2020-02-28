import React, { Component } from 'react';
import { contractMockup } from './AssignmentContract/mockups/mockupContract.js';
import { contract } from './AssignmentContract/mockups/mockContract.js';
import CKEditor from 'ckeditor4-react';

import "./AssignmentContract/contract/AssignmentContract.css";

export default class PDFEditor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: this.props.data[0] === 'form' ? (
				this.props.isMocked ? contractMockup(this.props.data[1]) : contract(this.props.data[1]))
				: this.props.data[0] === 'html' ? (this.props.isMocked ? contractMockup(this.props.data[1]) : this.props.data[1])
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
		this.props.changeView('isDrafting')
	}

	render() {
		return (
			<div style={{width: 'calc(100% - 30px)', marginTop: "5%"}}>
				<div style={{overflow: 'auto', marginTop: '25px', border: '4px solid gray'}}>
					<CKEditor
                        data={this.state.data}
                        config={{
							extraAllowedContent: 'div(*)',
							allowedContent: true,
                            toolbar: [
                                [ 'Bold', 'Italic', 'Strike', 'SpecialChar', '-'],
                                [ 'Cut', 'Copy', 'Undo', 'Redo', 'Anchor' ],
                                [ 'Styles', 'Format', 'ColorButton', 'ColorDialog','Blockquote'],
								[ 'NumberedList', 'BulletedList', 'Indent', 'Outdent','JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'PageBreak', 'Print'],
                                [ 'Table'],
                                [ 'Source', 'Maximize' ]
							],
							extraPlugins: 'fakeobjects, pagebreak, liststyle, justify, indent, indentblock, print',
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
					<button className="buttonStepsBack" onClick={() => this.props.changeView('isDrafting')}>Atrás</button>
					<button className="buttonGeneratePDF" onClick={() => this.handleDataContent('isDrafting')}>Generar borrador</button>
				</div>
			</div>
		);
	}
}