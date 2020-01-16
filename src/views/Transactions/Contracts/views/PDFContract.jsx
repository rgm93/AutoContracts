/*import React, { Component } from "react";
import moment from 'moment';
import ReactPDF, {
  PDFViewer,
  BlobProvider,
  pdf,
  Image,
  Font,
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell
} from "@david.kucsai/react-pdf-table";


//import fs from 'fs';
//const pdfParse = require('pdf-parse')

moment.locale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
});

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    marginBottom: 100
  },
  title2: {
    fontSize: 16,
    marginTop: 30,
    textAlign: "center",
    fontFamily: "Times-Roman",
    fontWeight: "bold"
  },
  author: {
    fontSize: 19,
    textAlign: "center",
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    marginBottom: 15,
    fontFamily: "Times-Roman",
    textAlign: "center"
  },
  subtitle2: {
    fontSize: 12,
    margin: 30,
    fontFamily: "Times-Roman",
    textAlign: "left"
  },
  subtitle3: {
    fontSize: 16,
    margin: 12,
    marginBottom: 10,
    fontFamily: "Times-Roman",
    textAlign: "center"
  },
  text: {
    margin: 12,
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Times-Roman"
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 50
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey"
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey"
  },
  PDFStyle: {
    width: "100%",
    height: "-webkit-fill-available",
    margin: "auto",
    padding: 0
  },
  between: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 40
  },
  blank: {
    marginBottom: 200
  },
  blank2: {
    marginBottom: 30
  },
  date: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 15
  },
  right: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 10,
    textAlign: "justify",
    justifyContent: "right",
    fontFamily: "Times-Roman"
  },
  right2: {
    fontSize: 10,
    textAlign: "justify",
    justifyContent: "right",
    fontFamily: "Times-Roman"
  },
  rightSub: {
    marginTop: 10,
    marginLeft: 50,
    marginRight: 20,
    fontSize: 10,
    textAlign: "justify",
    justifyContent: "right",
    fontFamily: "Times-Roman"
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: { marginTop: 2, marginBottom: 2},
  tableCol: {
    marginTop: 5,
    marginBottom: 5
  },
  tableCell: { fontSize: 12, backgroundColor: "#9c9c9c", padding: 5 },
  tableCell2: {padding: 5}
});

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf"
});

function gestionarDeudores(data) {
  let debtors = '';
  let debtorsArray = data.form.financeContract.debtor.arrayOfConditionalsObject;
  let debtorsString = debtorsArray.length > 1 ? "[los \"Deudores\"] como deudores" : "[el \"Deudor\"] como deudor]";
  debtorsArray.map( deb => debtors += deb.Deudor + ', ')
  debtors = debtors.replace(/,\s*$/, " ");
  debtors += debtorsString;
  return debtors;
}

function getFormatDate(date) {
  return moment(date, 'YYYY-MM-DD').format('D [de] MMMM [del] YYYY').toLocaleLowerCase();
}

const PDFDocument = ({data}) => {
  let debtors = gestionarDeudores(data);
  let partTotal = data.conditional.selectorTP === 'Parcial' ? ' parte' : 'totalidad';
  let partTotalCurrency = data.form.assignmentDetails.assignmentAmmount;
  let obstent = data.conditional.selectorTP === 'Parcial' ? 'y el Cesionario ostentarán' : 'ostentará';
  let primerReq = data.form.financeContract.conditional['¿Se regula una garantía a primer requerimiento?']
  let partTramo = partTotal.includes('parte') ? data.form.assignmentDetails.assignmentAmmount['selectorTP'].percentage : ''
  let limitTime = data.form.assignmentDetails.assignmentAmmount.payDetails.limitHour['hour'] + ':' + data.form.assignmentDetails.assignmentAmmount.payDetails.limitHour['minutes']
  let guarantees = data.form.guaranteesFinance['arrayOfConditionals'].map(g => g);
  return (
    <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed />
      <Text style={styles.title}>
        CONTRATO DE CESION {data.conditional.selectorTP.toUpperCase()} DE POSICION CONTRACTUAL
      </Text>
      <Text style={styles.between}>entre</Text>
      <Text style={styles.author}>{data.form.assignor.name}</Text>
      <Text style={styles.between}>como Cedente</Text>
      <Text style={styles.between}>y</Text>
      <Text style={styles.author}>{data.form.transferee.name}</Text>
      <Text style={styles.between}>como Cesionario</Text>
      <Text style={styles.date}>{getFormatDate(data.form.date)}</Text>
      <Text style={styles.blank} />

      <Text style={styles.title2}>
        CONTRATO DE CESIÓN {data.conditional.selectorTP.toUpperCase()} DE POSICIÓN CONTRACTUAL
      </Text>
      <Text style={styles.subtitle2}>
        En {data.form.city}, a {getFormatDate(data.form.date)}.
      </Text>
      <Text style={styles.subtitle3}>COMPARECEN</Text>
      <Text style={styles.right}>DE UNA PARTE,</Text>
      <Text style={styles.right}>(1) {data.form.assignor.name} (el “Cedente”)</Text>
      <Text style={styles.right}>Y DE OTRA PARTE,</Text>
      <Text style={styles.right}>(2) {data.form.transferee.name} (el “Cesionario”).</Text>
      <Text style={styles.right}>
        En adelante, el Cedente y el Cesionario serán denominados conjuntamente
        las “Partes”.
      </Text>
      <Text style={styles.title2}>EXPONEN</Text>
      <Text style={styles.right}>
        I. Que, con fecha {getFormatDate(data.form.financeContract.date)} se firmó un contrato de
        financiación entre {debtors}, el Cedente, como entidad
        financiadora, y {data.form.financeContract.nameAgent} como agente (el “Agente”), elevado a público en
        esa misma fecha en virtud de escritura otorgada ante el Notario de
        {' ' + data.form.financeContract.city}, D. {data.form.financeContract.notary}, bajo el número {data.form.financeContract.protocol} de su protocolo (el “Contrato de
        Financiación”).
      </Text>
      <Text style={styles.right}>
        II. Que, en garantía de las obligaciones de pago de principal,
        intereses, comisiones, gastos, tributos y cualesquiera otros conceptos
        asumidos por los Deudores bajo el Contrato de Financiación (o algunos de
        sus Tramos) se suscribieron los siguientes documentos de garantía (en
        adelante, conjuntamente, las “Garantías”):
      </Text>
      {
        guarantees.map((g) => 
          g['Tipo de Garantía'] === 'Prenda de Acciones' ? 
          <Text key={0} style={styles.rightSub}>
            (i) contrato de prenda de acciones de {g['Sociedades Pignorada']['arrayOfConditionals2'].map((s) => s['Sociedad Pignorada'] + ', ')} suscrito por {g['Sociedades Pignorada']['arrayOfConditionals2'].map((s) => s['Sociedad Pignorada'] + ', ')} como pignorante, 
            {g['Pignorante']['arrayOfConditionals2'].map((p) => p['Pignorante'] + ', ')} como sociedad pignorada, el Cedente, como acreedor pignoraticio, y el Agente, como agente de garantías, el {getFormatDate(g['Fecha'])}, en póliza intervenida por el Notario de {g['Ciudad']}, D. {g['Notario']}, con el número {g['Protocolo']}  de su libro registro de operaciones;
          </Text>
          : ( g['Tipo de Garantía'] === 'Prenda de Participaciones' ? 
              <Text key={1} style={styles.rightSub}>
                (ii) contrato de prenda de participaciones sociales de {g['Sociedades Pignorada']['arrayOfConditionals2'].map((s) => s['Sociedad Pignorada'] + ', ')} suscrito por {g['Sociedades Pignorada']['arrayOfConditionals2'].map((s) => s['Sociedad Pignorada'] + ', ')} como pignorante, 
                {g['Pignorante']['arrayOfConditionals2'].map((p) => p['Pignorante'] + ', ')} como sociedad pignorada, el Cedente, como acreedor pignoraticio, y el Agente, como agente de garantías, el {getFormatDate(g['Fecha'])}, en póliza intervenida por el Notario de {g['Ciudad']}, D. {g['Notario']}, con el número {g['Protocolo']}  de su libro registro de operaciones;
              </Text>
              : ( g['Tipo de Garantía'] === 'Prenda de Derechos de Crédito' ? 
                  <Text key={2} style={styles.rightSub}>
                    (iii) contrato de prenda de derechos de crédito derivados de [DESCRIPCIÓN ACTIVO (por ejemplo: contratos, cuentas bancarias, seguros, etc.)] suscrito por {g['Pignorante']['arrayOfConditionals2'].map((p) => p['Pignorante'] + ', ')} como pignorante, el Cedente, como acreedor pignoraticio, y el Agente, como agente de garantías, el {getFormatDate(g['Fecha'])}, en póliza intervenida por el Notario de {g['Ciudad']}, D. {g['Notario']}, con el número {g['Protocolo']}  de su libro registro de operaciones;
                  </Text>
                : (g['Tipo de Garantía'] === 'Hipoteca' ? 
                    <Text key={3} style={styles.rightSub}>
                      (iv) escritura de hipoteca inmobiliaria sobre ciertas fincas titularidad del hipotecante, otorgada por 
                      {g['Hipotecante']['arrayOfConditionals2'].map((p) => p['Hipotecante'] + ', ')} como hipotecante, el Cedente, como acreedor hipotecario, y el Agente, como agente de garantías, el {getFormatDate(g['Fecha'])}, en póliza intervenida por el Notario de {g['Ciudad']}, D. {g['Notario']}, con el número {g['Protocolo']}  de su libro registro de operaciones;
                  </Text>
                : null )))
            )
          
      }
      <Text style={styles.right}>
        III. Que en virtud de lo establecido en la Cláusula 
        {data.form.financeContract.assignmentClause.numberClause
         + ' - ' + data.form.financeContract.assignmentClause.titleClause
        }
        del Contrato de Financiación y habiendo
        cumplido los requisitos previstos en ésta, el Cedente está facultado
        para llevar a cabo la presente cesión {data.conditional.selectorTP} de su posición contractual
        en el Contrato de Financiación.
      </Text>
      <Text style={styles.right}>
        IV. Que, en virtud de cuanto antecede, sujeto a los términos y
        condiciones que se incluyen a continuación y, en especial, sobre la base
        de la corrección y exactitud de las manifestaciones y garantías
        formuladas por las Partes en este contrato, las Partes, manifestando la
        vigencia de las facultades en cuya virtud intervienen y reconociéndose
        mutuamente la capacidad y representación suficiente, convienen suscribir
        el presente contrato de cesión {data.conditional.selectorTP} de posición contractual (el
        “Contrato de Cesión” o el “Contrato”), con arreglo a las siguientes:
      </Text>
      <Text style={styles.title2}>CLÁUSULAS</Text>
      <Text style={styles.right}>1. INTERPRETACIÓN</Text>
      <Text style={styles.right}>
        Los términos en mayúscula utilizados en este Contrato de Cesión
        (incluyendo los Expositivos) que no se encuentren definidos en el mismo
        tendrán el significado previsto en el Contrato de Financiación salvo que
        otra cosa se disponga, para el caso en concreto, en el presente Contrato
        de Cesión.
      </Text>
      <Text style={styles.right}>2. CESIÓN {data.conditional.selectorTP.toUpperCase()}</Text>
      <Text style={styles.right}>
        (1) Con efectos a partir del {getFormatDate(data.form.assignmentDetails.assignmentDate)} (en adelante la “Fecha de
        Efectividad”) el Cedente cede y transfiere (la “Cesión”) a favor del
        Cesionario, una{partTotal} de {partTotalCurrency.currency.toLocaleString()} su Participación en la Financiación, tal y como
        se detalla en el Anexo I, lo que implica la subrogación {data.conditional.selectorTP.toLowerCase()} del
        Cesionario en la posición acreedora cedida al mismo por el Cedente,
        comprensiva de (la “Participación Cedida”):
      </Text>
      <Text style={styles.rightSub}>
        (a) una participación en el total de la Financiación por los importes
        cedidos al Cesionario según lo indicado en el Anexo I, que equivale al
        { ' ' + data.form.assignmentDetails.assignmentAmmount.percentage.toLocaleString()}% del Importe de la Financiación incluyendo –en la proporción
        correspondiente al importe de la participación que se cede al
        Cesionario- cualquier cantidad debida al Cedente bajo el Contrato de
        Financiación por cualquier concepto (incluyendo principal, intereses,
        gastos, importe de liquidación o cualquier otro importe) así como
        cualquier rendimiento económico incluyendo, en su caso, el producto de
        las reclamaciones judiciales o de acuerdos extrajudiciales que no
        hubieran sido hecho efectivos, de conformidad con lo previsto en la
        Cláusula 4 siguiente;
      </Text>
      <Text style={styles.rightSub}>
        (b) cualquier tipo de garantía personal o real (incluyendo, sin
        limitación, las Garantías) o compromiso de cualquier naturaleza,
        otorgado o asumido por cualquier Obligado al amparo del Contrato de
        Financiación o en relación con el mismo; y
      </Text>
      <Text style={styles.rightSub}>
        (c) todos los demás derechos y obligaciones relativos a la posición
        contractual del Cedente bajo el Contrato de Financiación por lo que respecta a la Participación Cedida al Cesionario, incluyendo a título enunciativo no limitativo los
        derechos de defensa legal y administración.
      </Text>
      {
        partTotal.includes('parte') ?  
          <Text style={styles.right}>
            [A efectos aclarativos se hace constar que el Cedente cede su posición
            parcialmente y que por tanto retiene un importe de {partTotalCurrency.selectorTP.ammount.toLocaleString()}€ en el Importe
            de la Financiación, que equivale al {partTotalCurrency.selectorTP.percentage.toLocaleString()}% del total del mismo, junto
            con los derechos accesorios y obligaciones vinculados a dicha
            participación.]
          </Text>
          : null
      }
      <Text style={styles.right}>
        (2) Mediante esta Cesión {data.conditional.selectorTP.toLowerCase()} de la posición contractual se cede al
        Cesionario la posición contractual del Cedente con respecto de la
        Participación Cedida al mismo, por lo que el Cesionario deviene parte
        contractual bajo el Contrato de Financiación, adquiriendo a partir de la
        Fecha de Efectividad la Participación Cedida a todos los efectos
        legales.
      </Text>
      <Text style={styles.right}>
        (3) La Cesión será efectiva desde la Fecha de Efectividad (dicha fecha
        inclusive).
      </Text>
      <Text style={styles.right}>
        (4) Como consecuencia de las Cesión y desde la Fecha de Efectividad
        (inclusive), el Cedente {obstent} la participación en
        la Financiación que se indica en el Anexo II.
      </Text>
      <Text style={styles.blank} />
      <Text style={styles.right}>3. PRECIO DE LA CESIÓN PARCIAL</Text>
      <Text style={styles.right}>
        La presente Cesión se lleva a cabo a título oneroso quedando obligado el
        Cesionario a abonar al Cedente, en la Fecha de Efectividad, en concepto
        de contraprestación de la Cesión efectuada, el precio de la Cesión (el
        “Precio de la Cesión”) detallado a continuación.
      </Text>
      <Text style={styles.right}>
        Así, el precio a satisfacer por el Cesionario al Cedente en concepto de
        Precio de la Cesión será el que se detalla a continuación:
      </Text>

      <Text style={styles.blank2} />

      <Table
        data={[
            {assignor: data.form.assignor.name, transferee: data.form.transferee.name, price: data.form.assignmentDetails.assignmentAmmount.currency}
        ]}
      >
        <TableHeader textAlign={"center"}>
            <TableCell textAlign={"center"} styles={styles.tableCell}>
                Cedente
            </TableCell>
            <TableCell textAlign={"center"} styles={styles.tableCell}>
                Cesionario
            </TableCell>
            <TableCell textAlign={"center"} styles={styles.tableCell}>
                Precio de la cesión (€)
            </TableCell>
        </TableHeader>
        <TableBody textAlign={"center"} fontSize={10}>
            <DataTableCell styles={styles.tableCell2} getContent={(r) => r.assignor}/>
            <DataTableCell styles={styles.tableCell2} getContent={(r) => r.transferee}/>
            <DataTableCell styles={styles.tableCell2} getContent={(r) => r.price.toLocaleString()}/>
        </TableBody>
      </Table>

      <Text style={styles.blank2} />

      <Text style={styles.right}>
        Tal Precio de la Cesión deberá abonarse mediante transferencia a la
        cuenta número {data.form.assignmentDetails.assignmentAmmount.payDetails.bankAccount}, o en aquella otra que sea designada por el Cedente,
        antes de las {limitTime} horas de la Fecha de Efectividad.
      </Text>
      <Text style={styles.right}>
        La no recepción por parte del Cedente del Precio de la Cesión en la
        Fecha de Efectividad, será causa inmediata de resolución del presente
        Contrato y, consecuentemente, de la Cesión a favor del Cesionario, si
        así lo solicita el Cedente (sin perjuicio del derecho del Cedente a
        solicitar al Cesionario la indemnización por daños y perjuicios que
        corresponda).
      </Text>
      <Text style={styles.right}>4. CANTIDADES DEVENGADAS</Text>
      <Text style={styles.right}>
        (1) Los intereses y demás cantidades correspondientes a la Participación
        Cedida devengadas con anterioridad a la Fecha de Efectividad
        corresponden al Cedente.
      </Text>
      <Text style={styles.right}>
        (2) Igualmente, cualquier cantidad correspondiente a la Participación
        Cedida en el Contrato de Financiación devengada en un período de tiempo
        posterior a la Fecha de Efectividad (esta última incluida) corresponderá
        al Cesionario, por lo que en caso de que el Cedente percibiera alguna de
        estas cantidades, deberá ponerla a disposición del Cesionario con la
        misma fecha valor.
      </Text>
      <Text style={styles.right}>
        (3) Cualesquiera otros pagos en relación con la Participación Cedida que
        los Deudores deban realizar de conformidad con el Contrato de
        Financiación y referidos y devengados en un período de tiempo anterior a
        la Fecha de Efectividad, corresponderán al Cedente. Aquellos que los
        Deudores deban realizar de conformidad con el Contrato de Financiación y
        referidos y devengados en un período de tiempo posterior a la Fecha de
        Efectividad, corresponderán al Cesionario.
      </Text>
      <Text style={styles.right}>
        (4) Si por cualquier circunstancia alguna de las Partes recibiera
        cantidades que, conforme a lo dispuesto los apartados precedentes, no le
        correspondieran, las pondrá a disposición de la parte a la que le
        correspondan con la misma fecha valor. En el caso de que el Cesionario
        recibiera cantidades que no le correspondieran y no tuviera conocimiento
        de la Parte a la que le corresponde dicha cantidad, pondrá las mismas a
        disposición del Agente, con la misma fecha valor, para que éste último
        la distribuya como corresponda conforme al Contrato de Financiación.
      </Text>
      <Text style={styles.right}>5. RESPONSABILIDAD DEL CEDENTE</Text>
      <Text style={styles.right}>
        (1) El Cedente, de acuerdo con los artículos 1.529 del Código Civil y
        348 del Código de Comercio (que las partes declaran expresamente
        aplicables), responde de la existencia y legitimidad del importe de la
        Participación Cedida, pero no de la solvencia de los Deudores ni de los
        demás Obligados.
      </Text>
      <Text style={styles.right}>
        (2) El Cedente no será responsable frente al Cesionario por la veracidad
        y exactitud de las manifestaciones y garantías de los Obligados
        previstas en el Contrato de Financiación, ni por el cumplimiento
        efectivo por los Obligados de las obligaciones que se deriven de la
        Participación Cedida.
      </Text>
      <Text style={styles.right}>
        (3) El Cesionario declara expresamente conocer y aceptar los términos y
        condiciones contenidos en el Contrato de Financiación y en las
        Garantías, así como en cualesquiera otros documentos relacionados con el
        Contrato de Financiación, por haber recibido una copia de tales
        documentos.
      </Text>
      <Text style={styles.blank} />
      <Text style={styles.right}>
        6. MANIFESTACIONES Y GARANTÍAS DEL CEDENTE
      </Text>
      <Text style={styles.right}>
        El Cedente realiza, a favor del Cesionario, las siguientes
        manifestaciones formales con respecto de sí mismo (en adelante, las
        “Manifestaciones y Garantías”) y de la Financiación:
      </Text>
      <Text style={styles.rightSub}>
        (a) Que no es, ni era en el momento del nacimiento del crédito, una
        persona especialmente relacionada con los Deudores en los términos
        previstos en el artículo 93 de la Ley Concursal.
      </Text>
      <Text style={styles.rightSub}>
        (b) Que es titular de pleno dominio de la Participación Cedida, libre de
        toda carga, derecho de garantía u otro gravamen, contrato o acuerdo de
        garantía de cualquier clase, acuerdo de compra u opción, acuerdo o
        contrato de subordinación o cualquier otro contrato que cree o efectúe
        cualquiera de las figuras anteriores, cediendo la Participación Cedida
        con pleno dominio, sin que haya efectuado ninguna venta, transmisión o
        sub-participación previa de la Participación Cedida que todavía
        subsista.
      </Text>
      <Text style={styles.rightSub}>
        (c) Que se han cumplido todos y cada uno de los requisitos establecidos
        en el Contrato de Financiación para llevar a cabo la presente Cesión.
      </Text>
      <Text style={styles.rightSub}>
        (d) Que no tiene constancia de que se haya producido, o de haberse
        producido no permanece vigente y/o sin subsanar, ningún hecho o
        circunstancia que por sí sólo o unido a otro hecho o circunstancia
        constituya (o por el mero transcurso del tiempo sin que se subsane pueda
        constituir) una Causa de Vencimiento Anticipado con arreglo a lo
        establecido en la Cláusula {data.form.financeContract.sunsetClause.numberClause
         + ' - ' + data.form.financeContract.sunsetClause.titleClause
        } del Contrato de Financiación.
      </Text>
      <Text style={styles.rightSub}>
        (e) Que es una sociedad válidamente constituida y en vigor, que la
        cesión aquí pactada no es contraria a su objeto social, que ha cumplido
        con todos los requisitos internos y societarios que le sean de
        aplicación (incluyendo la adopción de los acuerdos sociales precisos o
        convenientes) para asegurar la plena validez y efectividad de la
        presente cesión.
      </Text>
      <Text style={styles.rightSub}>
        (f) Que tiene plena capacidad de obrar y que ésta no está limitada o
        cercenada por ningún procedimiento o intervención administrativa o
        judicial de ningún tipo, actual o anunciada. Cualesquiera autorizaciones
        y consentimientos que pudieran resultar necesarios para la plena validez
        y exigibilidad de las obligaciones aquí asumidas han sido obtenidos.
      </Text>
      <Text style={styles.rightSub}>
        (g) Que no se encuentra en situación de insolvencia ni actual ni
        inminente y ni hay en curso ni tienen conocimiento de que vaya a
        iniciarse ningún procedimiento o solicitud encaminado a solicitar su
        declaración de concurso.
      </Text>
      <Text style={styles.rightSub}>
        (h) Que no se encuentra sometido a administración judicial o
        intervención administrativa, ni está incurso en causa que pueda
        determinar su administración judicial o intervención administrativa.
      </Text>
      <Text style={styles.rightSub}>
        (i) Que todas las obligaciones aquí asumidas son válidas y resultan
        plenamente exigibles y que, a su leal saber y entender, la firma de este
        Contrato y/o el cumplimiento de lo aquí establecido no supone el
        incumplimiento de ninguna (i) disposición legal o reglamentaria
        aplicable (ii) resolución judicial, administrativa o arbitral (iii)
        obligación contractual o societaria asumida.
      </Text>
      <Text style={styles.rightSub}>
        (j) Que en cualquier procedimiento judicial o extrajudicial que pudiera
        entablarse en España en relación con la Cesión aquí prevista no tiene ni
        no está legitimado para invocar para sí mismo o para sus activos,
        privilegio o
      </Text>
      <Text style={styles.rightSub}>
        inmunidad de cualquier tipo que pueda impedir o dificultar la ejecución
        de una eventual sentencia o la ejecución o embargo de sus activos.
      </Text>
      <Text style={styles.right}>
        Las Partes declaran expresamente que lo aquí manifestado forma parte de
        las bases contractuales del presente Contrato de Cesión y que la
        exactitud y corrección de las mismas es esencial para el Cesionario a la
        hora de tomar la decisión de suscribir la presente Cesión.
      </Text>
      <Text style={styles.right}>
        El Cedente garantiza que las Manifestaciones y Garantías son exactas y
        correctas y completas, esto es, que no existe circunstancia alguna,
        distinta de las expresamente mencionadas en las mismas, que pueda
        desvirtuar, restringir o alterar lo declarado en las mismas.
      </Text>
      <Text style={styles.right}>
        7. ADHESIÓN A LOS CONTRATOS Y RATIFICACIÓN DEL CARGO DE AGENTE
      </Text>
      <Text style={styles.right}>
        Las Partes declaran expresamente que la Cesión convenida a través del
        presente Contrato de Cesión no afectará en modo alguno a ninguna de las
        cláusulas del Contrato de Financiación. El Cesionario se subroga de
        manera incondicional e irrevocable (salvo en caso de resolución del
        presente Contrato de conformidad con lo previsto en la Cláusula 3) desde
        la Fecha de Efectividad en la posición contractual del Cedente en el
        Contrato de Financiación y por el importe de la participación que se
        cede y se adquiere por el Cesionario en la proporción correspondiente a
        la Participación Cedida al mismo. 
      </Text>

      {
        primerReq.includes('Si') ? 
          <Text style={styles.right}>
            Asimismo, el Contrato de Cesión
            conlleva desde la Fecha de Efectividad, sin necesidad de cualquier otro
            acuerdo por parte de los Obligados, la constitución del Cesionario como
            beneficiario de la garantía a primer requerimiento regulada en el
            Cláusula {data.form.financeContract.conditional['Número de Cláusula'] + ' - ' + data.form.financeContract.conditional['Título de Cláusula']} del Contrato de Financiación respecto de la Participación
            Cedida al mismo, así como de las Garantías otorgadas al amparo del
            Contrato de Financiación.
          </Text>
          : null 
      }
      <Text style={styles.right}>
        En particular el Cesionario ratifica, en este mismo acto, la designación
        de {data.form.financeContract.nameAgent} para que actúe como Agente bajo el Contrato de Financiación
        durante la vida de la Financiación, de forma que {data.form.financeContract.nameAgent} (o la entidad que
        en cada momento ocupe el cargo de Agente bajo el Contrato de
        Financiación) actúa como mandatario especial con carácter de irrevocable
        y queda autorizado para ejercitar los derechos y facultades expresamente
        atribuidos al Agente de conformidad con el Contrato de Financiación,
        junto con todos los demás derechos, facultades y poderes que tengan un
        carácter accesorio respecto de aquéllos (incluida la autocontratación).
      </Text>
      <Text style={styles.right}>8. COSTES, GASTOS Y TRIBUTOS</Text>
      <Text style={styles.right}>
        Los costes, gastos (incluyendo los honorarios de los asesores legales en
        el importe previamente acordado) tributos y cualesquiera desembolsos que
        se originen como consecuencia de la negociación, preparación y
        otorgamiento del presente Contrato de Cesión serán por cuenta de los
        Deudores, de conformidad con lo previsto en el Contrato de Financiación.
      </Text>
      <Text style={styles.right}>9. EXENCIÓN DEL IVA</Text>
      <Text style={styles.right}>
        Las Partes manifiestan que la presente operación de cesión es
        estrictamente financiera, de las contempladas como sujetas a IVA, pero
        considerada exenta de dicho impuesto, por cuya razón, por estar sujeta a
        IVA, no se encuentra sujeta al Impuesto sobre Transmisiones
        Patrimoniales.
      </Text>
      <Text style={styles.right}>10. COMUNICACIONES</Text>
      <Text style={styles.right}>
        Toda comunicación que deba ser efectuada bajo este Contrato de Cesión o
        bajo el Contrato de Financiación se realizará de conformidad con la
        Cláusula {data.form.financeContract.notifyClause.numberClause
         + ' - ' + data.form.financeContract.notifyClause.titleClause
        } del Contrato de Financiación.
      </Text>
      <Text style={styles.right}>
        Los domicilios y datos de contacto para cada una de las Partes serán los
        siguientes:
      </Text>
      <Text style={styles.rightSub}>
        (a) Para el Cedente: los indicados en la cláusula {data.form.financeContract.notifyClause.numberClause
         + ' - ' + data.form.financeContract.notifyClause.titleClause
        } del Contrato de
        Financiación.
      </Text>
      <Text style={styles.rightSub}>
        (b) Para el Cesionario: los indicados en el Anexo III.
      </Text>
      <Text style={styles.right}>11. NULIDAD PARCIAL</Text>
      <Text style={styles.right}>
        La invalidez, nulidad o anulabilidad de cualquier Cláusula de esta
        póliza no afectará ni perjudicará la exigibilidad de las restantes
        Cláusulas de la misma. Asimismo, es la intención de las Partes sustituir
        cualquier término o Cláusula inválida, nula, o anulable por una Cláusula
        válida y exigible en unos términos lo más similares posible a la
        Cláusula inválida, nula o anulable.
      </Text>
      <Text style={styles.right}>12. IDIOMA</Text>
      <Text style={styles.right}>
        El presente Contrato de Cesión se firma en español. Cualquier traducción
        del mismo, realizado por cualquier motivo, tendrá carácter meramente
        informativo y no vinculante.
      </Text>
      <Text style={styles.right}>13. LEY APLICABLE</Text>
      <Text style={styles.right}>
        Este Contrato de Cesión se regirá e interpretará de acuerdo con el
        Derecho común español.
      </Text>
      <Text style={styles.right}>14. JURISDICCIÓN</Text>
      <Text style={styles.right}>
        Cada una de las Partes se somete irrevocablemente, con renuncia expresa
        al fuero que pudiera corresponderle, a la jurisdicción de los Juzgados y
        Tribunales de {data.form.financeContract.city} para el conocimiento y resolución de cualquier
        reclamación que pudiera derivarse del cumplimiento o interpretación de
        la presente póliza.
      </Text>
      <Text style={styles.right}>
        Y en prueba de conformidad las partes firman el presente documento en el
        lugar y fecha arriba indicados.
      </Text>
      <Text style={styles.right}>El Cedente:</Text>
      <Text style={styles.right}>{data.form.assignor.name}</Text>
      <Text style={styles.right}>El Cesionario</Text>
      <Text style={styles.right}>{data.form.transferee.name}</Text>

      <Text style={styles.blank} />
      <Text style={styles.blank} />
      <Text style={styles.blank} />
      <Text style={styles.blank} />
      <Text style={styles.blank} />

      <Text style={styles.title2}>ANEXO I</Text>
      <Text style={styles.title2}>Participación Cedida</Text>
      <Text style={styles.blank2} />
      <Table
        data={[
            {transferee: data.form.transferee.name, price: data.form.assignmentDetails.assignmentAmmount.assignmentPrice}
        ]}
      >
        <TableHeader textAlign={"center"}>
            <TableCell textAlign={"center"} styles={styles.tableCell}>
                Cesionario
            </TableCell>
            <TableCell textAlign={"center"} styles={styles.tableCell}>
                Precio de la cesión (€)
            </TableCell>
        </TableHeader>
        <TableBody textAlign={"center"} fontSize={10}>
            <DataTableCell styles={styles.tableCell2} getContent={(r) => r.transferee}/>
            <DataTableCell styles={styles.tableCell2} getContent={(r) => r.price.toLocaleString()}/>
        </TableBody>
      </Table>

      <Text style={styles.blank} />
      <Text style={styles.blank} />
      <Text style={styles.blank} />
      <Text style={styles.title2}>ANEXO II</Text>

      <Text style={styles.title2}>
        Participación de las Entidades Financiadoras
      </Text>

      <Text style={styles.title2}>
        La Participación de las Entidades Financiadoras bajo el Contrato de
        Financiación resultante de la Cesión es la siguiente:
      </Text>
      <Text style={styles.blank2} />
      <Table
        data={[
            {
              transferee: data.form.transferee.name, 
              price: data.form.assignmentDetails.assignmentAmmount.percentage
            },
            {
              transferee: data.form.transferee.name,
              price: partTramo
            }
        ]}
      >
        <TableHeader textAlign={"center"}>
            <TableCell textAlign={"center"} styles={styles.tableCell}>
                Entidades Financiadoras
            </TableCell>
            <TableCell textAlign={"center"} styles={styles.tableCell}>
                Participación en cada tramo (%)
            </TableCell>
        </TableHeader>
        <TableBody textAlign={"center"} fontSize={10}>
            <DataTableCell styles={styles.tableCell2} getContent={(r) => r.transferee}/>
            <DataTableCell styles={styles.tableCell2} getContent={(r) => r.price.toLocaleString()}/>
        </TableBody>
        
      </Table>

      <Text style={styles.blank} />
      <Text style={styles.blank} />
      <Text style={styles.blank} />
      <Text style={styles.title2}>ANEXO III</Text>

      <Text style={styles.title2}>
        Domicilios a efectos de notificaciones de los Cesionarios
      </Text>
      <Text style={styles.blank2} />
      <Table
        data={[
            {
              key: 'Denominación', 
              value: data.form.transferee.name
            },
            {
              key: 'NIF',
              value: data.form.transferee.nif
            },
            {
              key: 'Domicilio Social',
              value: data.form.transferee.socialDom
            },
            {
              key: 'Contacto a efectos de envío de documentación',
              value: data.form.transferee.contactNotify
            },
            {
              key: 'Dirección a la que se ha de enviar la documentación',
              value: data.form.transferee.addressNotify
            },
            {
              key: 'Teléfono',
              value: data.form.transferee.phone
            },
            {
              key: 'Email',
              value: data.form.transferee.email
            }
        ]}
      >
        <TableHeader></TableHeader>
        <TableBody textAlign={"center"} fontSize={10}>
            <DataTableCell styles={styles.tableCell2} getContent={(r) => r.key}/>
            <DataTableCell styles={styles.tableCell2} getContent={(r) => r.value.toLocaleString()}/>
        </TableBody>
        
      </Table>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
  );
}

export default class PDFContract extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //this.props.handleBlob = pdf(PDFDocument).toBlob();
    //console.log('blob', this.props.handleBlob)
  }

  obtainsDataPDF(blob, url, loading, error) {
    console.log('blob', blob);
    console.log('url', url);
    console.log('loading', loading);
    console.log('error', error);
    
    /*
 
    pdfParse(dataBuffer).then((data) => {
    
        // number of pages
        console.log(data.numpages);
        // number of rendered pages
        console.log(data.numrender);
        // PDF info
        console.log(data.info);
        // PDF metadata
        console.log(data.metadata); 
        // PDF.js version
        // check https://mozilla.github.io/pdf.js/getting_started/
        console.log(data.version);
        // PDF text
        console.log(data.text); 
        this.props.textPDF(data.text);
    });
   
  }

  render() {
    return (
      <div>
        <PDFViewer style={styles.PDFStyle}>
          <PDFDocument data={this.props.data}/>
        </PDFViewer>

        {/*<BlobProvider document={<PDFDocument data={this.props.data} />}>
        {({ blob, url, loading, error }) => {
          this.obtainsDataPDF(blob, url, loading, error);
        }}
      </BlobProvider>}
      </div>
      
    );
  }
}*/
