import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Guest/HomePage/HomePage";
import Login from "./Guest/Login/Login";
import BuliderReg from "./Guest/BuliderReg/BuliderReg";
import SeleReg from "./Guest/SeleReg/SeleReg";
import Userreg from "./Guest/UserReg/Userreg";
import Home from "./Admin/Pages/home/Home";
import List from "./Admin/Components/Table/Table";
import New from "./Admin/Pages/New/New";
import Single from "./Admin/Pages/Single/Single";
import Profile from "./Admin/Pages/Profile/Profile";
import Types from "./Admin/Pages/Types/Types";
import Ram from "./Admin/Pages/Ram/Ram";
import Storage from "./Admin/Pages/Storage/Storage";
import MotherBoard from "./Admin/Pages/MotherBoard/MotherBoard";
import Company from "./Admin/Pages/Company/Company";
import GraphicCard from "./Admin/Pages/GraphicCard/GraphicCard";
import SMPS from "./Admin/Pages/SMPS/SMPS";
import Cooler from "./Admin/Pages/Cooler/Cooler";
import Case from "./Admin/Pages/Case/Case";
import Select from "./Admin/Pages/Select/Select";
import ViewUser from "./Admin/Pages/ViewUser/ViewUser";
import ViewUserDetails from "./Admin/Pages/ViewUserDetails/ViewUserDetails";
import ViewBulider from "./Admin/Pages/ViewBulider/ViewBulider";
import District from "./Admin/Pages/District/District";
import Place from "./Admin/Pages/Place/Place";
import TypesReport from "./Admin/Pages/Report/TypesReport/TypesReport";
import StorageReport from "./Admin/Pages/Report/StorageReport/StorageReport";
import CompanyReport from "./Admin/Pages/Report/CompanyReport/CompanyReport";
import GraphicCardReport from "./Admin/Pages/Report/GraphicCardReport/GraphicCardReport";
import CoolerReport from "./Admin/Pages/Report/CoolerReport/CoolerReport";
import CaseReport from "./Admin/Pages/Report/CaseReport/CaseReport";
import MotherBoardReport from "./Admin/Pages/Report/MotherBoardReport/MotherBoardReport";
import RamReport from "./Admin/Pages/Report/RamReport/RamReport";
import SMPSReport from "./Admin/Pages/Report/SMPSReport/SMPSReport";
import CPU from "./Admin/Pages/CPU/CPU";
import Product from "./Admin/Pages/Products/Product";
import CPUReport from "./Admin/Pages/Report/CPUReport/CPUReport";
import { RouterAdmin } from "./Admin/RouterAdmin";
import UserHomePage from "./User/UserHomepage/UserHomePage";
import UserProfile from "./User/UserProfile/UserProfile";
import UserEditProfile from "./User/UserEditProfile/UserEditProfile";
import UserChangePassword from "./User/UserChangePassword/UserChangePassword";
import UserComplaint from "./User/UserComplaint/UserComplaint";
import UserNavbar from "./User/UserNavbar/UserNavbar";
import Advancelevel from "./User/Advancelevel/Advancelevel";
import FeedBack from "./User/FeedBack/FeedBack";
import BuliderHomePage from "./Pc Buliders/BuliderHomepage/BuliderHomePage";
import BuliderChangePassword from "./Pc Buliders/BuliderChangePassword/BuliderChangePassword";
import BuliderEditProfile from "./Pc Buliders/BuliderEditProfile/BuliderEditProfile";
import BuliderProfile from "./Pc Buliders/BuliderProfile/BuliderProfile";
import BuliderComplaint from "./Pc Buliders/BuliderComplaint/BuliderComplaint";
import App from "./Admin/App";
import Default from "./User/UserHomepage/Default";
import EasyToBulid from "./User/EasyToBulid/EasyToBulid";
import BuliderNavbar from "./Pc Buliders/BuliderNavbar/BuliderNavbar";
import PcBuliderSelect from "./User/PcBuliderSelect/PcBuliderSelect";
import Editprofile from "./Admin/Pages/Editprofile/Editprofile";
import ViewBuliderDetails from "./Admin/Pages/ViewBuliderDetails/ViewBuliderDetails";
import BuilderBooking from "./Pc Buliders/BuliderBooking/BuliderBooking";
import Feedback from "./Admin/Pages/Feedback/Feedback";
import Complaint from "./Admin/Pages/Complaint/Complaint";
import AddAdmin from "./Admin/Pages/RegisterAdmin/RegisterAdmin";
import RegisterAdmin from "./Admin/Pages/RegisterAdmin/RegisterAdmin";
import CustomPcStatus from "./User/CustomPcStatus/CustomPcStatus";
import Payment from "./User/Payment/Payment";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: 'Login',
        element: <Login />,
    },
    {
        path: "/SeleReg",
        element: <SeleReg />
    },
    {
        path: "/BuliderReg",
        element: <BuliderReg />
    },
    {
        path: "/UserReg",
        element: <Userreg />
    },
    {
        path: '/Admin',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "ViewUser",
                element: <ViewUser />
            },
            {
                path: "ViewUserDetails/:id",
                element: <ViewUserDetails />
            },
            {
                path: "ViewBuliderDetails/:id",
                element: <ViewBuliderDetails />
            },
            {
                path: "New",
                element: <New />
            },
            {
                path: "Single",
                element: <Single />
            },
            {
                path: "product",
                element: <Product />
            },
            {
                path: "Profile",
                element: <Profile />
            },
            {
                path: "Types",
                element: <Types />
            },
            {
                path: "Ram",
                element: <Ram />
            },
            {
                path: "Storage",
                element: <Storage />
            },
            {
                path: "MotherBoard",
                element: <MotherBoard />
            },
            {
                path: "Company",
                element: <Company />
            },
            {
                path: "GraphicCard",
                element: <GraphicCard />
            },
            {
                path: "SMPS",
                element: <SMPS />
            },
            {
                path: "Cooler",
                element: <Cooler />
            },
            {
                path: "Case",
                element: <Case />
            },
            {
                path: "Select",
                element: <Select />
            },
            {
                path: "ViewUser",
                element: <ViewUser />
            },
            {
                path: "ViewUserDetails",
                element: <ViewUserDetails />
            },
            {
                path: "ViewBulider",
                element: <ViewBulider />
            },
            {
                path: "District",
                element: <District />
            },
            {
                path: "Place",
                element: <Place />
            },
            {
                path: "TypesReport",
                element: <TypesReport />
            },
            {
                path: "StorageReport",
                element: <StorageReport />
            },
            {
                path: "CompanyReport",
                element: <CompanyReport />
            },
            {
                path: "GraphicCardReport",
                element: <GraphicCardReport />
            },
            {
                path: "CoolerReport",
                element: <CoolerReport />
            },
            {
                path: "CaseReport",
                element: <CaseReport />
            },
            {
                path: "MotherBoardReport",
                element: <MotherBoardReport />
            },
            {
                path: "RamReport",
                element: <RamReport />
            },
            {
                path: "SMPSReport",
                element: <SMPSReport />
            },
            {
                path: "CPU",
                element: <CPU />
            },
            {
                path: "CPUReport",
                element: <CPUReport />
            },
            {
                path: "Editprofile",
                element: <Editprofile />
            },
            {
                path: "Feedback",
                element: <Feedback/>
            },
            {
                path: "Complaint",
                element: <Complaint />
            },
            {
                path: "RegisterAdmin",
                element: <RegisterAdmin />
            },
        ]
    },
    {
        path: '/User',
        element: <UserHomePage />,
        children: [
            {
                path: "",
                element: <Default />
            },
            {
                path: "UserProfile",
                element: <UserProfile />
            },
            {
                path: "UserEditProfile",
                element: <UserEditProfile />
            },
            {
                path: "UserChangePassword",
                element: <UserChangePassword />
            },
            {
                path: "UserComplaint",
                element: <UserComplaint />
            },
            {
                path: "UserNavbar",
                element: <UserNavbar />
            },
            {
                path: "Advancelevel/:id",
                element: <Advancelevel />
            },
            {
                path: "FeedBack",
                element: <FeedBack />
            },
            {
                path: "EasyToBulid",
                element: <EasyToBulid />
            },
            {
                path: "PcBuliderSelect",
                element: <PcBuliderSelect />
            },
            {
                path: "CustomPcStatus",
                element: <CustomPcStatus />
            },
            {
                path: "Payment",
                element: <Payment />
            },
        ]
    },
    {
        path: '/PcBulider',
        element: <BuliderNavbar />,
        children: [

            {
                path: "",
                element: <BuliderHomePage />
            },

            {
                path: "BuliderChangePassword",
                element: <BuliderChangePassword />
            },
            {
                path: "BuliderEditProfile",
                element: <BuliderEditProfile />
            },
            {
                path: "BuliderProfile",
                element: <BuliderProfile />
            },
            {
                path: "BuliderComplaint",
                element: <BuliderComplaint />
            },
            {
                path: "BuilderBooking",
                element: <BuilderBooking />
            },


        ]
    },



])