import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "philance/components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";

import FormLabel from "@material-ui/core/FormLabel";

// @material-ui/icons
import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import { connect } from 'react-redux'
import { removeToaster, roleChanged, messageChanged, applyForProject } from '../../actions/applyForProject'

import Toaster from "../../components/Toaster/Toaster";
import Loader from "../../components/Loader/Loader"
import { Tag } from "antd"
import Badge from "components/Badge/Badge.jsx";
import moment from "moment";
import { List, Form, TextArea, Icon, Header, Divider } from "semantic-ui-react";
import InputLabel from "@material-ui/core/InputLabel";
const style = {
  ...startProjectPageStyle,
  inputLabelStart: { marginBottom: 5, marginTop: 15, color: "black" }
};
class ApplicationPage extends React.Component {

  state = {
    value: '',
    loader: false
  }

  componentWillUnmount() {
    this.props.removeToaster()
  }

  handleChange = async event => {
    await this.setState({ value: event.target.value });
    this.props.roleChanged(this.state.value)
  }

  onMessageChanged(text) {
    this.props.messageChanged(text)
  }

  toggleLoader = (flag) => {
    this.setState({
      loader: flag
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer className={classes.justifyContentCenter}>
        <Loader loader={this.state.loader} />
        <Toaster display={this.props.toast} message={this.props.text} />
        <GridItem xs={12} sm={12} md={10}>
          <Card>
            <CardHeader color="twitter" text>
              <CardText color="info">
                <h3>Application to Work on Project</h3>
              </CardText>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer align="right" direction="column">
                  <GridItem style={{ marginRight: 5 }}>
                    <Button style={{ fontSize: '14px' }} round className={classes.marginRight} onClick={() => {
                      this.props.history.goBack()
                      // this.props.history.push(`project-details/${this.props.projectId}`)
                    }}>
                      <i style={{ marginRight: '5px' }} class="fa fa-angle-left"></i>{" "}Back to project details
                    </Button>
                  </GridItem>
                </GridContainer>
                <GridContainer
                  style={{ paddingBottom: "30px" }}
                  justify="center"
                  alignItems="center"
                  direction="column"
                >
                  <GridItem>
                    {/* <Image avatar src={bgImag} /> */}
                    {this.props.interests ? (
                      <List bulleted horizontal>
                        {this.props.interests.map(elements => {
                          return (
                            <List.Item>
                              <List.Content>
                                <List.Header>{elements}</List.Header>
                              </List.Content>
                            </List.Item>
                          );
                        })}
                        <List.Item>
                          <List.Content>
                            <List.Header as="a">{this.props.country}</List.Header>
                          </List.Content>
                        </List.Item>
                      </List>
                    ) : null}
                  </GridItem>
                  <GridItem>
                    <h1 align="center" style={{ padding: '0.25em 0', color: '#3e4b59', fontSize: '2.5em' }}>
                      <strong>
                        {this.props.projectName}
                        <Tag color="green">{this.props.status}</Tag>
                      </strong>{" "}
                    </h1>
                  </GridItem>
                  <GridItem>
                    <h5 className={classes.justifyContentCenter}>
                      Last updated by{" "}
                      <a>
                        <b>Ajay Kapur</b>
                      </a>{" "}
                      just now.
              </h5>
                  </GridItem>
                  <h5 className={classes.justifyContentCenter}>
                    Start Date{" "}
                    <a>
                      <b>{moment(this.props.startDate).calendar()}</b>
                    </a>
                  </h5>
                </GridContainer>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6}>
                    <Divider horizontal>
                      <Header as='h4'>
                        <Icon name='tag' />
                        Summary
                      </Header>
                    </Divider>
                    <h4 style={{ fontSize: 20, fontWeight: '400', color: '#777', }}>
                      {this.props.summary}
                    </h4>
                  </GridItem>
                </GridContainer>
                <GridContainer style={{ padding: '25px 0' }} justify="center">
                  <GridItem xs={12} sm={12} md={6} align="left">
                    <Divider horizontal>
                      <Header as='h4'>
                        <Icon name='tag' />
                        Apply For Project
                      </Header>
                    </Divider>
                    <FormLabel component="legend" style={{ fontSize: 15, fontWeight: '400', color: '#666', paddingTop: '15px' }}>Your Message</FormLabel>
                    <Form>
                      <TextArea
                        maxLength={1000}
                        // value={this.props.summary}
                        style={{ width: "100%" }}
                        placeholder="Enter your comments here explaining why you want to work on this project"
                        onChange={e => {
                          this.onMessageChanged(e.target.value);
                        }}
                        autoHeight
                        rows="2"
                      />
                    </Form>
                    {/* <CustomInput
                      id="comments"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 10,
                        placeholder: "Enter your comments here explaining why you want to work on this project",
                        onChange: e => {
                          this.onMessageChanged(e.target.value)
                        }
                      }}
                    /> */}
                  </GridItem>
                </GridContainer>
                <GridContainer style={{ paddingTop: '15px' }} justify='center'>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend" style={{ fontSize: 15, fontWeight: '400', color: '#666' }}>Select Your Role</FormLabel>
                      <RadioGroup
                        aria-label="role"
                        name="role"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                      >
                        <FormControlLabel
                          value="volunteer"
                          control={<Radio color="primary" />}
                          label="Volunteer"
                        />
                        <FormControlLabel
                          value="freelancer"
                          control={<Radio color="primary" />}
                          label="Freelancer"
                        />
                      </RadioGroup>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer justify='center' style={{ padding: '40px 0' }}>
                  <GridItem xs={12} sm={8} md={6} xl={4} style={{ textAlign: 'center' }}>
                    <Button
                      fullWidth
                      color="twitter"
                      onClick={() => {
                        this.toggleLoader(true)
                        const { projectId, userId, message, role } = this.props
                        this.props.applyForProject({ userId, projectId, message, role }, (flag) => {
                          this.toggleLoader(flag)
                        },
                          () => {
                            this.props.history.push(`/home/project-details/info?p=${this.props.projectId}`)
                          })
                      }}
                    >
                      Submit Application to Project Owner
                      </Button>
                  </GridItem>
                </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectId: state.proDetails.id,
    projectName: state.proDetails.name,
    userId: state.auth.userId,
    message: state.applypro.message,
    role: state.applypro.role,
    toast: state.applypro.toast,
    text: state.applypro.text,
    description: state.proDetails.description,
    interests: state.proDetails.interests,
    country: state.proDetails.country,
    startDate: state.proDetails.startDate,
    status: state.proDetails.status,
    summary: state.proDetails.projectSummary,
    createdBy: state.proDetails.createdBy,

  }
}

export default connect(mapStateToProps, {
  removeToaster,
  roleChanged,
  messageChanged,
  applyForProject
})(withStyles(startProjectPageStyle)(ApplicationPage));
