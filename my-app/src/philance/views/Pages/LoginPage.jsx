import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
// import LockOutline from "@material-ui/icons";
import { NavLink } from "react-router-dom";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardActions from "@material-ui/core/CardActions";
import { connect } from "react-redux";
import {
  emailChanged,
  passwordChanged,
  loginUser,
  textChanged
} from "../../actions/login";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import bgImag from "philance/assets/img/VolunteerProject3.jpeg";
class LoginPage extends React.Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
    this.props.textChanged();
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
    this.props.textChanged();
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password }, () => {
      this.props.history.push('/home')
    });
  }

  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      password: ""
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={{
          height: '23em',
          marginRight: '-31px',
          marginLeft: '-31px',
          opacity: 1,
          marginBottom: "-130px",
          zIndex: 3,
          position: "relative",
          background: '#222222 none repeat scroll 0 0',

        }}>
          <img
            className={classes.backImage}
            src={bgImag}
            style={{ height: '23em', width: '100%', opacity: '0.6', objectFit: "cover" }}
          />
          <div>
            <h2><font color="white" face="verdana" className={classes.fontClass1}>Login</font></h2>
          </div>
        </div>

        <div className={classes.content}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={6} md={4}>
                <form>
                  <Card login className={classes[this.state.cardAnimaton]}>
                    <CardHeader
                      className={`${classes.cardHeader} ${classes.textCenter}`}
                      color="info"
                    >
                      <h4 className={classes.cardTitle}>Log in</h4>
                      <div className={classes.socialLine}>
                        {["fab fa-facebook-square"].map((prop, key) => {
                          return (
                            <Button
                              color="transparent"
                              justIcon
                              key={key}
                              className={classes.customButtonClass}
                            >
                              <i className={prop} />
                            </Button>
                          );
                        })}
                      </div>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                          onChange: e => {
                            this.onEmailChange(e.target.value);
                          }
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          onChange: e => {
                            this.onPasswordChange(e.target.value);
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              {/* <LockOutline
                                className={classes.inputAdornmentIcon}
                              /> */}
                            </InputAdornment>
                          )
                        }}
                      />
                      <CardActions className={classes.justifyContentCenter}>
                        <Button
                          round
                          color="info"
                          justify="center"
                          onClick={() => this.onButtonPress()}
                        >
                          {this.props.error}
                        </Button>
                      </CardActions>
                      <CardActions className={classes.justifyContentCenter}>
                        <NavLink to="/forgotPassword">
                          <Button color="info" simple size="sm">
                            Forgot Password?
                          </Button>
                        </NavLink>
                      </CardActions>
                    </CardBody>
                    <CardFooter className={classes.justifyContentCenter}>
                      Don't have an account?
                      <Button
                        onClick={() => {
                          this.props.history.push("/register");
                        }}
                        color="info"
                        simple
                        size="sm"
                      >
                        Sign Up
                      </Button>
                    </CardFooter>
                  </Card>
                </form>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error
  };
};

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, loginUser, textChanged }
)(withStyles(loginPageStyle)(LoginPage));
