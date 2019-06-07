import React from "react";
import PropTypes from "prop-types";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import leftImage from "philance/assets/img/left-image.png";
import { Form, Input, TextArea, Button, Select, Label } from "semantic-ui-react";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Loader from "../../components/Loader/Loader"
import bgImag from "philance/assets/img/VolunteerProject3.jpeg";
import { submitContact } from '../../actions/contactForm'
import ContactFormStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import { notification } from 'antd'
class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      invalidName: false,
      invalidLastName: false,
      invalidEmail: false,
      invalidMessage: false,
      loader: false
    };

  }
  toggleLoader = (flag) => {
    this.setState({
      loader: flag
    });
  }
  onFirstNameChange = text => {
    if (text === "") {
      this.setState({ invalidName: true, firstName: text })
    }
    else {
      this.setState({
        invalidName: false,
        firstName: text
      })
    }
  };
  onLastNameChange = text => {

    this.setState({

      lastName: text
    });
  };
  onEmailChange = text => {
    if (text === "") {
      this.setState({ invalidEmail: true, email: text })
    }
    else {
      this.setState({
        invalidEmail: false,
        email: text
      })
    }
  };
  onMessageChange = text => {
    if (text === "") {
      this.setState({ invalidMessage: true, message: text })
    }
    else {
      this.setState({
        invalidMessage: false,
        message: text
      })
    }
  };

  submit = () => {

    const { firstName,
      lastName,
      email,
      message } = this.state

    if (firstName === "" || email === "" || message === "") {

      if (firstName === "") {
        this.setState({ invalidName: true })
      }
      if (email === "") {
        this.setState({ invalidEmail: true })
      }
      if (message === "") {
        this.setState({ invalidMessage: true })
      }
    }
    else {
      this.toggleLoader(true)
      this.props.submitContact({ firstName, lastName, email, message },
        (flag) => {
          this.toggleLoader(flag)
        },
        () => {

          notification.success({
            placement: 'bottomRight',
            message: 'Your query has been submitted and we will get back to you shortly. Thank you!',
            duration: 5
          });

          this.setState({
            firstName: '',
            lastName: '',
            email: '',
            message: '',
          })
          this.setState({});

        }
      )
    }

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
            marginBottom: "30px",
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
                Contact Form
              </font>
            </h2>
          </div>
        </div>

        <div className={classes.container}>
          <GridContainer justify="center">
            <Loader loader={this.state.loader} />
            <GridItem sm={12} md={5} lg={5}>
              <div style={{ padding: "50px 0" }}>
                <h4 style={{ color: "rgb(8, 167, 254)", fontWeight: "300" }}>
                  To contact the staff of PhiLance, please send an email to
                  info@philance.org or use the contact us form below. We look
                  forward to hearing from you!
                </h4>
              </div>
            </GridItem>
          </GridContainer>
          <GridContainer justify="center" style={{ paddingBottom: "50px" }}>
            <GridItem sm={12} md={5} lg={5}>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field required>
                    <label style={{ fontSize: '20px' }}>First Name</label>
                    <Form.Input placeholder="First name" value={this.state.firstName} onChange={e => {
                      this.onFirstNameChange(e.target.value)
                    }} error={this.state.invalidName} />
                    {this.state.invalidName ? (
                      <Label basic style={{ color: "red" }} pointing>
                        Please enter a first name
                        </Label>
                    ) : null}
                  </Form.Field>
                  <Form.Field>
                    <label style={{ fontSize: '20px' }}>Last Name</label>
                    <Form.Input placeholder="Last name" value={this.state.lastName}
                      onChange={e => {
                        this.onLastNameChange(e.target.value)
                      }} />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field required>
                    <label style={{ fontSize: '20px' }}>Email</label>
                    <Form.Input placeholder="joe@schmoe.com" value={this.state.email} onChange={e => {
                      this.onEmailChange(e.target.value)
                    }} error={this.state.invalidEmail} />
                  </Form.Field>
                  {this.state.invalidEmail ? (
                    <Label basic style={{ color: "red" }} pointing>
                      Please enter email address
                        </Label>
                  ) : null}
                </Form.Group>
                <Form.Field required>
                  <label style={{ fontSize: '20px' }}>Comment or Message</label>
                  <Form.TextArea value={this.state.message} placeholder="Message..." onChange={e => {
                    this.onMessageChange(e.target.value)
                  }} error={this.state.invalidMessage} />
                  {this.state.invalidMessage ? (
                    <Label basic style={{ color: "red" }} pointing>
                      Please enter some message
                        </Label>
                  ) : null}
                </Form.Field>
                <Form.Field>
                  <Button color="primary" type="submit" onClick={() => this.submit()}>Submit</Button>
                </Form.Field>
              </Form>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

ContactForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
  }
}
export default connect(mapStateToProps, {
  submitContact
})(withStyles(ContactFormStyle)(ContactForm));
