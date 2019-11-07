import React, { Component } from "react";
//import { Tab, Tabs, Text, Icon } from "@blueprintjs/core";

//import "./Home.scss";
import IframeLoader from "./converters/IframeLoader/IframeLoader";
import { injectHTML } from "./converters/utils";

class PDFContractPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }
    componentDidMount() {
        injectHTML(this.state.data);
    }
    render() {
        return(
            <div>
                <div className="preview">
                    <IframeLoader
                        id="previewIframe"
                        name="previewIframe"
                        width="100%"
                        height="500"
                        onLoad={() => this.setState({ isLoading: false, iframeLoaded: true })}
                    />
                </div>
            </div>
        );
    }
}

export default PDFContractPreview;