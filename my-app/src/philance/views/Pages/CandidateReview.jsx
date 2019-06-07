import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import { NavLink } from 'react-router-dom'
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { Done, Cancel } from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import SweetAlert from "react-bootstrap-sweetalert";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import Tooltip from '@material-ui/core/Tooltip';

import Button from "components/CustomButtons/Button.jsx";
import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import { Table, Divider, Tag } from 'antd';
//import publicHomePageStyle from "./PublicHomePageStyle";
import {
    getProjectCandidateReviewList,
    storeCandidateReview,
    updateCandidateStatusForProjectApplication,
    changeResponseStatus
} from '../../actions/candidateReview'
import { connect } from 'react-redux'
const styles = theme => ({
    ...sweetAlertStyle,
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    lightTooltip: {
        background: theme.palette.common.white,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        fontSize: 13,
    }
})

class CandidateReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            projectName: ''
        };
    }

    componentDidMount() {
        this.props.getProjectCandidateReviewList(this.props.projectId, (flag) => {
            this.props.response ?
                this.renderData() : null
        });

    }

    color(i) {
        if (i === 1) return '#dbebf6'
    }
    hideAlert() {
        this.setState({
            alert: null
        });
    }
    warningWithConfirmMessage({ title, message, confirmText, cancelButtonText }, callback) {
        const { classes } = this.props;
        this.setState({
            alert: (
                <SweetAlert
                    //   warning
                    style={{ display: "block", marginTop: "-100px" }}
                    title={title}
                    onConfirm={() => {
                        this.hideAlert(); callback()
                    }
                    }
                    onCancel={() => this.hideAlert()}
                    confirmBtnCssClass={
                        classes.button + " " + classes.success
                    }
                    cancelBtnCssClass={
                        classes.button + " " + classes.danger
                    }
                    confirmBtnText={confirmText}
                    cancelBtnText={cancelButtonText}
                    showCancel
                >
                    {message}
                </SweetAlert>
            )
        });
    }

    renderData() {
        let i = 0;
        const { classes } = this.props;
        this.props.response.map((element, key) => {
            i = i === 2 ? 1 : i + 1
            this.setState({ projectName: element.project.projectName })
            let sample = {
                projectName: element.project.projectName,
                firstName: element.user.firstName,
                lastName: element.user.lastName,
                userId: element.user.userId,
                appliedDate: new Date(element.appliedDate).toDateString(),
                startDate: element.startDate ? new Date(element.startDate).toDateString() : null,
                status: element.status,
                Action: <span>
                    {
                        element.project.createdBy == this.props.userId ?
                            <span>
                                <Tooltip title="Accept" classes={{ tooltip: classes.lightTooltip }}>
                                    <Button
                                        round
                                        justIcon
                                        simple
                                        onClick={() => {
                                            //approve candidate
                                            this.warningWithConfirmMessage(
                                                {
                                                    title: 'Accept Comfirmation',
                                                    message: 'An email notification will be sent to the candidate',
                                                    confirmText: 'Send',
                                                    cancelButtonText: 'Cancel'
                                                }
                                                , () => {
                                                    this.props.updateCandidateStatusForProjectApplication({
                                                        projectId: element.projectId,
                                                        applicantId: element.user.userId,
                                                        role: 'APPLICANT',
                                                        status: 'ACCEPTED',
                                                        userId: this.props.userId
                                                    }, () => {
                                                        this.setState({
                                                            data: []
                                                        }, () => this.props.getProjectCandidateReviewList(element.projectId, () => {
                                                            this.renderData();
                                                        })
                                                        )
                                                    })
                                                })
                                        }}
                                        color="info"
                                        className="like"
                                    ><Done /></Button>
                                </Tooltip>
                                <Tooltip title="Reject" classes={{ tooltip: classes.lightTooltip }}>
                                    <Button
                                        justIcon
                                        round
                                        simple onClick={() => {
                                            //reject candidate
                                            this.warningWithConfirmMessage(
                                                {
                                                    title: 'Reject Comfirmation',
                                                    message: 'An email notification will be sent to the Candidate',
                                                    confirmText: 'Send',
                                                    cancelButtonText: 'Cancel'
                                                }, () => {
                                                    this.props.updateCandidateStatusForProjectApplication({
                                                        projectId: element.projectId,
                                                        applicantId: element.user.userId,
                                                        role: 'APPLICANT',
                                                        status: 'REJECTED',
                                                        userId: this.props.userId
                                                    }, () => {
                                                        this.setState({
                                                            data: []
                                                        }, () => this.props.getProjectCandidateReviewList(element.projectId, () => {
                                                            this.renderData();
                                                        })
                                                        )
                                                    })
                                                })
                                        }} color="info"
                                        className="like"
                                    ><Cancel /></Button>
                                </Tooltip>
                                <Tooltip title="View Application" classes={{ tooltip: classes.lightTooltip }}>
                                    <NavLink to={`/home/project/${element.projectId}/user/${element.user.userId}`}>
                                        <Button
                                            justIcon
                                            round
                                            simple
                                            color="info"
                                            className="like" >
                                            <LibraryBooks />
                                        </Button>
                                    </NavLink>
                                </Tooltip>
                            </span> : null
                    }
                </span>
            }
            this.setState((prev) => ({
                data: [...prev.data, sample]
            }))
        })
    }
    render() {

        const { classes } = this.props;
        const columns = [
            {
                title: 'Candidate Name',
                dataIndex: 'firstName',
                key: 'firstName',
                render: (text, record) => <NavLink to={`/home/profile/${record.userId}`}>{record.firstName + " " + record.lastName}</NavLink>,
                sorter: (a, b) => a.firstName.localeCompare(b.firstName),
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'role',
                render: text => text ? <Tag color='cyan' >{text.toUpperCase()}</Tag> : null,
            },
            {
                title: 'Start Date',
                dataIndex: 'startDate',
                key: 'startDate',
                render: text => text ? (<Tag color='green' >{text.toUpperCase()}</Tag>) : null,
            }, {
                title: 'Date Applied',
                dataIndex: 'appliedDate',
                key: 'appliedDate',
                render: text => text ? (<Tag color='green' >{text.toUpperCase()}</Tag>) : null,
            },
            {
                title: 'Candidate Status',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => (
                    <Tag color='blue' >{text.toUpperCase()}</Tag>
                ),
            },
            {
                title: 'Action',
                dataIndex: 'Action',
                key: 'Action',
                // render: text => <Tag color='blue' >{text.toUpperCase()}</Tag>
            },
        ];
        let serverRecords = [];
        let recordData = {};
        this.props.response.map((element, key) => {

            let i = 0;
            i = i === 2 ? 1 : i + 1
            recordData = {
                projectName: element.project.projectName,
                firstName: element.user.firstName,
                lastName: element.user.lastName,
                userId: element.user.userId,
                role: element.role,
                appliedDate: new Date(element.appliedDate).toDateString(),
                startDate: element.startDate ? new Date(element.startDate).toDateString() : null,
                status: element.status,
                Action: <span>
                    {
                        element.project.createdBy == this.props.userId ?
                            <span>
                                <Tooltip title="Accept" classes={{ tooltip: classes.lightTooltip }}>
                                    <Button
                                        round
                                        justIcon
                                        simple
                                        onClick={() => {
                                            //approve candidate
                                            this.warningWithConfirmMessage(
                                                {
                                                    title: 'Accept Comfirmation',
                                                    message: 'An email notification will be sent to the candidate',
                                                    confirmText: 'Send',
                                                    cancelButtonText: 'Cancel'
                                                }
                                                , () => {
                                                    this.props.updateCandidateStatusForProjectApplication({
                                                        projectId: element.projectId,
                                                        applicantId: element.user.userId,
                                                        role: 'APPLICANT',
                                                        status: 'ACCEPTED',
                                                        userId: this.props.userId
                                                    }, () => {
                                                        this.setState({
                                                            data: []
                                                        }, () => this.props.getProjectCandidateReviewList(element.projectId, () => {
                                                            this.renderData();
                                                        })
                                                        )
                                                    })
                                                })
                                        }}
                                        color="info"
                                        className="like"
                                    ><Done /></Button>
                                </Tooltip>
                                <Tooltip title="Reject" classes={{ tooltip: classes.lightTooltip }}>
                                    <Button
                                        justIcon
                                        round
                                        simple onClick={() => {
                                            //reject candidate
                                            this.warningWithConfirmMessage(
                                                {
                                                    title: 'Reject Comfirmation',
                                                    message: 'An email notification will be sent to the Candidate',
                                                    confirmText: 'Send',
                                                    cancelButtonText: 'Cancel'
                                                }, () => {
                                                    this.props.updateCandidateStatusForProjectApplication({
                                                        projectId: element.projectId,
                                                        applicantId: element.user.userId,
                                                        role: 'APPLICANT',
                                                        status: 'REJECTED',
                                                        userId: this.props.userId
                                                    }, () => {
                                                        this.setState({
                                                            data: []
                                                        }, () => this.props.getProjectCandidateReviewList(element.projectId, () => {
                                                            this.renderData();
                                                        })
                                                        )
                                                    })
                                                })
                                        }} color="info"
                                        className="like"
                                    ><Cancel /></Button>
                                </Tooltip>
                                <Tooltip title="View Application" classes={{ tooltip: classes.lightTooltip }}>
                                    <NavLink to={`/home/project/${element.projectId}/user/${element.user.userId}`}>
                                        <Button
                                            justIcon
                                            round
                                            simple
                                            color="info"
                                            className="like" >
                                            <LibraryBooks />
                                        </Button>
                                    </NavLink>
                                </Tooltip>
                            </span> : null
                    }
                </span>
            }
            serverRecords.push(recordData)
        })

        return (
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={10}>
                    <Card>
                        <CardHeader color="info" text>
                            <CardText color="info">
                                <h3>Review Candidates</h3>
                            </CardText>
                        </CardHeader>
                        <GridContainer align="right" direction="column">
                            <GridItem style={{ marginRight: 45 }}>
                                <Button color="info" round className={classes.marginRight} onClick={() => {
                                    this.props.history.push('../..')
                                    this.props.history.push(`/home/my-projects`)
                                }}>
                                    <i class="fa fa-angle-left"></i> Back to my projects
                            </Button>
                            </GridItem>
                        </GridContainer>
                        {this.state.alert}
                        <GridContainer justify='center'>
                            <GridItem xs={12} sm={12}>
                                <Card>
                                    <CardBody>
                                        <h1 align="center" style={{ padding: '0.25em 0', color: '#3e4b59', fontSize: '2.5em' }}>
                                            <strong>
                                                {this.state.projectName}

                                            </strong>{" "}
                                        </h1>
                                        <Table style={{ backgroundColor: '#fff' }} dataSource={serverRecords} columns={columns} />
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}

CandidateReview.propTypes = {
    classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
    return {
        projectId: state.proDetails.id,
        response: state.candidateReview.response,
        length: state.candidateReview.length,
        list: state.candidateReview.list,
        userId: state.auth.userId,
        //projectName: state.proDetails.name,
    }
}

export default connect(mapStateToProps, { getProjectCandidateReviewList, changeResponseStatus, storeCandidateReview, updateCandidateStatusForProjectApplication })(withStyles(styles)(CandidateReview));
