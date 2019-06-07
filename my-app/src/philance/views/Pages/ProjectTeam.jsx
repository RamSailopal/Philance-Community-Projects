import React from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import { NavLink } from 'react-router-dom'
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import { Done, Cancel } from "@material-ui/icons";
import withStyles from "@material-ui/core/styles/withStyles";
import SweetAlert from "react-bootstrap-sweetalert";
import Accordion from "components/Accordion/Accordion.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardText from "components/Card/CardText.jsx";
import Tooltip from '@material-ui/core/Tooltip';
//import Table from "../../components/Table/Table.jsx";
import { Table, Divider, Tag } from 'antd';
import Button from "components/CustomButtons/Button.jsx";
import { Image, List } from 'semantic-ui-react'

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";

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
    maxWidth: 'none',
  }
})
class ProjectTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableData: [],
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
      let sample = {
        projectName: element.projectName,
        firstName: <NavLink to={`/home/profile/${element.user.userId}`}>{element.user.firstName + " " + element.user.lastName}</NavLink>,
        appliedDate: new Date(element.appliedDate).toDateString(),
        startDate: element.startDate ? new Date(element.startDate).toDateString() : null,
        status: element.status
      }
      this.setState((prev) => ({
        data: [...prev.data, sample]
      }))
    })
  }
  render() {
    const { classes } = this.props;
    const columns = [{
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => <NavLink to={`/home/profile/${record.userId}`}>{record.firstName + " " + record.lastName}</NavLink>,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'Role',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => <Tag color='green' >{text.toUpperCase()}</Tag>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: text => <Tag color='blue' >{text.toUpperCase()}</Tag>
    },
    {
      title: 'Tasks',
      key: 'tasks',
      dataIndex: 'tasks',
    },

    ];
    let serverRecords = [];
    let recordData = {};


    this.props.response.map((element, key) => {
      if (element.status == 'ACCEPTED') {
        recordData = {
          firstName: element.user.firstName,
          lastName: element.user.lastName,
          userId: element.user.userId,
          role: element.role,
          startDate: element.startDate ? new Date(element.startDate).toDateString() : null,
          tasks:
            <Accordion
              collapses={[
                {
                  title: "Tasks",
                  content:
                    <div>
                      <List relaxed style={{ padding: '7px' }}>
                        {this.props.tasks.map((value, key2) => {

                          return element.userId === value.assignedTo ?
                            (
                              <List.Item>

                                <List.Content>
                                  <List.Header as='a'> <Tooltip title={value.taskName} classes={{ tooltip: classes.lightTooltip }}>
                                    <NavLink to={`tasks/${value.taskId}`}>
                                      <span>
                                        {value.taskName.substring(25, 0)}{value.taskName.length < 25 ? '' : '...'}
                                      </span>
                                    </NavLink>
                                  </Tooltip></List.Header>
                                </List.Content>
                              </List.Item>) : null
                        })}
                      </List>

                    </div>
                }
              ]}
            />,
          status: element.status,
          type: element.type
        }

        serverRecords.push(recordData)
      }

    })


    return (
      <GridContainer justify="center" >
        <GridItem xs={12} sm={12} md={12}>
          {this.state.alert}
          <GridContainer>
            <GridItem xs={12} sm={12} style={{ padding: '10px' }}>
              <br /><br /><br />
              <Table style={{ backgroundColor: '#fff', overflowY: 'scroll', padding: '10px' }} dataSource={serverRecords} columns={columns} />
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  }
}

ProjectTeam.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    projectId: state.proDetails.id,
    tasks: state.proDetails.projectTasks,
    response: state.proDetails.projectTeam,
    length: state.candidateReview.length,
    list: state.candidateReview.list,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, { getProjectCandidateReviewList, changeResponseStatus, storeCandidateReview, updateCandidateStatusForProjectApplication })(withStyles(styles)(ProjectTeam));