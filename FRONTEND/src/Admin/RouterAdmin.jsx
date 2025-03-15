import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/home/Home";
import List from "./Pages/List/List";
import Login from "./Pages/Login/Login";
import New from "./Pages/New/New";
import Single from "./Pages/Single/Single";
import Profile from "./Pages/Profile/Profile";
import Types from "./Pages/Types/Types";
import Ram from "./Pages/Ram/Ram";
import Storage from "./Pages/Storage/Storage";
import MotherBoard from "./Pages/MotherBoard/MotherBoard";
import Company from "./Pages/Company/Company";
import GraphicCard from "./Pages/GraphicCard/GraphicCard";
import SMPS from "./Pages/SMPS/SMPS";
import Cooler from "./Pages/Cooler/Cooler";
import Case from "./Pages/Case/Case";
import Select from "./Pages/Select/Select";
import ViewUser from "./Pages/ViewUser/ViewUser";
import ViewUserDetails from "./Pages/ViewUserDetails/ViewUserDetails";
import ViewBulider from "./Pages/ViewBulider/ViewBulider";
import District from "./Pages/District/District";
import Place from "./Pages/Place/Place";
import TypesReport from "./Pages/Report/TypesReport/TypesReport";
import StorageReport from "./Pages/Report/StorageReport/StorageReport";
import CompanyReport from "./Pages/Report/CompanyReport/CompanyReport";
import GraphicCardReport from "./Pages/Report/GraphicCardReport/GraphicCardReport";
import CoolerReport from "./Pages/Report/CoolerReport/CoolerReport";
import CaseReport from "./Pages/Report/CaseReport/CaseReport";
import MotherBoardReport from "./Pages/Report/MotherBoardReport/MotherBoardReport";
import RamReport from "./Pages/Report/RamReport/RamReport";
import SMPSReport from "./Pages/Report/SMPSReport/SMPSReport";
import CPU from "./Pages/CPU/CPU";
import CPUReport from "./Pages/Report/CPUReport/CPUReport";
import Product from "./Pages/Products/Product";

export const RouterAdmin = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/users",
        element: <List/>
    },
    {
        path: "/Login",
        element: <Login/>
    },
    {
        path: "/New",
        element: <New/>
    },
    {
        path: "/Single",
        element: <Single/>
    },
    {
        path: "/product",
        element: <Product/>
    },
    {
        path: "/Profile",
        element: <Profile/>
    },
    {
        path: "/Types",
        element: <Types/>
    },
    {
        path: "/Ram",
        element: <Ram/>
    },
    {
        path: "/Storage",
        element: <Storage/>
    },
    {
        path: "/MotherBoard",
        element: <MotherBoard/>
    },
    {
        path: "/Company",
        element: <Company/>
    },
    {
        path: "/GraphicCard",
        element: <GraphicCard/>
    },
    {
        path: "/SMPS",
        element: <SMPS/>
    },
    {
        path: "/Cooler",
        element: <Cooler/>
    },
    {
        path: "/Case",
        element: <Case/>
    },
    {
        path: "/Select",
        element: <Select/>
    },
    {
        path: "/ViewUser",
        element: <ViewUser/>
    },
    {
        path: "/ViewUserDetails",
        element: <ViewUserDetails/>
    },
    {
        path: "/ViewBulider",
        element: <ViewBulider/>
    },
    {
        path: "/District",
        element: <District/>
    },
    {
        path: "/Place",
        element: <Place/>
    },
    {
        path: "/TypesReport",
        element: <TypesReport/>
    },
    {
        path: "/StorageReport",
        element: <StorageReport/>
    },
    {
        path: "/CompanyReport",
        element: <CompanyReport/>
    },
    {
        path: "/GraphicCardReport",
        element: <GraphicCardReport/>
    },
    {
        path: "/CoolerReport",
        element: <CoolerReport/>
    },
    {
        path: "/CaseReport",
        element: <CaseReport/>
    },
    {
        path: "/MotherBoardReport",
        element: <MotherBoardReport/>
    },
    {
        path: "/RamReport",
        element: <RamReport/>
    },
    {
        path: "/SMPSReport",
        element: <SMPSReport/>
    },
    {
        path: "/CPU",
        element: <CPU/>
    },
    {
        path: "/CPUReport",
        element: <CPUReport/>
    },
])