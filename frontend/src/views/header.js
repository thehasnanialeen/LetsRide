import React from "react";

  
const Header = () => {
  return (
<ul>  <li class="nav-item" role="presentation">
    <button class="nav-link active rounded-5" id="home-tab2" data-bs-toggle="tab" type="button" role="tab" aria-selected="true">Home</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link rounded-5" id="profile-tab2" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">Profile</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link rounded-5" id="contact-tab2" data-bs-toggle="tab" type="button" role="tab" aria-selected="false">Contact</button>
  </li>
</ul>
    // <body>
    // <nav>
    //     <div class="heading"> Let's Ride</div>
    //     <span class="sideMenuButton" 
    //         onclick="openNavbar()">
    //         ☰
    //     </span>
  
    //     <div class="navbar">
    //         <ul>
    //             <li><a href="#Home">Home</a></li>
    //             <li><a href="#">About</a></li>
    //             <li><a href="./signup.js">Sign Up</a></li>
    //         </ul>
    //     </div>
    // </nav>
  
    // {/* <!-- Side navigation bar for 
    //     responsive website --> */}
    // <div class="sideNavigationBar" 
    //     id="sideNavigationBar">
    //     <a href="#" class="closeButton" 
    //         onclick="closeNavbar()">
    //         ❌
    //     </a>
    //     <a href="#">Home</a>
    //     <a href="#">About</a>
    //     <a href="#">Sign Up</a>
    // </div>
    // </body>
  
  );
};
export default Header;