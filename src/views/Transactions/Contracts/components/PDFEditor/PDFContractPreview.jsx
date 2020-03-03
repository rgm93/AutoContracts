import React, { Component } from "react";
//import { Tab, Tabs, Text, Icon } from "@blueprintjs/core";

//import "./Home.scss";
import IframeLoader from "../../converters/IframeLoader/IframeLoader";
import { injectHTML } from "../../converters/utils";

class PDFContractPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            html: this.props.html
        };
    }
    componentDidMount() {
        injectHTML(this.state.data);
        this.props.html(this.state.data)
    }
    render() {
        return(
            <IframeLoader
                id="previewIframe"
                name="previewIframe"
                width="100%"
                height="390"
                onLoad={() => this.setState({ isLoading: false, iframeLoaded: true })}
            />
        );
    }
}

export default PDFContractPreview;