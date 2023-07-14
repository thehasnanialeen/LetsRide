import React from "react";

const Header = () => {
    return(
        <div className="header">
            <div className="logo">
                <h1>MovieCity</h1>
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="/">Let's ride </a></li>
                    <li><a href="/">Logo</a></li>
                </ul>
                <button type="button">SignUp</button>
            </nav>
        </div>
    );
}
export default Header;