import PublicHomePage from "philance/views/Pages/PublicHomePage.jsx";
import PvtHomePage from "philance/views/Pages/PvtHomePage.jsx";
import StartProjectPage from "philance/views/Pages/StartProjectPage.jsx";
import ProjectSearch from "philance/views/Pages/ProjectSearchPage.jsx";
import HowItWorksPage from "philance/views/Pages/HowItWorksPage.jsx";
import RegisterPage from "philance/views/Pages/RegisterPage.jsx";
import LoginPage from "philance/views/Pages/LoginPage.jsx";
import MyProjectsPage from "philance/views/Pages/MyProjectsPage.jsx";
import NotificationsPage from "philance/views/Pages/NotificationsPage.jsx";
import MessagesPage from "philance/views/Pages/MessagesPage.jsx";
import CandidateReview from "philance/views/Pages/CandidateReview.jsx";
import UserProfile from "philance/views/Pages/UserProfilePage.jsx";
import ForgotPassword from "../views/Pages/ForgotPassword";
import ProjectDetails from "../views/Pages/ProjectDetails"
import ApplicationPage from "philance/views/Pages/ApplicationPage.jsx"
import ProjectApplicantPage from "philance/views/Pages/ProjectApplicantPage.jsx"

// @material-ui/icons
import HomeIcon from "@material-ui/icons/Home";
import LaunchIcon from "@material-ui/icons/Create";
import SearchIcon from "@material-ui/icons/Search";
import HelpIcon from "@material-ui/icons/Help";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MessageIcon from "@material-ui/icons/Message";
import PersonIcon from "@material-ui/icons/Person";
import FolderIcon from "@material-ui/icons/Folder";
import ResetPasswordPublic from "../views/Pages/ResetPasswordPublic";
import Profile from "../views/Pages/Profile";
import ProfileSettings from "../views/Pages/ProfileSettings";
import ProjectNavigator from "../views/Pages/ProjectNavigator";
import ProjectTeam from "../views/Pages/ProjectTeam";
import CreateProjectTaskDetails from "../views/Pages/CreateProjectTaskDetails";
import ProjectTaskDetails from "../views/Pages/ProjectTaskDetails";
import ProjectTaskView from "../views/Pages/ProjectTaskView";
import ProjectChat from "../views/Pages/ProjectChat";

export const pagesRoutes = [
  {
    path: "/project-details/:id",
    name: "Project Details",
    short: "Details",
    mini: "PD",
    icon: FolderIcon,
    component: ProjectDetails
  },
  {
    path: "/home",
    name: "Home",
    short: "Home",
    mini: "PHP",
    icon: HomeIcon,
    component: PublicHomePage
  },
  {
    path: "/start-project",
    name: "Start Project",
    short: "Start A Project",
    mini: "SPP",
    icon: LaunchIcon,
    component: StartProjectPage
  },
  {
    path: "/find-project",
    name: "Find Project",
    short: "Find A project",
    mini: "FPP",
    icon: SearchIcon,
    component: ProjectSearch
  },
  {
    path: "/how-it-works",
    name: "How It Works",
    short: "How It Works",
    mini: "HIWP",
    icon: HelpIcon,
    component: HowItWorksPage
  },
  {
    path: "/login",
    name: "Login",
    short: "Login",
    mini: "LP",
    icon: FingerprintIcon,
    component: LoginPage
  },
  {
    path: "/register",
    name: "Register",
    short: "Sign Up",
    mini: "RP",
    icon: PersonAddIcon,
    component: RegisterPage
  },
  {
    path: "/forgotPassword",
    name: "Forgot Password",
    short: "Forgot Password",
    mini: "FP",
    icon: PersonAddIcon,
    component: ForgotPassword

  },
  {
    path: "/resetPassword/:id",
    name: "Reset Password",
    short: "Reset Password",
    mini: "RP",
    icon: PersonAddIcon,
    component: ResetPasswordPublic

  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home",
    name: "Home"
  },

];
export const headerRoutes = [
  {
    path: "/home",
    name: "Home",
    short: "Home",
    mini: "PHP",
    icon: HomeIcon,
    component: PublicHomePage
  },
  {
    path: "/start-project",
    name: "Start Project",
    short: "Start A Project",
    mini: "SPP",
    icon: LaunchIcon,
    component: StartProjectPage
  },
  {
    path: "/find-project",
    name: "Find Project",
    short: "Find A project",
    mini: "FPP",
    icon: SearchIcon,
    component: ProjectSearch
  },
  {
    path: "/how-it-works",
    name: "How It Works",
    short: "How It Works",
    mini: "HIWP",
    icon: HelpIcon,
    component: HowItWorksPage
  },
  {
    path: "/login",
    name: "Login",
    short: "Login",
    mini: "LP",
    icon: FingerprintIcon,
    component: LoginPage
  },
  {
    path: "/register",
    name: "Register",
    short: "Sign Up",
    mini: "RP",
    icon: PersonAddIcon,
    component: RegisterPage
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home",
    name: "Home"
  },

];

export const pvtSidebarRoutes = [
  {
    path: "/home",
    name: "Home",
    short: "Home",
    mini: "HP",
    icon: HomeIcon,
    component: PvtHomePage
  },
  {
    path: "/start-project",
    name: "Start Project",
    short: "Start A Project",
    mini: "SPP",
    icon: LaunchIcon,
    component: StartProjectPage
  },
  {
    path: "/my-projects",
    name: "My Projects",
    short: "My Projects",
    mini: "MPP",
    icon: FolderIcon,
    component: MyProjectsPage
  },
  {
    path: "/find-project",
    name: "Find Project",
    short: "Find A project",
    mini: "FPP",
    icon: SearchIcon,
    component: ProjectSearch
  },
  {
    path: "/notifications",
    name: "Notifications",
    short: "Notifications",
    mini: "NP",
    icon: NotificationsIcon,
    component: NotificationsPage
  },
  // {
  //   path: "/settings",
  //   name: "Settings",
  //   short: "Settings",
  //   mini: "S",
  //   icon: NotificationsIcon,
  //   component: ProfileSettings
  // },
//  {
//    path: "/messages",
//    name: "Messages",
//    short: "Messages",
//    mini: "MP",
//    icon: MessageIcon,
//    component: MessagesPage
//  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home",
    name: "Home"
  }
];

export const pvtPagesRoutes = [
  {
    path: "/home",
    name: "Home",
    short: "Home",
    mini: "HP",
    icon: HomeIcon,
    component: PvtHomePage
  },
  {
    path: "/start-project",
    name: "Start Project",
    short: "Start A Project",
    mini: "SPP",
    icon: LaunchIcon,
    component: StartProjectPage
  },
  {
    path: "/project-details/tasks/create",
    name: "Create Project Tasks",
    short: "Create Tasks",
    mini: "CPTk",
    icon: SearchIcon,
    component: CreateProjectTaskDetails
  },
  {
    path: "/project-details/tasks/:id",
    name: "View Project Task",
    short: "View Task",
    mini: "CPTk",
    icon: SearchIcon,
    component: ProjectTaskDetails
  },
  {
    path: "/find-project",
    name: "Find Project",
    short: "Find A project",
    mini: "FPP",
    icon: SearchIcon,
    component: ProjectSearch
  },
  {
    path: "/my-projects",
    name: "My Projects",
    short: "My Projects",
    mini: "MPP",
    icon: FolderIcon,
    component: MyProjectsPage
  },
  {
    path: "/notifications",
    name: "Notifications",
    short: "Notifications",
    mini: "NP",
    icon: NotificationsIcon,
    component: NotificationsPage
  },
  {
    path: "/project-details",
    name: "Project Navigator",
    short: "Details",
    mini: "PD",
    icon: FolderIcon,
    component: ProjectNavigator
  },
  {
    path: "/settings",
    name: "Settings",
    short: "Settings",
    mini: "S",
    icon: NotificationsIcon,
    component: ProfileSettings
  },
 // {
 //   path: "/messages",
 //   name: "Messages",
 //   short: "Messages",
 //   mini: "MP",
 //   icon: MessageIcon,
 //   component: MessagesPage
 // },
  {
    path: "/projectCandidateReview/:id",
    name: "Project Candidate Review",
    short: "Project Candidate Review",
    mini: "PCR",
    icon: MessageIcon,
    component: CandidateReview
  },
  {
    path: "/profile/:id",
    name: "User Profile",
    short: "User Profile",
    mini: "UP",
    icon: PersonIcon,
    component: Profile
  },
  {
    path: "/profile",
    name: "User Profile",
    short: "User Profile",
    mini: "UP",
    icon: PersonIcon,
    component: UserProfile
  },
  {
    path: "/project/:projectId/user/:userId",
    name: "Project Applicant",
    short: "Project Applicant",
    mini: "PA",
    icon: PersonIcon,
    component: ProjectApplicantPage
  },
  {
    path: "/application-page/:id",
    name: "Application Page",
    short: "Application",
    mini: "AP",
    icon: FolderIcon,
    component: ApplicationPage
  },
  {
    redirect: true,
    path: "/project-details",
    pathTo: "/my-projects",
    name: "Home Page"
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home",
    name: "Home"
  }
];
export const projectPagesRoutes = [
  {
    path: "/project-details/info",
    name: "Project Info",
    short: "Info",
    mini: "Info",
    icon: HomeIcon,
    component: ProjectDetails
  },
  {
    path: "/project-details/team",
    name: "Project Team",
    short: "Team",
    mini: "PTm",
    icon: LaunchIcon,
    component: ProjectTeam
  },
  {
    path: "/project-details/tasks",
    name: "Project Tasks",
    short: "Tasks",
    mini: "PTk",
    icon: SearchIcon,
    component: ProjectTaskView
  },
  {
    path: "/project-details/v1/chat",
    name: "Project Chat",
    short: "Chat",
    mini: "PC",
    icon: FolderIcon,
    component: ProjectChat
  }]
export const projectPagesHeaderRoutes = [
  {
    path: "/project-details/info",
    name: "Details",
    short: "Details",
    mini: "D",
    icon: HomeIcon,
    component: ProjectDetails
  },
  {
    path: "/project-details/team",
    name: "Project Team",
    short: "Team",
    mini: "PTm",
    icon: LaunchIcon,
    component: ProjectTeam
  },
  {
    path: "/project-details/tasks",
    name: "Project Tasks",
    short: "Tasks",
    mini: "PTk",
    icon: SearchIcon,
    component: CreateProjectTaskDetails
  },
  {
    path: "/project-details/v1/chat",
    name: "Project Chat",
    short: "Chat",
    mini: "PC",
    icon: FolderIcon,
    component: ProjectChat
  }]