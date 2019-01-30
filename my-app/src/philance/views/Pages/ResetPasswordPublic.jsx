import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/core components

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { connect } from "react-redux";
//import publicHomePageStyle from "./PublicHomePageStyle";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import { emailChanged, resetPasswordFinal, passwordChanged, textChanged } from "../../actions/resetPassword";

class ResetPasswordPublic extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      password: ''
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
  onPasswordChange(text) {
    this.props.passwordChanged(text)
    this.props.textChanged()
  }
  onButtonPress(token) {
    const { password } = this.props;
    this.props.resetPasswordFinal({ password, token })
  }
  render() {
    const { classes } = this.props;

    return (
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
                    <h4 className={classes.cardTitle}>Reset Password</h4>
                  </CardHeader>

                  {!this.props.success ?
                    <CardBody>
                      <CustomInput
                        labelText="Enter your new Password"
                        id="project-name"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          name: "yourLocation",
                          onChange: e => {
                            this.onPasswordChange(e.target.value)
                          }
                        }}
                      />
                      <GridContainer className={classes.justifyContentCenter}>
                        <GridItem  >
                          <Button color="info" onClick={() => this.onButtonPress(this.props.match.params.id)}>
                            Reset My Password
                      </Button>
                        </GridItem>
                      </GridContainer>
                    </CardBody>

                    :
                        <CardBody>
                    <GridContainer className={classes.justifyContentCenter} >
                      <GridItem  className={classes.justifyContentCenter}>
                          Password Changed Successfully
                          <h4 className={classes.textCenter}><NavLink to='/login'>Login Here</NavLink></h4>

                      </GridItem  >
                    </GridContainer >
                        </CardBody>


                  }

                  <CardFooter className={classes.justifyContentCenter}>
                    Don't have an account?
                  <Button color="info" simple size="small">
                      Sign Up
                  </Button>
                  </CardFooter>
                </Card>
              </form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      // <div className={classes.container}>
      //   <GridContainer justify="center">
      //     <GridItem xs={12} sm={12} md={10} lg={10}>
      //       <Card>
      //         <CardHeader>
      //           <h2 className={classes.cardTitle}>Reset Password</h2>
      //         </CardHeader>
      //         <CardBody>
      //           <CustomInput
      //             labelText="Enter your email"
      //             id="project-name"
      //             formControlProps={{
      //               fullWidth: true
      //             }}
      //             inputProps={{
      //               type: "text",
      //               name: "yourLocation",
      //               onChange: e => {
      //                 this.onEmailChange(e.target.value)
      //               }
      //             }}
      //           />
      //           <GridContainer className={classes.justifyContentCenter}>
      //             <GridItem  >
      //               <Button color="info" onClick={()=>this.onButtonPress()}>
      //                 Send Me a Password Reset Email
      //                 </Button>
      //             </GridItem>
      //           </GridContainer>
      //         </CardBody>
      //       </Card>
      //     </GridItem>
      //   </GridContainer>
      // </div>
    );
  }
}

ResetPasswordPublic.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    email: state.resetpass.email,
    password: state.resetpass.password,
    success: state.resetpass.success,
  }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, resetPasswordFinal, textChanged })(withStyles(loginPageStyle)(ResetPasswordPublic));
