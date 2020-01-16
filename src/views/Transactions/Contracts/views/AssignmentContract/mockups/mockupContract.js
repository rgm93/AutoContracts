import moment from 'moment';

moment.locale('es', {
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
    weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
    weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
    weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
});

function gestionarDeudores(data) {
    let debtors = '';
    let debtorsArray = data.form.financeContract.debtor.arrayOfConditionalsObject;
    let debtorsString = debtorsArray.length > 1 ? "[los \"Deudores\"] como deudores" : "[el \"Deudor\"] como deudor]";
    debtorsArray.map( deb => debtors += deb.Deudor )
    debtors = debtors.replace(/,\s*$/, " ");
    debtors += debtorsString;
    return debtors;
}
  
function getFormatDate(date) {
    return moment(date, 'YYYY-MM-DD').format('D [de] MMMM [del] YYYY').toLocaleLowerCase();
}

function getGuarantees(guarantees) {
    let value = `<ol type="i">${guarantees.map((g) => g['Tipo de Garantía'] === 'Prenda de Acciones' ? 
        `<li>contrato de prenda de acciones de ${g['Sociedades Pignorada']['arrayOfConditionals2'].map((s) => s['Sociedad Pignorada'] )} suscrito por ${g['Sociedades Pignorada']['arrayOfConditionals2'].map((s) => s['Sociedad Pignorada'] )} como pignorante, ${g['Pignorante']['arrayOfConditionals2'].map((p) => p['Pignorante'] )} como sociedad pignorada, el Cedente, como acreedor pignoraticio, y el Agente, como agente de garantías, el ${getFormatDate(g['Fecha'])}, en póliza intervenida por el Notario de ${g['Ciudad']}, D. ${g['Notario']}, con el número ${g['Protocolo']}  de su libro registro de operaciones; </li>`
        : ( g['Tipo de Garantía'] === 'Prenda de Participaciones' ? 
        `<li>contrato de prenda de participaciones sociales de ${g['Sociedades Pignorada']['arrayOfConditionals2'].map((s) => s['Sociedad Pignorada'] )} suscrito por ${g['Sociedades Pignorada']['arrayOfConditionals2'].map((s) => s['Sociedad Pignorada'] )} como pignorante, ${g['Pignorante']['arrayOfConditionals2'].map((p) => p['Pignorante'] )} como sociedad pignorada, el Cedente, como acreedor pignoraticio, y el Agente, como agente de garantías, el ${getFormatDate(g['Fecha'])}, en póliza intervenida por el Notario de ${g['Ciudad']}, D. ${g['Notario']}, con el número ${g['Protocolo']}  de su libro registro de operaciones; </li>`
        : ( g['Tipo de Garantía'] === 'Prenda de Derechos de Crédito' ? 
        `<li>contrato de prenda de derechos de crédito derivados de [DESCRIPCIÓN ACTIVO (por ejemplo: contratos, cuentas bancarias, seguros, etc.)] suscrito por ${g['Pignorante']['arrayOfConditionals2'].map((p) => p['Pignorante'] )} como pignorante, el Cedente, como acreedor pignoraticio, y el Agente, como agente de garantías, el ${getFormatDate(g['Fecha'])}, en póliza intervenida por el Notario de ${g['Ciudad']}, D. ${g['Notario']}, con el número ${g['Protocolo']}  de su libro registro de operaciones; </li>`
        : (g['Tipo de Garantía'] === 'Hipoteca' ? 
        `<li>escritura de hipoteca inmobiliaria sobre ciertas fincas titularidad del hipotecante, otorgada por ${g['Hipotecante']['arrayOfConditionals2'].map((p) => p['Hipotecante'] )} como hipotecante, el Cedente, como acreedor hipotecario, y el Agente, como agente de garantías, el ${getFormatDate(g['Fecha'])}, en póliza intervenida por el Notario de ${g['Ciudad']}, D. ${g['Notario']}, con el número ${g['Protocolo']}  de su libro registro de operaciones; </li>`
        : null )))).join(' ')}</ol>`
    return value;
} 

function getParte(partTotal, partTotalCurrency) {
    return partTotal.includes('parte') ?  
    `<p> [A efectos aclarativos se hace constar que el Cedente cede su posición
      parcialmente y que por tanto retiene un importe de ${partTotalCurrency.selectorTP.ammount.toLocaleString()}€ en el Importe
      de la Financiación, que equivale al ${partTotalCurrency.selectorTP.percentage.toLocaleString()}% del total del mismo, junto
      con los derechos accesorios y obligaciones vinculados a dicha
      participación.] </p>`
    : null
}

function getPrimerReq(primerReq, data) {
    return primerReq.includes('Si') ? 
        `<p> Asimismo, el Contrato de Cesión
        conlleva desde la Fecha de Efectividad, sin necesidad de cualquier otro
        acuerdo por parte de los Obligados, la constitución del Cesionario como
        beneficiario de la garantía a primer requerimiento regulada en el
        Cláusula ${data.form.financeContract.conditional['Número de Cláusula'] + ' - ' + data.form.financeContract.conditional['Título de Cláusula']} del Contrato de Financiación respecto de la Participación
        Cedida al mismo, así como de las Garantías otorgadas al amparo del
        Contrato de Financiación. </p>`
    : null 
}

export const contract = (data) => {

    let debtors = gestionarDeudores(data);
    let partTotal = data.conditional.selectorTP === 'Parcial' ? ' parte' : 'totalidad';
    let partTotalCurrency = data.form.assignmentDetails.assignmentAmmount;
    let obstent = data.conditional.selectorTP === 'Parcial' ? 'y el Cesionario ostentarán' : 'ostentará';
    let primerReq = data.form.financeContract.conditional['¿Se regula una garantía a primer requerimiento?']
    let partTramo = partTotal.includes('parte') ? data.form.assignmentDetails.assignmentAmmount['selectorTP'].percentage : ''
    let limitTime = data.form.assignmentDetails.assignmentAmmount.payDetails.limitHour['hour'] + ':' + data.form.assignmentDetails.assignmentAmmount.payDetails.limitHour['minutes']
    let guarantees = data.form.guaranteesFinance['arrayOfConditionals'].map(g => g);

    let dataSend = `<h1 style="text-align: center;">CONTRATO DE CESION ${data.conditional.selectorTP.toUpperCase()} DE POSICION CONTRACTUAL</h1><p></p><h2 style="text-align: center;">entre</h2><h2 style="text-align: center;">${data.form.assignor.name},</h2><h3 style="text-align: center;">como Cedente</h3><p style="text-align: center;">y</p><h2 style="text-align: center;">${data.form.transferee.name}</h2><h3 style="text-align: center;">como Cesionario</h3><p></p><p style="text-align: center;">${getFormatDate(data.form.date)}</p><p>&nbsp;</p><div style="page-break-after:always"><span style="display:none">&nbsp;</span></div><p>&nbsp;</p><h2 style="text-align: center;">CONTRATO DE CESI&Oacute;N ${data.conditional.selectorTP.toUpperCase()} DE POSICI&Oacute;N CONTRACTUAL</h2><p style="text-align: center;"">En ${data.form.city}, a ${getFormatDate(data.form.date)}</p><h3 style="text-align: center;">COMPARECEN</h3><p>DE UNA PARTE,</p><p><small>(1) ${data.form.assignor.name} (el &ldquo;Cedente&rdquo;)</small></p><p>Y DE OTRA PARTE,</p><p><small>(2) ${data.form.transferee.name} (el &ldquo;Cesionario&rdquo;).</small></p><p>En adelante, el Cedente y el Cesionario ser&aacute;n denominados conjuntamente las &ldquo;Partes&rdquo;.</p><h3 style="text-align: center;">EXPONEN</h3><p>I. Que, con fecha ${getFormatDate(data.form.financeContract.date)} se firm&oacute; un contrato de financiaci&oacute;n entre ${debtors}[los &quot;Deudores&quot;] como deudores, el Cedente, como entidad financiadora, y ${data.form.financeContract.nameAgent} como agente (el &ldquo;Agente&rdquo;), elevado a p&uacute;blico en esa misma fecha en virtud de escritura otorgada ante el Notario de ${data.form.financeContract.city}, D. ${data.form.financeContract.notary} bajo el n&uacute;mero ${data.form.financeContract.protocol} de su protocolo (el &ldquo;Contrato de Financiaci&oacute;n&rdquo;).</p><p>II. Que, en garant&iacute;a de las obligaciones de pago de principal, intereses, comisiones, gastos, tributos y cualesquiera otros conceptos asumidos por los Deudores bajo el Contrato de Financiaci&oacute;n (o algunos de sus Tramos) se suscribieron los siguientes documentos de garant&iacute;a (en adelante, conjuntamente, las &ldquo;Garant&iacute;as&rdquo;):</p>${getGuarantees(guarantees)} III. Que en virtud de lo establecido en la Cl&aacute;usula ${data.form.financeContract.assignmentClause.numberClause + ' - ' + data.form.financeContract.assignmentClause.titleClause} del Contrato de Financiaci&oacute;n y habiendo cumplido los requisitos previstos en &eacute;sta, el Cedente est&aacute; facultado para llevar a cabo la presente cesi&oacute;n ${data.conditional.selectorTP} de su posici&oacute;n contractual en el Contrato de Financiaci&oacute;n.</p><div style="page-break-after:always"><span style="display:none">&nbsp;</span></div><sobre>IV. Que, en virtud de cuanto antecede, sujeto a los t&eacute;rminos y condiciones que se incluyen a continuaci&oacute;n y, en especial, sobre la base de la correcci&oacute;n y exactitud de las manifestaciones y garant&iacute;as formuladas por las Partes en este contrato, las Partes, manifestando la vigencia de las facultades en cuya virtud intervienen y reconoci&eacute;ndose mutuamente la capacidad y representaci&oacute;n suficiente, convienen suscribir el presente contrato de cesi&oacute;n ${data.conditional.selectorTP} de posici&oacute;n contractual (el &ldquo;Contrato de Cesi&oacute;n&rdquo; o el &ldquo;Contrato&rdquo;), con arreglo a las siguientes:</p><h3 style="text-align: center;">CL&Aacute;USULAS</h3><p>1. INTERPRETACI&Oacute;N</p><definidos>Los t&eacute;rminos en may&uacute;scula utilizados en este Contrato de Cesi&oacute;n (incluyendo los Expositivos) que no se encuentren definidos en el mismo tendr&aacute;n el significado previsto en el Contrato de Financiaci&oacute;n salvo que otra cosa se disponga, para el caso en concreto, en el presente Contrato de Cesi&oacute;n.</p><p>2. CESI&Oacute;N ${data.conditional.selectorTP.toUpperCase()}</p><p>(1) Con efectos a partir del ${getFormatDate(data.form.assignmentDetails.assignmentDate)} (en adelante la &ldquo;Fecha de Efectividad&rdquo;) el Cedente cede y transfiere (la &ldquo;Cesi&oacute;n&rdquo;) a favor del Cesionario, una ${partTotal} de ${partTotalCurrency.currency.toLocaleString()} su Participaci&oacute;n en la Financiaci&oacute;n, tal y como se detalla en el Anexo I, lo que implica la subrogaci&oacute;n ${data.conditional.selectorTP.toLowerCase()} del Cesionario en la posici&oacute;n acreedora cedida al mismo por el Cedente, comprensiva de (la &ldquo;Participaci&oacute;n Cedida&rdquo;):</p><ol type="a"><li>una participaci&oacute;n en el total de la Financiaci&oacute;n por los importes cedidos al Cesionario seg&uacute;n lo indicado en el Anexo I, que equivale al ${data.form.assignmentDetails.assignmentAmmount.percentage.toLocaleString()}% del Importe de la Financiaci&oacute;n incluyendo -en la proporci&oacute;n correspondiente al importe de la participaci&oacute;n que se cede al Cesionario- cualquier cantidad debida al Cedente bajo el Contrato de Financiaci&oacute;n por cualquier concepto (incluyendo principal, intereses, gastos, importe de liquidaci&oacute;n o cualquier otro importe) as&iacute; como cualquier rendimiento econ&oacute;mico incluyendo, en su caso, el producto de las reclamaciones judiciales o de acuerdos extrajudiciales que no hubieran sido hecho efectivos, de conformidad con lo previsto en la Cl&aacute;usula 4 siguiente;</li><li> cualquier tipo de garant&iacute;a personal o real (incluyendo, sin limitaci&oacute;n, las Garant&iacute;as) o compromiso de cualquier naturaleza, otorgado o asumido por cualquier Obligado al amparo del Contrato de Financiaci&oacute;n o en relaci&oacute;n con el mismo; y</li><li> todos los dem&aacute;s derechos y obligaciones relativos a la posici&oacute;n contractual del Cedente bajo el Contrato de Financiaci&oacute;n por lo que respecta a la Participaci&oacute;n Cedida al Cesionario, incluyendo a t&iacute;tulo enunciativo no limitativo los derechos de defensa legal y administraci&oacute;n.</li></ol>${getParte(partTotal, partTotalCurrency)}<p>(2) Mediante esta Cesi&oacute;n ${data.conditional.selectorTP.toLowerCase()} de la posici&oacute;n contractual se cede al Cesionario la posici&oacute;n contractual del Cedente con respecto de la Participaci&oacute;n Cedida al mismo, por lo que el Cesionario deviene parte contractual bajo el Contrato de Financiaci&oacute;n, adquiriendo a partir de la Fecha de Efectividad la Participaci&oacute;n Cedida a todos los efectos legales.</p><p>(3) La Cesi&oacute;n ser&aacute; efectiva desde la Fecha de Efectividad (dicha fecha inclusive).</p><participaci&oacute;n>(4) Como consecuencia de las Cesi&oacute;n y desde la Fecha de Efectividad (inclusive), el Cedente ${obstent} la participaci&oacute;n en la Financiaci&oacute;n que se indica en el Anexo II.</p><div style="page-break-after:always"><span style="display:none">&nbsp;</span></div><p>3. PRECIO DE LA CESI&Oacute;N PARCIAL</p><p>La presente Cesi&oacute;n se lleva a cabo a t&iacute;tulo oneroso quedando obligado el Cesionario a abonar al Cedente, en la Fecha de Efectividad, en concepto de contraprestaci&oacute;n de la Cesi&oacute;n efectuada, el precio de la Cesi&oacute;n (el &ldquo;Precio de la Cesi&oacute;n&rdquo;) detallado a continuaci&oacute;n.</p><p>As&iacute;, el precio a satisfacer por el Cesionario al Cedente en concepto de Precio de la Cesi&oacute;n ser&aacute; el que se detalla a continuaci&oacute;n:</p><table align="center" border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:600px\"><thead><tr><th scope=\"col\">Cedente</th><th scope=\"col\">Cesionario</th><th scope=\"col\">Precio de la cesi&oacute;n (&euro;)</th></tr></thead><tbody><tr><td style="text-align:center">${data.form.assignor.name}</td><td style="text-align:center">${data.form.transferee.name}.</td><td style="text-align:center">${data.form.assignmentDetails.assignmentAmmount.currency.toLocaleString()}</td></tr></tbody></table><p>&nbsp;</p><p>Tal Precio de la Cesi&oacute;n deber&aacute; abonarse mediante transferencia a la cuenta n&uacute;mero ${data.form.assignmentDetails.assignmentAmmount.payDetails.bankAccount}, o en aquella otra que sea designada por el Cedente, antes de las ${limitTime} horas de la Fecha de Efectividad.</p><p>La no recepci&oacute;n por parte del Cedente del Precio de la Cesi&oacute;n en la Fecha de Efectividad, ser&aacute; causa inmediata de resoluci&oacute;n del presente Contrato y, consecuentemente, de la Cesi&oacute;n a favor del Cesionario, si as&iacute; lo solicita el Cedente (sin perjuicio del derecho del Cedente a solicitar al Cesionario la indemnizaci&oacute;n por dan os y perjuicios que corresponda).</p><p></p><p>4. CANTIDADES DEVENGADAS</p><p>(1) Los intereses y dem&aacute;s cantidades correspondientes a la Participaci&oacute;n Cedida devengadas con anterioridad a la Fecha de Efectividad corresponden al Cedente.</p><p>(2) Igualmente, cualquier cantidad correspondiente a la Participaci&oacute;n Cedida en el Contrato de Financiaci&oacute;n devengada en un per&iacute;odo de tiempo posterior a la Fecha de Efectividad (esta &uacute;ltima incluida) corresponder&aacute; al Cesionario, por lo que en caso de que el Cedente percibiera alguna de estas cantidades, deber&aacute; ponerla a disposici&oacute;n del Cesionario con la misma fecha valor.</p><p>(3) Cualesquiera otros pagos en relaci&oacute;n con la Participaci&oacute;n Cedida que los Deudores deban realizar de conformidad con el Contrato de Financiaci&oacute;n y referidos y devengados en un per&iacute;odo de tiempo anterior a la Fecha de Efectividad, corresponder&aacute;n al Cedente. Aquellos que los Deudores deban realizar de conformidad con el Contrato de Financiaci&oacute;n y referidos y devengados en un per&iacute;odo de tiempo posterior a la Fecha de Efectividad, corresponder&aacute;n al Cesionario.</p><p>(4) Si por cualquier circunstancia alguna de las Partes recibiera cantidades que, conforme a lo dispuesto los apartados precedentes, no le correspondieran, las pondr&aacute; a disposici&oacute;n de la parte a la que le correspondan con la misma fecha valor. En el caso de que el Cesionario recibiera cantidades que no le correspondieran y no tuviera conocimiento de la Parte a la que le corresponde dicha cantidad, pondr&aacute; las mismas a disposici&oacute;n del Agente, con la misma fecha valor, para que &eacute;ste &uacute;ltimo la distribuya como corresponda conforme al Contrato de Financiaci&oacute;n.</p><p></p><p>5. RESPONSABILIDAD DEL CEDENTE</p><p>(1) El Cedente, de acuerdo con los art&iacute;culos 1.529 del C&oacute;digo Civil y 348 del C&oacute;digo de Comercio (que las partes declaran expresamente aplicables), responde de la existencia y legitimidad del importe de la Participaci&oacute;n Cedida, pero no de la solvencia de los Deudores ni de los dem&aacute;s Obligados.</p><p>(2) El Cedente no ser&aacute; responsable frente al Cesionario por la veracidad y exactitud de las manifestaciones y garant&iacute;as de los Obligados previstas en el Contrato de Financiaci&oacute;n, ni por el cumplimiento efectivo por los Obligados de las obligaciones que se deriven de la Participaci&oacute;n Cedida.</p><Financiaci&oacute;n>(3) El Cesionario declara expresamente conocer y aceptar los t&eacute;rminos y condiciones contenidos en el Contrato de Financiaci&oacute;n y en las Garant&iacute;as, as&iacute; como en cualesquiera otros documentos relacionados con el Contrato de Financiaci&oacute;n, por haber recibido una copia de tales documentos.</p><div style="page-break-after:always"><span style="display:none">&nbsp;</span></div><p>6. MANIFESTACIONES Y GARANT&Iacute;AS DEL CEDENTE</p><p>El Cedente realiza, a favor del Cesionario, las siguientes manifestaciones formales con respecto de s&iacute; mismo (en adelante, las &ldquo;Manifestaciones y Garant&iacute;as&rdquo;) y de la Financiaci&oacute;n:</p><ol type="a"><li>Que no es, ni era en el momento del nacimiento del cr&eacute;dito, una persona especialmente relacionada con los Deudores en los t&eacute;rminos previstos en el art&iacute;culo 93 de la Ley Concursal.</li><li>Que es titular de pleno dominio de la Participaci&oacute;n Cedida, libre de toda carga, derecho de garant&iacute;a u otro gravamen, contrato o acuerdo de garant&iacute;a de cualquier clase, acuerdo de compra u opci&oacute;n, acuerdo o contrato de subordinaci&oacute;n o cualquier otro contrato que cree o efect&uacute;e cualquiera de las figuras anteriores, cediendo la Participaci&oacute;n Cedida con pleno dominio, sin que haya efectuado ninguna venta, transmisi&oacute;n o sub-participaci&oacute;n previa de la Participaci&oacute;n Cedida que todav&iacute;a subsista.</li><li>Que se han cumplido todos y cada uno de los requisitos establecidos en el Contrato de Financiaci&oacute;n para llevar a cabo la presente Cesi&oacute;n.</li><li>Que no tiene constancia de que se haya producido, o de haberse producido no permanece vigente y/o sin subsanar, ning&uacute;n hecho o circunstancia que por s&iacute; s&oacute;lo o unido a otro hecho o circunstancia constituya (o por el mero transcurso del tiempo sin que se subsane pueda constituir) una Causa de Vencimiento Anticipado con arreglo a lo establecido en la Cl&aacute;usula ${data.form.financeContract.sunsetClause.numberClause + ' - ' + data.form.financeContract.sunsetClause.titleClause} del Contrato de Financiaci&oacute;n.</li><li>Que es una sociedad v&aacute;lidamente constituida y en vigor, que la cesi&oacute;n aqu&iacute; pactada no es contraria a su objeto social, que ha cumplido con todos los requisitos internos y societarios que le sean de aplicaci&oacute;n (incluyendo la adopci&oacute;n de los acuerdos sociales precisos o convenientes) para asegurar la plena validez y efectividad de la presente cesi&oacute;n.</li><li>Que tiene plena capacidad de obrar y que &eacute;sta no est&aacute; limitada o cercenada por ning&uacute;n procedimiento o intervenci&oacute;n administrativa o judicial de ning&uacute;n tipo, actual o anunciada. Cualesquiera autorizaciones y consentimientos que pudieran resultar necesarios para la plena validez y exigibilidad de las obligaciones aqu&iacute; asumidas han sido obtenidos.</li><li>Que no se encuentra en situaci&oacute;n de insolvencia ni actual ni inminente y ni hay en curso ni tienen conocimiento de que vaya a iniciarse ning&uacute;n procedimiento o solicitud encaminado a solicitar su declaraci&oacute;n de concurso.</li><li>Que no se encuentra sometido a administraci&oacute;n judicial o intervenci&oacute;n administrativa, ni est&aacute; incurso en causa que pueda determinar su administraci&oacute;n judicial o intervenci&oacute;n administrativa.</li><li>Que todas las obligaciones aqu&iacute; asumidas son v&aacute;lidas y resultan plenamente exigibles y que, a su leal saber y entender, la firma de este Contrato y/o el cumplimiento de lo aqu&iacute; establecido no supone el incumplimiento de ninguna (i) disposici&oacute;n legal o reglamentaria aplicable (ii) resoluci&oacute;n judicial, administrativa o arbitral (iii) obligaci&oacute;n contractual o societaria asumida.</li><li>Que en cualquier procedimiento judicial o extrajudicial que pudiera entablarse en Espa&ntilde;a en relaci&oacute;n con la Cesi&oacute;n aqu&iacute; prevista no tiene ni no est&aacute; legitimado para invocar para s&iacute; mismo o para sus activos, privilegio o inmunidad de cualquier tipo que pueda impedir o dificultar la ejecuci&oacute;n de una eventual sentencia o la ejecuci&oacute;n o embargo de sus activos.</li></ol><p>Las Partes declaran expresamente que lo aqu&iacute; manifestado forma parte de las bases contractuales del presente Contrato de Cesi&oacute;n y que la exactitud y correcci&oacute;n de las mismas es esencial para el Cesionario a la hora de tomar la decisi&oacute;n de suscribir la presente Cesi&oacute;n.</p><p>El Cedente garantiza que las Manifestaciones y Garant&iacute;as son exactas y correctas y completas, esto es, que no existe circunstancia alguna, distinta de las expresamente mencionadas en las mismas, que pueda desvirtuar, restringir o alterar lo declarado en las mismas.</p><p>7. ADHESI&Oacute;N A LOS CONTRATOS Y RATIFICACI&Oacute;N DEL CARGO DE AGENTE</p><alguno>Las Partes declaran expresamente que la Cesi&oacute;n convenida a trav&eacute;s del presente Contrato de Cesi&oacute;n no afectar&aacute; en modo alguno a ninguna de las cl&aacute;usulas del Contrato de Financiaci&oacute;n. El Cesionario se subroga de manera incondicional e irrevocable (salvo en caso de resoluci&oacute;n del presente Contrato de conformidad con lo previsto en la Cl&aacute;usula 3) desde la Fecha de Efectividad en la posici&oacute;n contractual del Cedente en el Contrato de Financiaci&oacute;n y por el importe de la participaci&oacute;n que se cede y se adquiere por el Cesionario en la proporci&oacute;n correspondiente a la Participaci&oacute;n Cedida al mismo.</p><div style="page-break-after:always"><span style="display:none">&nbsp;</span></div>${getPrimerReq(primerReq, data)}<bajo>En particular el Cesionario ratifica, en este mismo acto, la designaci&oacute;n de ${data.form.financeContract.nameAgent} para que act&uacute;e como Agente bajo el Contrato de Financiaci&oacute;n durante la vida de la Financiaci&oacute;n, de forma que ${data.form.financeContract.nameAgent} (o la entidad que en cada momento ocupe el cargo de Agente bajo el Contrato de Financiaci&oacute;n) act&uacute;a como mandatario especial con car&aacute;cter de irrevocable y queda autorizado para ejercitar los derechos y facultades expresamente atribuidos al Agente de conformidad con el Contrato de Financiaci&oacute;n, junto con todos los dem&aacute;s derechos, facultades y poderes que tengan un car&aacute;cter accesorio respecto de aqu&eacute;llos (incluida la autocontrataci&oacute;n).</p><p>8. COSTES, GASTOS Y TRIBUTOS</p><cualesquiera>Los costes, gastos (incluyendo los honorarios de los asesores legales en el importe previamente acordado) tributos y cualesquiera desembolsos que se originen como consecuencia de la negociaci&oacute;n, preparaci&oacute;n y otorgamiento del presente Contrato de Cesi&oacute;n ser&aacute;n por cuenta de los Deudores, de conformidad con lo previsto en el Contrato de Financiaci&oacute;n.</p><p>9. EXENCI&Oacute;N DEL IVA</p><IVA,>Las Partes manifiestan que la presente operaci&oacute;n de cesi&oacute;n es estrictamente financiera, de las contempladas como sujetas a IVA, pero considerada exenta de dicho impuesto, por cuya raz&oacute;n, por estar sujeta a IVA, no se encuentra sujeta al Impuesto sobre Transmisiones Patrimoniales.</p><p>10. COMUNICACIONES</p><p>Toda comunicaci&oacute;n que deba ser efectuada bajo este Contrato de Cesi&oacute;n o bajo el Contrato de Financiaci&oacute;n se realizar&aacute; de conformidad con la Cl&aacute;usula ${data.form.financeContract.notifyClause.numberClause + ' - ' + data.form.financeContract.notifyClause.titleClause} del Contrato de Financiaci&oacute;n.</p><p>Los domicilios y datos de contacto para cada una de las Partes ser&aacute;n los siguientes:</p><ol type="a"><li>Para el Cedente: los indicados en la cl&aacute;usula ${data.form.financeContract.notifyClause.numberClause + ' - ' + data.form.financeContract.notifyClause.titleClause} del Contrato de Financiaci&oacute;n.</li><li>Para el Cesionario: los indicados en el Anexo III.</li></ol><p>11. NULIDAD PARCIAL</><restantes>La invalidez, nulidad o anulabilidad de cualquier Cl&aacute;usula de esta p&oacute;liza no afectar&aacute; ni perjudicar&aacute; la exigibilidad de las restantes Cl&aacute;usulas de la misma. Asimismo, es la intenci&oacute;n de las Partes sustituir cualquier t&eacute;rmino o Cl&aacute;usula inv&aacute;lida, nula, o anulable por una Cl&aacute;usula v&aacute;lida y exigible en unos t&eacute;rminos lo m&aacute;s similares posible a la Cl&aacute;usula inv&aacute;lida, nula o anulable.</p><p>12. IDIOMA</p><p>El presente Contrato de Cesi&oacute;n se firma en espa&ntilde;ol. Cualquier traducci&oacute;n del mismo, realizado por cualquier motivo, tendr&aacute; car&aacute;cter meramente informativo y no vinculante.</p><p>13. LEY APLICABLE</p><p>Este Contrato de Cesi&oacute;n se regir&aacute; e interpretar&aacute; de acuerdo con el Derecho com&uacute;n espa&ntilde;ol.</p><p>14. JURISDICCI&Oacute;N</p><p>Cada una de las Partes se somete irrevocablemente, con renuncia expresa al fuero que pudiera corresponderle, a la jurisdicci&oacute;n de los Juzgados y Tribunales de ${data.form.financeContract.city} para el conocimiento y resoluci&oacute;n de cualquier reclamaci&oacute;n que pudiera derivarse del cumplimiento o interpretaci&oacute;n de la presente p&oacute;liza.</p><p>Y en prueba de conformidad las partes firman el presente documento en el lugar y fecha arriba indicados.</p><p>El Cedente:</p><p>${data.form.assignor.name}</p><p>El Cesionario</p><p>${data.form.transferee.name}</p><hr /><p>&nbsp;</p><div style="page-break-after:always"><span style="display:none">&nbsp;</span></div><div style="page-break-after:always"><span style="display:none">&nbsp;</span></div><h3 style="text-align: center;">ANEXO I</h3><p style="text-align: center;">Participaci&oacute;n Cedida</p><table align="center" border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\"><thead><tr><th scope=\"col\">Cesionario</th><th scope=\"col\">Precio de la cesi&oacute;n</th></tr></thead><tbody><tr><td style="text-align:center">${data.form.transferee.name}</td><td style="text-align:center">${data.form.assignmentDetails.assignmentAmmount.assignmentPrice.toLocaleString()}</td></tr></tbody></table><p>&nbsp;</p><div style="page-break-after:always"><span style="display:none">&nbsp;</span></div><h3 style="text-align: center;">ANEXO II</h3><p style="text-align: center;">Participaci&oacute;n de las Entidades Financiadoras</p><p style="text-align: center;">La Participaci&oacute;n de las Entidades Financiadoras bajo el Contrato de Financiaci&oacute;n resultante de la Cesi&oacute;n es la siguiente:</p><table align="center" border=\"1\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\"><thead><tr><th scope=\"col\">Entidades Financiadoras</th><th scope=\"col\">Participaci&oacute;n en cada tramo (%)</th></tr></thead><tbody><tr><td style="text-align:center">${data.form.transferee.name}</td><td style="text-align:center">${data.form.assignmentDetails.assignmentAmmount.percentage.toLocaleString()}</td></tr><tr><td style="text-align:center">${data.form.transferee.name}</td><td style="text-align:center">${partTramo.toLocaleString()}</td></tr></tbody></table><p>&nbsp;</p><div style="page-break-after:always"><span style="display:none">&nbsp;</span></div><h3 style="text-align: center;">ANEXO III</h3><p style="text-align: center;">Domicilios a efectos de notificaciones de los Cesionarios</p><table align="center" border=\"2\" cellpadding=\"1\" cellspacing=\"1\" style=\"width:500px\"><tbody><tr><td style="text-align:center">Denominaci&oacute;n</td><td style="text-align:center">${data.form.transferee.name.toLocaleString()}</td></tr><tr><td style="text-align:center">NIF</td><td style="text-align:center">${data.form.transferee.nif}</td></tr><tr><td style="text-align:center">Domicilio Social</td><td style="text-align:center">${data.form.transferee.socialDom.toLocaleString()}</td></tr><tr><td style="text-align:center">Contacto a efectos de env&iacute;o de documentaci&oacute;n</td><td style="text-align:center">${data.form.transferee.contactNotify.toLocaleString()}</td></tr><tr><td style="text-align:center">Direcci&oacute;n a la que se ha de enviar la documentaci&oacute;n</td><td style="text-align:center">${data.form.transferee.addressNotify.toLocaleString()}</td></tr><tr><td style="text-align:center">Tel&eacute;fono</td><td style="text-align:center">${data.form.transferee.phone.toLocaleString()}</td></tr><tr><td style="text-align:center">Email</td><td style="text-align:center">${data.form.transferee.email.toLocaleString()}</td></tr></tbody></table><p>&nbsp;</p><hr /><p>&nbsp;</p>`;
    return dataSend
}