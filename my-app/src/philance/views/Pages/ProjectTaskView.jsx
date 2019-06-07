import React from "react"
import PropTypes from "prop-types"
import ReactTable from "react-table"
import { NavLink } from "react-router-dom";

// @material-ui/icons
import withStyles from "@material-ui/core/styles/withStyles"
import Person from "@material-ui/icons/Person";
import ViewList from "@material-ui/icons/ViewList";

// @material-ui/core components
import Button from "components/CustomButtons/Button.jsx";
import Tooltip from '@material-ui/core/Tooltip';

// core components
import GridContainer from "components/Grid/GridContainer.jsx"
import GridItem from "components/Grid/GridItem.jsx"
import Card from "components/Card/Card.jsx"
import CardBody from "components/Card/CardBody.jsx"
import Chart from 'react-google-charts';
import Component from "react-component-component";
// redux
import { connect } from 'react-redux'
import { myProject, storeList } from '../../actions/myProject'
import { getProjectById, idStored } from '../../actions/projectDetails'
import { getProjectCandidateReviewList } from '../../actions/candidateReview'
import { Table, Divider, Tag } from 'antd';
import Loader from "../../components/Loader/Loader"
//import publicHomePageStyle from "./PublicHomePageStyle";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 1,
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

class ProjectTaskView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      loading: false,
      loader: false,
      data: []

    }
    this.props = {
      chartData: []
    }
  }

  componentDidMount() {
    this.props.myProject(this.props.id, (flag => {
      this.props.response ?
        this.renderData() : null
    }))
    this.toggleLoader(true)
  }

  handlePaginationChange = (e, { activePage }) => this.setState({ activePage })
  handleItemClick = async (e, { id }) => {
    await this.setState({ activeItem: id })
    this.renderProjects()
  }

  color(i) {
    if (i === 1) return '#dbebf6'
  }

  toggleLoader = (flag) => {
    this.setState({
      loader: flag
    });
  }

  chrtDat(projectTasks) {
    var chartData = [[{ type: 'string', label: 'Task ID' },
    { type: 'string', label: 'Task Name' },
    { type: 'date', label: 'Start Date' },
    { type: 'date', label: 'End Date' },
    { type: 'number', label: 'Duration' },
    { type: 'number', label: 'Percent Complete' },
    { type: 'string', label: 'Dependencies' },]]
    projectTasks.map((value, key) => {
      chartData.push(
        [
          value.taskId,
          value.taskName,
          new Date(value.startDate),
          new Date(value.endDate),
          null,
          100,
          null,])
    })
    if (chartData[1] == null) {
      chartData.push(
        [
          null,
          null,
          new Date(null),
          new Date(null),
          null,
          null,
          null,])
    }

    return chartData
  }

  taskbutcol(creatby, userid) {
    if (userid == creatby) {
      var col = "twitter"
    }
    else {
      var col = "secondary"
    }
    return col
  }

  taskbutdis(creatby, userid) {
    if (userid == creatby) {
      var stat = ""
    }
    else {
      var stat = "disabled"
    }
    return stat
  }

  renderData() {
    const { classes } = this.props;
    let i = 0;
    this.props.response ?
      this.props.response.map((element) => {
        i = i === 2 ? 1 : i + 1
        let startDate = new Date(element.start_date);
        let endDate = new Date(element.end_date);
        startDate = startDate.toDateString()
        endDate = endDate.toDateString()
        let sample = {
          project_name: element.project_name,
          status: element.status,
          startDate: startDate,
          endDate: endDate,
          Close: "",
          Complete: "",
          Action: <span>
            <Tooltip title="Details" classes={{ tooltip: classes.lightTooltip }}>
              <NavLink to={`/home/project-details/${element.project_id}/info`}>
                <Button
                  round
                  justIcon
                  simple
                  onClick={() => {
                    this.toggleLoader(true)
                    this.props.getProjectById({ id: element.project_id }, (flag) => {
                      this.toggleLoader(flag)
                      // this.props.history.push(`/project-details/${element.project_id}`)
                      this.props.idStored(element.project_id)
                    })
                  }}
                  color="info"
                  className="like"
                ><ViewList /></Button>
              </NavLink>
            </Tooltip>
            <Tooltip title="Review" classes={{ tooltip: classes.lightTooltip }}>
              <Button
                justIcon
                round
                simple onClick={() => {
                  this.toggleLoader(true)
                  this.props.getProjectCandidateReviewList(element.project_id, (flag) => {
                    this.toggleLoader(flag)
                    this.props.idStored(element.project_id)
                    this.props.history.push(`/home/projectCandidateReview/${element.project_id}/`)
                  })
                }} color="info"
                className="like"
              ><Person /></Button>
            </Tooltip>
          </span>
        }
        return (
          this.setState((prev) => ({
            data: [...prev.data, sample]
          }))
        );
      }) : null
    this.toggleLoader(false)
  }

  render() {
    const { classes } = this.props;
    const columns = [{
      title: 'Task Id',
      dataIndex: 'taskId',
      key: 'taskId',


    }, {
      title: 'Task Name',
      dataIndex: 'task_name',
      key: 'task_name',
      render: value => <span> <Tooltip title={value} classes={{ tooltip: classes.lightTooltip }}>
        <span> {value}</span>
      </Tooltip></span>,

    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [{
        text: 'Active',
        value: 'Active',
      }, {
        text: 'Closed',
        value: 'Closed',
      }
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      render: text => <Tag color='green' >{text.toUpperCase()}</Tag>,
      onFilter: (value, record) => record.status.indexOf(value) === 0,

    }, {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },

    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
      render: text => <Tag color='blue' >{text.toUpperCase()}</Tag>,
      sorter: (a, b) => a.assignee.localeCompare(b.assignee),
    },
    {
      title: 'Author',
      key: 'author',
      dataIndex: 'author',
      sorter: (a, b) => a.author.localeCompare(b.author),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: text => <Tag color='blue' >{text.toUpperCase()}</Tag>
    },
    {
      title: 'action',
      dataIndex: 'action',
      key: 'action',
    },
    ];
    let serverRecords = [];
    let recordData = {};
    this.props.projectTasks.map((value, key) => {
      recordData = {
        taskId: value.taskId,
        task_name: value.taskName,
        status: value.status,
        startDate: new Date(value.startDate).toDateString(),
        endDate: new Date(value.endDate).toDateString(),
        assignee: value.assignee.firstName + ' ' + value.assignee.lastName,
        author: value.author.firstName + ' ' + value.author.lastName,
        priority: value.priority,
        action:
          <Tooltip title="Task Details" classes={{ tooltip: classes.lightTooltip }}>
            <NavLink to={`/home/project-details/tasks/${value.taskId}`}>
              <Button justIcon simple color="twitter" className={classes.marginRight} onClick={() => {
                this.props.getProjectById({ id: this.props.projectId }, () => {
                  this.props.history.push(`/home/project-details/tasks/${value.taskId}`)
                })
              }}>
                <ViewList />
              </Button>
            </NavLink>
          </Tooltip>
      }
      serverRecords.push(recordData)
    })
    return (
      <GridContainer>

        {/* <Loader loader={this.state.loader} /> */}
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card className={classes.cardSignup}>
              <CardBody>
                <GridContainer align="right" direction="column">
                  <GridItem style={{ marginRight: 45 }}>
                    {/* <NavLink to={`/project-details/:projectId/tasks/create`}> */}
                    {(this.props.id == this.props.createdBy) ?
                      <NavLink to={`/home/project-details/tasks/create`}>
                        <Button
                          color={this.taskbutcol(this.props.createdBy, this.props.id)}
                          disabled={this.taskbutdis(this.props.createdBy, this.props.id)}
                          round className={classes.marginRight}
                          onClick={() => {
                            if (this.props.id == this.props.createdBy) {
                              //   this.props.history.push('/project-details/tasks/create')
                            }
                          }}
                        >
                          + Create Task
              </Button>
                      </NavLink> : null
                    }
                    {/* </NavLink> */}
                  </GridItem>
                  <br /><br /><br />
                </GridContainer>
                <Table style={{ backgroundColor: '#fff', overflowX: 'scroll' }} dataSource={serverRecords} columns={columns} />
                <br></br>
                <br></br>
                <h3><b>Gantt Chart</b></h3>
                <Chart
                  width={'100%'}
                  height={'400px'}
                  chartType="Gantt"
                  loader={<div>Loading Chart</div>}
                  data={this.chrtDat(this.props.projectTasks)}
                  options={{
                    gantt: {
                      criticalPathEnabled: false,
                      innerGridHorizLine: {
                        stroke: '#c6d9ec',
                        strokeWidth: 2,
                      },
                      innerGridTrack: { fill: '#ffffff' },
                      innerGridDarkTrack: { fill: '#ffffff' },
                    },
                  }}
                  rootProps={{ 'data-testid': '1' }}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
        </GridContainer>
      </GridContainer >
    );
  }
}

const mapStateToProps = state => {
  return {
    response: state.projectTasks.response,
    projectTasks: state.proDetails.projectTasks,
    projectId: state.proDetails.id,
    createdBy: state.proDetails.createdBy,
    id: state.auth.userId,
  }
}

ProjectTaskView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getProjectCandidateReviewList, storeList, getProjectById, idStored, myProject })(withStyles(styles)(ProjectTaskView));
