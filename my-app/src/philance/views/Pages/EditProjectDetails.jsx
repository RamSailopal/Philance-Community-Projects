import React from "react";
import PropTypes from "prop-types";
import Datetime from "react-datetime";
import queryString from "query-string";

// @material-ui/icons
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Assignment from "@material-ui/icons/Assignment";
import CardIcon from "components/Card/CardIcon.jsx";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { uploadFiles, uploadLinks } from "../../actions/startProject";
import withStyles from "@material-ui/core/styles/withStyles";
import mimetypes from '../../../mimetypes'
import {
    budgetChanged,
    descriptionChanged,
    projectSummaryChanged,
    projectChallengeChanged,
    projectSolutionChanged,
    projectJustificationChange,
    budgetDetailsChange,
    projectSuppliesNeededChange,
    endDateChanged,
    freelancersChanged,
    projectNameChanged,
    startDateChanged,
    volunteersChanged,
    zipCodeChanged,
    cityChanged,
    statusChanged,
    removeToaster,
    countryChanged,
    updateProject,
    deleteProjectAttachment,
    getProjectById,
    filesChanged,
    clearFiles,
    setProjectDefaultImage,
    projectUpdatesChanged,
    createProjectUpdates,
    getProjectUpdates,
    interestsChanged,
    editProjectUnmount
} from "../../actions/projectDetails";
import { imagesFilesChanged, documentsFilesChanged, editUploadLinks } from "../../actions/projectDetails";
import { PROJECT_DETAILS_UPDATE_SUCESS } from "../../actions/types";
import store from "../../store/store";
import Loader from "../../components/Loader/Loader";
import { hostname } from "../../../config";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Delete from "@material-ui/icons/Delete";

// @material-ui/icons

// styles for buttons on sweetalert
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// import notificationsStyle from "../../../assets/jss/";
import notificationsStyle from "../../../assets/jss/material-dashboard-pro-react/views/notificationsStyle.jsx";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import EditProjectDetailsStyle from "philance/views/PageStyles/StartProjectPageStyles";
import Toaster from "../../components/Toaster/Toaster";
import bgImag from "philance/assets/img/VolunteerProject2.jpg";
import imageIcon from "philance/assets/img/backgroundImage.svg";
import { connect } from "react-redux";
import { Label, Icon, Form, Input, TextArea, Popup } from "semantic-ui-react";
import { Radio, Popconfirm, Popover, notification, Modal } from 'antd';
import {
    InterestsDropdown,
    CountryDropdown
} from "../../components/DoubleDropdown";
import { PROJECT_DETAILS_EDIT_REQUEST_SUCCESS } from "../../actions/types.js";
import { getCommonInfo } from "../../actions/common";
import { timingSafeEqual } from "crypto";
import SweetAlert from "react-bootstrap-sweetalert";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
const confirm = Modal.confirm;
const style = {
    ...EditProjectDetailsStyle,
    ...sweetAlertStyle,
    inputLabelStart: { marginBottom: 5, marginTop: 15, color: "black" }
};
var data = [];
const uid = Math.random()

    .toString(36)
    .substring(7);
function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class EditProjectDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisabled: true,
            sendNotes: "",
            interests: [],
            loader: false,
            files: [],
            data: [],
            tableData: [],
            theme: "snow",
            notes: "",
            isOpen: "false",
            invalidName: false,
            invalidBudget: false,
            invalidZipCode: false,
            invalidCity: false,
            invalidDescription: false,
            invalidDropdown: false,
            invalidInterests: false,
            invalidCountry: false,
            invalidStartDate: false,
            invalidEndDate: false,
            invalidVolunteers: false,
            invalidFreelancers: false,
            invalidChallenge: false,
            invalidSummary: false,
            invalidSolution: false,
            invalidBudgetDetails: false,
            invalidJustification: false,
            imagesFiles: [],
            documentsFiles: [],
            defualtImage: '',
            videoLinks: [
                {
                    projectId: this.props.id,
                    attachmentPath: "",
                    attachmentType: "videoLink",
                    attachmentDetails: "",
                    userId: this.props.userId,
                }
            ],
            projectLinks: [
                {
                    projectId: this.props.id,
                    attachmentPath: "",
                    attachmentType: "projectLink",
                    attachmentDetails: "",
                    userId: this.props.userId,
                },
                {
                    projectId: this.props.id,
                    attachmentPath: "",
                    attachmentType: "projectLink",
                    attachmentDetails: "",
                    userId: this.props.userId,
                },
                {
                    projectId: this.props.id,
                    attachmentPath: "",
                    attachmentType: "projectLink",
                    attachmentDetails: "",
                    userId: this.props.userId,
                }
            ],
        };
    }

    componentWillUnmount() {
        this.props.editProjectUnmount();
    }
    componentWillMount() {
        this.props.getProjectUpdates(
            queryString.parse(this.props.location.search).p
        );
        this.props.getProjectById(
            { id: queryString.parse(this.props.location.search).p },
            () => {
                if (this.props.projectLinks.filter(videoLink => { return videoLink.attachmentType == 'videoLink' }).length > 0) {
                    this.setState({
                        videoLinks: this.props.projectLinks.filter(videoLink => { return videoLink.attachmentType == 'videoLink' }),
                    })
                }
                if (this.props.projectLinks.filter(projectLink => { return projectLink.attachmentType == 'projectLink' }).length > 0) {
                    this.setState({
                        projectLinks: this.props.projectLinks.filter(projectLink => { return projectLink.attachmentType == 'projectLink' }),
                    })
                }
            }
        );
    }

    onSubmit() {
        const {
            name,
            description,
            status,
            volunteers,
            freelancers,
            zipCode,
            country,
            interests,
            startDate,
            endDate,
            budget,
            userId,
            imagesFiles,
            documentsFiles,
            summary,
            challenge,
            solution,
            justification,
            id,
            budgetDetails,
            suppliesNeeded,
            city
        } = this.props;
        if (
            this.props.name === "" ||
            this.props.summary === "" ||
            this.props.challenge === "" ||
            this.props.solution === "" ||
            this.props.justification === "" ||
            this.props.interests === "" ||
            this.props.country === "" ||
            this.props.startDate === "" ||
            this.props.endDate === "" ||
            this.props.budget === "" ||
            this.props.zipCode === "" ||
            this.props.city === "" ||
            ((this.props.volunteers === ""
                ? 0
                : parseInt(this.props.volunteers)) < 1 &&
                (this.props.freeLancers === ""
                    ? 0
                    : parseInt(this.props.freelancers)) < 1) ||
            !this.props.volunteers.match("^[0-9]{1,3}$") ||
            !this.props.freelancers.match("^[0-9]{1,3}$") ||
            !this.props.budget.match("[0-9]+(\.[0-9][0-9]?)?") ||
            this.props.startDate > this.props.endDate
        ) {
            if (this.props.name === "") {
                this.setState({ invalidName: true });
            }
            if (this.props.summary === "") {
                this.setState({ invalidSummary: true });
            }
            if (this.props.challenge === "") {
                this.setState({ invalidChallenge: true });
            }
            if (this.props.city === "") {
                this.setState({ invalidCity: true });
            }
            if (this.props.budgetdetails === "") {
                this.setState({ invalidBudgetDetails: true });
            }
            if (this.props.solution === "") {
                this.setState({ invalidSolution: true });
            }
            if (this.props.justification === "") {
                this.setState({ invalidJustification: true });
            }
            if (this.props.interests === "") {
                this.setState({ invalidInterests: true });
            }
            if (this.props.country === "") {
                this.setState({ invalidCountry: true });
            }
            if (this.props.startDate === "") {
                this.setState({ invalidStartDate: true });
            }
            if (this.props.endDate === "") {
                this.setState({ invalidEndDate: true });
            }
            if (this.props.budget === "") {
                this.setState({ invalidBudget: true });
            }
            if (this.props.zipCode === "") {
                this.setState({ invalidZipCode: true });
            }
            if (this.props.city === "") {
                this.setState({ invalidCity: true });
            }
            if (parseInt(this.props.volunteers) < 1) {
                this.setState({ invalidVolunteers: true });
            }
            if (
                !this.props.volunteers.match("^[0-9]{1,3}$")
            ) {
                this.setState({ invalidVolunteers: true });
            }
            if (parseInt(this.props.freelancers) < 1) {
                this.setState({ invalidFreelancers: true });
            }
            if (
                !this.props.freelancers.match("^[0-9]{1,3}$")
            ) {
                this.setState({ invalidFreelancers: true });
            }
            if (
                !this.props.budget.match("[0-9]+(\.[0-9][0-9]?)?")
            ) {
                this.setState({ invalidBudget: true });
            }
            if (this.props.startDate > this.props.endDate) {
                this.setState({ validstartDate: true });
                this.setState({ validstartDate: true });
            }
        }
        else {
            this.toggleLoader(true);
            this.setState(
                { isDisabled: true },
                () => {
                    // this.updateTable();
                }
            );
            this.props.updateProject(
                {
                    name,
                    status,
                    zipCode,
                    country,
                    interests,
                    summary,
                    volunteers,
                    freelancers,
                    budget,
                    startDate,
                    endDate,
                    id,
                    userId,
                    challenge,
                    solution,
                    justification,
                    budgetDetails,
                    city,
                    suppliesNeeded,
                },
                flag => {
                    this.props.uploadFiles(
                        {
                            uploadType: "editProjectFiles",
                            attachmentType: "image",
                            userInfo: {
                                userId: this.props.userId,
                                projectId: this.props.id
                            }
                        },
                        imagesFiles,
                        () => {

                            notification.info({
                                message: 'Image files upload done, now uploading documents files',
                                duration: 5
                            });
                            this.props.uploadFiles(
                                {
                                    uploadType: "startProjectFiles",
                                    attachmentType: "document",
                                    userInfo: {
                                        userId: this.props.userId,
                                        projectId: this.props.id
                                    }
                                },
                                documentsFiles,
                                () => {
                                    this.toggleLoader(false);
                                    notification.info({
                                        message: 'Documents files upload done, now uploading Links',
                                        duration: 5
                                    });

                                    this.props.editUploadLinks(
                                        [
                                            ...this.state.videoLinks,
                                            ...this.state.projectLinks
                                        ],
                                        this.props.id,
                                        () => {
                                            this.toggleLoader(false);
                                            store.dispatch({
                                                type: PROJECT_DETAILS_EDIT_REQUEST_SUCCESS
                                            });
                                            setTimeout(() => {
                                                store.dispatch({
                                                    type: PROJECT_DETAILS_UPDATE_SUCESS
                                                });
                                                notification.success({
                                                    message: ' Project Updated Successfully',
                                                    duration: 4
                                                });
                                                this.autoCloseAlert(
                                                    "Project Updated Successfully"
                                                );
                                                this.props.history.push(`/home/project-details/info?p=${this.props.id}`)
                                            }, 2000);
                                        }
                                    );
                                }
                            );
                        }
                    );
                },
                flag2 => {
                    this.toggleLoader(false);
                }
            );
        }
    }

    async onProjectImagesInputChange(files) {
        const { classes } = this.props;
        this.setState({
            invalidImageFiles: false
        }, () => {
            Array.from(files).map(file => {
                if (
                    !mimetypes.imageTypes.includes(file.type)
                ) {
                    return this.setState({
                        invalidImageFiles: true,
                        invalidImageFilesMessage: "Invalid file Types"
                    })
                }
            })
        })

        if (files.length == 0) {
            data = [];
        }
        var a = [];
        await this.props.imagesFilesChanged(files, async () => {
            (await files)
                ? Array.from(this.props.imagesFiles).map((value, key) => {
                    if (Array.from(files)[key]) {
                        if (this.props.imagesFiles[key].size < 16777216) {
                            a = [
                                <span className={classes.customFont}>
                                    {this.props.imagesFiles[key].name}
                                </span>,
                                <Button
                                    simple
                                    justIcon
                                    color="info"
                                    onClick={() => {
                                        //call delete action
                                        this.fileSplicer(this.props.imagesFiles, key, 'image');
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
                                    this.fileSplicer(this.props.imagesFiles, key, 'image');
                                }.bind(this),
                                5000
                            );
                        }
                    }
                })
                : null;
        });
        await this.setState({
            imagesFiles: data
        });
        data = [];
    }


    async onProjectDocumentsInputChange(files) {
        const { classes } = this.props;

        if (files.length == 0) {
            data = [];
        }
        var a = [];
        await this.props.documentsFilesChanged(files, async () => {
            (await files)
                ? Array.from(this.props.documentsFiles).map((value, key) => {
                    if (Array.from(files)[key]) {
                        if (this.props.documentsFiles[key].size < 16777216) {
                            a = [
                                <span className={classes.customFont}>
                                    {this.props.documentsFiles[key].name}
                                </span>,
                                <Button
                                    simple
                                    justIcon
                                    color="info"
                                    onClick={() => {
                                        //call delete action
                                        this.fileSplicer(this.props.documentsFiles, key, 'document');
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
                                    this.fileSplicer(this.props.documentsFiles, key, 'document');
                                }.bind(this),
                                5000
                            );
                        }
                    }
                })
                : null;
        });
        await this.setState({
            documentsFiles: data
        });
        data = [];
    }
    validate = async value => {

        switch (value) {
            case "Resource": {
                return this.setState({
                    invalidResource: true
                });
            }

            case "ProjectName": {
                return this.setState({
                    invalidName: true
                });
            }
            case "summary": {
                return this.setState({
                    invalidSummary: true
                });
            }

            case "challenge": {
                return this.setState({
                    invalidChallenge: true
                });
            }
            case "solution": {
                return this.setState({
                    invalidSolution: true
                });
            }
            case "startDate": {
                return this.setState({
                    invalidStartDate: true
                });
            }
            case "Budget": {
                return this.setState({
                    invalidBudget: true
                });
            }
            case "budgetDetails": {
                return this.setState({
                    invalidBudgetDetails: true
                });
            }

            case "justification": {
                return this.setState({
                    invalidJustification: true
                });
            }
            case "Zipcode": {
                return this.setState({
                    invalidZipCode: true
                });
            }
            case "City": {
                return this.setState({
                    invalidCity: true
                });
            }
            case "endDate": {
                return this.setState({
                    invalidEndDate: true
                });
            }
            case "Volunteers": {
                return this.setState({
                    invalidVolunteers: true
                });
            }
            case "Freelancers": {
                return this.setState({
                    invalidFreelancers: true
                });
            }
        }
    };

    onProjectNameChange = text => {
        if (text === "") {
            this.validate("ProjectName");
            this.props.projectNameChanged(text);
        }
        else {
            this.setState({ invalidName: false });
            this.props.projectNameChanged(text);
            //this.props.textChanged();
        }
    };
    statusChangeConfirm = text => {
        confirm({
            title: 'Please Confirm Status Change',
            content: 'Click the OK button to change status of project',
            onOk() {
                store.dispatch(statusChanged(text));
                ///this.props.statusChanged(text);
            },
            onCancel() { },
        });
    }
    onStatusChange(text) {
        this.props.statusChanged(text);
    }
    onDescriptionChange = async text => {
        if (text === "") {
            this.validate("Description");
            this.props.descriptionChanged(text);
        } else {
            await this.setState({ invalidDescription: false });
            this.props.descriptionChanged(text);

        }
    };

    onBudgetChange = async text => {

        if (text === "" || !text.match("[0-9]+(\.[0-9][0-9]?)?")) {
            this.validate("Budget");
            this.props.budgetChanged(text);
        } else {

            await this.setState({ invalidBudget: false });
            this.props.budgetChanged(text);
        }
    };
    onEndDateChange = async text => {
        const { startDate } = this.props;
        if (text === undefined) {
            this.validate("startDate");
            this.props.endDateChanged(text);
        } else if (text < this.props.startDate) {
            this.validate("endDate");
            this.props.endDateChanged(text);
        } else {
            await this.setState({ invalidEndDate: false });
            this.props.endDateChanged(text);

        }
    };
    onDescriptionChange(text) {
        this.props.descriptionChanged(text);

    }

    onFreeLancersChange = async text => {
        if (
            parseInt(this.props.volunteers) + parseInt(text) < 1 ||
            parseInt(this.props.volunteers) === NaN ||
            parseInt(text) == NaN
        ) {
            this.validate("Resource");
            this.props.freelancersChanged(text);

        } else if (
            !text.match("^[0-9]{1,3}$") &&
            !this.props.volunteers.match("^[0-9]{1,3}$")
        ) {
            this.validate("Freelancers");
            this.props.freelancersChanged(text);

        } else {
            await this.setState({ invalidResource: false });
            this.props.freelancersChanged(text);

        }
    };

    onStartDateChange = async text => {
        if (text === undefined) {
            this.validate("startDate");
            this.props.startDateChanged(text);
        } else {
            await this.setState({ invalidStartDate: false });
            this.props.startDateChanged(text);

        }
    };
    onVolunteersChange = async text => {
        if (
            parseInt(this.props.freeLancers) + parseInt(text) < 1 ||
            parseInt(this.props.freeLancers) === NaN ||
            parseInt(text) == NaN
        ) {
            this.validate("Resource");
            this.props.volunteersChanged(text);

        } else if (
            !text.match("^[0-9]{1,3}$") &&
            !this.props.freelancers.match("^[0-9]{1,3}$")
        ) {
            this.validate("Volunteers");
            this.props.volunteersChanged(text);

        } else {
            await this.setState({ invalidResource: false });
            this.props.volunteersChanged(text);

        }
    };
    onZipCodeChange = async text => {
        if (text === "") {
            this.validate("Zipcode");
            this.props.zipCodeChanged(text);
        } else {
            await this.setState({ invalidZipCode: false });
            this.props.zipCodeChanged(text);

        }
    };

    onCityChange = async text => {
        if (text === "") {
            this.validate("City");
            this.props.cityChanged(text);
        } else {
            await this.setState({ invalidCity: false });
            this.props.cityChanged(text)

        }
    };

    onProjectSummaryChange = async text => {
        if (text === "") {
            this.validate("summary");
            this.props.projectSummaryChanged(text);
        } else {
            await this.setState({ invalidSummary: false });
            this.props.projectSummaryChanged(text);

        }
    };

    onBudgetDetailsChange = async text => {
        if (text === "") {
            this.validate("budgetDetails");
            this.props.budgetDetailsChange(text);
        } else {
            await this.setState({ invalidBudgetDetails: false });
            this.props.budgetDetailsChange(text);

        }
    };

    onProjectSuppliesNeededChange = async text => {
        if (text === "") {
            this.validate("supplies");
            this.props.projectSuppliesNeededChange(text);
        } else {
            this.props.projectSuppliesNeededChange(text);

        }
    };

    onProjectChallengeChange = async text => {
        if (text === "") {
            this.validate("challenge");
            this.props.projectChallengeChanged(text);
        } else {
            await this.setState({ invalidChallenge: false });
            this.props.projectChallengeChanged(text);

        }
    };

    onProjectSolutionChange = async text => {
        if (text === "") {
            this.validate("solution");
            this.props.projectSolutionChanged(text);
        } else {
            await this.setState({ invalidSolution: false });
            this.props.projectSolutionChanged(text);
        }
    };

    onProjectJustificationChange = async text => {
        if (text === "") {
            this.validate("justification");
            this.props.projectJustificationChange(text);
        } else {
            await this.setState({ invalidJustification: false });
            this.props.projectJustificationChange(text);
        }
    };

    onCountryChanged = async text => {
        if (text === "") {
            this.validate("Country");
            store.dispatch(countryChanged(text));
        } else {
            await this.setState({ invalidCountry: false });
            store.dispatch(countryChanged(text));
        }
    };
    fileSplicer = async (files, key, fileType) => {
        var a = [];
        await Array.from(files).map((value, index) => {
            if (index != key) {
                a.push(value);
            }
        });
        switch (fileType) {
            case 'image': {
                return this.onProjectImagesInputChange(a);
            }
            case 'document': {
                return this.onProjectDocumentsInputChange(a);
            }
            default: {
                return null
            }
        }
    };
    // fileSplicer = async (files, key) => {
    //     var a = [];
    //     await Array.from(files).map((value, index) => {
    //         if (index != key) {
    //             a.push(value);
    //         }
    //     });
    //     this.onFilesChange(a);
    // };
    handleImageUploadTriggerClick() {
        this.refs.imageFileInput.click();
    }
    handleDocumentsUploadTriggerClick() {
        this.refs.documentFileInput.click();
    }

    toggleLoader = async flag => {
        await this.setState({
            loader: flag
        });
    };
    handleClickOpen(modal) {
        var x = [];
        x[modal] = true;
        this.setState(x);
    }

    handleClose(modal) {
        var x = [];
        x[modal] = false;
        this.props.history.push("/login");
        this.setState(x);
    }
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
                        marginBottom: "50px",
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
                        {this.props.isLoggedIn ? null : (
                            <h2>
                                <font
                                    color="white"
                                    face="verdana"
                                    className={classes.fontClass1}
                                >
                                    Start A Project
                                </font>
                            </h2>
                        )}
                    </div>
                </div>

                <GridContainer
                    className={
                        this.props.isLoggedIn
                            ? classes.justifyContentCenter
                            : classes.container
                    }
                >
                    {this.props.requestCompleted ? (
                        <Toaster
                            display={this.props.requestCompleted}
                            message={"Project has been created"}
                        />
                    ) : null}
                    <Loader loader={this.state.loader} />
                    <GridItem xs={12} sm={12} md={10}>
                        <Card>
                            <CardHeader color="info" text>
                                <CardText color="info">
                                    <h4>Edit your project here and Save</h4>
                                </CardText>
                            </CardHeader>
                            <CardBody>
                                <form>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6}>
                                            <br />
                                            <br />
                                            <Label
                                                className={classes.label}
                                                style={{ marginTop: 0 }}
                                                color="orange"
                                                ribbon
                                            >
                                                <div style={{ textAlign: "center" }}>
                                                    <h4> Basic Details</h4>
                                                </div>
                                            </Label>
                                        </GridItem>
                                    </GridContainer>
                                    <br />
                                    <GridContainer>
                                        <div ref={this.myRef} />
                                        <GridItem xs={12} sm={8}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Project Name
                                            </InputLabel>
                                            <Input
                                                onBlur={() => {
                                                    if (this.props.name === "") {
                                                        this.validate("ProjectName");
                                                    }
                                                }}
                                                value={this.props.name}
                                                style={{ width: "100%" }}
                                                maxLength={140}
                                                placeholder="Enter a Project Name"
                                                onChange={async e => {
                                                    await this.onProjectNameChange(e.target.value);
                                                }}
                                                error={this.state.invalidName}
                                            />
                                            {this.state.invalidName ? (
                                                <Label basic style={{ color: "red" }} pointing>
                                                    Please enter a project name
                                                </Label>
                                            ) : null}
                                        </GridItem>
                                        <GridItem xs={12} sm={4}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Project Status
                                            </InputLabel>
                                            <Radio.Group value={this.props.status} buttonStyle="solid" style={{ width: '100%', display: 'flex' }} onChange={(e) => {
                                                this.statusChangeConfirm(e.target.value);
                                            }}>
                                                <Radio.Button style={{ width: '100%', textAlign: 'center' }} value="ACTIVE">Active</Radio.Button>
                                                <Radio.Button style={{ width: '100%', textAlign: 'center' }} value="CLOSED">Closed</Radio.Button>
                                            </Radio.Group>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Project Summary
                                            </InputLabel>
                                            <Form>
                                                <TextArea
                                                    maxLength={1000}
                                                    value={this.props.summary}
                                                    style={{ width: "100%" }}
                                                    placeholder="Give an overview of what the project is about..."
                                                    onChange={e => {
                                                        this.onProjectSummaryChange(e.target.value);
                                                    }}
                                                    onBlur={() => {
                                                        if (this.props.summary === "") {
                                                            this.validate("projectSummary");
                                                        }
                                                    }}
                                                    error={this.state.invalidSummary}
                                                    autoHeight
                                                    rows="2"
                                                />
                                            </Form>
                                            {this.state.invalidSummary ? (
                                                <Label basic style={{ color: "red" }} pointing>
                                                    Please enter project Summary
                                                </Label>
                                            ) : null}
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Project Challenge
                                            </InputLabel>
                                            <Form>
                                                <TextArea
                                                    maxLength={1000}
                                                    value={this.props.challenge}
                                                    style={{ width: "100%" }}
                                                    placeholder="Describe the problem that you ae trying to address..."
                                                    onChange={e => {
                                                        this.onProjectChallengeChange(e.target.value);
                                                    }}
                                                    autoHeight
                                                    rows="2"
                                                    error={this.state.invalidChallenge}
                                                />
                                                {this.state.invalidChallenge ? (
                                                    <Label basic style={{ color: "red" }} pointing>
                                                        Please enter project Challenge
                                                    </Label>
                                                ) : null}
                                            </Form>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Project Solution
                                            </InputLabel>
                                            <Form>
                                                <TextArea
                                                    maxLength={1000}
                                                    value={this.props.solution}
                                                    style={{ width: "100%" }}
                                                    placeholder="Describe your proposed solution to the above challenge..."
                                                    onChange={e => {
                                                        this.onProjectSolutionChange(e.target.value);
                                                    }}
                                                    error={this.state.invalidSolution}
                                                    autoHeight
                                                    rows="2"
                                                />
                                                {this.state.invalidSolution ? (
                                                    <Label basic style={{ color: "red" }} pointing>
                                                        Please enter project Solution
                                                    </Label>
                                                ) : null}
                                            </Form>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Project Justification / Impact
                                            </InputLabel>
                                            <Form>
                                                <TextArea
                                                    maxLength={1000}
                                                    style={{ width: "100%" }}
                                                    value={this.props.justification}
                                                    placeholder="Describe why the project is justified, who will benefit from it and what benefits they will receive..."
                                                    onChange={e => {
                                                        this.onProjectJustificationChange(e.target.value);
                                                    }}
                                                    error={this.state.invalidJustification}
                                                    autoHeight
                                                    rows="2"
                                                />
                                                {this.state.invalidJustification ? (
                                                    <Label basic style={{ color: "red" }} pointing>
                                                        Please enter project Justification
                                                    </Label>
                                                ) : null}
                                            </Form>
                                        </GridItem>
                                    </GridContainer>

                                    <GridContainer>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Country
                                            </InputLabel>
                                            <CountryDropdown
                                                onCountryChanged={this.onCountryChanged}
                                                defaultValue={this.props.country}
                                                action={this.state.invalidCountry}
                                            />
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Project Zip Code
                          </InputLabel>
                                            <Input
                                                style={{ width: "100%" }}
                                                value={this.props.zipCode}
                                                placeholder="Enter zip code of location where project is taking place"
                                                onChange={e => {
                                                    this.onZipCodeChange(e.target.value);
                                                }}
                                                error={this.state.invalidZipCode}
                                            />
                                            {this.state.invalidZipCode ? (
                                                <Label basic style={{ color: "red" }} pointing>
                                                    Please enter the zip code
                            </Label>
                                            ) : null}
                                        </GridItem>
                                        <GridItem xs={12} sm={4} md={4}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Project City
                          </InputLabel>
                                            <Input
                                                style={{ width: "100%" }}
                                                value={this.props.city}
                                                placeholder="Enter the project city"
                                                onChange={e => {
                                                    this.onCityChange(e.target.value);
                                                }}
                                                error={this.state.invalidCity}
                                            />
                                            {this.state.invalidCity ? (
                                                <Label basic style={{ color: "red" }} pointing>
                                                    Please enter the city
                            </Label>
                                            ) : null}
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Impact Category
                                            </InputLabel>
                                            <InterestsDropdown
                                                onInterestsChange={async (e, { value }) => {
                                                    await this.setState({ value: value });
                                                    if (this.state.value === []) {
                                                        await this.setState({
                                                            invalidInterests: true
                                                        });
                                                        this.props.interestsChanged(value)
                                                        // store.dispatch(interestschanged(value));
                                                    } else {
                                                        await this.setState({ invalidInterests: false });
                                                        this.props.interestsChanged(value)
                                                        // store.dispatch(interestschanged(value));
                                                    }
                                                }}
                                                interestOptions={this.props.interestOptions}
                                                action={this.state.invalidInterests}
                                                defaultValue={
                                                    this.props.interests ? this.props.interests : null
                                                }
                                            />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6}>

                                            <Label
                                                className={classes.label}
                                                style={{ marginTop: 35 }}
                                                color="violet"
                                                ribbon
                                            >
                                                <div style={{ textAlign: "center" }}>
                                                    <h4> Budget Details</h4>
                                                </div>
                                            </Label>
                                        </GridItem>
                                    </GridContainer>
                                    <br />
                                    <GridContainer>
                                        <GridItem
                                            xs={12}
                                            sm={6}
                                            md={6}
                                            lg={12}
                                            style={{ width: "100%" }}
                                        >
                                            <InputLabel
                                                className={classes.label}
                                                style={{ marginBottom: 2, color: "black" }}
                                            >
                                                Budget
                          </InputLabel>
                                            <br />
                                            <Input
                                                labelPosition="left"
                                                type="number"
                                                placeholder="Amount"
                                                onChange={e => {
                                                    this.onBudgetChange(e.target.value);
                                                }}
                                                error={this.state.invalidBudget}
                                                value={this.props.budget}
                                            >
                                                <Label>$</Label>
                                                <input />
                                            </Input>
                                        </GridItem>
                                        <GridItem
                                            xs={12}
                                            sm={6}
                                            md={6}
                                            lg={12}
                                            style={{ width: "100%" }}
                                        >
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Budget details
                          </InputLabel>
                                            <Form>
                                                <TextArea
                                                    maxLength={1000}
                                                    value={this.props.budgetDetails}
                                                    style={{ width: "100%" }}
                                                    placeholder="You can give a breakdown of how the money will be spent"
                                                    onChange={e => {
                                                        this.onBudgetDetailsChange(e.target.value);
                                                    }}
                                                    error={this.state.invalidBudgetDetails}
                                                    autoHeight
                                                    rows="2"
                                                />
                                                {this.state.invalidBudgetDetails ? (
                                                    <Label basic style={{ color: "red" }} pointing>
                                                        Please enter the budgetDetails
                                                    </Label>
                                                ) : null}
                                            </Form>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6}>
                                            <br />
                                            <br />
                                            <Label
                                                className={classes.label}
                                                style={{ marginTop: 0 }}
                                                color="red"
                                                ribbon
                                            >
                                                {/* <img src={resource} height='30px' /> */}
                                                <div style={{ textAlign: "center" }}>
                                                    <h4> Resources Needed</h4>
                                                </div>
                                            </Label>
                                        </GridItem>
                                    </GridContainer>
                                    <br />
                                    <GridContainer>
                                        <GridItem xs={4} sm={4} md={2}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Volunteers (Unpaid)
                                            </InputLabel>
                                        </GridItem>
                                        <GridItem xs={4} sm={4} md={4}>
                                            <div style={{ whiteSpace: "nowrap", paddingTop: '7px', width: "100%" }}>
                                                <Input
                                                    style={{ width: "100%" }}
                                                    placeholder="Enter Number of Volunteers"
                                                    defaultValue={this.props.volunteers}
                                                    onChange={e => {
                                                        this.onVolunteersChange(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={4} sm={4} md={2}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Freelancers (Paid)
                                           </InputLabel>
                                        </GridItem>
                                        <GridItem xs={4} sm={4} md={4}>
                                            <div style={{ whiteSpace: "nowrap", paddingTop: '7px', width: "100%" }}>
                                                <Input
                                                    style={{ width: "100%" }}
                                                    placeholder="Enter Number of Freelancers"
                                                    defaultValue={this.props.freelancers}
                                                    onChange={e => {
                                                        this.onFreeLancersChange(e.target.value);
                                                    }}
                                                />
                                                {this.state.invalidResource ? (
                                                    <Label basic style={{ color: "red" }} pointing="left">
                                                        Please Enter Some resources
                                                    </Label>
                                                ) : null}
                                            </div>
                                        </GridItem>
                                    </GridContainer>
                                    <br />
                                    <GridContainer>
                                        <GridItem xs={12} sm={12}>
                                            <InputLabel
                                                className={
                                                    classes.label + " " + classes.inputLabelStart
                                                }
                                            >
                                                Project Supplies Needed
                                            </InputLabel>
                                            <Form>
                                                <TextArea
                                                    maxLength={1000}
                                                    style={{ width: "100%" }}
                                                    value={this.props.suppliesNeeded}
                                                    placeholder="Please enter supplies needed..."
                                                    onChange={e => {
                                                        this.onProjectSuppliesNeededChange(e.target.value);
                                                    }}
                                                    autoHeight
                                                    rows="2"
                                                />
                                            </Form>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem
                                            xs={12}
                                            sm={4}
                                            md={4}
                                            style={{ marginTop: "30px" }}
                                        >
                                            {/* <Card>
                            <CardBody> */}
                                            {this.state.invalidStartDate ? (
                                                <InputLabel className={classes.label}>
                                                    <span style={{ color: "red" }}>
                                                        Project Start Date
                                                    </span>
                                                </InputLabel>
                                            ) : (
                                                    <InputLabel className={classes.label}>
                                                        <span style={{ color: "black" }}>
                                                            Project Start Date
                                                        </span>
                                                    </InputLabel>
                                                )}
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
                                            {/* </CardBody>
                          </Card> */}
                                        </GridItem>
                                        <GridItem
                                            xs={12}
                                            sm={4}
                                            md={4}
                                            style={{ marginTop: "30px" }}
                                        >
                                            {/* <Card>
                            <CardHeader color="info" icon>
                            </CardHeader>
                            <CardBody> */}
                                            {this.state.invalidEndDate ? (
                                                <InputLabel className={classes.label}>
                                                    <span style={{ color: "red" }}>
                                                        Project End Date (Estimated)
                              </span>
                                                </InputLabel>
                                            ) : (
                                                    <InputLabel className={classes.label}>
                                                        <span style={{ color: "black" }}>
                                                            Project End Date (Estimated)
                              </span>
                                                    </InputLabel>
                                                )}
                                            <br />
                                            <FormControl fullWidth>
                                                <GridContainer>
                                                    <GridItem xs={9}>
                                                        <Datetime
                                                            style={{ "z-index": "999 !important" }}
                                                            timeFormat={false}
                                                            onChange={date => this.onEndDateChange(date._d)}
                                                            isValidDate={current => {
                                                                return current.isAfter(
                                                                    Datetime.moment(
                                                                        this.props.startDate
                                                                            ? this.props.startDate
                                                                            : null
                                                                    ).subtract(1, "day")
                                                                );
                                                            }}
                                                            inputProps={{
                                                                value: new Date(
                                                                    this.props.endDate
                                                                ).toDateString(),
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
                                        <GridItem xs={12} sm={6} style={{ margin: '40px 0px' }}>
                                            <Label
                                                className={classes.label}
                                                style={{ marginTop: 0 }}
                                                color="red"
                                                ribbon
                                            >
                                                <div style={{ textAlign: "center" }}>
                                                    <h4> Media</h4>
                                                </div>
                                            </Label>
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ height: '600px', overflowY: 'scroll' }}>
                                                <CardBody className={classes.justifyContentCenter}>
                                                    <h4 className={classes.cardTitle} style={{ textAlign: 'center' }}>
                                                        Upload Project Images
                                                    </h4>
                                                    <img
                                                        className={classes.cardImgTop}
                                                        style={{
                                                            height: "180px",
                                                            width: "100%",
                                                            display: "block"
                                                        }}
                                                        src={imageIcon}
                                                        data-holder-rendered="true"
                                                    />
                                                    <label as="label" basic htmlFor={uid}>
                                                        <input
                                                            type="file"
                                                            id={uid}
                                                            accept={mimetypes.image}
                                                            ref="imageFileInput"
                                                            multiple
                                                            style={{ display: "none" }}
                                                            name="files"
                                                            onChange={e =>
                                                                this.onProjectImagesInputChange(e.target.files)
                                                            }
                                                        />
                                                    </label>
                                                    <GridContainer>
                                                        <GridItem
                                                            xs={12}
                                                            sm={12}
                                                            className={classes.justifyContentCenter}
                                                        >
                                                            <GridContainer
                                                                className={classes.justifyContentCenter}
                                                            >
                                                                <GridItem
                                                                    className={classes.justifyContentCenter}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            width: "100%",
                                                                            textAlign: "center"
                                                                        }}
                                                                    >
                                                                        <Button
                                                                            round
                                                                            color="info"
                                                                            onClick={() =>
                                                                                this.handleImageUploadTriggerClick()
                                                                            }
                                                                        >
                                                                            Select Files{"\t\t\t"}
                                                                        </Button>
                                                                    </div>
                                                                </GridItem>
                                                                <GridItem xs={12}>
                                                                    {this.props.imagesFiles.length != 0 ? (
                                                                        <Card>
                                                                            <CardBody>
                                                                                <Label
                                                                                    className={classes.label}
                                                                                    style={{ marginTop: 0 }}
                                                                                    color="blue"
                                                                                    ribbon
                                                                                >

                                                                                    <div style={{ textAlign: "center" }}>
                                                                                        <h4>New Images</h4>
                                                                                    </div>
                                                                                </Label>
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
                                                                                    tableData={this.state.imagesFiles}
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
                                                                    ) : null}
                                                                </GridItem>
                                                                <GridItem />
                                                            </GridContainer>
                                                        </GridItem>
                                                    </GridContainer>
                                                    <GridItem xs={12} sm={12}>
                                                        <br />
                                                        <br />
                                                        <Label
                                                            className={classes.label}
                                                            style={{ marginTop: 0 }}
                                                            color="blue"
                                                            ribbon
                                                        >
                                                            {/* <img src={resource} height='30px' /> */}
                                                            <div style={{ textAlign: "center" }}>
                                                                <h4>Previous Images</h4>
                                                            </div>
                                                        </Label>
                                                        <Card>
                                                            <CardHeader color="info" icon style={{ paddingBottom: '20px' }}>
                                                                <CardIcon color="info">
                                                                    <Assignment />
                                                                </CardIcon>
                                                                <h4 className={classes.cardIconTitle}>Project Attachments</h4>
                                                            </CardHeader>
                                                            <CardBody style={{ overflowY: 'scroll', height: '250px' }}>
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
                                                                        this.props.projectAttachments.filter((projectAttachment => { return projectAttachment.attachmentType == 'image' })).map((value, key) => {
                                                                            return [
                                                                                <a
                                                                                    className={classes.customFont}
                                                                                    target="_blank"
                                                                                    href={hostname() + value.attachment}
                                                                                    style={{ color: (value.originalName == this.state.defualtImage) ? 'red' : 'blue' }}
                                                                                >
                                                                                    {value.originalName}
                                                                                </a>,
                                                                                new Date(
                                                                                    value.creationDate
                                                                                ).toLocaleTimeString("en-us") +
                                                                                " " +
                                                                                new Date(
                                                                                    value.creationDate
                                                                                ).toLocaleDateString("en-us"),
                                                                                value.user.firstName +
                                                                                " " +
                                                                                value.user.lastName,
                                                                                (
                                                                                    <GridContainer>
                                                                                        <GridItem>
                                                                                            <Popover content={
                                                                                                <GridContainer divided columns="equal">
                                                                                                    <GridItem>
                                                                                                        <Button color="twitter" size="small"
                                                                                                            className={classes.title}
                                                                                                            onClick={() => {
                                                                                                                this.props.setProjectDefaultImage({
                                                                                                                    projectId: value
                                                                                                                        .projectId,
                                                                                                                    imageUri: value
                                                                                                                        .attachment
                                                                                                                });
                                                                                                                this.setState({
                                                                                                                    isOpen: false, defualtImage: value
                                                                                                                        .originalName
                                                                                                                });
                                                                                                                notification.success({
                                                                                                                    message: `${value
                                                                                                                        .originalName} has been set as defualt`,
                                                                                                                    duration: 2,
                                                                                                                })
                                                                                                            }}
                                                                                                        >
                                                                                                            set as default
                                                                                                        </Button>
                                                                                                    </GridItem>
                                                                                                    <GridItem>
                                                                                                        <Button
                                                                                                            color="danger" size="small" justIcon simple
                                                                                                            onClick={() => {
                                                                                                                //call delete
                                                                                                                this.warningWithConfirmMessage(
                                                                                                                    () => {
                                                                                                                        this.props.deleteProjectAttachment(
                                                                                                                            {
                                                                                                                                filename: value
                                                                                                                                    .attachment,
                                                                                                                                projectId: value
                                                                                                                                    .projectId
                                                                                                                            },
                                                                                                                            () => {
                                                                                                                                this.props.getProjectById(
                                                                                                                                    {
                                                                                                                                        id: value
                                                                                                                                            .projectId
                                                                                                                                    },

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
                                                                                            } trigger="hover">
                                                                                                <Button href="#" className={classes.title} color="success">
                                                                                                    Actions
                                                                                            </Button>
                                                                                            </Popover>
                                                                                        </GridItem>
                                                                                    </GridContainer>
                                                                                )
                                                                            ]
                                                                        })
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
                                                <CardFooter chart>
                                                    <div style={{ width: '100%', textAlign: "center" }}>
                                                        Allowed File Types: JPG, JPEG, or PNG / Max file
                                                        size 16MB
                                            </div>
                                                </CardFooter>
                                            </Card>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6} lg={6}>
                                            <Card style={{ height: '600px', overflowY: 'scroll' }}>
                                                <CardBody className={classes.justifyContentCenter}>
                                                    <h4 className={classes.cardTitle} style={{ textAlign: 'center' }}>
                                                        Upload Project Documents image
                                            </h4>
                                                    <img
                                                        className={classes.cardImgTop}
                                                        alt="100%x180"
                                                        style={{
                                                            height: "180px",
                                                            width: "100%",
                                                            display: "block"
                                                        }}
                                                        src={imageIcon}
                                                        data-holder-rendered="true"
                                                    />
                                                    <label as="label" basic htmlFor={uid}>
                                                        <input
                                                            type="file"
                                                            id={uid}
                                                            ref="documentFileInput"
                                                            multiple
                                                            accept={mimetypes.document}
                                                            style={{ display: "none" }}
                                                            name="files"
                                                            onChange={e =>
                                                                this.onProjectDocumentsInputChange(
                                                                    e.target.files
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                    <GridContainer>
                                                        <GridItem
                                                            xs={12}
                                                            sm={12}
                                                            className={classes.justifyContentCenter}
                                                        >
                                                            <GridContainer
                                                                className={classes.justifyContentCenter}
                                                            >
                                                                <GridItem
                                                                    className={classes.justifyContentCenter}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            width: "100%",
                                                                            textAlign: "center"
                                                                        }}
                                                                    >
                                                                        <Button
                                                                            round
                                                                            color="info"
                                                                            onClick={() =>
                                                                                this.handleDocumentsUploadTriggerClick()
                                                                            }
                                                                        >
                                                                            Select Files{"\t\t\t"}
                                                                        </Button>
                                                                    </div>
                                                                </GridItem>
                                                                <GridItem xs={12}>
                                                                    {this.props.documentsFiles.length != 0 ? (
                                                                        <Card>
                                                                            <CardBody>
                                                                                <Label
                                                                                    className={classes.label}
                                                                                    style={{ marginTop: 0 }}
                                                                                    color="blue"
                                                                                    ribbon
                                                                                >
                                                                                    {/* <img src={resource} height='30px' /> */}
                                                                                    <div style={{ textAlign: "center" }}>
                                                                                        <h4>New Documents</h4>
                                                                                    </div>
                                                                                </Label>
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
                                                                                    tableData={this.state.documentsFiles}
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
                                                                    ) : null}
                                                                </GridItem>

                                                                <GridItem xs={12} sm={12}>
                                                                    <br />
                                                                    <br />
                                                                    <Label
                                                                        className={classes.label}
                                                                        style={{ marginTop: 0 }}
                                                                        color="blue"
                                                                        ribbon
                                                                    >
                                                                        {/* <img src={resource} height='30px' /> */}
                                                                        <div style={{ textAlign: "center" }}>
                                                                            <h4>Previous Documents</h4>
                                                                        </div>
                                                                    </Label>
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
                                                                                    this.props.projectAttachments.filter((projectAttachment => { return projectAttachment.attachmentType == 'document' })).map((value, key) => {
                                                                                        return [
                                                                                            <a
                                                                                                className={classes.customFont}
                                                                                                target="_blank"
                                                                                                href={hostname() + value.attachment}
                                                                                            >
                                                                                                {value.originalName}
                                                                                            </a>,
                                                                                            new Date(
                                                                                                value.creationDate
                                                                                            ).toLocaleTimeString("en-us") +
                                                                                            " " +
                                                                                            new Date(
                                                                                                value.creationDate
                                                                                            ).toLocaleDateString("en-us"),
                                                                                            value.user.firstName +
                                                                                            " " +
                                                                                            value.user.lastName,
                                                                                            (
                                                                                                <GridContainer>
                                                                                                    <GridItem>
                                                                                                        <Button
                                                                                                            simple
                                                                                                            justIcon
                                                                                                            color="info"
                                                                                                            onClick={() => {
                                                                                                                //call delete
                                                                                                                this.warningWithConfirmMessage(
                                                                                                                    () => {
                                                                                                                        this.props.deleteProjectAttachment(
                                                                                                                            {
                                                                                                                                filename: value
                                                                                                                                    .attachment,
                                                                                                                                projectId: value
                                                                                                                                    .projectId
                                                                                                                            },
                                                                                                                            () => {
                                                                                                                                this.props.getProjectById(
                                                                                                                                    {
                                                                                                                                        id: value
                                                                                                                                            .projectId
                                                                                                                                    },

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
                                                                                            )
                                                                                        ]
                                                                                    })
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

                                                                <GridItem />
                                                            </GridContainer>
                                                        </GridItem>
                                                    </GridContainer>
                                                </CardBody>
                                                <CardFooter chart>
                                                    <div style={{ width: '100%', textAlign: "center" }}>
                                                        Allowed File Types: PDF, DOC, etc / Max file size
                                                        16MB
                                            </div>
                                                </CardFooter>
                                            </Card>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6} lg={6} style={{ height: '600px' }}>
                                            <Card style={{ height: "450px" }}>
                                                <CardBody className={classes.justifyContentCenter}>
                                                    <h4 className={classes.cardTitle} style={{ textAlign: 'center' }}>
                                                        Add Project Video Link
                                            </h4>
                                                    <img
                                                        className={classes.cardImgTop}
                                                        alt="100%x180"
                                                        style={{
                                                            height: "180px",
                                                            width: "100%",
                                                            display: "block"
                                                        }}
                                                        src={imageIcon}
                                                        data-holder-rendered="true"
                                                    />
                                                    <div style={{ padding: "19px 0" }}>
                                                        <GridContainer direction="column">

                                                            <GridItem xs={12} sm={12} md={12} lg={12}>
                                                                <GridContainer direction="row">
                                                                    <GridItem xs={12} sm={12} md={12} lg={12}>
                                                                        <Input

                                                                            style={{ width: "100%" }}
                                                                            onBlur={e => {
                                                                                try {
                                                                                    if (
                                                                                        (new URL(this.state.videoLinks[0].attachmentPath).hostname == "www.youtube.com" || new URL(this.state.videoLinks[0].attachmentPath).hostname == "youtube.com") ||
                                                                                        (new URL(this.state.videoLinks[0].attachmentPath).hostname == "www.vimeo.com" || new URL(this.state.videoLinks[0].attachmentPath).hostname == "youtube.com")
                                                                                    ) {
                                                                                        //situation to be handled on ui side
                                                                                        this.setState({
                                                                                            invalidVideoLink: false,
                                                                                        })
                                                                                    }
                                                                                    else {
                                                                                        return this.setState({
                                                                                            invalidVideoLink: true,
                                                                                            videoLinks: [
                                                                                                {
                                                                                                    projectId: this.props.id,
                                                                                                    attachmentPath: "",
                                                                                                    attachmentType: "videoLink",
                                                                                                    attachmentDetails: "",
                                                                                                    userId: this.props.userId,
                                                                                                }
                                                                                            ],
                                                                                        })
                                                                                    }
                                                                                } catch (error) {
                                                                                    return this.setState({
                                                                                        invalidVideoLink: true,
                                                                                        videoLinks: [
                                                                                            {
                                                                                                projectId: this.props.id,
                                                                                                attachmentPath: "",
                                                                                                attachmentType: "videoLink",
                                                                                                attachmentDetails: "",
                                                                                                userId: this.props.userId,
                                                                                            }
                                                                                        ],
                                                                                    })
                                                                                }
                                                                            }
                                                                            }
                                                                            value={this.state.videoLinks[0].attachmentPath}
                                                                            placeholder="Enter video link"
                                                                            onChange={e => {
                                                                                let temp = e.target.value;
                                                                                this.setState(ps => {
                                                                                    return {
                                                                                        videoLinks: [
                                                                                            {
                                                                                                ...ps.videoLinks[0],
                                                                                                attachmentPath: temp
                                                                                            },
                                                                                        ]
                                                                                    };
                                                                                });
                                                                            }}
                                                                        />
                                                                    </GridItem>
                                                                </GridContainer>
                                                            </GridItem>

                                                        </GridContainer>
                                                    </div>
                                                </CardBody>
                                                <CardFooter chart>
                                                    <div style={{ width: '100%', textAlign: "center" }}>
                                                        Add a video from Vimeo or YouTube
                                                   </div>
                                                </CardFooter>
                                            </Card>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6} lg={6} style={{ height: '600px' }}>
                                            <Card style={{ height: "450px", overflowY: 'scroll' }}>
                                                <CardBody className={classes.justifyContentCenter}>
                                                    <h4 className={classes.cardTitle} style={{ textAlign: 'center' }}>
                                                        Add External Links
                                            </h4>
                                                    <img
                                                        className={classes.cardImgTop}
                                                        alt="100%x180"
                                                        style={{
                                                            height: "180px",
                                                            width: "100%",
                                                            display: "block"
                                                        }}
                                                        src={imageIcon}
                                                        data-holder-rendered="true"
                                                    />
                                                    <div style={{ padding: "19px 0" }}>
                                                        <GridContainer direction="column" style={{ justifyContent: 'center' }}>
                                                            <Button disabled={this.state.projectLinks.length >= 3} onClick={() => {
                                                                this.setState((ps) => {
                                                                    return {
                                                                        projectLinks: [...ps.projectLinks, {
                                                                            projectId: this.props.id,
                                                                            attachmentPath: "",
                                                                            attachmentType: "projectLink",
                                                                            attachmentDetails: "",
                                                                            userId: this.props.userId,
                                                                        }]
                                                                    }
                                                                })
                                                            }} justIcon round color="twitter">+</Button>
                                                            {this.state.projectLinks.filter(link => { return link.attachmentType == 'projectLink' }).map((obj, index) => {
                                                                return (
                                                                    <GridItem xs={12} sm={12} md={12} lg={12}>
                                                                        <GridContainer direction="row">
                                                                            <GridItem xs={10} sm={10} md={10} lg={10}>

                                                                                <Input
                                                                                    value={obj.attachmentPath}
                                                                                    style={{ width: "100%", paddingTop: '5px' }}
                                                                                    placeholder={
                                                                                        "Enter Project link " + (index + 1) + "(Optional)"
                                                                                    }
                                                                                    onChange={e => {
                                                                                        let temp = e.target.value;
                                                                                        this.setState(ps => {
                                                                                            return {
                                                                                                projectLinks: [
                                                                                                    ...ps.projectLinks.slice(
                                                                                                        0,
                                                                                                        index
                                                                                                    ),
                                                                                                    {
                                                                                                        ...ps.projectLinks[index],
                                                                                                        attachmentPath: temp
                                                                                                    },
                                                                                                    ...ps.projectLinks.slice(
                                                                                                        index + 1
                                                                                                    )
                                                                                                ]
                                                                                            };
                                                                                        });
                                                                                    }}
                                                                                />
                                                                            </GridItem>
                                                                            {/* <GridItem xs={1} sm={1} md={1} lg={1}>
                                                                                <Button justIcon color="twitter" onClick={() => {
                                                                                    this.setState(ps => {
                                                                                        return {
                                                                                            projectLinks: [
                                                                                                ...ps.projectLinks.slice(
                                                                                                    0,
                                                                                                    index
                                                                                                ),
                                                                                                ...ps.projectLinks.slice(
                                                                                                    index + 1
                                                                                                )
                                                                                            ]
                                                                                        };
                                                                                    });
                                                                                }}>X</Button>
                                                                            </GridItem> */}
                                                                            <br />
                                                                        </GridContainer>
                                                                    </GridItem>
                                                                );
                                                            })}
                                                        </GridContainer>
                                                    </div>
                                                </CardBody>
                                                <CardFooter chart>
                                                    <div style={{ width: '100%', textAlign: "center" }}>
                                                        Add external links to project resources
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </GridItem>
                                    </GridContainer>
                                    <br />
                                    <GridContainer justify="center">
                                        <GridItem
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            className={classes.center}
                                        >
                                            <Dialog
                                                classes={{
                                                    root: classes.center + " " + classes.modalRoot,
                                                    paper: classes.modal
                                                }}
                                                open={this.state.noticeModal}
                                                TransitionComponent={Transition}
                                                keepMounted
                                                onClose={() => this.handleClose("noticeModal")}
                                                aria-labelledby="notice-modal-slide-title"
                                                aria-describedby="notice-modal-slide-description"
                                            >
                                                <DialogTitle
                                                    id="notice-modal-slide-title"
                                                    disableTypography
                                                    className={classes.modalHeader}
                                                    style={{ height: "60px" }}
                                                >
                                                    <Button
                                                        justIcon
                                                        className={classes.modalCloseButton}
                                                        key="close"
                                                        style={{ float: "right" }}
                                                        aria-label="Close"
                                                        color="transparent"
                                                        onClick={() => this.handleClose("noticeModal")}
                                                    >
                                                        <Close className={classes.modalClose} />
                                                    </Button>
                                                </DialogTitle>
                                                <DialogContent
                                                    id="notice-modal-slide-description"
                                                    className={classes.modalBody}
                                                >
                                                    <p style={{ fontSize: "16px" }}>
                                                        <b>Please Login to Start a Project</b>
                                                    </p>
                                                </DialogContent>
                                                <DialogActions
                                                    className={
                                                        classes.modalFooter +
                                                        " " +
                                                        classes.modalFooterCenter
                                                    }
                                                >
                                                    <Button
                                                        onClick={() => this.props.history.push("/login")}
                                                        color="info"
                                                        round
                                                        className={classes.center}
                                                    >
                                                        Go to Login
                                            </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </GridItem>
                                    </GridContainer>
                                    <br />{this.state.alert}
                                    <GridContainer justify="center">
                                        <GridItem
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            className={classes.center}
                                        >
                                            <Dialog
                                                classes={{
                                                    root: classes.center + " " + classes.modalRoot,
                                                    paper: classes.modal
                                                }}
                                                open={this.state.noticeModal}
                                                TransitionComponent={Transition}
                                                keepMounted
                                                onClose={() => this.handleClose("noticeModal")}
                                                aria-labelledby="notice-modal-slide-title"
                                                aria-describedby="notice-modal-slide-description"
                                            >
                                                <DialogTitle
                                                    id="notice-modal-slide-title"
                                                    disableTypography
                                                    className={classes.modalHeader}
                                                    style={{ height: "60px" }}
                                                >
                                                    <Button
                                                        justIcon
                                                        className={classes.modalCloseButton}
                                                        key="close"
                                                        style={{ float: "right" }}
                                                        aria-label="Close"
                                                        color="transparent"
                                                        onClick={() => this.handleClose("noticeModal")}
                                                    >
                                                        <Close className={classes.modalClose} />
                                                    </Button>
                                                </DialogTitle>
                                                <DialogContent
                                                    id="notice-modal-slide-description"
                                                    className={classes.modalBody}
                                                >
                                                    <p style={{ fontSize: "16px" }}>
                                                        <b>Please Login to Start a Project</b>
                                                    </p>
                                                </DialogContent>
                                                <DialogActions
                                                    className={
                                                        classes.modalFooter +
                                                        " " +
                                                        classes.modalFooterCenter
                                                    }
                                                >
                                                    <Button
                                                        onClick={() => this.props.history.push("/login")}
                                                        color="info"
                                                        round
                                                        className={classes.center}
                                                    >
                                                        Go to Login
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                            {
                                                <Button
                                                    onClick={() => this.onSubmit()}
                                                    color="twitter"
                                                >
                                                    Save
                                                </Button>
                                            }
                                            <Button color='tumblr' onClick={() => {
                                                this.props.history.push(`/home/project-details/info?p=${this.props.id}`)
                                            }}>
                                                Cancel
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                </form>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        city: state.proDetails.city,
        name: state.proDetails.name,
        summary: state.proDetails.projectSummary,
        challenge: state.proDetails.projectChallenge,
        solution: state.proDetails.projectSolution,
        justification: state.proDetails.projectJustification,
        suppliesNeeded: state.proDetails.suppliesNeeded,
        budgetDetails: state.proDetails.budgetDetails,
        sendNotes: state.proDetails.sendNotes,
        updates: state.proDetails.updates,
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
        projectLinks: state.proDetails.projectLinks,
        isLoggedIn: state.auth.isLoggedIn,
        interestOptions: state.common.interestOptions,
        requestCompleted: state.start.requestCompleted,
        createdBy: state.proDetails.createdBy,
        projectAttachments: state.proDetails.projectAttachments,
        userId: state.auth.userId,
        text: state.proDetails.text,
        imagesFiles: state.proDetails.imagesFiles,
        documentsFiles: state.proDetails.documentsFiles,
    };
};

EditProjectDetails.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(
    mapStateToProps,
    {
        budgetChanged,
        descriptionChanged,
        projectSummaryChanged,
        endDateChanged,
        freelancersChanged,
        projectNameChanged,
        startDateChanged,
        volunteersChanged,
        zipCodeChanged,
        cityChanged,
        statusChanged,
        removeToaster,
        countryChanged,
        updateProject,
        deleteProjectAttachment,
        interestsChanged,
        getProjectById,
        filesChanged,
        uploadFiles,
        editUploadLinks,
        clearFiles,
        setProjectDefaultImage,
        projectUpdatesChanged,
        createProjectUpdates,
        getProjectUpdates,
        imagesFilesChanged,
        documentsFilesChanged,
        projectChallengeChanged,
        projectSolutionChanged,
        projectJustificationChange,
        budgetDetailsChange,
        projectSuppliesNeededChange,
        editProjectUnmount,
    }
)(withStyles(style)(EditProjectDetails));
