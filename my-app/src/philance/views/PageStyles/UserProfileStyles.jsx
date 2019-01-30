import {
  container,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";

const userProfileStyles = {
  cardTitle,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
    "& small": {
      fontSize: "80%",
      fontWeight: "400"
    }
  },
  container: {
    ...container,
    position: "relative",
    zIndex: "3",
    paddingTop: "23vh"
  },
  cardCategory: {
    marginTop: "10px",
    color: "#999999 !important",
    textAlign: "center"
  },
  description: {
    color: "#999999"
  },
  updateProfileButton: {
    alignItems: "center"
  },
  welcomeHeading: {
    ...cardTitle,
    color: "#00acc1"
  },
  labelHorizontal: {
    color: "rgba(0, 0, 0, 0.35)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    marginLeft: "0",
    paddingBottom: "20",
    "@media (min-width: 992px)": {
      float: "left"
    }
  }
};
export default userProfileStyles;
