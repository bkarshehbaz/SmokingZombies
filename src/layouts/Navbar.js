import React from 'react'
import { Link } from 'react-router-dom';

import { appRoutes } from '../../utils/routes';

const Navbar = () => {
    const navbarStyle = {
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        gap: "18px",
        listStyle: "none",
        backgroundColor: "#fff",
        height: '40px',
        margin: 0,
        padding: "25px 0",
    }

    const leftNavStyle = {
        margin: "30px 0 30px 20px"
    }

    const imageStyle = {
        alignSelf: "center"
    }

    return (
        <>
            <ul style={navbarStyle}>
                <li>
                    <div style={leftNavStyle}>
                        <img width={30} style={imageStyle} src="left-arrow.png" alt="sz-logo" />
                    </div>
                </li>
                <li>
                    <img width={120} style={imageStyle} src="smoking-zombie-logo.png" alt="sz-logo" />
                </li>
                <li>
                    <div></div>
                </li>
            </ul>
        </>
    )
}

export default Navbar
