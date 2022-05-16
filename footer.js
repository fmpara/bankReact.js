import React from "react";

import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub";

const Footer = () => (
  <div className="footer">
    <div className="container">
      <div className="left">
        Znajdziesz nas też na{" "}
        <a href="https://github.com/fmpara/website-react">
          <AiFillGithub />
        </a>
      </div>
      <span>Powered by LLMdesign</span>
    </div>
  </div>
);

export default Footer;
