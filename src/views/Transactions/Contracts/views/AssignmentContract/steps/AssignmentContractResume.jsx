import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';
import AssignmentContractFinal from "./AssignmentContractFinal";
import '../steps/resume.css'
moment.locale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
  });

class AssignmentContractResume extends React.Component {
    constructor(props) {
        super(props);
    }

    gestionarGarantías(data, type) {
        let result = '';
        let resultArray;

        switch(type) {
            case 'deudores':
                resultArray = data.form.financeContract.debtor.arrayOfConditionalsObject;
                resultArray.map(res => result += res.Deudor + ', ');
                break;
            case 'sociedades':
                data['Sociedades Pignorada']['arrayOfConditionals2'].map(res => result += res['Sociedad Pignorada'] + ', ');
                break;
            case 'pignorantes':
                data['Pignorante']['arrayOfConditionals2'].map(res => result += res['Pignorante'] + ', ');
                break;
            case 'hipotecantes':
                data['Hipotecante']['arrayOfConditionals2'].map(res => result += res['Hipotecante'] + ', ');
                break;
        }
        
        result = result.replace(/,\s*$/, " ");
        return result;
    }
      
    getFormatDate(date) {
        return moment(date, 'YYYY-MM-DD').format('D [de] MMMM [del] YYYY').toLocaleLowerCase();
    }

    render() {
        const data = this.props.data;
        let partTotal = data.conditional.selectorTP === 'Parcial' ? ' parte' : 'totalidad';
        let partTotalCurrency = data.form.assignmentDetails.assignmentAmmount;
        let primerReq = data.conditional['¿Se regula una garantía a primer requerimiento?']
        let limitTime = data.form.assignmentDetails.assignmentAmmount.payDetails.limitHour['hour'] + ':' + data.form.assignmentDetails.assignmentAmmount.payDetails.limitHour['minutes']
        let guarantees = data.form.guaranteesFinance['arrayOfConditionals'].map(g => g);
        return(
            <div className="resume">
                <h3> 1. Partes y datos del contrato </h3>
                    <h4>Nombre del Cedente: {data.form.assignor.name}</h4>
                        <h5>NIF: {data.form.assignor.nif}</h5>
                        <h5>Domicilio social: {data.form.assignor.socialDom}</h5>
                    <h4>Nombre del Cesionario: {data.form.transferee.name}</h4>
                        <h5>NIF: {data.form.transferee.name}</h5>
                        <h5>Domicilio social: {data.form.transferee.socialDom}</h5>
                        <h5>Contacto a efectos de notificaciones: {data.form.transferee.contactNotify}</h5>
                        <h5>Dirección a efectos de notificaciones: {data.form.transferee.addressNotify}</h5>
                        <h5>Teléfono: {data.form.transferee.phone}</h5>
                        <h5>E-mail: {data.form.transferee.email}</h5>
                    <h4>Ciudad: {data.form.city}</h4>
                    <h4>Fecha: {data.form.date}</h4>

                <h3> 2. Datos del Contrato de Financiación y las Garantías </h3>
                    <h4>Contrato de Financiación</h4>
                        <h5>Cantidad de la Financiación: {data.form.financeContract.financeAmmount}</h5>
                        <h5>Fecha: {data.form.financeContract.date}</h5>
                        <h5>Deudor(es): {this.gestionarGarantías(data, 'deudores')}</h5>
                        <h5>Agente: {data.form.financeContract.nameAgent}</h5>
                        <h5>Ciudad de firma: {data.form.financeContract.city}</h5>
                        <h5>Notario: {data.form.financeContract.notary}</h5>
                        <h5>Protocolo: {data.form.financeContract.protocol}</h5>
                        <h5>Cláusula de cesiones</h5>
                            <h6>Número de cláusula: {data.form.financeContract.assignmentClause.numberClause}</h6>
                            <h6>Título de cláusula: {data.form.financeContract.assignmentClause.titleClause}</h6>
                        <h5>Cláusula de Causas de Vencimiento Anticipado</h5>
                            <h6>Número de cláusula: {data.form.financeContract.sunsetClause.numberClause}</h6>
                            <h6>Título de cláusula: {data.form.financeContract.sunsetClause.titleClause}</h6>
                        <h5>Cláusula de notificaciones</h5>
                            <h6>Número de cláusula: {data.form.financeContract.notifyClause.numberClause}</h6>
                            <h6>Título de cláusula: {data.form.financeContract.notifyClause.titleClause}</h6>
                        {
                            primerReq.includes('Si') ? 
                                <div>
                                    <h5>Garantía a primer requerimiento</h5>
                                        <h6>Número de cláusula: {data.form.financeContract.conditional['Número de Cláusula']}</h6>
                                        <h6>Título de cláusula: {data.form.financeContract.conditional['Título de Cláusula']}</h6>  
                                </div>
                            
                            : null
                        }
                    <h4>Garantías</h4>
                        {
                            guarantees.map((g) => 
                            g['Tipo de Garantía'] === 'Prenda de Acciones' ? (
                                <div key={g['Protocolo']}>
                                    <h5>Prenda de Acciones</h5>
                                    <h6>Sociedad(es) Pignorada(s): {this.gestionarGarantías(g, 'sociedades')}</h6>
                                    <h6>Pignorante(s): {this.gestionarGarantías(g, 'pignorantes')}</h6>
                                    <h6>Fecha: {this.getFormatDate(g['Fecha'])}</h6>
                                    <h6>Ciudad de firma: {g['Ciudad']}</h6>
                                    <h6>Notario: {g['Notario']}</h6>
                                    <h6>Protocolo: {g['Protocolo']}</h6>
                                </div>
                            ) : ( g['Tipo de Garantía'] === 'Prenda de Participaciones' ? (
                                <div key={g['Protocolo']}>
                                    <h5>Prenda de Participaciones</h5>
                                    <h6>Sociedad(es) Pignorada(s): {this.gestionarGarantías(g, 'sociedades')}</h6>
                                    <h6>Pignorante(s): {this.gestionarGarantías(g, 'pignorantes')}</h6>
                                    <h6>Fecha: {this.getFormatDate(g['Fecha'])}</h6>
                                    <h6>Ciudad de firma: {g['Ciudad']}</h6>
                                    <h6>Notario: {g['Notario']}</h6>
                                    <h6>Protocolo: {g['Protocolo']}</h6>
                                </div>
                            ) : ( g['Tipo de Garantía'] === 'Prenda de Derechos de Crédito' ? (
                                <div key={g['Protocolo']}>
                                    <h5>Prenda de Derechos de Crédito</h5>
                                    <h6>Pignorante(s): {this.gestionarGarantías(g, 'pignorantes')}</h6>
                                    <h6>Fecha: {this.getFormatDate(g['Fecha'])}</h6>
                                    <h6>Ciudad de firma: {g['Ciudad']}</h6>
                                    <h6>Notario: {g['Notario']}</h6>
                                    <h6>Protocolo: {g['Protocolo']}</h6>
                                </div>
                            ) : (g['Tipo de Garantía'] === 'Hipoteca' ? (
                                <div key={g['Protocolo']}>
                                    <h5>Hipoteca</h5>
                                    <h6>Hipotencante(s): {this.gestionarGarantías(g, 'hipotecantes')} </h6>
                                    <h6>Fecha: {this.getFormatDate(g['Fecha'])}</h6>
                                    <h6>Ciudad de firma: {g['Ciudad']}</h6>
                                    <h6>Notario: {g['Notario']}</h6>
                                    <h6>Protocolo: {g['Protocolo']}</h6>
                                </div>
                            ) : null ))))
                        }
                        
                    <h4>Detalles de la cesión</h4>
                        <h5>Total/Parcial: {data.conditional.selectorTP} </h5>
                        <h5>Fecha de Efectividad: {this.getFormatDate(data.form.assignmentDetails.assignmentDate)}</h5>
                        <h5>Cantidad cedida</h5>
                            <h6>Euros: {data.form.assignmentDetails.assignmentAmmount.assignmentPrice}€</h6>
                            <h6>Porcentaje sobre el total del Contrato de Financiación: {data.form.assignmentDetails.assignmentAmmount.percentage.toLocaleString()}%</h6>
                            {
                                partTotal.includes('parte') ?  
                                <div>
                                    <h6>Cantidad retenida por el Cedente: {partTotalCurrency.selectorTP.ammount.toLocaleString()}€</h6>
                                    <h6>Porcentaje retenido por el Cedente: {partTotalCurrency.selectorTP.percentage.toLocaleString()}%</h6>
                                </div>
                                : null
                            }
                            
                        <h5>Precio de la Cesión: {data.form.assignmentDetails.assignmentAmmount.assignmentPrice.price}</h5>
                        <h5>Detalles del pago</h5>
                            <h6>Cuenta bancaria: {data.form.assignmentDetails.assignmentAmmount.payDetails.bankAccount}</h6>
                            <h6>Hora límite de pago: {limitTime}</h6>
            </div>
        );
    }
}

export default AssignmentContractResume;