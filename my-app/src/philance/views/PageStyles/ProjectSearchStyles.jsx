// ##############################
// // // ProjectSearchPage view styles
// #############################

import {
  container,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";


const projectSearchStyle = {
  // ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    textAlign: "center"
  },
  container: {
    ...container,
    position: "relative",
    zIndex: "4",
    paddingTop: "2vh"
  },
  cardSignup: {
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    marginBottom: "100px",
    padding: "40px 0px",
    marginTop: "1vh"
  },
  fontClass1: {
    position: "absolute",
    top: "50%",
    left: "50%",
    fontFamily:"Aleo,Georgia,serif",
    transform: "translate(-50%, -50%)",
    "&:hover": {
      opacity: 1,
      color: "#ff7b00"
    },
    fontSize:'4rem'
  
  },
  center: {
    textAlign: "center"
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  form: {
    padding: "0 20px",
    position: "relative"
  },
  socialTitle: {
    fontSize: "18px"
  },
  inputAdornment: {
    marginRight: "18px",
    position: "relative"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  customFormControlClasses: {
    margin: "0 12px"
  },
  checkboxLabelControl: {
    margin: "0"
  },
  checkboxLabel: {
    marginLeft: "6px",
    color: "rgba(0, 0, 0, 0.26)"
  },
  donateRight: {

    paddingRight: '0px !important'
  },
  donateLeft: {
    paddingLeft: '0px !important'
  }
};

export default projectSearchStyle;
