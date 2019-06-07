import React, { Fragment } from "react";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "philance/components/CustomInput/CustomInput.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Assignment from "@material-ui/icons/Assignment";
import queryString from "query-string";
import CardTravel from "@material-ui/icons/CardTravel";
import { Label, Progress, List, Image, Input, Popup } from "semantic-ui-react";
import Table from "components/Table/Table.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import { Hashtag } from "react-twitter-widgets";
import NavPills from "components/NavPills/NavPills.jsx";
import FormControl from "@material-ui/core/FormControl";
import { Dropdown } from "semantic-ui-react";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import { uploadFiles } from "../../actions/startProject";
// @material-ui/icons
import Info from "@material-ui/icons/Info";
import startProjectPageStyle from "philance/views/PageStyles/StartProjectPageStyles";
import {
  InterestsDropdown,
  CountryDropdown
} from "../../components/DoubleDropdown";
import { connect } from "react-redux";
import { Icon } from "semantic-ui-react";
import Update from "@material-ui/icons/Update";
import People from "@material-ui/icons/People";
import Share from "@material-ui/icons/Share";
import list_alt from "@material-ui/icons/ListAlt"
import Show_chart from "@material-ui/icons/ShowChart"
import Description from "@material-ui/icons/Description"
// core components
import moment from "moment";
import Tabs from "components/CustomTabs/CustomTabs.jsx";
import bgImag from "philance/assets/img/VolunteerProject3.jpeg";
import facebookShare from "philance/assets/img/facebook(1).svg";
import twitterShare from "philance/assets/img/twitter(1).svg";
import linkedinShare from "philance/assets/img/linkedin.svg";
import ProjectTeam from "philance/views/Pages/ProjectTeam";
import ProjectTaskView from "philance/views/Pages/ProjectTaskView";

import Typography from "@material-ui/core/Typography";
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
  clearFiles,
  setProjectDefaultImage,
  projectUpdatesChanged,
  createProjectUpdates,
  deleteProjectUpdates,
  getProjectUpdates,
  
} from "../../actions/projectDetails";
import { PROJECT_DETAILS_UPDATE_SUCESS } from "../../actions/types";

import { myProject } from "../../actions/myProject";
import store from "../../store/store";
import Loader from "../../components/Loader/Loader";
import Toaster from "../../components/Toaster/Toaster";
import { hostname } from "../../../config";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import CustomLinearProgress from "components/CustomLinearProgress/CustomLinearProgress.jsx";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Badge from "components/Badge/Badge.jsx";
import { Tag, Pagination, Divider,Popconfirm } from 'antd';
import { getEmbeddedUrl } from "../../helpers/helper";
//import { ImageResize } from 'quill-image-resize-module';
 
//Quill.register('modules/imageResize', ImageResize);
// import { Editor } from 'react-draft-wysiwyg';
// import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuillImageUploader,{saveImageSrc} from 'react-quill-image-uploader'

const style = {
  ...extendedTablesStyle,
  ...startProjectPageStyle,
  ...sweetAlertStyle
};
const bull = <span>•</span>;
var data = [];
const uid = Math.random()
  .toString(36)
  .substring(7);
class ProjectDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      sendNotes: "",
      interests: [],
      loader: false,
      files: [],
      tableData: [],
      theme: "snow",
      notes: "",
      isOpen: "false",
      updates:[],
      activePage: 1,
      pageSize: 10,
      autoPlay:true
    };
    this.myRef = React.createRef();
    this.fileInput = React.createRef();
  }
  updateDeleteConfirm(update){
        this.props.deleteProjectUpdates(
        {
          updateId: update.updateId,
          projectId: this.props.id,
        },
        () => {
            this.getProjectUpdates();
            }
      );
      }
  getimg() {
    const { classes } = this.props;
    var fownd = "0";
    var fndimag = "/static/media/Helpingothers4.023cec80.jpg";
    if (this.props.projectAttachments) {
      this.props.projectAttachments.map((value, key) => {
        var attbits = this.props.projectAttachments[key].originalName.split(
          "."
        );
        if (attbits[0] === "ProjectImage") {
          fndimag = hostname() + this.props.projectAttachments[key].attachment;
        }
      });
    } else {
      var attbits = "";
      fndimag = "/static/media/Helpingothers4.023cec80.jpg";
    }
    return fndimag;
  }

  fileSplicer = async (files, key) => {
    var a = [];
    await Array.from(files).map((value, index) => {
      if (index != key) {
        a.push(value);
      }
    });
    this.onFilesChange(a);
  };
  async onFilesChange(files) {
    const { classes } = this.props;
    if (files.length == 0) {
      data = [];
    }
    var a = [];
    await this.props.filesChanged(files, async () => {
      (await files)
        ? Array.from(this.props.files).map((value, key) => {
          if (Array.from(files)[key]) {
            if (this.props.files[key].size < 10485760) {
              a = [
                <span className={classes.customFont}>
                  {this.props.files[key].name}
                </span>,
                <Button
                  simple
                  justIcon
                  color="info"
                  onClick={() => {
                    //call delete action
                    this.fileSplicer(this.props.files, key);
                  }}
                >
                  <Delete />
                </Button>
              ];
              data.push(a);
            } else {
              a = [
                <span className={classes.customFont}>
                  <font color="red">
                    {"The size of the file is bigger than 16MB"}
                  </font>
                </span>
              ];
              data.push(a);
              setTimeout(
                function () {
                  this.fileSplicer(this.props.files, key);
                }.bind(this),
                5000
              );
            }
          }
        })
        : null;
    });

    await this.setState({
      files: data
    });
    data = [];
  }
  handleClick() {
    this.refs.fileInput.click();
  }
  //   uploadImageCallBack (file) {
  //   // post file
  //   // const id = await uploadFile(file);
  //   // const range = this.quill.getSelection();
  //   //  const link = `${ROOT_URL}/file/${id}`;
  //   return Promise.resolve({
  //     data: {
  //       link:'https://iph.href.lu/200x200'
  //     }
  //   })
  // }
  // imageHandler() {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();
  //   // input.onchange = async function() {
  //   //   const file = input.files[0];
  //   //   console.log('User trying to uplaod this:', file);

  //   //   const id = await uploadFile(file); // I'm using react, so whatever upload function
  //   //   const range = this.quill.getSelection();
  //   //   const link = `${ROOT_URL}/file/${id}`;

  //   //   // this part the image is inserted
  //   //   // by 'image' option below, you just have to put src(link) of img here. 
  //   //   this.quill.insertEmbed(range.index, 'image', link); 
  //   // }.bind(this); // react thing
  // }
  //react quill
  modules = {
    toolbar: 
    [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image", "video"],
      ["clean"],
     
    ],
        
    clipboard: {
      matchVisual: false
    }
  };

  formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video"
  ];

  warningWithConfirmMessage(
    callback,
    { title, confirmBtnText, cancelBtnText }
  ) {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          // title={title}
          onConfirm={() => {
            callback();
            this.setState({ alert: null });
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
          <h3>{title}</h3>
        </SweetAlert>
      )
    });
  }

  componentWillReceiveProps() {
    this.updateTable();
 
  }
 
  handleClose = () => {
    this.setState({ isOpen: false });
  };
  updateTable() {
    var { classes } = this.props;
    var b = [];
    if (this.props.projectAttachments) {
      this.props.projectAttachments.map((value, key) => {
        var a = [
          <a
            className={classes.customFont}
            target="_blank"
            href={hostname() + this.props.projectAttachments[key].attachment}
          >
            {this.props.projectAttachments[key].originalName}
          </a>,
          new Date(
            this.props.projectAttachments[key].creationDate
          ).toLocaleTimeString("en-us") +
          " " +
          new Date(
            this.props.projectAttachments[key].creationDate
          ).toLocaleDateString("en-us"),
          this.props.projectAttachments[key].user.firstName +
          " " +
          this.props.projectAttachments[key].user.lastName,
          this.state.isDisabled ? null : (
            <GridContainer>
              <GridItem>
                <Popup
                  wide
                  trigger={
                    <Button href="#" className={classes.title} color="success">
                      Actions
                    </Button>
                  }
                  on="click"
                  onClose={this.handleChange}
                >
                  <GridContainer divided columns="equal">
                    <GridItem>
                      {/* <Popup
                        trigger={ */}
                      <Button
                        className={classes.title}
                        onClick={() => {
                          this.props.setProjectDefaultImage({
                            projectId: this.props.projectAttachments[key]
                              .projectId,
                            imageUri: this.props.projectAttachments[key]
                              .attachment
                          });
                          this.setState({ isOpen: false });
                        }}
                      >
                        set as default
                      </Button>
                    </GridItem>
                    <GridItem>
                      <Button
                        justIcon
                        onClick={() => {
                          //call delete
                          this.warningWithConfirmMessage(
                            () => {
                              this.props.deleteProjectAttachment(
                                {
                                  filename: this.props.projectAttachments[key]
                                    .attachment,
                                  projectId: this.props.projectAttachments[key]
                                    .projectId
                                },
                                () => {
                                  this.props.getProjectById(
                                    {
                                      id: this.props.projectAttachments[key]
                                        .projectId
                                    },
                                    () => {
                                      b.splice(key, 1);
                                      this.setState({
                                        tableData: b
                                      });
                                      this.updateTable();
                                    }
                                  );
                                }
                              );
                            },
                            {
                              title: (
                                <span>
                                  Are you sure you want to delete this
                                  Attachment <strong>permanently</strong>?
                                </span>
                              ),
                              confirmBtnText: "Yes",
                              cancelBtnText: "Cancel"
                            }
                          );
                        }}
                      >
                        <Delete />
                      </Button>
                    </GridItem>
                  </GridContainer>
                </Popup>
              </GridItem>
            </GridContainer>
          )
        ];
        b[key] = a;
        this.setState({
          tableData: b
        });
      });
    }
  }
  handlePageChange = async (page) => {
    await this.setState({ activePage: page });
    this.getProjectUpdates();
  }

  onShowSizeChange = async (page, pagesPerPage) => {
    await this.setState({ pageSize: pagesPerPage });
    await this.setState({ activePage: 1 })
    this.getProjectUpdates();
  }

  getProjectUpdates=async ()=>{
   
    const {activePage,pageSize}=this.state
    this.props.getProjectUpdates(
      queryString.parse(this.props.location.search).p,activePage,pageSize
    );
  }
  componentWillMount() {
    this.getProjectUpdates();
    this.props.getProjectById(
      { id: queryString.parse(this.props.location.search).p },
      () => { }
    );
   
  }
  // componentDidMount () {
	// 	this.quill = this.quillRef && this.quillRef.getEditor()
  //   this.setState({ quill: this.quill })
  //   // import {saveImageSrc} from 'react-quill-image-uploader', call saveImageSrc('https://iph.href.lu/100x100')
  //   // or
  //   // <script> call 
  //   ReactQuillImageUploader.saveImageSrc('https://iph.href.lu/100x100') // save image url to plugin history manually
  // }
  componentWillUnmount() {
    this.props.removeToaster();
    this.props.myProject(this.props.userId, () => { });
    this.setState({
      tableData: []
    });
    this.props.getProjectById({ id: this.props.id }, () => { });
  }
  autoCloseAlert(messag) {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          onConfirm={() => this.hideAlert()}
          showConfirm={true}
          confirmBtnText={"Close"}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
        >
          <h4>{messag}</h4>
        </SweetAlert>
      )
    });
    setTimeout(() => {
      this.hideAlert();
    }, 2000);
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  onProjectNameChange(text) {
    this.props.projectNameChanged(text);
  }

  onDescriptionChange(text) {
    this.props.descriptionChanged(text);
  }

  onBudgetChange(text) {
    this.props.budgetChanged(text);
  }

  onEndDateChange(text) {
    this.props.endDateChanged(text);
  }

  onFreeLancersChange(text) {
    this.props.freelancersChanged(text);
  }

  onStartDateChange(text) {
    this.props.startDateChanged(text);
  }

  onVolunteersChange(text) {
    this.props.volunteersChanged(text);
  }

  onCountryChanged(text) {
    store.dispatch(countryChanged(text));
  }

  onZipCodeChange(text) {
    this.props.zipCodeChanged(text);
  }

  onStatusChange(text) {
    this.props.statusChanged(text);
  }

  onInterestsChange(text) {
    this.props.interestsChanged(text);
  }

  toggleLoader = (flag, cb) => {
    this.setState({
      loader: flag
    });
    cb ? cb() : null;
  };
  tag(status) {
    if (status == "ACTIVE") {
      return <Tag color="green">{status}</Tag>
    }
    else if (status == "CLOSED") {
      return <Tag color="red">{status}</Tag>
    }
    else if (status == "UNPUBLISHED") {
      return <Tag color="gray">{status}</Tag>
    }
  }
 
  render() {
    const { classes } = this.props;
    const { quill={} } = this.state
   // sendNotes
  
    return (
      <div>
        <GridContainer className={classes.justifyContentCenter}>
          <GridContainer
            style={{ paddingBottom: "50px" }}
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
              <h1 align="center" style={{padding:'0.25em 0',color:'#3e4b59',fontSize: '2.5em'}}>
                <strong>
                  {this.props.name}
                  {this.tag(this.props.status)}
                  {/* <Badge color="success">{this.props.status}</Badge> */}
                </strong>{" "}
              </h1>
            </GridItem>
            <GridItem>
              <h5 className={classes.justifyContentCenter}>
                Created by{" "}
                <a>
                 <b>{this.props.projectCreatedByDetails? this.props.projectCreatedByDetails.firstName + ' '+ this.props.projectCreatedByDetails.lastName:null}</b>
                </a>{" "}<Divider style={{ background: '#444' }} type="vertical" /> Start Date{" "}<a>
                  <b>{moment(this.props.startDate).calendar()}</b>
                </a>
              </h5>
            </GridItem>

          </GridContainer>
          <Loader loader={this.state.loader} />
          <GridItem xs={12} sm={12} md={12} lg={11}>
            <GridContainer direction="row">
              <GridItem xs={12} sm={6} md={8}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    <ImageGallery
                      items={
                        this.props.projectLinks.filter(item=>{return item.attachmentType=='videoLink'}).length>0?
                        [{
                          original: this.props.projectLinks.filter(item=>{return item.attachmentType=='videoLink'})[0].attachmentPath,
                          thumbnail: this.props.projectLinks.filter(item=>{return item.attachmentType=='videoLink'})[0].attachmentPath,
                          uri: this.props.projectLinks.filter(item=>{return item.attachmentType=='videoLink'})[0].attachmentPath,
                          type:'video'
                        },
                        ...this.props.projectAttachments.
                          filter(item => item.attachmentType == 'image').map(attachment => {
                            return {
                              original: hostname() + attachment.attachment,
                              thumbnail: hostname() + attachment.attachment,
                              uri: attachment.attachment,
                              type:'image'
                            }
                          })]
                        :
                        [
                        ...this.props.projectAttachments.
                          filter(item => item.attachmentType == 'image').map(attachment => {
                            return {
                              original: hostname() + attachment.attachment,
                              thumbnail: hostname() + attachment.attachment,
                              uri: attachment.attachment,
                              type:'image'
                            }
                          })]
                      }
                      renderItem={(item) => {
                       
                        if(item.type=='video'){
                          return(
                            
                          <div>
                          <iframe 
                            style={{width: '100%',maxHeight:'550px',minHeight:'550px'}}
                            src={getEmbeddedUrl(item.original)} 
                            frameborder="0" 
                            allow="accelerometer; 
                            autoplay; 
                            encrypted-media; 
                            gyroscope; 
                            picture-in-picture" 
                            allowfullscreen
                            
                            ></iframe>
                          
                            </div>
                            )
                        }else{
                        return (
                        <div style={{textAlign:'center'}} className='image-gallery-image'>
                          <img
                            src={item.original}
                            alt={item.originalAlt}
                            srcSet={item.imageSet}
                            style={{ height: '100%',maxHeight:'500px'}}
                          />
                          {
                            item.description &&
                            <span className='image-gallery-description'>
                              {item.description}
                              {
                                item.link && item.linkLabel &&
                                <a className='my-own-class' href={item.link}>
                                  {item.linkLabel}
                                </a>
                              }
                            </span>
                          }
                        </div>)
                        }
                      }}
                      renderThumbInner={(item) =>{
                       
                        if(item.type=='video'){
                          return(
                            <div style={{display:'flex'}}>
                          <iframe 
                            style={{width: '100%',height:'143px',}}
                            src={getEmbeddedUrl(item.original)} 
                           ></iframe>
                           </div>
                           
                            )
                        }else{
                        return (
                          <div style={{display:'flex'}}>
                          <img
                            src={item.original}
                            alt={item.originalAlt}
                            srcSet={item.imageSet}
                            style={{ height: '135px',maxHeight:'200px'}}
                          />
                          </div>
                       )
                        }
                      
                      }}
                      onClick={e => {  }}
                      lazyLoad={false}
                      thumbnailPosition="bottom"
                      showBullets
                      showFullscreenButton={false}
                      showIndex
                      showThumbnails
                      showNav
                      showPlayButton={false}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    
                    <Tabs
                     
                      title=""
                      rltActive
                      headerColor="warningNew"
                    
                      backgroundColor="#ebeeee"
                      // plainTabs
                      tabs={[
                        {
                          tabName: "Overview",
                          tabIcon: Description,
                          tabContent: (
                            <div>
                              <Card>
                                <CardHeader>
                                  <GridContainer>
                                    <GridItem xs={6} sm={6} >
                                      <Label
                                        className={classes.label}
                                        style={{ margin: "10px 0" }}
                                        color="orange"
                                        ribbon
                                      >
                                        <div style={{ textAlign: "center" }}>
                                          <h4>Summary</h4>
                                        </div>
                                      </Label>
                                    </GridItem>
                                    <GridItem xs={6} sm={6} style={{ textAlign: 'right' }}>
                                      {this.props.userId ==
                                        this.props.createdBy ? (
                                          <Button color="twitter" onClick={() => this.props.history.push("/home/editProject?p="+this.props.id)}>Edit Project</Button>
                                        ) : null}</GridItem>
                                    <GridItem />
                                  </GridContainer>
                                </CardHeader>
                                <CardBody>
                                      <h4
                                        style={{
                                          fontFamily:
                                            '"Open Sans","Roboto", "Helvetica", "Arial", "sans-serif"',
                                          fontWeight: "400",
                                          color: '#495057'
                                        }}
                                      > {this.props.summary}</h4>
                                  <GridContainer style={{ paddingTop: "15px" }}>
                                    <GridItem xs={12} sm={12}>
                                      <Label
                                        className={classes.label}
                                        style={{ margin: "10px 0" }}
                                        color="blue"
                                        ribbon
                                      >
                                        <div style={{ textAlign: "center" }}>
                                          <h4>Project Challenge</h4>
                                        </div>
                                      </Label>
                                      <h4
                                        style={{
                                          fontFamily:
                                            '"Open Sans","Roboto", "Helvetica", "Arial", "sans-serif"',
                                          fontWeight: "400",
                                          color: '#495057'
                                        }}
                                      >
                                        {/* <font size="4"> */}
                                        {this.props.challenge}
                                        {/* </font> */}
                                      </h4>
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer style={{ paddingTop: "15px" }}>
                                    <GridItem xs={12} sm={12}>
                                      <Label
                                        className={classes.label}
                                        style={{ margin: "10px 0" }}
                                        color="blue"
                                        ribbon
                                      >
                                        <h4> Project Solution</h4>
                                      </Label>
                                      <h4
                                        style={{
                                          fontFamily:
                                            '"Open Sans","Roboto", "Helvetica", "Arial", "sans-serif"',
                                          fontWeight: "400",
                                          color: '#495057'
                                        }}
                                      >
                                        {/* <font size="4"> */}
                                        {this.props.solution}
                                        {/* </font> */}
                                      </h4>
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer style={{ paddingTop: "15px" }}>
                                    <GridItem xs={12} sm={12}>
                                      <Label
                                        className={classes.label}
                                        style={{ margin: "10px 0" }}
                                        color="blue"
                                        ribbon
                                      >
                                        <h4> Project Justification / Impact</h4>
                                      </Label>
                                      <h4
                                        style={{
                                          fontFamily:
                                            '"Open Sans","Roboto", "Helvetica", "Arial", "sans-serif"',
                                          fontWeight: "400",
                                          color: '#495057'
                                        }}
                                      >
                                        {/* <font size="4"> */}
                                        {this.props.justification}
                                        {/* </font> */}
                                      </h4>
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer style={{ paddingTop: "15px" }}>
                                    <GridItem xs={12} sm={12}>
                                      <Label
                                        className={classes.label}
                                        style={{ margin: "10px 0" }}
                                        color="blue"
                                        ribbon
                                      >
                                        <div style={{ textAlign: "center" }}>
                                          <h4>Resources Needed</h4>
                                        </div>
                                      </Label>
                                      <h4
                                        style={{
                                          fontFamily:
                                            '"Open Sans","Roboto", "Helvetica", "Arial", "sans-serif"',
                                          fontWeight: "400",
                                          color: '#495057'
                                        }}
                                      >
                                        {/* <font size="4"> */}

                                        <p>{`Volunteers (Unpaid) required: ${(this.props.volunteers)}`}
                                        </p>
                                        <p>{`Freelancers (Paid) required: ${(this.props.freelancers)}`}
                                        </p>
                                      </h4>
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer style={{ paddingTop: "15px" }}>
                                    <GridItem xs={12} sm={12}>
                                      <Label
                                        className={classes.label}
                                        style={{ margin: "10px 0" }}
                                        color="blue"
                                        ribbon
                                      >
                                        <div style={{ textAlign: "center" }}>
                                          <h4>Project Supplies Needed</h4>
                                        </div>
                                      </Label>
                                      <h4
                                        style={{
                                          fontFamily:
                                            '"Open Sans","Roboto", "Helvetica", "Arial", "sans-serif"',
                                          fontWeight: "400",
                                          color: '#495057'
                                        }}
                                      >    {this.props.suppliesNeeded}
                                       
                                      </h4>
                                    </GridItem>
                                  </GridContainer>
                                  <GridContainer style={{ paddingTop: "15px" }}>
                                    <GridItem xs={12} sm={12}>
                                      <Label
                                        className={classes.label}
                                        style={{ margin: "10px 0" }}
                                        color="blue"
                                        ribbon
                                      >
                                        <div style={{ textAlign: "center" }}>
                                          {/* <h4>Future Impact</h4> */}
                                          <h4> Budget Details </h4>
                                        </div>
                                      </Label>
                                      <h4
                                style={{
                                  marginBottom: "5px",
                                  fontFamily:'"Open Sans","Roboto", "Helvetica", "Arial", "sans-serif"',
                                  color:"green",
                                  fontWeight:600
                                }}
                              >
                              Goal: ${this.props.budget} 
                              </h4>
                                      <h4
                                        style={{
                                          fontFamily:
                                            '"Open Sans","Roboto", "Helvetica", "Arial", "sans-serif"',
                                          fontWeight: "400",
                                          color: '#495057'
                                        }}
                                      >
                                      
                                        {/* <font size="4"> */}
                                        {this.props.budgetDetails}
                                        {/* </font> */}
                                      </h4>
                                    </GridItem>
                                  </GridContainer>
                                </CardBody>
                              </Card>
                              <Card>
                                <CardBody>
                                  <List>
                                    <List.Item>
                                      <List.Header as="a">
                                        <h4 align="left">
                                          <strong>
                                            <font face="impact" size="5">
                                              Documents
                                            </font>
                                          </strong>{" "}
                                        </h4>
                                      </List.Header>
                                    </List.Item>
                                  </List>
                                  <List>
                                    {this.props.projectAttachments.map(
                                      (projectAttachment, index) => {
                                        if (
                                          projectAttachment.attachmentType ==
                                          "document"
                                        ) {
                                          return (
                                            <List.Item key={index}>
                                              <List.Icon name="file" />
                                              <List.Content>
                                                <h4 align="left">
                                                  <strong>
                                                    <font size="4">
                                                      {" "}
                                                      <a
                                                      target="_blank"
                                                        href={`${hostname() +
                                                          projectAttachment.attachment}`}
                                                      >
                                                        {
                                                          projectAttachment.originalName
                                                        }
                                                      </a>
                                                    </font>
                                                  </strong>{" "}
                                                </h4>
                                              </List.Content>
                                            </List.Item>
                                          );
                                        } else {
                                          return null;
                                        }
                                      }
                                    )}
                                  </List>
                                </CardBody>
                              </Card>
                              <Card>
                                <CardBody>
                                  <List>
                                    <List.Item>
                                      <List.Header as="a">
                                        <h4 align="left">
                                          <strong>
                                            <font face="impact" size="5">
                                              Links
                                            </font>
                                          </strong>{" "}
                                        </h4>
                                      </List.Header>
                                    </List.Item>
                                  </List>
                                  <List>
                                    {
                                       this.props.projectLinks.filter(item=>{return item.attachmentType=='projectLink'}).map(link=>{
                                        return(
                                          link.attachmentPath?  
                                        <List.Item>
                                          <List.Icon name='linkify' />
                                          <List.Content>
                                            <h4 align="left"><strong><font size="4"> <a target='_blank'  href={link.attachmentPath}>{link.attachmentPath}</a></font></strong> </h4>
                                          </List.Content>
                                        </List.Item>:null
                                        )
                                      })
                                    }
                                  </List>
                                </CardBody>
                              </Card>
                            </div>
                          )
                        },
                        {
                          tabName: "Update",
                          tabIcon: Update,
                          tabContent: (
                            <div
                              style={{
                                backgroundColor: "#eeeeee",
                                padding: "10px"
                              }}
                            >
                              {this.props.isLoggedIn ?
                                (this.props.userId ==
                                  this.props.createdBy ?

                                  (
                                  <GridContainer>
                                      <GridItem xs={12} sm={12}>
                                      <ReactQuill
                                      //ref={(el) => { this.quillRef = el; }}
                                        theme={this.state.theme}
                                        modules={this.modules}
                                        formats={this.formats}
                                        value={this.state.sendNotes}
                                        onChange={e =>{
                                      
                                            this.setState({
                                            sendNotes: e
                                          })
                                        }
                                        }
                                      />
                                       {/* <ReactQuillImageUploader ref={(el) => { this.ReactQuillImageUploaderRef = el }} quill={this.state.quill} uploadCallback={this.uploadImageCallBack} /> */}
                                      </GridItem>
                                      <GridItem xs={12} sm={12}>
                                        <Button
                                          style={{ paddingTop: '10px' }}
                                          color="twitter"
                                          onClick={() => {
                                            this.props.createProjectUpdates(
                                              {
                                                projectId: this.props.id,
                                                text: this.state.sendNotes,
                                                userId: this.props.userId
                                              },
                                              () => {
                                                this.getProjectUpdates();
                                                  this.setState({
                                                  sendNotes: ""
                                                })
                                              }
                                            );
                                           
                                          }}
                                        >
                                          Post New Update
                                  </Button>
                                  </GridItem>
                                  </GridContainer>
                                  ) : null) : null}
                                  {this.props.updates
                                ? this.props.updates.map(update => {
                                  return (
                                    <div>
                                    <Card className={classes.card} style={{ display: 'flex' }}>
                                      <GridContainer>
                                        <GridItem xs={10} sm={10}>
                                          <CardContent  >
                                            <Typography
                                              className={classes.title}
                                              color="textSecondary"
                                              gutterBottom
                                            >
                                              {moment(
                                                update.creationDate
                                              ).calendar()}
                                            </Typography>
                                            <Typography
                                              variant="h5"
                                              component="h2"
                                            >
                                              Posted By{" "}
                                              {update.createdByDetails.firstName +
                                                " " +
                                                update.createdByDetails.lastName}
                                            </Typography>
                                            <Typography
                                              className={classes.pos}
                                              color="textSecondary"
                                            >
                                              <br />
                                            </Typography>
                                            <Typography component="div" >
                                             <div style={{height:' 100%', width:' 100%' ,maxWidth: '100%', objectFit: 'contain',overflow:'scroll',display: 'inline-block'}} dangerouslySetInnerHTML={{ __html: update.text }} >
                                                {/* {ReactHtmlParser(update.text)} */}
                                               
                                                </div>
                                            </Typography>
                                          </CardContent>
                                        </GridItem>
                                        <GridItem xs={2} sm={2}>
                                          <div style={{ float: 'right', textAlign: 'right' }}>
                                            {this.props.userId ==
                                              this.props.createdBy ?
                                              (
                                                <span>
                                                  <Button color="twitter" size="small" justIcon simple>
                                                    <Edit />
                                                  </Button>
                                                  <Popconfirm
                                                    placement="topRight"
                                                    title="Are you sure you want to delete this update?"
                                                    onConfirm={()=>{this.updateDeleteConfirm(update)}}
                                                    okText="Yes Delete"
                                                    cancelText="No"
                                                  >
                                                  <Button color="danger" size="small" justIcon simple 
                                                  >
                                                    <Delete />
                                                  </Button></Popconfirm>
                                                  </span>)
                                              : null}
                                          </div>
                                        </GridItem>
                                      </GridContainer>
                                    </Card>
                                    
                                     </div>
                                  );
                                })
                                : null}
                          {this.props.updates?
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12}>
                              <Pagination showSizeChanger pageSizeOptions={['2', '5', '10', '20', '50']} onShowSizeChange={this.onShowSizeChange} pageSize={this.state.pageSize} current={this.state.activePage} onChange={this.handlePageChange} total={this.props.totalPages} />
                            </GridItem>
                          </GridContainer>:null}
                            </div>
                          )
                        },
                       
                        {
                          tabName: "Team",
                          tabIcon: People,
                          tabContent: <ProjectTeam />
                        },
                        {
                          tabName: "Tasks",
                          tabIcon: list_alt,
                          tabContent: <ProjectTaskView />
                        },
                        {
                          tabName: "Share",
                          tabIcon: Share,
                          tabContent: "My location"
                        },
                      ]}
                    />
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    {/* <img src={this.getimg()} height="400px" width="100%" /> */}
                    <Card style={{ marginTop: 0 }}>
                      <CardBody>
                        <div style={{ display: "flex" }}>
                          <div style={{ width: "100%" }}>
                            <h5
                              color="textSecondary"
                              style={{
                                marginBottom: 2,
                                display: "flex",
                               // whiteSpace: "nowrap",
                                fontWeight:'450',
                                paddingBottom: "10px",
                                textTransform:'uppercase'
                              }}
                            >
                              <span
                                style={{
                                  color: "green",
                                  paddingRight:'6px'}}
                              >
                                $0.00 
                              </span>
                                      raised of ${this.props.budget} goal
                              </h5>
                            <Progress
                              size="small"
                              percent={parseInt(
                                0 / parseInt(this.props.budget)
                              )}
                              progress
                              active
                              color="green"
                              style={{ width: "100%" }}
                            />
                          </div>
                        </div>
                        <div style={{ display: "flex" }}>
                          <h5 style={{ width: "100%",fontWeight:'400', }}>3 donations</h5>
                          <h5
                            style={{
                              float: "right",
                              marginTop: "0px",
                              paddingLeft: "3px",
                              width: "100%",
                              textAlign: "right",
                              fontWeight:'400'
                            }}
                          >
                            {" "}
                            $ {this.props.budget} to go
                          </h5>
                        </div>
                        <GridContainer>
                          <GridItem
                            xs={6}
                            sm={6}
                            md={6}
                            className={classes.donateRight}
                          >
                            <Input
                              type="number"
                              style={{ width: "100%", marginTop: "10px" }}
                              size="big"
                              defaultValue="0"
                              labelPosition="left"
                            // onChange={e => {
                            //   this.onBudgetChange(e.target.value)
                            // }}
                            >
                              <Label>$</Label>
                              <input />
                            </Input>
                          </GridItem>
                          <GridItem
                            xs={6}
                            sm={6}
                            md={6}
                            className={classes.donateLeft}
                          >
                            <Button
                              color="twitter"
                              style={{ width: "100%", marginTop: "10px" }}
                            >
                              Donate
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card style={{ marginTop: 0, width: '100%' }} >
                      <CardBody>
                        <Progress value={this.props.acceptedVolunteers.length} size="small" total={this.props.volunteers} disabled={this.props.volunteers == 0} color='orange' active progress='ratio' ><h4 color="black">Volunteers </h4></Progress>
                        <Progress value={this.props.acceptedFreelancers.length} size="small" total={this.props.freelancers} disabled={this.props.freelancers == 0} color='violet' active progress='ratio'  ><h4 color="black">Freelancers</h4></Progress>
                        {this.props.status.toUpperCase() !== "CLOSED" ? (
                          <Button
                            color='twitter'
                            style={{ width: "100%", marginTop: "10px" }}
                            onClick={() => {
                              if (this.props.isLoggedIn) {
                                this.props.history.push("..");
                                this.props.history.replace(
                                  `application-page/${this.props.id}`
                                );
                              } else {
                                //alert
                                this.warningWithConfirmMessage(
                                  () => this.props.history.push("/login"),
                                  {
                                    title:
                                      "You need to login to Apply for this project",
                                    confirmBtnText: "Login!",
                                    cancelBtnText: "Cancel"
                                  }
                                );
                              }
                            }}
                          >
                            Apply to work on the project
                          </Button>
                        ) : null}
                      </CardBody>
                    </Card>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader>
                        <h3>Spread the word!</h3>
                      </CardHeader>
                      <CardBody>
                        <List selection verticalAlign="middle">
                          <List.Item>
                            <Image avatar src={facebookShare} />
                            <List.Content>
                              <List.Header>Facebook</List.Header>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <Image avatar src={twitterShare} />
                            <List.Content>
                              <List.Header>Twitter</List.Header>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <Image avatar src={linkedinShare} />
                            <List.Content>
                              <List.Header>Linkedin</List.Header>
                            </List.Content>
                          </List.Item>
                        </List>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <Card>
                      <CardHeader>
                        <h3>Donors</h3>
                      </CardHeader>
                      <CardBody>
                        <List
                          divided
                          animated
                          selection
                          verticalAlign="middle"
                          size="big"
                        >
                          <List.Item>
                            <List.Content>
                              <List.Header as="a">Rachel</List.Header>
                              <List.Description>
                                Last Donated{" "}
                                <a>
                                  <b>$ 1,000</b>
                                </a>{" "}
                                just now.
                              </List.Description>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Header as="a">Lindsay</List.Header>
                              <List.Description>
                                Last Donated{" "}
                                <a>
                                  <b>$ 1,000</b>
                                </a>{" "}
                                just now.
                              </List.Description>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Header as="a">Matthew</List.Header>
                              <List.Description>
                                Last Donated{" "}
                                <a>
                                  <b>$ 1,000</b>
                                </a>{" "}
                                just now.
                              </List.Description>
                            </List.Content>
                          </List.Item>
                        </List>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridItem>
          <Loader loader={this.state.loader} />
          {this.state.isDisabled ? null : (
            <GridItem xs={12} sm={12} md={12}>
              <Card>
                <br />
                <CardBody>
                  <GridContainer align="right" direction="column">
                    <GridItem>
                      {this.props.status.toUpperCase() !== "CLOSED" ? (
                        this.state.isDisabled ? (
                          <Button
                            color="info"
                            onClick={() => {
                              if (this.props.isLoggedIn) {
                                this.props.history.push("..");
                                this.props.history.replace(
                                  `application-page/${this.props.id}`
                                );
                              } else {
                                //alert
                                this.warningWithConfirmMessage(
                                  () => this.props.history.push("/login"),
                                  {
                                    title:
                                      "You need to login to Apply for this project",
                                    confirmBtnText: "Login!",
                                    cancelBtnText: "Cancel"
                                  }
                                );
                              }
                            }}
                          >
                            Apply
                          </Button>
                        ) : null
                      ) : null}
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
                            this.onProjectNameChange(e.target.value);
                          },
                          disabled: this.state.isDisabled
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={14} md={6}>
                      <InputLabel
                        className={classes.label}
                        style={{ marginBottom: 5, marginTop: 10 }}
                      >
                        Project Status
                      </InputLabel>
                      <Dropdown
                        placeholder="Select Status"
                        value={this.props.status}
                        onChange={async (e, { value }) => {
                          this.setState({ value });
                          this.onStatusChange(value);
                        }}
                        fluid
                        selection
                        options={[
                          {
                            text: "ACTIVE",
                            value: "ACTIVE"
                          },
                          {
                            text: "CLOSED",
                            value: "CLOSED"
                          }
                        ]}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={14}>
                      <CustomInput
                        labelText="Project Summary"
                        id="projectSummary"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          placeholder: "Enter a Project Summary",
                          onChange: e => {
                            this.onDescriptionChange(e.target.value);
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
                          placeholder:
                            "Enter zip code/city of location where it took place",
                          onChange: e => {
                            this.onZipCodeChange(e.target.value);
                          },
                          disabled: this.state.isDisabled
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <InputLabel
                        className={classes.label}
                        style={{ marginBottom: 5, marginTop: 10 }}
                      >
                        Project Country
                      </InputLabel>
                      {this.props.country ? (
                        <CountryDropdown
                          onCountryChanged={this.onCountryChanged}
                          defaultValue={this.props.country}
                          disabled={this.state.isDisabled}
                        />
                      ) : (
                          <CountryDropdown
                            onCountryChanged={this.onCountryChanged}
                            disabled={this.state.isDisabled}
                          />
                        )}
                    </GridItem>
                  </GridContainer>
                  <label as="label" basic htmlFor={uid}>
                    <input
                      type="file"
                      id={uid}
                      ref="fileInput"
                      multiple
                      style={{ display: "none" }}
                      name="files"
                      onChange={e => this.onFilesChange(e.target.files)}
                    />
                  </label>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6} style={{ marginTop: 37 }}>
                      <InputLabel className={classes.label}>
                        Project Start Date
                      </InputLabel>
                      <br />
                      <br />
                      <FormControl fullWidth>
                        <GridContainer>
                          <GridItem xs={9}>
                            <Datetime
                              timeFormat={false}
                              onChange={date => this.onStartDateChange(date._d)}
                              isValidDate={function (current) {
                                return current.isAfter(
                                  Datetime.moment().subtract(1, "day")
                                );
                              }}
                              inputProps={{
                                value: new Date(
                                  this.props.startDate
                                ).toDateString(),
                                disabled: this.state.isDisabled
                              }}
                            />
                          </GridItem>
                          <GridItem xs={3}>
                            <Icon
                              bordered
                              inverted
                              color="teal"
                              name="calendar alternate outline"
                            />
                          </GridItem>
                        </GridContainer>
                      </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} style={{ marginTop: 37 }}>
                      <InputLabel className={classes.label}>
                        Project End Date
                      </InputLabel>
                      <br />
                      <br />
                      <FormControl fullWidth>
                        <GridContainer>
                          <GridItem xs={9}>
                            <Datetime
                              timeFormat={false}
                              onChange={date => this.onEndDateChange(date._d)}
                              isValidDate={function (current) {
                                return current.isAfter(
                                  Datetime.moment().subtract(1, "day")
                                );
                              }}
                              inputProps={{
                                value: new Date(
                                  this.props.endDate
                                ).toDateString(),
                                disabled: this.state.isDisabled
                              }}
                            />
                          </GridItem>
                          <GridItem xs={3}>
                            <Icon
                              bordered
                              inverted
                              color="teal"
                              name="calendar alternate outline"
                             
                            />
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
                            this.onFreeLancersChange(e.target.value);
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
                            this.onBudgetChange(e.target.value);
                          },
                          disabled: this.state.isDisabled
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <InputLabel
                        className={classes.label}
                        style={{ marginBottom: 5, marginTop: 10 }}
                      >
                        Project Impact Category
                      </InputLabel>
                    </GridItem>
                  </GridContainer>
                  <GridContainer xs={12} sm={12} md={10}>
                    <GridItem xs={12} sm={12} md={10}>
                      <br />
                      <InterestsDropdown
                        disabled={this.state.isDisabled}
                        onInterestsChange={async (e, { value }) => {
                          await this.setState({ value: value });
                          if (!this.state.value) {
                            await this.setState({
                              valid: true
                            });
                            this.props.interestsChanged(value);
                          } else {
                            await this.setState({ valid: false });
                            this.props.interestsChanged(value);
                          }
                        }}
                        interestOptions={this.props.interestOptions}
                        defaultValue={this.props.interests}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <InputLabel
                        className={classes.label}
                        style={{ marginTop: 20 }}
                      >
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
                            this.onVolunteersChange(e.target.value);
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
                            this.onFreeLancersChange(e.target.value);
                          }
                        }}
                      />
                    </GridItem>
                    {this.state.isDisabled ? null : (
                      <GridContainer>
                        <GridItem xs={12} sm={12}>
                          <Label basic>
                            <GridContainer
                              className={classes.justifyContentCenter}
                            >
                              <GridItem>
                                <Button
                                  color="info"
                                  onClick={() => this.handleClick()}
                                >
                                  <Icon name="upload" />
                                  Select Files{"\t\t\t"}
                                </Button>
                                <br />
                                <br />
                                <br />
                                <font>
                                  Attach an image with the name ProjectImage to
                                  associate a picture with your project
                                </font>
                              </GridItem>
                              <GridItem xs={12}>
                                {this.props.files ? (
                                  this.props.files.length != 0 ? (
                                    <Card>
                                      <CardBody>
                                        <Table
                                          tableHead={[
                                            <strong>Name</strong>,
                                            ""
                                          ]}
                                          fixedHeader={true}
                                          tableHeaderStyle={{
                                            borderRight:
                                              "40px solid transparent"
                                          }}
                                          tableData={this.state.files}
                                          customHeadCellClasses={[
                                            classes.description,
                                            classes.description,
                                            classes.description,
                                            classes.left,
                                            classes.left,
                                            classes.left
                                          ]}
                                          customHeadClassesForCells={[
                                            0,
                                            2,
                                            3,
                                            4,
                                            5,
                                            6
                                          ]}
                                          customCellClasses={[
                                            classes.customFont,
                                            classes.customFont,
                                            classes.customFont,
                                            classes.tdNumber,
                                            classes.tdNumber +
                                            " " +
                                            classes.tdNumberAndButtonGroup,
                                            classes.tdNumber
                                          ]}
                                          customClassesForCells={[
                                            1,
                                            2,
                                            3,
                                            4,
                                            5,
                                            6
                                          ]}
                                        />
                                      </CardBody>
                                    </Card>
                                  ) : null
                                ) : null}
                              </GridItem>
                              <GridItem />
                            </GridContainer>
                          </Label>
                        </GridItem>
                      </GridContainer>
                    )}
                    {this.props.projectAttachments === undefined ? null : this
                      .props.projectAttachments[0] === undefined ? null : (
                        <GridItem xs={12} sm={12} md={12}>
                          <Card>
                            <CardBody>
                              <GridItem xs={12}>
                                <Card>
                                  <CardHeader color="info" icon>
                                    <CardIcon color="info">
                                      <Assignment />
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}>
                                      Project Attachments
                                  </h4>
                                  </CardHeader>
                                  <CardBody>
                                    <Table
                                      tableHead={[
                                        <strong>Name</strong>,
                                        <strong>Date</strong>,
                                        <strong>Uploaded By</strong>,
                                        ""
                                      ]}
                                      fixedHeader={true}
                                      tableHeaderStyle={{
                                        borderRight: "40px solid transparent"
                                      }}
                                      tableData={this.state.tableData}
                                      customHeadCellClasses={[
                                        classes.description,
                                        classes.description,
                                        classes.description,
                                        classes.left,
                                        classes.left,
                                        classes.left
                                      ]}
                                      customHeadClassesForCells={[
                                        0,
                                        2,
                                        3,
                                        4,
                                        5,
                                        6
                                      ]}
                                      customCellClasses={[
                                        classes.customFont,
                                        classes.customFont,
                                        classes.customFont,
                                        classes.tdNumber,
                                        classes.tdNumber +
                                        " " +
                                        classes.tdNumberAndButtonGroup,
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
                      )}
                  </GridContainer>
                  <br />
                </CardBody>
              </Card>
            </GridItem>

          )}
        </GridContainer>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.proDetails.name,
    summary: state.proDetails.projectSummary,
    challenge: state.proDetails.projectChallenge,
    solution: state.proDetails.projectSolution,
    justification: state.proDetails.projectJustification,

    suppliesNeeded: state.proDetails.suppliesNeeded,
    budgetDetails: state.proDetails.budgetDetails,
    
    sendNotes: state.proDetails.sendNotes,
    updates: state.proDetails.updates,
    totalPages:state.proDetails.totalPages,
    zipCode: state.proDetails.zipCode,
    freelancers: state.proDetails.freelancers,
    volunteers: state.proDetails.volunteers,
    startDate: state.proDetails.startDate,
    status: state.proDetails.status,
    endDate: state.proDetails.endDate,
    budget: state.proDetails.budget,
    toast: state.proDetails.toast,
    projectCreatedByDetails: state.proDetails.projectCreatedByDetails,
    id: state.proDetails.id,
    country: state.proDetails.country,
    interests: state.proDetails.interests,
    createdBy: state.proDetails.createdBy,
    projectAttachments: state.proDetails.projectAttachments,
    text: state.proDetails.text,
    projectLinks: state.proDetails.projectLinks,
    files: state.proDetails.files,
    isLoggedIn: state.auth.isLoggedIn,
    interestOptions: state.common.interestOptions,
    requestCompleted: state.start.requestCompleted,
    userId: state.auth.userId,
    acceptedFreelancers: state.proDetails.acceptedFreelancers,
    acceptedVolunteers: state.proDetails.acceptedVolunteers
  }
}

export default connect(
  mapStateToProps,
  {
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
    clearFiles,
    setProjectDefaultImage,
    projectUpdatesChanged,
    createProjectUpdates,
    deleteProjectUpdates,
    getProjectUpdates,
    
  }
)(withStyles(style)(ProjectDetails));
