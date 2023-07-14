import React from "react";

  
const Header = () => {
  return (
    <body>
    <nav>
        <div class="heading">Landing Page</div>
        <span class="sideMenuButton" 
            onclick="openNavbar()">
            ☰
        </span>
  
        <div class="navbar">
            <ul>
                <li><a href="#Home">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Sign Up</a></li>
            </ul>
        </div>
    </nav>
  
    {/* <!-- Side navigation bar for 
        responsive website --> */}
    <div class="sideNavigationBar" 
        id="sideNavigationBar">
        <a href="#" class="closeButton" 
            onclick="closeNavbar()">
            ❌
        </a>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Sign Up</a>
    </div>
    </body>
  
  );
};
export default Header;