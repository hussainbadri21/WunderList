import React from 'react';
import {G_COOKIE_NAME, G_URL} from "../../constants/constants";
import logo from "../../assets/Wunderlist-logo.png";
import {Button} from "antd";
import {check_login} from "../../utils/cookie.util";
import {__deleteCookie} from "../../utils/cookie.util";

const Navbar = () => {
    const logout = () => {
        __deleteCookie(G_COOKIE_NAME)
        window.location.href = G_URL
    }
    return (
        <>
            <div id="main-navbar" className="navbar-container nav-hover f-d f-v-c f-h-sb">
                <div className="navbar-left-container f-d f-v-c">
                    <div
                        className="brand-logo c-pointer f-d f-v-c"
                        onClick={() => (window.location.href = G_URL)}
                    >
                        <img src={logo} alt="logo"/>
                    </div>
                </div>
                <div className="navbar-right-container f-d f-v-c">
                    {check_login() ?
                        <Button
                            className="logout-btn default-btn filled-blue"
                            type="primary" onClick={logout}
                        >
                            Logout
                        </Button> : ''}
                </div>
            </div>
            <style jsx={"true"}>
                {`
                  .navbar-container {
                    height: 64px;
                    background: #ffffff;
                    box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0);
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    transition: all 0.2s;
                    padding-left: 5rem;
                    padding-right: 5rem;
                  }

                  .navbar-container.nav-hover {
                    height: 82px;
                    box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.08);
                  }

                  .navbar-container .brand-logo > img {
                    height: 50px;
                    padding-right: 2rem;
                  }

                  @media only screen and (max-device-width: 760px) {
                    .navbar-right-container {
                      margin-left: 1.5rem;
                    }

                    .navbar-container .brand-logo > img {
                      height: 36px;
                      padding-right: 1rem;
                    }

                    .navbar-container.nav-hover {
                      height: 82px;
                      box-shadow: 0px 5px 11px 0px rgba(50, 50, 50, 0.08);
                    }
                  }
                `}
            </style>

        </>
    );
}

export default Navbar;
