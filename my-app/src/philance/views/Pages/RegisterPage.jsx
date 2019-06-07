import React from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  emailChanged,
  passwordChanged,
  textChanged,
  registerUser,
  firstNameChanged,
  lastNameChanged
} from "../../actions/register";
import { NavLink } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Group from "@material-ui/icons/Group";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
// import LockOutline from "@material-ui/icons/LockOutline";
import Face from "@material-ui/icons/Face";
import LaunchIcon from "@material-ui/icons/Launch";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import bgImag from "philance/assets/img/VolunteerProject2.jpg";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

class RegisterPage extends React.Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
    this.props.textChanged();
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
    this.props.textChanged();
  }

  onFirstNameChange(text) {
    this.props.firstNameChanged(text);
    this.props.textChanged();
  }

  onLastNameChange(text) {
    this.props.lastNameChanged(text);
    this.props.textChanged();
  }

  onButtonPress() {
    const { email, password, firstName, lastName } = this.props;
    this.props.registerUser({ firstName, lastName, email, password },()=>{
      this.props.history.push('/home/profile')
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div
          style={{
            height: "23em",
            marginRight: "-31px",
            marginLeft: "-31px",
            opacity: 1,
            marginBottom: "-130px",
            zIndex: 3,
            position: "relative",
            background: "#222222 none repeat scroll 0 0"
          }}
        >
          <img
            className={classes.backImage}
            src={bgImag}
            style={{
              height: "23em",
              width: "100%",
              opacity: "0.6",
              objectFit: "cover"
            }}
          />
          <div>
            <h2>
              <font color="white" face="verdana" className={classes.fontClass1}>
                Register
              </font>
            </h2>
          </div>
        </div>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10}>
              <Card>
                <CardHeader color="info" icon>
                  <CardIcon color="info">
                    <PersonAddIcon />
                  </CardIcon>
                </CardHeader>
                <h2 className={classes.cardTitle}>
                  <font face="impact" size="6">
                    Join Philance and ...
                  </font>
                </h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={5}>
                      <InfoArea
                        title="Launch Your Own Social Impact Project"
                        description="Post a project that has a durable social impact and find volunteers and/or freelancers to work on it with you, creating the impact your want to see in the world!"
                        icon={LaunchIcon}
                        iconColor="success"
                      />
                      <br />
                      <InfoArea
                        title="Manage Your Project"
                        description="Use the project management and collaboration tools available in the Philance platform to successfully execute your project. Your project team could be from your local community or from across the world!"
                        icon={Timeline}
                        iconColor="success"
                      />
                      <br />
                      <InfoArea
                        title="Work on an Existing Project"
                        description="Sign up as a volunteer or a freelancer to work on an existing social impact project posted by someone else. Contribute your time and expertise to start making a difference today in this world!"
                        icon={Group}
                        iconColor="success"
                      />
                      <br />
                    </GridItem>
                    <GridItem xs={12} sm={8} md={5}>
                      <div className={classes.center}>
                        <Button color="facebook">
                          <i
                            className={
                              classes.socialButtonsIcons +
                              " " +
                              classes.marginRight +
                              " fab fa-facebook-square"
                            }
                          />{" "}
                          Sign Up with your Facebook Account
                        </Button>
                        <h4 className={classes.socialTitle}>
                          or with your email
                        </h4>
                      </div>
                      <form className={classes.form}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            onChange: e => {
                              this.onFirstNameChange(e.target.value);
                            },
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "First Name..."
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            onChange: e => {
                              this.onLastNameChange(e.target.value);
                            },
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Last Name..."
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            onChange: e => {
                              this.onEmailChange(e.target.value);
                            },
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Email className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Email..."
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses
                          }}
                          inputProps={{
                            onChange: e => {
                              this.onPasswordChange(e.target.value);
                            },
                            type: "password",
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                {/* <LockOutline
                                  className={classes.inputAdornmentIcon}
                                /> */}
                              </InputAdornment>
                            ),
                            placeholder: "Password..."
                          }}
                        />
                        <GridContainer justify="center" alignItems="center">
                          <GridItem>
                            <FormLabel
                              className={classes.labelHorizontal}
                              style={{ justifyContent: "center" }}
                            >
                              <span>
                                By registering you confirm that you accept the{" "}
                                <NavLink
                                  style={{ color: "rgb(8, 167, 254)" }}
                                  to={"/termofuse"}
                                >
                                  Term And Conditions
                                </NavLink>
                              </span>
                            </FormLabel>
                          </GridItem>
                        </GridContainer>
                        <GridContainer
                          style={{ paddingTop: 25 }}
                          justify="center"
                          alignItems="center"
                        >
                          <GridItem>
                            <Button
                              round
                              color="info"
                              onClick={() => {
                                this.onButtonPress();
                              }}
                            >
                              {this.props.error}
                            </Button>
                          </GridItem>
                        </GridContainer>
                        <GridContainer
                          style={{ paddingTop: 25 }}
                          justify="center"
                          alignItems="center"
                        >
                          <GridItem>
                            <h4>
                              {" "}
                              Already have an account?{" "}
                              <NavLink
                                style={{ color: "rgb(8, 167, 254)" }}
                                to={"/login"}
                              >
                                Login
                              </NavLink>{" "}
                            </h4>
                          </GridItem>
                        </GridContainer>
                      </form>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.reg.email,
    password: state.reg.password,
    error: state.reg.error,
    firstName: state.reg.firstName,
    lastName: state.reg.lastName,
    isRegistered: state.reg.registered
  };
};

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {
    emailChanged,
    passwordChanged,
    textChanged,
    registerUser,
    firstNameChanged,
    lastNameChanged
  }
)(withStyles(registerPageStyle)(RegisterPage));
