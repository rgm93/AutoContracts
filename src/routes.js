import Calendar from "views/Calendar/Calendar.jsx";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import NewOperation from "views/Transactions/CreateTransaction/components/NewOperation.jsx";
import NewTransaction from "views/Transactions/Transaction/components/NewTransaction.jsx";

import DashboardIcon from "@material-ui/icons/Dashboard";
import Lock from "@material-ui/icons/Lock"
import DateRange from "@material-ui/icons/DateRange";
import AddIcon from "@material-ui/icons/AddCircle";
import ContractsIcon from "@material-ui/icons/FileCopy";
import Transform from "@material-ui/icons/Transform";
import History from "@material-ui/icons/History";
import MailIcon from "@material-ui/icons/Drafts";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Chat from "@material-ui/icons/Chat";
import Contacts from "@material-ui/icons/Contacts";
import DataUsage from "@material-ui/icons/DataUsage";


import WordContract from "./views/Transactions/Contracts/views/WordContract/contract/WordContract"
import AssignmentContract from "./views/Transactions/Contracts/views/AssignmentContract/contract/AssignmentContract";
import ActiveTransactions from "./views/Transactions/ActiveTransactions/components/ActiveTransactions";
import Transaction from "./views/Transactions/Transaction/components/Transaction";
import MailBox from "./views/MailBox/MailBox";
import LoginPage from "./views/Pages/LoginPage.jsx";
import ControlCentre from "./views/Transactions/ControlCentre/components/ControlCentre";
import ControlCentreContract from "./views/Transactions/Transaction/components/ControlCentreContract";
import RegisterPage from "views/Pages/Register/RegisterPage.jsx";

var dashRoutes = [
  {
    path: "/controlCentre",
    name: "Centro de Control",
    icon: DashboardIcon,
    component: ControlCentre,
    layout: "/admin",
    invisible: true
  },
  {
    collapse: true,
    name: "Operaciones",
    icon: AssignmentIcon,
    state: "pageCollapse",
    views: [
      {
        path: "/newOperation",
        name: "Nueva Operación",
        icon: AddIcon,
        component: NewOperation,
        layout: "/admin",
        invisible: false
      },
      {
        path: "/activeTransactions",
        name: "Operaciones Activas",
        icon: Transform,
        component: ActiveTransactions,
        layout: "/admin",
        invisible: false
      },
      {
        path: "/history",
        name: "Historial",
        icon: History,
        component: ActiveTransactions,
        layout: "/admin",
        invisible: false
      }
    ]
  },
  {
    path: "/transaction",
    name: "Operación",
    icon: Transform,
    component: ControlCentreContract,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/calendar",
    name: "Próximos eventos",
    icon: DateRange,
    component: Calendar,
    layout: "/admin",
    invisible: false
  },
  {
    path: "/chat",
    name: "Chat",
    icon: Chat,
    component: MailBox,
    layout: "/admin",
    invisible: false
  },
  {
    path: "/contacts",
    name: "Contactos",
    icon: Contacts,
    component: MailBox,
    layout: "/admin",
    invisible: false
  },
  {
    path: "/database",
    name: "Base de Datos",
    icon: DataUsage,
    component: MailBox,
    layout: "/admin",
    invisible: false
  },
  {
    path: "/assignmentContract",
    name: "Contrato de Cesión de Posición Contractual",
    component: AssignmentContract,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/wordContract",
    name: "Contrato Personalizado",
    component: WordContract,
    layout: "/admin",
    invisible: true
  },
  {
    path: "/login",
    name: "SCAPESHIFT ADA",
    invisible: true,
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/signin",
    name: "SCAPESHIFT ADA",
    invisible: true,
    component: RegisterPage,
    layout: "/auth"
  },
  {
    path: "/login",
    name: "Cerrar Sesión",
    icon: Lock,
    layout: "/auth",
    invisible: false
  },
];
export default dashRoutes;
