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
import UserProfile from "philance/views/Pages/UserProfilePage.jsx";
import ForgotPassword from "../views/Pages/ForgotPassword";
import ContactForm from "../views/Pages/ContactForm";
// @material-ui/icons
import HomeIcon from "@material-ui/icons/Home";
import LaunchIcon from "@material-ui/icons/Launch";
import SearchIcon from "@material-ui/icons/Search";
import HelpIcon from "@material-ui/icons/Help";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MessageIcon from "@material-ui/icons/Message";
import PersonIcon from "@material-ui/icons/Person";
import FolderIcon from "@material-ui/icons/Folder";

export const dashboardRoutes = [
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
    path: "/aboutus",
    name: "About Us",
    short: "About US",
    mini: "AU",
    icon: HelpIcon,
    component: AboutUs
  },
  {
    path: "/contactUs",
    name: "Contact Us",
    short: "Contact Us",
    mini: "CU",
    icon: PersonAddIcon,
    component: ContactForm
  },
];

