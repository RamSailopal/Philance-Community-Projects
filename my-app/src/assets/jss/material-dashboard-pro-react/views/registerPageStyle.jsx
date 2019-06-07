// ##############################
// // // RegisterPage view styles
// #############################

import {
  container,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";

import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import hoverCardStyle from "assets/jss/material-dashboard-pro-react/hoverCardStyle.jsx";
import backgroundAdvisors from "philance/assets/img/banner-simple-arrow.jpg";
import backgroundTeam from "philance/assets/img/banner-simple-arrow.jpg";
import backgroundCompanyImage from "philance/assets/img/banner-blue.jpg";
backgroundCompanyImage;
const registerPageStyle = {
  ...hoverCardStyle,
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    textAlign: "center"
  },
  heading: {
    ...cardTitle,
    textAlign: "center",
    color: "white"
  },
  container: {
    position: "relative",
    zIndex: "3",
    paddingTop: "0vh"
  },
  cardMain: {
    padding: "0px 12px"
  },
  cardSignup: {
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    marginBottom: "100px",
    padding: "40px 0px",
    marginTop: "1vh"
  },
  newz: {
    height: "707px",
    width: "100%"
  },
  center: {
    textAlign: "center"
  },
  fontClass: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  fontClassMain: {
    ///position: "absolute",
    opacity: 1,
    textAlign: "center",
    top: "99%",
    left: "35%",
    transform: "translate(-35%, -99%)",
    "&:hover": {
      opacity: 1,
      color: "#ff7b00"
    },
    fontSize: "1.6",
    fontWeight: "700"
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
  fontClass2: {
    position: "absolute",
    opacity: "1",
    top: "70%",
    left: "30%",
    transform: "translate(-30%, -70%)",
    "&:hover": {
      opacity: 1,
      color: "#ff7b00"
    }
  },
  fontClass3: {
    position: "absolute",
    top: "0%",
    left: "50%",
    transform: "translate(-50%, -0%)",
    "&:hover": {
      opacity: 1,
      color: "#ff7b00"
    }
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
  justifyContentCenter: {
    justifyContent: "center"
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: "40px",
    display: "block",
    maxWidth: "100%",
    minHeight: "200px",
    maxheight: "300px"
  },
  item: {
    color: "#fff !important",
    opacity: 1,
    "&:hover": {
      opacity: 1,
      color: "#ff7b00"
    }
  },
  cardProductTitle: {
    ...cardTitle,
    marginTop: "0px",
    //marginBottom: "3px",
    textAlign: "center"
  },
  cardCategory: {
    color: "#999999",
    fontSize: "14px",
    paddingTop: "10px",
    marginBottom: "0",
    marginTop: "0",
    margin: "0"
  },
  description: {
    color: "#999999"
  },
  cardCategoryTeam: {
    //color: "#999999",
    fontSize: "20px",
    paddingBottom: "10px",
    paddingTop: "5px",
    marginBottom: "0",
    textAlign: "center",
    marginTop: "0",
    margin: "0"
  },
  cardProductDesciprion: {
    textAlign: "center",
    color: "#999999"
  },
  price: {
    color: "inherit",
    "& h4": {
      marginBottom: "0px",
      marginTop: "0px"
    }
  },
  dividerTitle: {
    fontSize: "24px",
    fontWeight: "500",
    textTransform: "uppercase",
    color: "rgb(8, 167, 254) !important"
  },
  dividerTitle1: {
    fontSize: "34px",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "rgb(8, 167, 254) !important"
  },
  dividerTitleAboutUsPage: {
    fontSize: "26px",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "rgb(8, 167, 254) !important"
  },
  listDescription: {
    color: "rgb(62, 75, 89)",
    fontWeight: "400",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: '1.1rem',
    lineHeight: '1.46429em'
  },
  dividerTitleModified: {
    fontSize: "18px",
    fontWeight: "400",
    textTransform: "uppercase",
    color: "rgb(8, 167, 254) !important"
  },
  dividerTitle2: {
    fontSize: "34px",
    fontWeight: "600",
    textTransform: "uppercase",
    color: "rgb(8, 167, 254) !important",
    "@media (max-width: 600px)": {
      paddingTop: "0% !important",
      paddingBottom: "10%"
    }
  },
  description: {
    color: "#999999"
  },
  imageOverlay: {
    background: "#222222 none repeat scroll 0 0",
    height: " 100%",
    left: 0,
    opacity: 0.8,
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: "99"
  },
  fullWidth: {
    textAlign: "center",
    paddingTop: "2% !important",
    //  right:'35%',
    "@media (max-width: 960px)": {
      width: "100%",
      paddingTop: "0% !important"
    }
  },

  imageLeft: {
    "@media (max-width: 960px)": {
      display: "none"
    }
  },
  imageRight: {
    "@media (max-width: 960px)": {
      display: "none"
    }
  },
  backGroundTeamCard: {
    backgroundImage: `url(${backgroundTeam})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0% 90%",
    backgroundSize: "cover",
    color: "#fff",
    borderRadius: "150px 150px 150px 150px",
    padding: "20px",
    paddingBottom: "30px"
    //overflow:' hidden',
  },
  backGroundAdvisorsCard: {
    backgroundImage: `url(${backgroundAdvisors})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 20%",
    backgroundSize: "cover",
    color: "#fff",
    borderRadius: "150px 150px 150px 150px",
    padding: "20px",
    paddingBottom: "30px"

    //background: "#222222 none repeat scroll 0 0"
  },
  backGroundCompanyCard: {
    backgroundImage: `url(${backgroundCompanyImage})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    color: "#fff",
    borderRadius: "10px 10px 10px 0",
    padding: "20px",
    paddingBottom: "30px"
  },
  overlay: {
    background: "#222222 none repeat scroll 0 0",
    content: "",
    height: "100%",
    left: 0,
    opacity: "0.4",
    // position: 'absolute',
    top: 0,
    width: "100%",
    zIndex: 99
  }
};

export default registerPageStyle;
