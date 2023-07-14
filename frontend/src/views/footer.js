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
import {
  Box,
  Container, Row,
  Column,
  FooterLink,
  Heading,
} from "./footerstyle";
  
const Footer = () => {
  return (
    <Box>
      <h1 style={{ color: "green", 
                   textAlign: "center", 
                   marginTop: "-50px" }}>
        GeeksforGeeks: A Computer Science Portal for Geeks
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="">Team</FooterLink>
            <FooterLink> Vision </FooterLink>
            <FooterLink> Mission </FooterLink>
            <FooterLink> Contact: 1800-757-438 </FooterLink>
          </Column>
          <Column>
            <Heading>Corporate</Heading>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Reports</FooterLink>
            <FooterLink href="#">Partners</FooterLink>
          </Column>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="#">Uttar Pradesh</FooterLink>
            <FooterLink href="#">Ahemdabad</FooterLink>
            <FooterLink href="#">Indore</FooterLink>
            <FooterLink href="#">Mumbai</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;