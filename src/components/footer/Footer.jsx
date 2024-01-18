import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import "./style.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <ContentWrapper>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHandlar("terms-of-use")}> Terms Of Use</li>
                    <li className="menuItem" onClick={() => navigationHandlar("privacy-policy")}>Privacy-Policy</li>
                    <li className="menuItem" onClick={() => navigationHandlar("about")}>About</li>
                    <li className="menuItem" onClick={() => navigationHandlar("blog")}>Blog</li>
                    <li className="menuItem" onClick={() => navigationHandlar("faq")}>FAQ</li>
                </ul>
                <div className="infoText">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <ul className="socialIcons">
                    <li className="icon"><FaFacebookF /></li>
                    <li className="icon"><FaInstagram /></li>
                    <li className="icon"><FaTwitter /></li>
                    <li className="icon"><FaLinkedin /></li>
                </ul>
            </ContentWrapper>
        </footer >
    );
};

export default Footer;