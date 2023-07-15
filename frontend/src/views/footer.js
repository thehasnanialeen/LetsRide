// import React from "react";

// const Footer = () => {
//     return(
//         <div className="header">
//             <div className="logo">
//                 <h1>MovieCity</h1>
//             </div>
//             <nav className="navigation">
//                 <ul>
//                     <li><a href="/">Let's ride </a></li>
//                     <li><a href="/">Logo</a></li>
//                 </ul>
//                 <button type="button">SignUp</button>
//             </nav>
//         </div>
//     );
// }
// export default Footer;

import React from "react";
import '../App.css';
  
const Footer = () => {
  return (
    <body className="bodyfoot">
      <Container className="containerfoot">
        <Row className="rowfoot">
          <Column className="colfoot">
            <Heading className="headfoot"> About Us</Heading>
            <FooterLink className="linkfoot" href="">Team</FooterLink>
            <FooterLink className="linkfoot"> Vision </FooterLink>
            <FooterLink className="linkfoot"> Mission </FooterLink>
            <FooterLink className="linkfoot"> Contact: 1 800-757-438 </FooterLink>
          </Column>
          <Column>
            <Heading className="headfoot">Corporate</Heading>
            <FooterLink className="linkfoot"  href="#">Careers</FooterLink>
            <FooterLink className="linkfoot" href="#">Reports</FooterLink>
            <FooterLink className="linkfoot" href="#">Partners</FooterLink>
          </Column>
          <Column>
            <Heading className="headfoot">Socials</Heading>
            <FooterLink className="linkfoot" href="#">Facebook</FooterLink>
            <FooterLink className="linkfoot" href="#">Instagram</FooterLink>
            <FooterLink className="linkfoot" href="#">Twitter</FooterLink>
          </Column>
        </Row>
      </Container>
    </body>
  );
};
export default Footer;