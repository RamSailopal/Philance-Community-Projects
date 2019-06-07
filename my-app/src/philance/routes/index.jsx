import PublicHomePage from "philance/views/Pages/PublicHomePage.jsx";
import Pages from "philance/layouts/Pages.jsx";
import Dashboard from "../layouts/Dashboard";

var indexRoutes = [
    {
        path: "/home", name: "dashboard", component: Dashboard
    },
    {
        path: "/", name: "Home", component: Pages
    }
];

export default indexRoutes;
