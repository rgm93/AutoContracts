import React from "react";
import "./SendParticipantsSelector.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
    sendPreviewContract
} from "../../functions/functionsContract.js";

export default class SendParticipantsSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectSend: "abogado_cedente"
        };
    }
    handleSelectSend = event => this.setState({ selectSend: event.target.value });

    sendSelectedParticipant = () => {
        console.log('propi', this.props)
        this.props.sendSelected(this.state.selectSend)
    }
    
    render() {
        return(
            <div style={{padding: "3%"}}>
                <div className="selCenter">    
                    <Select
                        value={this.state.selectSend} 
                        onChange={this.handleSelectSend}
                    >
                        <MenuItem value={"abogado_cedente"}>Despacho Abogado</MenuItem>
                        <MenuItem value={"cesionario"}>Cesionario</MenuItem>
                        <MenuItem value={"abogado_cesionario"}>
                        Abogado Cesionario
                        </MenuItem>
                    </Select>
                    </div>
                    <div className="sendButton">
                    <button
                        className="button"
                        onClick={() => this.sendSelectedParticipant()}
                    >
                        Enviar
                    </button>
                </div>
            </div>
        )
    }
}