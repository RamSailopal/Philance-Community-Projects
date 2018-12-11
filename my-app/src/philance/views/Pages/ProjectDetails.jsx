import React from "react";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "philance/components/CustomInput/CustomInput.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Assignment from "@material-ui/icons/Assignment";
import { Label } from 'semantic-ui-react';
import Table from "components/Table/Table.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import Delete from "@material-ui/icons/Delete";

import FormControl from "@material-ui/core/FormControl";
import { Dropdown } from 'semantic-ui-react'
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import { uploadFiles } from '../../actions/startProject'
// @material-ui/icons

import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import { InterestsDropdown, CountryDropdown } from '../../components/DoubleDropdown'
import { connect } from 'react-redux'
import {
  Icon
} from 'semantic-ui-react';

import {
  budgetChanged,
  descriptionChanged,
  endDateChanged,
  freelancersChanged,
  projectNameChanged,
  startDateChanged,
  volunteersChanged,
  zipCodeChanged,
  statusChanged,
  removeToaster,
  countryChanged,
  updateProject,
  deleteProjectAttachment,
  interestsChanged,
  getProjectById,
  filesChanged,
  clearFiles
} from '../../actions/projectDetails'
import { PROJECT_DETAILS_UPDATE_SUCESS } from '../../actions/types'

import { myProject } from '../../actions/myProject'
import store from '../../store/store'
import Loader from "../../components/Loader/Loader"
import Toaster from "../../components/Toaster/Toaster";
import { hostname } from "../../../config";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
const style = {
  ...extendedTablesStyle,
  ...startProjectPageStyle,
  ...sweetAlertStyle

};
var data = [];
const uid = Math.random().toString(36).substring(7);
class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      interests: [],
      loader: false,
      files: [],
      tableData: []
    };
    this.myRef = React.createRef(); this.fileInput = React.createRef();

  }
  
  getimg() {
     const { classes } = this.props;
     var fownd="0";	
     var fndimag="/static/media/Helpingothers4.023cec80.jpg";
	if (this.props.projectAttachments) {
					this.props.projectAttachments.map((value, key) => {
						var attbits=this.props.projectAttachments[key].originalName.split(".")
						if (attbits[0] === "ProjectImage") {
							fndimag=hostname() + this.props.projectAttachments[key].attachment
						}
					})
					
	}
	else {
			var attbits=""
			fndimag='/static/media/Helpingothers4.023cec80.jpg'
	}
	return fndimag
  }
  
  
  
  fileSplicer = async (files, key) => {
    var a = [];
    await Array.from(files).map((value, index) => {
      if (index != key) {
        a.push(value)
      }
    })
    this.onFilesChange(a);
  }
  async onFilesChange(files) {

    const { classes } = this.props;
    if (files.length == 0) {
      data = []
    }

    var a = []

    await this.props.filesChanged(files, async () => {
      await files ? Array.from(this.props.files).map((value, key) => {
        if (Array.from(files)[key]) {
		  if (this.props.files[key].size < 10485760) {
          a =
            [<span className={classes.customFont}>
              {this.props.files[key].name}
            </span>,
            <Button simple justIcon color='info' onClick={() => {
              //call delete action
              this.fileSplicer(this.props.files, key);
            }}>
              <Delete />
            </Button>]

          data.push(a)
		  }
		  else {
			 a = [<span className={classes.customFont}>
              <font color="red">{"The size of the file is bigger than 10MB"}</font>
            </span>
            ]  
			  data.push(a);
			  setTimeout(
					function() {
								this.fileSplicer(this.props.files,key);
								}
								.bind(this),5000);
		  } 	 
        }
      }) : null
    })

    await this.setState({
      files: data
    })
    data = []

  }
  handleClick() {

    this.refs.fileInput.click();
  }
  
  
  
  
  warningWithConfirmMessage(callback,{title,confirmBtnText,cancelBtnText}) {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          // title={title}
          onConfirm={()=>{
            callback()
            this.setState({ alert: null })
          }}
          onCancel={() => this.setState({ alert: null })}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText={confirmBtnText}
          cancelBtnText={cancelBtnText}
          showCancel
        >
        <h3>
        {title}
        </h3>
        </SweetAlert>
      )
    });
  }

  componentWillReceiveProps() {
    this.updateTable()
  }
  
  updateTable() {
    var { classes } = this.props
    var b = [];
    if (this.props.projectAttachments) {
      this.props.projectAttachments.map((value, key) => {
        var a = [
          <a className={classes.customFont} target="_blank" href={hostname() + this.props.projectAttachments[key].attachment}>
            {this.props.projectAttachments[key].originalName}
          </a>,
          new Date(this.props.projectAttachments[key].creationDate).toLocaleTimeString('en-us') + ' ' + new Date(this.props.projectAttachments[key].creationDate).toLocaleDateString('en-us'),
          this.props.projectAttachments[key].user.firstName + ' ' + this.props.projectAttachments[key].user.lastName,
          this.state.isDisabled ? null : <Button justIcon onClick={() => {
            //call delete
            this.warningWithConfirmMessage(

              ()=>{
                this.props.deleteProjectAttachment({
                  filename: this.props.projectAttachments[key].attachment,
                  projectId: this.props.projectAttachments[key].projectId
                }, 
                () => {

                  this.props.getProjectById({ id: this.props.projectAttachments[key].projectId }, () => {
                    b.splice(key, 1)
                    this.setState({
                      tableData: b
                    })
                    this.updateTable()
                  })
                })
              },{
                title:<span>Are you sure you want to delete this Attachment <strong>permanently</strong>?</span>,
                confirmBtnText:"Yes",
                cancelBtnText:"Cancel"
              }
          
          )
          
          }}>
            <Delete />
          </Button>

        ]
        b[key] = a
        this.setState({
          tableData: b
        })
      })
    }
  }
  componentWillUnmount() {
    this.props.removeToaster()
    this.props.myProject(this.props.userId, () => { })
    this.setState({
      tableData: []
    })
    this.props.getProjectById({ id: this.props.id }, () => { })
  }
  autoCloseAlert(messag) {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          onConfirm={() => this.hideAlert()}
          showConfirm={true}
          confirmBtnText={'Close'}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
        <h4>
        {messag}
        </h4>
        </SweetAlert>
      )
    });
    setTimeout(()=>{this.hideAlert()}, 2000);
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  onProjectNameChange(text) {
    this.props.projectNameChanged(text)
  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text)
  }

  onBudgetChange(text) {
    this.props.budgetChanged(text)
  }

  onEndDateChange(text) {
    this.props.endDateChanged(text)
  }

  onFreeLancersChange(text) {
    this.props.freelancersChanged(text)
  }

  onStartDateChange(text) {
    this.props.startDateChanged(text)
  }

  onVolunteersChange(text) {
    this.props.volunteersChanged(text)
  }

  onCountryChanged(text) {
    store.dispatch(countryChanged(text))
  }

  onZipCodeChange(text) {
    this.props.zipCodeChanged(text)
  }

  onStatusChange(text) {
    this.props.statusChanged(text)
  }

  onInterestsChange(text) {
    this.props.interestsChanged(text)
  }

  toggleLoader = (flag,cb) => {
    this.setState({
      loader: flag
    });
    cb?cb():null
  }
  render() {
    const { classes } = this.props;
	return (
      <GridContainer className={this.props.isLoggedIn ? classes.justifyContentCenter : classes.container}>
        <Loader loader={this.state.loader} />
        <GridItem xs={12} sm={12} md={10}>
          <Card>
        <br/>
            <CardBody>
              <form>
			  <GridContainer align="left" direction="column">
			      <GridItem>
				              <img src={this.getimg()} height="200px" width="400px"/>
				  </GridItem>
			  </GridContainer>
                <GridContainer align="right" direction="column">
                  <GridItem>
                    {this.props.userId == this.props.createdBy ?
                      <Button onClick={async () => {
                        const {
                          name,
                          description,
                          zipCode,
                          country,
                          status,
                          volunteers,
                          freelancers,
                          budget,
                          startDate,
                          endDate,
                          interests,
                          id,
                          userId
                        } = this.props
						if ( this.props.name === '' || this.props.description === '' || this.props.zipCode === '' || this.props.country === '' || this.props.interests === '') {
		this.autoCloseAlert('Fields cannot be blank')
  } 
  
  
   else if ( ! this.props.budget.match('^[0-9]{1,6}[.][0-9]{2}$')) {
		this.autoCloseAlert('Budget format error')
  } 
  
  
  else if ( ! this.props.freelancers.match('^[0-9]{1,3}$') || ! this.props.volunteers.match('^[0-9]{1,3}$') ) {
		this.autoCloseAlert('Volunteers/Freelancers format error')
  } 
   
  else if ( new Date(this.props.endDate) < new Date(this.props.startDate) ) {
		this.autoCloseAlert('End Date cannot be BEFORE Start Date')
  } 
                        else if (this.state.isDisabled) {
                          this.setState({ isDisabled: false }, () => { this.updateTable() })
                          this.props.removeToaster()
                        }
                        else {
                          this.toggleLoader(true);
                          this.setState({ isDisabled: true }, () => { this.updateTable() })
						  
                          await this.props.updateProject({
                            name,
                            status,
                            zipCode,
                            country,
                            interests,
                            description,
                            volunteers,
                            freelancers,
                            budget,
                            startDate,
                            endDate,
                            id,
                            userId
                          }, (flag) => {
                            this.props.files?this.props.files.length>0?
                            this.props.uploadFiles(
                              {
                                uploadType: 'startProjectFiles',
                                userInfo: {
                                  userId: this.props.userId,
                                  projectId: this.props.id
                                }
                              },
                              this.props.files,
                              () => {
                                this.props.getProjectById({ id: this.props.id }, () => {
                                  this.toggleLoader(false);
                                  this.updateTable()
                                  //this.autoCloseAlert()
                                  //clear present uploads
                                  this.props.clearFiles()
                                })
                              }
                            ):
                            this.toggleLoader(false,()=>{
                                console.log('autoClosing')
								//this.autoCloseAlert()
                              }):this.toggleLoader(false,()=>{
                                  console.log('autoClosing')
								  //this.autoCloseAlert()
                                })
                          })
                          store.dispatch({ type: PROJECT_DETAILS_UPDATE_SUCESS })
						  this.autoCloseAlert('Project Updated Successfully')
                        }
                        this.updateTable()
                      }}
                        color="info">
                        {this.state.isDisabled ? 'EDIT' : 'SAVE'}
                      </Button> : null}
                    {this.props.status.toUpperCase() !== 'CLOSED' ?
                      this.state.isDisabled ? <Button color="info" onClick={() => {
                        if (this.props.isLoggedIn) {
                          this.props.history.push('..')
                          this.props.history.replace(`application-page/${this.props.id}`)
                        }
                        else {
                          //alert
                          this.warningWithConfirmMessage(
                            () => this.props.history.push('/login'),
                            {
                              title:"You need to login to Apply for this project",
                              confirmBtnText:"Login!",
                              cancelBtnText:"Cancel"
                            }
                          )
                        }
                      }}>Apply</Button> : null
                      : null
                    }
                  </GridItem>
                </GridContainer>
                {this.state.alert}
                <GridContainer>
                  <GridItem xs={12} sm={14} md={6}>
                    <CustomInput
                      labelText="Project Name"
                      id="projectName"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.name,
                        placeholder: "Enter a Project Name",
                        onChange: e => {
                          this.onProjectNameChange(e.target.value)
                        },
                        disabled: this.state.isDisabled
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={14} md={6}>
                    <InputLabel className={classes.label} style={{ marginBottom: 5, marginTop: 10 }}>
                      Project Status
                      </InputLabel>
                    <Dropdown
                      placeholder='Select Status'
                      value={this.props.status}
                      onChange={async (e, { value }) => {
                        this.setState({ value })
                        this.onStatusChange(value)
                      }
                      }
                      fluid selection options={[
                        {
                          text: 'ACTIVE',
                          value: 'ACTIVE'
                        },
                        {
                          text: 'CLOSED',
                          value: 'CLOSED'
                        }
                      ]}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={14}>
                    <CustomInput
                      labelText="Project Description"
                      id="projectDescription"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.description,
                        placeholder: "Enter a Project Description",
                        onChange: e => {
                          this.onDescriptionChange(e.target.value)
                        },
                        disabled: this.state.isDisabled,
						multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Project Location Zip/City"
                      id="projectLocation"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.zipCode,
                        placeholder: "Enter zip code/city of location where it took place",
                        onChange: e => {
                          this.onZipCodeChange(e.target.value)
                        },
                        disabled: this.state.isDisabled
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <InputLabel className={classes.label} style={{ marginBottom: 5, marginTop: 10 }}>
                      Project Country
                      </InputLabel>
                    {this.props.country ?
                      <CountryDropdown onCountryChanged={this.onCountryChanged} defaultValue={this.props.country} disabled={this.state.isDisabled} />
                      :
                      <CountryDropdown onCountryChanged={this.onCountryChanged} disabled={this.state.isDisabled} />
                    }
                  </GridItem>
                </GridContainer>
                <label
                  as="label"
                  basic
                  htmlFor={uid}
                >
                  <input type="file" id={uid}
                    ref='fileInput'
                    multiple
                    style={{ display: "none" }}
                    name="files"
                    onChange={(e) => this.onFilesChange(e.target.files)}
                  />
                </label>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6} style={{ marginTop: 37 }}>
                    <InputLabel className={classes.label}>
                      Project Start Date
                          </InputLabel>
                    <br /><br />
                    <FormControl fullWidth>
                      <GridContainer>
                        <GridItem xs={9}>
                          <Datetime
                            timeFormat={false}
                            onChange={date => this.onStartDateChange(date._d)}
							isValidDate={ function( current ){
											  return current.isAfter( Datetime.moment().subtract( 1, 'day' ) )
												}
											}
                            inputProps={{
                              value: new Date(this.props.startDate).toDateString(),
                              disabled: this.state.isDisabled
                            }}
                          />
                        </GridItem>
                        <GridItem xs={3}>
                          <Icon bordered inverted color='teal' name='calendar alternate outline' />
                        </GridItem>
                      </GridContainer>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} style={{ marginTop: 37 }}>
                    <InputLabel className={classes.label}>
                      Project End Date
                          </InputLabel>
                    <br /><br />
                    <FormControl fullWidth>
                      <GridContainer>
                        <GridItem xs={9}>
                          <Datetime
                            timeFormat={false}
                            onChange={date => this.onEndDateChange(date._d)}
							isValidDate={ function( current ){
											  return current.isAfter( Datetime.moment().subtract( 1, 'day' ) )
												}
											}
                            inputProps={{
                              value: new Date(this.props.endDate).toDateString(),
                              disabled: this.state.isDisabled
                            }}
                          />
                        </GridItem>
                        <GridItem xs={3}>
                          <Icon bordered inverted color='teal' name='calendar alternate outline' onClick={() => { console.log('hello') }} />
                        </GridItem>
                      </GridContainer>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="% Complete"
                      id="%complete"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: this.state.isDisabled,
                        placeholder: "Enter Complete %",
                        onChange: e => {
                          this.onFreeLancersChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={14}>
                    <CustomInput
                      labelText="Budget"
                      id="projectDescription"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.budget,
                        placeholder: "Enter Estimated Budget i.e. 123.00",
                        onChange: e => {
                          this.onBudgetChange(e.target.value)
                        },
                        disabled: this.state.isDisabled
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                    <InputLabel className={classes.label} style={{ marginBottom: 5, marginTop: 10 }}>
                      Project Impact Category
                        </InputLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer xs={12} sm={12} md={10}>
                  <GridItem xs={12} sm={12} md={10}><br />
                    <InterestsDropdown
                      disabled={this.state.isDisabled}
                      onInterestsChange={
                        async (e, { value }) => {
                          await this.setState({ value: value })
                          if (!this.state.value) {
                            await this.setState({
                              valid: true
                            })
                            this.props.interestsChanged(value)
                          }
                          else {
                            await this.setState({ valid: false })
                            this.props.interestsChanged(value)
                          }
                        }
                      }
                      interestOptions={this.props.interestOptions} defaultValue={this.props.interests}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6}>
                    <InputLabel className={classes.label} style={{ marginTop: 20 }}>
                      Resources Requested
                        </InputLabel>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem style={{ marginTop: 35 }} md={2}>
                    <InputLabel className={classes.label}>
                      Volunteers
                        </InputLabel>
                  </GridItem>
                  <GridItem md={10}>
                    <CustomInput
                      id="volunteers"
                      labelText="Volunteers"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.volunteers,
                        disabled: this.state.isDisabled,
                        placeholder: "Enter Number of Volunteers",
                        onChange: e => {
                          this.onVolunteersChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem style={{ marginTop: 35 }} md={2}>
                    <InputLabel className={classes.label}>
                      Freelancers
                        </InputLabel>
                  </GridItem>
                  <GridItem md={10}>
                    <CustomInput
                      labelText="Freelancers"
                      id="projectDescription"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: this.props.freelancers,
                        disabled: this.state.isDisabled,
                        placeholder: "Enter Number of Freelancers",
                        onChange: e => {
                          this.onFreeLancersChange(e.target.value)
                        }
                      }}
                    />
                  </GridItem>
                  {this.state.isDisabled ? null : <GridContainer>
                    <GridItem xs={12} sm={12} >
                      <Label
                        basic
                      >
                        <GridContainer className={classes.justifyContentCenter}>
                          <GridItem>
                            <Button color="info" onClick={() => this.handleClick()}>
                              <Icon name='upload' />Select Files{'\t\t\t'}
                            </Button>
							<br></br>
							<br></br>
							<br></br>
							<font>Attach an image with the name ProjectImage to associate a picture with your project</font>
                          </GridItem>
                          <GridItem xs={12}>
                            {
                              this.props.files?
                              this.props.files.length != 0 ?
                                <Card>
                                  <CardBody>
                                    <Table
                                      tableHead={[
                                        <strong>Name</strong>,
                                        ''
                                      ]}
                                      fixedHeader={true}
                                      tableHeaderStyle={{ borderRight: '40px solid transparent' }}
                                      tableData={
                                        this.state.files
                                      }
                                      customHeadCellClasses={[
                                        classes.description,
                                        classes.description,
                                        classes.description,
                                        classes.left,
                                        classes.left,
                                        classes.left
                                      ]}
                                      customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                                      customCellClasses={[
                                        classes.customFont,
                                        classes.customFont,
                                        classes.customFont,
                                        classes.tdNumber,
                                        classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                                        classes.tdNumber
                                      ]}
                                      customClassesForCells={[1, 2, 3, 4, 5, 6]}
                                    />
                                  </CardBody>
                                </Card>
                                : null:null
                            }
                          </GridItem>
                          <GridItem>
                          </GridItem>
                        </GridContainer>
                      </Label>
                    </GridItem>
                  </GridContainer>}
                  {
                    this.props.projectAttachments === undefined ? null : this.props.projectAttachments[0] === undefined ? null :
                      <GridItem xs={12} sm={12} md={12}>
                        <Card>
                          <CardBody>
                            {/* <GridItem xs={12} sm={12} md={12}>
                              <Accordion
                                collapses={[
                                  {
                                    title: "Click to see attachments",
                                    content:
                                      <ReactTable
                                      style={{ overflow: "none" }}
                                        data={
                                          [{
                                            attachmentName: 'sampleName.pdf',
                                            action: <a target="_blank" href={hostname() + this.props.projectAttachments[0].attachment}>
                                              Open
                                    </a>
                                          }]
                                        }
                                        showPagination={false}
                                        defaultPageSize={1}
                                        sortable={false}
                                        columns={[
                                          {
                                            Header: <strong>Name</strong>,
                                            accessor: "attachmentName",
                                            filterable: true,
                                            width:'100',
                                            filterMethod: this.columnFilter
                                          },
                                          {
                                            Header: <strong></strong>,
                                            accessor: "action",
                                            filterable: true,
                                            width:'100',
                                            filterMethod: this.columnFilter
                                          }]}
                                      />
                                  }
                                ]}
                              />
                            </GridItem> */}
                            <GridItem xs={12}>
                              <Card>
                                <CardHeader color="info" icon>
                                  <CardIcon color="info">
                                    <Assignment />
                                  </CardIcon>
                                  <h4 className={classes.cardIconTitle}>Project Attachments</h4>
                                </CardHeader>
                                <CardBody>
                                  <Table
                                    tableHead={[
                                      <strong>Name</strong>,
                                      <strong>Date</strong>,
                                      <strong>Uploaded By</strong>,
                                      ''
                                    ]}
                                    fixedHeader={true}
                                    tableHeaderStyle={{ borderRight: '40px solid transparent' }}
                                    tableData={
                                      this.state.tableData
                                    }
                                    customHeadCellClasses={[
                                      classes.description,
                                      classes.description,
                                      classes.description,
                                      classes.left,
                                      classes.left,
                                      classes.left
                                    ]}
                                    customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
                                    customCellClasses={[
                                      classes.customFont,
                                      classes.customFont,
                                      classes.customFont,
                                      classes.tdNumber,
                                      classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                                      classes.tdNumber
                                    ]}
                                    customClassesForCells={[1, 2, 3, 4, 5, 6]}
                                  />
                                </CardBody>
                              </Card>
                            </GridItem>
                          </CardBody>
                        </Card>
                      </GridItem>
                  }
                </GridContainer>
                <br />
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
    name: state.proDetails.name,
    description: state.proDetails.description,
    zipCode: state.proDetails.zipCode,
    freelancers: state.proDetails.freelancers,
    volunteers: state.proDetails.volunteers,
    startDate: state.proDetails.startDate,
    status: state.proDetails.status,
    endDate: state.proDetails.endDate,
    budget: state.proDetails.budget,
    toast: state.proDetails.toast,
    id: state.proDetails.id,
    country: state.proDetails.country,
    interests: state.proDetails.interests,
    files: state.proDetails.files,
    isLoggedIn: state.auth.isLoggedIn,
    interestOptions: state.common.interestOptions,
    requestCompleted: state.start.requestCompleted,
    createdBy: state.proDetails.createdBy,
    projectAttachments: state.proDetails.projectAttachments,
    userId: state.auth.userId,
	text: state.proDetails.text
  }
}

export default connect(mapStateToProps, {
  budgetChanged,
  descriptionChanged,
  endDateChanged,
  freelancersChanged,
  projectNameChanged,
  startDateChanged,
  volunteersChanged,
  zipCodeChanged,
  statusChanged,
  removeToaster,
  countryChanged,
  updateProject,
  myProject,
  deleteProjectAttachment,
  interestsChanged,
  getProjectById,
  filesChanged,
  uploadFiles,
  clearFiles
})(withStyles(style)(ProjectDetails));
