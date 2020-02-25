import React from "react";
//import PropTypes from "prop-types";
import moment from 'moment';
//import AssignmentContractFinal from "./AssignmentContractFinal";
import CollapsibleList from '../../../components/CollapsibleList/CollapsibleList';
import '../steps/resume.css'
moment.locale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  });

class AssignmentContractResume extends React.Component {
    /*constructor(props) {
        super(props);
    }*/

    gestionarGarantías(data, type) {
        let result = '';
        let resultArray;
        if (data != undefined) {
            switch(type) {
                case 'deudores':
                    resultArray = data[1].form.financeContract.debtor.arrayOfConditionalsObject;
                    if (resultArray != undefined) { 
                        resultArray.map(res => result += res.Deudor + ', ');
                    }
                    break;
                case 'sociedades':
                    if (data['Sociedades Pignorada']['arrayOfConditionals2'] != undefined) {
                      data['Sociedades Pignorada']['arrayOfConditionals2'].map(res => result += res['Sociedad Pignorada'] + ', ');  
                    }
                    break;
                case 'pignorantes':
                    if (data['Pignorante']['arrayOfConditionals2'] != undefined) {
                      data['Pignorante']['arrayOfConditionals2'].map(res => result += res['Pignorante'] + ', ');
                    }
                    break;
                case 'hipotecantes':
                    if (data['Hipotecante']['arrayOfConditionals2'] != undefined) {
                       data['Hipotecante']['arrayOfConditionals2'].map(res => result += res['Hipotecante'] + ', ');
                    }
                    break;
                default: break;
            }
            result = result.replace(/,\s*$/, " ");
        }
        
        return result;
    }
      
    getFormatDate(date) {
        return moment(date, 'YYYY-MM-DD').format('D [de] MMMM [del] YYYY').toLocaleLowerCase();
    }

    render() {
        const data = this.props.data;
        console.log('formData', data)
        let partTotal = data[1].conditional.selectorTP === 'Parcial' ? ' parte' : 'totalidad';
        let partTotalCurrency = data[1].form.assignmentDetails.assignmentAmmount;
        let primerReq = data[1].conditional['¿Se regula una garantía a primer requerimiento?']
        let limitTime = data[1].form.assignmentDetails.assignmentAmmount.payDetails.limitHour['hour'] + ':' + data[1].form.assignmentDetails.assignmentAmmount.payDetails.limitHour['minutes']
        let guarantees = data[1].form.guaranteesFinance['arrayOfConditionals'] != undefined ? 
                        data[1].form.guaranteesFinance['arrayOfConditionals'].map(g => g) : ''
        return(
            <div className="resume">
                <CollapsibleList trigger="1. Partes y datos del contrato">
                    <CollapsibleList trigger="Cedente">
                        <h5>Nombre del Cedente: {data[0].form.assignor.name}</h5>
                        <h5>NIF: {data[0].form.assignor.nif}</h5>
                        <h5>Domicilio social: {data[0].form.assignor.socialDom}</h5>
                    </CollapsibleList>
                    <CollapsibleList trigger="Cesionario">
                        <h5>Nombre del Cesionario: {data[0].form.transferee.name}</h5>
                        <h5>NIF: {data[0].form.transferee.name}</h5>
                        <h5>Domicilio social: {data[0].form.transferee.socialDom}</h5>
                        <h5>Contacto a efectos de notificaciones: {data[0].form.transferee.contactNotify}</h5>
                        <h5>Dirección a efectos de notificaciones: {data[0].form.transferee.addressNotify}</h5>
                        <h5>Teléfono: {data[0].form.transferee.phone}</h5>
                        <h5>E-mail: {data[0].form.transferee.email}</h5>
                    </CollapsibleList>
                    <h5>Ciudad: {data[0].form.city}</h5>
                    <h5>Fecha: {data[0].form.date}</h5>
                </CollapsibleList>
                <CollapsibleList trigger="2. Datos del Contrato de Financiación y las Garantías ">
                    <CollapsibleList trigger="2.1 Contrato de Financiación">
                    <h5>Cantidad de la Financiación: {data[1].form.financeContract.financeAmmount}</h5>
                        <h5>Fecha: {data[1].form.financeContract.date}</h5>
                        <h5>Deudor(es): {this.gestionarGarantías(data, 'deudores')}</h5>
                        <h5>Agente: {data[1].form.financeContract.nameAgent}</h5>
                        <h5>Ciudad de firma: {data[1].form.financeContract.city}</h5>
                        <h5>Notario: {data[1].form.financeContract.notary}</h5>
                        <h5>Protocolo: {data[1].form.financeContract.protocol}</h5>
                        <CollapsibleList trigger="Cláusula de cesiones">
                            <h6>Número de cláusula: {data[1].form.financeContract.assignmentClause.numberClause}</h6>
                            <h6>Título de cláusula: {data[1].form.financeContract.assignmentClause.titleClause}</h6>
                        </CollapsibleList>
                        <CollapsibleList trigger="Cláusula de Causas de Vencimiento Anticipado">
                        <h6>Número de cláusula: {data[1].form.financeContract.sunsetClause.numberClause}</h6>
                            <h6>Título de cláusula: {data[1].form.financeContract.sunsetClause.titleClause}</h6>
                        </CollapsibleList>
                        <CollapsibleList trigger="Cláusula de notificaciones">
                            <h6>Número de cláusula: {data[1].form.financeContract.notifyClause.numberClause}</h6>
                            <h6>Título de cláusula: {data[1].form.financeContract.notifyClause.titleClause}</h6>
                        </CollapsibleList>
                        {
                            primerReq.includes('Si') ? 
                                <CollapsibleList trigger="Garantía a primer requerimiento">
                                        <h6>Número de cláusula: {data[1].form.financeContract.conditional['Número de Cláusula']}</h6>
                                        <h6>Título de cláusula: {data[1].form.financeContract.conditional['Título de Cláusula']}</h6>  
                                </CollapsibleList>
                            : null
                        }
                    </CollapsibleList>
                    <CollapsibleList trigger="2.2 Garantías">
                    {
                            guarantees != '' ? (
                                console.log('guarrr', guarantees),
                                guarantees.map((g) => 
                                g['Tipo de Garantía'] === 'Prenda de Acciones' ? (
                                    <div key={g['Protocolo']}>
                                        <CollapsibleList trigger="Prenda de Acciones">
                                            <h6>Sociedad(es) Pignorada(s): {this.gestionarGarantías(g, 'sociedades')}</h6>
                                            <h6>Pignorante(s): {this.gestionarGarantías(g, 'pignorantes')}</h6>
                                            <h6>Fecha: {this.getFormatDate(g['Fecha'])}</h6>
                                            <h6>Ciudad de firma: {g['Ciudad']}</h6>
                                            <h6>Notario: {g['Notario']}</h6>
                                            <h6>Protocolo: {g['Protocolo']}</h6>
                                        </CollapsibleList>
                                    </div>
                                ) : ( g['Tipo de Garantía'] === 'Prenda de Participaciones' ? (
                                    <div key={g['Protocolo']}>
                                        <CollapsibleList trigger="Prenda de Participaciones">
                                            <h6>Sociedad(es) Pignorada(s): {this.gestionarGarantías(g, 'sociedades')}</h6>
                                            <h6>Pignorante(s): {this.gestionarGarantías(g, 'pignorantes')}</h6>
                                            <h6>Fecha: {this.getFormatDate(g['Fecha'])}</h6>
                                            <h6>Ciudad de firma: {g['Ciudad']}</h6>
                                            <h6>Notario: {g['Notario']}</h6>
                                            <h6>Protocolo: {g['Protocolo']}</h6>
                                        </CollapsibleList>
                                    </div>
                                ) : ( g['Tipo de Garantía'] === 'Prenda de Derechos de Crédito' ? (
                                    <div key={g['Protocolo']}>
                                        <CollapsibleList trigger="Prenda de Derechos de Crédito">
                                            <h6>Pignorante(s): {this.gestionarGarantías(g, 'pignorantes')}</h6>
                                            <h6>Fecha: {this.getFormatDate(g['Fecha'])}</h6>
                                            <h6>Ciudad de firma: {g['Ciudad']}</h6>
                                            <h6>Notario: {g['Notario']}</h6>
                                            <h6>Protocolo: {g['Protocolo']}</h6>
                                        </CollapsibleList>
                                    </div>
                                ) : (g['Tipo de Garantía'] === 'Hipoteca' ? (
                                    <div key={g['Protocolo']}>
                                        <CollapsibleList trigger="Hipoteca">
                                            <h6>Hipotencante(s): {this.gestionarGarantías(g, 'hipotecantes')} </h6>
                                            <h6>Fecha: {this.getFormatDate(g['Fecha'])}</h6>
                                            <h6>Ciudad de firma: {g['Ciudad']}</h6>
                                            <h6>Notario: {g['Notario']}</h6>
                                            <h6>Protocolo: {g['Protocolo']}</h6>
                                        </CollapsibleList>
                                    </div>
                                ) : null ))))
                            ) : null
                        }
                    </CollapsibleList>
                    <CollapsibleList trigger="2.3 Detalles de la cesión">
                        <h5>Total/Parcial: {data[1].conditional.selectorTP} </h5>
                        <h5>Fecha de Efectividad: {this.getFormatDate(data[1].form.assignmentDetails.assignmentDate)}</h5>
                        <CollapsibleList trigger="Cantidad Cedida">
                            <h6>Euros: {data[1].form.assignmentDetails.assignmentAmmount.assignmentPrice.price}€</h6>
                            <h6>Porcentaje sobre el total del Contrato de Financiación: {data[1].form.assignmentDetails.assignmentAmmount.percentage != undefined ? data[1].form.assignmentDetails.assignmentAmmount.percentage.toLocaleString() : ''}%</h6>
                            {
                                partTotal.includes('parte') ?  
                                <div>
                                    <h6>Cantidad retenida por el Cedente: {partTotalCurrency.selectorTP.ammount != undefined ? partTotalCurrency.selectorTP.ammount.toLocaleString() : ''}€</h6>
                                    <h6>Porcentaje retenido por el Cedente: {partTotalCurrency.selectorTP.percentage != undefined ? partTotalCurrency.selectorTP.percentage.toLocaleString() : ''}%</h6>
                                </div>
                                : null
                            }
                        </CollapsibleList>
                            
                            
                        <h5>Precio de la Cesión: {data[1].form.assignmentDetails.assignmentAmmount.assignmentPrice.price}</h5>
                        <CollapsibleList trigger="Detalles del pago">
                            <h6>Cuenta bancaria: {data[1].form.assignmentDetails.assignmentAmmount.payDetails.bankAccount}</h6>
                            <h6>Hora límite de pago: {limitTime}</h6>
                        </CollapsibleList>
                    </CollapsibleList>
                </CollapsibleList>
            </div>
        );
    }
}

export default AssignmentContractResume;