import Calendar from "views/Calendar/Calendar.jsx";
import Dashboard from "views/Dashboard/Dashboard.jsx";
import NewTransaction from "views/Transactions/NewTransaction.jsx";

import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import AddIcon from "@material-ui/icons/AddCircle";
import ContractsIcon from "@material-ui/icons/FileCopy";
import MailIcon from "@material-ui/icons/Drafts";
import AssignmentIcon from "@material-ui/icons/Assignment";

import AssignmentContract from "./views/Transactions/Contracts/AssignmentContract/contract/AssignmentContract";
import MyTransactions from "./views/Transactions/MyTransactions";
import MailBox from "./views/MailBox/MailBox";
import LoginPage from "./views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin",
    invisible: false
  },
  {
    collapse: true,
    name: "Operaciones",
    icon: AssignmentIcon,
    state: "pageCollapse",
    views: [
      {
        path: "/newTransaction",
        name: "Nueva Operación",
        icon: AddIcon,
        component: NewTransaction,
        layout: "/admin",
        invisible: false
      },
      {
        path: "/myTransactions",
        name: "Historial de Operaciones",
        icon: ContractsIcon,
        component: MyTransactions,
        layout: "/admin",
        invisible: false
      }
    ]
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
    path: "/mailbox",
    name: "Buzón de Entrada",
    icon: MailIcon,
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
    path: "/login-page",
    name: "Login Page",
    invisible: true,
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/register-page",
    name: "Register Page",
    invisible: true,
    component: RegisterPage,
    layout: "/auth"
  }
];
export default dashRoutes;
