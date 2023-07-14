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
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="">Team</FooterLink>
            <FooterLink> Vision </FooterLink>
            <FooterLink> Mission </FooterLink>
            <FooterLink> Contact: 1 800-757-438 </FooterLink>
          </Column>
          <Column>
            <Heading>Corporate</Heading>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Reports</FooterLink>
            <FooterLink href="#">Partners</FooterLink>
          </Column>
          <Column>
            <Heading>Socials</Heading>
            <FooterLink href="#">Facebook</FooterLink>
            <FooterLink href="#">Instagram</FooterLink>
            <FooterLink href="#">Twitter</FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;