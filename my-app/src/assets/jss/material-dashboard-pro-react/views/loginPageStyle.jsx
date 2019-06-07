// ##############################
// // // LoginPage view styles
// #############################

import {
  container,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";

const loginPageStyle = {
  container,
  cardTitle: {
    ...cardTitle,
    color: "#FFFFFF"
  },
  textCenter: {
    textAlign: "center"
  },
  content: {
    paddingTop: "18vh",
    minHeight: "calc(100vh - 80px)",
    position: "relative",
    zIndex: "4"
  },
  fontClass1: {
    position: "absolute",
    top: "50%",
    left: "50%",
    fontFamily: "Aleo,Georgia,serif",
    transform: "translate(-50%, -50%)",
    "&:hover": {
      opacity: 1,
      color: "#ff7b00"
    },
    fontSize: "4rem"
  },
  justifyContentCenter: {
    justifyContent: "center !important"
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: "#FFFFFF"
    },
    marginLeft: "5px",
    marginRight: "5px"
  },
  inputAdornment: {
    marginRight: "18px"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)"
  },
  cardHeader: {
    marginBottom: "20px"
  },
  socialLine: {
    padding: "0.9375rem 0"
  }
};

export default loginPageStyle;
