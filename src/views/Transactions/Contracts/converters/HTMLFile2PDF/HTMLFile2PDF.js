import React, { Component } from "react";
//import { FormGroup, FileInput } from "@blueprintjs/core";
//import { handleFormChange } from "../Base/Base";
import "./HTMLFile2PDF.scss";
import { readHTMLFile } from "../utils";

class HTMLFile2PDF extends Component {
  render() {
    return (
      <div>
        {
          /*<FormGroup label="HTML file" labelFor="htmlfile">
            <FileInput
              id="htmlfile"
              onInputChange={this.handleChange}
              name="htmlfile"
              text="Choose HTML file..."
              fill={true}
            />
            </FormGroup>
        */}
      </div>
    );
  }

  /*handleChange = event => {
    const fileContent = readHTMLFile(event["target"].files[0]);
  };*/
}

export default HTMLFile2PDF;
