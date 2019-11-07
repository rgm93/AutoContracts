import React from 'react'
import AssignmentContractSteps from '../steps/AssignmentContractSteps';
import contract1 from "views/Transactions/Contracts/AssignmentContract/json/contract.json";
import contract2 from "views/Transactions/Contracts/AssignmentContract/json/contract2.json";

const schema = [contract1, contract2]

const steps = 
    [
        { 
            name: '1. Partes y datos del contrato', 
            component: <AssignmentContractSteps contract={schema[0]} /> 
        },
        { 
            name: '2. Datos del Contrato de Financiación y las Garantías', 
            component: <AssignmentContractSteps contract={schema[1]} lastForm={true} /> 
        }
    ]

export { steps }