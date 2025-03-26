import React from 'react';
import Styles from './Widgets.module.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Widgets = ({ type }) => {
    let data;
    const amount = 100;
    const diff = 20;
    
    switch (type) {
        case "totalUsers":
            data = {
                title: "TOTAL USERS",
                isMoney: false,
                link: "View all users",
                icon: <PeopleAltOutlinedIcon className={Styles.Icon} style={{ color: "#ff5733" }} />
            };
            break;
        case "pcBuilders":
            data = {
                title: "PC BUILDERS",
                isMoney: false,
                link: "View PC builders",
                icon: <BuildOutlinedIcon className={Styles.Icon} style={{ color: "#4287f5" }} />
            };
            break;
        case "bookings":
            data = {
                title: "TOTAL BOOKINGS",
                isMoney: false,
                link: "View all bookings",
                icon: <EventAvailableOutlinedIcon className={Styles.Icon} style={{ color: "#33cc33" }} />
            };
            break;
        case "orders":
            data = {
                title: "TOTAL ORDERS",
                isMoney: false,
                link: "View all orders",
                icon: <ShoppingCartOutlinedIcon className={Styles.Icon} style={{ color: "#f4c542" }} />
            };
            break;
        default:
            data = {
                title: "UNKNOWN",
                isMoney: false,
                link: "No data available",
                icon: null
            };
            break;
    }

    return (
        <div className={Styles.Widgets}>
            <div className={Styles.Left}>
                <span className={Styles.Title}>{data.title}</span>
                <span className={Styles.Counter}>{amount}</span>
                <span className={Styles.Link}>{data.link}</span>
            </div>
            <div className={Styles.Right}>
                <div className={Styles.Percentage}>
                    <div className={Styles.positive}>
                        <KeyboardArrowUpIcon />
                        {diff}%
                    </div>
                </div>
                {data.icon && <div className={Styles.IconContainer}>{data.icon}</div>}
            </div>
        </div>
    );
}

export default Widgets;
