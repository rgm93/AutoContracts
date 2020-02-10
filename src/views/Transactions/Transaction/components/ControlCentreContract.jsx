import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider.js';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Box from '@material-ui/core/Box';
import Transaction from './Transaction';
import SidebarContract from "components/Sidebar/SidebarContract.jsx";
import PerfectScrollbar from "perfect-scrollbar";
import Tasks from './Tasks';
import Participants from "../components/Participants.jsx"

var ps; 

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
    indicator: {
        backgroundColor: "green",
        '&:hover': {
            outline: 'none',
        } ,
        '&:focus': {
            outline: 'none',
        }
    }
}));
export default function ControlCentreContract(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [idTransaction, setIdTransaction] = React.useState(props.location.params && props.location.params.id ? props.location.params.id : '')
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
        ps = new PerfectScrollbar(this.refs.mainPanel, {
          suppressScrollX: true,
          suppressScrollY: false
        });
        document.body.style.overflow = "hidden";
      }
  })
  return (
    <div className={classes.root}>
        <AppBar position="static">
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                classes={{indicator: classes.indicator}}
                indicatorColor="primary"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label="Contratos" {...a11yProps(0)} />
                <Tab label="Tareas" {...a11yProps(1)} />
                <Tab label="Personas Involucradas" {...a11yProps(2)} />
            </Tabs>
        </AppBar>
      
        <TabPanel value={value} index={0}>
            <Transaction id={idTransaction}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <Tasks  id={idTransaction}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
            <Participants id={idTransaction}/>
        </TabPanel>
        <div className={classes.wrapper}>
        {/*<SidebarContract color="white" bgColor="black" />*/}
      </div>
    </div>
  );
}
