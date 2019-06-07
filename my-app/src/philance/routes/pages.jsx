import PublicHomePage from "philance/views/Pages/PublicHomePage.jsx";
import PvtHomePage from "philance/views/Pages/PvtHomePage.jsx";
import StartProjectPage from "philance/views/Pages/StartProjectPage.jsx";
import ProjectSearch from "philance/views/Pages/ProjectSearchPage.jsx";
import HowItWorksPage from "philance/views/Pages/HowItWorksPage.jsx";
import RegisterPage from "philance/views/Pages/RegisterPage.jsx";
import LoginPage from "philance/views/Pages/LoginPage.jsx";
import AboutUs from "philance/views/Pages/AboutUs.jsx";
import MyProjectsPage from "philance/views/Pages/MyProjectsPage.jsx";
import NotificationsPage from "philance/views/Pages/NotificationsPage.jsx";
import CandidateReview from "philance/views/Pages/CandidateReview.jsx";
import UserProfile from "philance/views/Pages/UserProfilePage.jsx";
import ForgotPassword from "../views/Pages/ForgotPassword";
import ProjectDetails from "../views/Pages/ProjectDetails";
import ApplicationPage from "philance/views/Pages/ApplicationPage.jsx";
import ProjectApplicantPage from "philance/views/Pages/ProjectApplicantPage.jsx";

// @material-ui/icons
import HomeIcon from "@material-ui/icons/Home";
import LaunchIcon from "@material-ui/icons/Create";
import myProjectsIcon from "@material-ui/icons/ViewList";
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
import CookiesPolicy from "../views/Pages/CookiesPolicy";
import PrivacyPolicy from "../views/Pages/PrivacyPolicy";
import TermAndCondition from "../views/Pages/TermAndCondition";
import ContactForm from "../views/Pages/ContactForm";
import EditProjectDetails from "../views/Pages/EditProjectDetails";
import Dashboard from "../layouts/Dashboard";

export const pvtPagesRoutes = [
  {
    path: "/project-details/:id",
    name: "Project Details",
    short: "Details",
    mini: "PD",
    icon: FolderIcon,
    component: ProjectDetails
  },
  {
    path: "/start-project",
    name: "Start Project",
    short: "Start A Project",
    mini: "SPP",
    icon: LaunchIcon,
    component: StartProjectPage,
    privateSidebarItems: true,
    publicHeader: true
  },
  {
    path: "/find-project",
    name: "Find Project",
    short: "Find A project",
    mini: "FPP",
    icon: SearchIcon,
    component: ProjectSearch,
    privateSidebarItems: true,
    publicHeader: true
  },
  {
    path: "/how-it-works",
    name: "How It Works",
    short: "How It Works",
    mini: "HIWP",
    icon: HelpIcon,
    publicHeader: true,
    component: HowItWorksPage
  },
  {
    path: "/login",
    name: "Login",
    short: "Login",
    mini: "LP",
    icon: FingerprintIcon,
    publicHeader: true,
    component: LoginPage
  },
  {
    path: "/register",
    name: "Register",
    short: "Sign Up",
    mini: "RP",
    icon: PersonAddIcon,
    publicHeader: true,
    component: RegisterPage
  },
  {
    path: "/aboutus",
    name: "About Us",
    short: "About US",
    mini: "AU",
    icon: HelpIcon,
    publicHeader: true,
    component: AboutUs
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
    path: "/privacypolicy",
    name: "PrivacyPolicy",
    short: "PrivacyPolicy",
    mini: "PP",
    icon: PersonAddIcon,
    component: PrivacyPolicy
  },
  {
    path: "/termofuse",
    name: "TermOfUse",
    short: "TermOfUse",
    mini: "TOU",
    icon: PersonAddIcon,
    component: TermAndCondition
  },
  {
    path: "/cookiespolicy",
    name: "TermOfUse",
    short: "TermOfUse",
    mini: "CP",
    icon: PersonAddIcon,
    component: CookiesPolicy
  },
  {
    path: "/contactUs",
    name: "Contact Us",
    short: "Contact Us",
    mini: "CU",
    icon: PersonAddIcon,
    publicHeader: true,
    component: ContactForm
  },
  {
    path: "/",
    name: "Public Home Page",
    short: "Home",
    mini: "H",
    icon: LaunchIcon,
    // publicHeader: true,
    component: PublicHomePage
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
    path: "/contactUs",
    name: "Contact Us",
    short: "Contact Us",
    mini: "CU",
    icon: PersonAddIcon,
    component: ContactForm
  },
  {
    path: "/aboutus",
    name: "About Us",
    short: "About US",
    mini: "AU",
    icon: HelpIcon,
    component: AboutUs
  },
  {
    redirect: true,
    path: "/",
    pathTo: "/home",
    name: "Home"
  }
];


export const dashboardRoutes = [
  {
    path: "/home/start-project",
    name: "Start Project",
    short: "Start A Project",
    mini: "SPP",
    icon: LaunchIcon,
    component: StartProjectPage,
    privateSidebarItems: true,
    publicHeader: true
  },
  {
    path: "/home/find-project",
    name: "Find Project",
    short: "Find A project",
    mini: "FPP",
    icon: SearchIcon,
    component: ProjectSearch,
    privateSidebarItems: true,
    publicHeader: true
  },
  {
    path: "/home/my-projects",
    name: "My Projects",
    short: "My projects",
    mini: "MP",
    icon: myProjectsIcon,
    component: MyProjectsPage,
    privateSidebarItems: true,
    publicHeader: true
  },
  {
    path: "/home/project-details/tasks/create",
    name: "Create Project Tasks",
    short: "Create Tasks",
    mini: "CPTk",
    privateRoute: true,
    icon: SearchIcon,
    component: CreateProjectTaskDetails
  },
  {
    path: "/home/project-details/tasks/:id",
    name: "View Project Task",
    short: "View Task",
    mini: "CPTk",
    icon: SearchIcon,
    component: ProjectTaskDetails
  },
  {
    path: "/home/notifications",
    name: "Notifications",
    short: "Notifications",
    mini: "NP",
    privateRoute: true,
    privateSidebarItems: true,
    icon: NotificationsIcon,
    component: NotificationsPage
  },
  {
    path: "/home/settings",
    name: "Settings",
    short: "Settings",
    mini: "S",
    privateRoute: true,
    icon: NotificationsIcon,
    component: ProfileSettings
  },
  {
    path: "/home/projectCandidateReview/:id",
    name: "Project Candidate Review",
    short: "Project Candidate Review",
    mini: "PCR",
    privateRoute: true,
    icon: MessageIcon,
    component: CandidateReview
  },
  {
    path: "/home/profile/:id",
    name: "User Profile",
    short: "User Profile",
    mini: "UP",
    privateRoute: true,
    icon: PersonIcon,
    component: Profile
  },
  {
    path: "/home/profile",
    name: "User Profile",
    short: "User Profile",
    mini: "UP",
    privateRoute: true,
    icon: PersonIcon,
    component: UserProfile
  },
  {
    path: "/home/project/:projectId/user/:userId",
    name: "Project Applicant",
    short: "Project Applicant",
    mini: "PA",
    icon: PersonIcon,
    privateRoute: true,
    component: ProjectApplicantPage
  },
  {
    path: "/home/application-page/:id",
    name: "Application Page",
    short: "Application",
    mini: "AP",
    icon: FolderIcon,
    privateRoute: true,
    component: ApplicationPage
  },
  {
    path: "/home/project-details/info",
    // name: "Project Info",
    short: "Info",
    mini: "Info",
    icon: HomeIcon,
    component: ProjectDetails
  },
  {
    path: "/home/editProject",
    name: "Edit Project",
    short: "Edit Project",
    mini: "AP",
    icon: FolderIcon,
    component: EditProjectDetails
  },
  {
    path: "/home/project-details/tasks",
    name: "Project Tasks",
    short: "Tasks",
    mini: "PTk",
    icon: SearchIcon,
    component: ProjectTaskView
  },
  {
    redirect: true,
    path: "/home/project-details",
    pathTo: "/home/my-projects",
    name: "Home Page"
  },
  {
    path: "/home",
    name: "Home",
    short: "Home",
    mini: "MPP",
    icon: HomeIcon,
    privateSidebarItems: false,
    privateRoute: true,
    component: PvtHomePage
  },
]
export const projectPagesRoutes = [
  {
    path: "/home/project-details/info",
    //name: "Project Info",
    short: "Info",
    mini: "Info",
    icon: HomeIcon,
    component: ProjectDetails
  },
  {
    path: "/home/project-details/team",
    name: "Project Team",
    short: "Team",
    mini: "PTm",
    icon: LaunchIcon,
    component: ProjectTeam
  },
  {
    path: "/home/project-details/tasks",
    name: "Project Tasks",
    short: "Tasks",
    mini: "PTk",
    icon: SearchIcon,
    component: ProjectTaskView
  },
  {
    path: "/home/project-details/v1/chat",
    name: "Project Chat",
    short: "Chat",
    mini: "PC",
    icon: FolderIcon,
    component: ProjectChat
  }
];
export const projectPagesHeaderRoutes = [
  {
    path: "/home/project-details/info",
    name: "Details",
    short: "Details",
    mini: "D",
    icon: HomeIcon,
    component: ProjectDetails
  },
  {
    path: "/home/project-details/team",
    name: "Project Team",
    short: "Team",
    mini: "PTm",
    icon: LaunchIcon,
    component: ProjectTeam
  },
  {
    path: "/home/project-details/tasks",
    name: "Project Tasks",
    short: "Tasks",
    mini: "PTk",
    icon: SearchIcon,
    component: CreateProjectTaskDetails
  },
  {
    path: "/home/project-details/v1/chat",
    name: "Project Chat",
    short: "Chat",
    mini: "PC",
    icon: FolderIcon,
    component: ProjectChat
  }
];
