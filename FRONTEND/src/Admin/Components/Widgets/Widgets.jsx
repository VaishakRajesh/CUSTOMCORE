import React from 'react'
import Styles from './Widgets.module.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonOutLinedIcon from '@mui/icons-material/PersonOutLined';
import { AccountBalanceOutlined, MonetizationOnOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { colors } from '@mui/material';

const Widgets = ({type}) => {
    let data;

    // temp
    const amount = 100;
    const diff = 20;
    switch(type){
        case "user":
            data={
                title: "USER",
                isMoney: false,
                link: "see all users",
                icon: (
                    <PersonOutLinedIcon className={Styles.Icon} style={
                        {
                        color: "red",
                        }
                    }/>
                )
            };
            break;
        case "order":
            data={
                title: "ORDER",
                isMoney: false,
                link: "View all Order",
                icon: (
                    <ShoppingCartOutlined className={Styles.Icon}
                    style={
                        {
                        color: "green",
                        }
                    }/>
                )
            };
            break;
        case "earning":
            data={
                title: "EARNING",
                isMoney: true,
                link: "View net earning",
                icon: (
                    <MonetizationOnOutlined className={Styles.Icon}
                    style={
                        {
                        color: "Yellow",
                        }
                    }/>
                )
            };
            break;
        case "balance":
            data={
                title: "BALANCE",
                isMoney: true,
                link: "See Details",
                icon: (
                    <AccountBalanceOutlined className={Styles.Icon}
                    style={
                        {
                        color: "blue",
                        }
                    }/>
                )
            };
            break;
        default:
            break;
    }
    return (
        <div className={Styles.Widgets}>
            <div className={Styles.Left}>
                <span className={Styles.Title}>{data.title}</span>
                <span className={Styles.Counter}>
                    {data.isMoney && "$"} {amount}</span>
                <span className={Styles.Link}>{data.link}</span>
            </div>
            <div className={Styles.Right}>
                <div className={Styles.Percentage}>
                    <div className={Styles.positive}>
                        <KeyboardArrowUpIcon />
                        {diff}%
                    </div>
                    </div>
                    {data.icon}
                </div>
            </div>
            )
}

            export default Widgets