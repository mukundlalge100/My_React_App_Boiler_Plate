import React from "react";
import classes from "./Footer.module.scss";
import { ReactComponent as Facebook } from "../../../assets/SVG/facebook2.svg";
import { ReactComponent as Twitter } from "../../../assets/SVG/twitter.svg";
import { ReactComponent as Instagram } from "../../../assets/SVG/instagram.svg";
import { ReactComponent as Linkedin } from "../../../assets/SVG/linkedin.svg";
import { ReactComponent as YouTube } from "../../../assets/SVG/youtube.svg";
import { ReactComponent as Brand } from "../../../assets/SVG/shopify.svg";
import Wave from "../../../assets/images/wave-1817646_1920.png";
const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <Brand className={classes.Footer_Brand} />

      <div className={classes.Footer_Container}>
        <ul className={classes.Footer_Navigation}>
          <li>
            <a href="/#" className={classes.Footer_Link}>
              Company
            </a>
          </li>
          <li>
            <a href="/#" className={classes.Footer_Link}>
              Contact us
            </a>
          </li>
          <li>
            <a href="/#" className={classes.Footer_Link}>
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/#" className={classes.Footer_Link}>
              Terms
            </a>
          </li>
        </ul>
        <p className={classes.Footer_Copyright}>
          Built by{" "}
          <a href="/#" className={classes.Footer_Link}>
            Mukund Lalge
          </a>
          {"  , "}
          Copyright &copy; {new Date().getFullYear()} Shopping King -- Buy it or
          Sell it
        </p>
      </div>
      <div className={classes.Footer_SocialMedia}>
        <p className={classes.Footer_SocialMedia__Heading}>Follow Us </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/mukundlalge49"
        >
          <Facebook className={classes.Footer_SocialMedia__Icon} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/mukund_lalge100"
        >
          <Instagram className={classes.Footer_SocialMedia__Icon} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.twitter.com/mukundlalge100"
        >
          <Twitter className={classes.Footer_SocialMedia__Icon} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/mukundlalge49"
        >
          <Linkedin className={classes.Footer_SocialMedia__Icon} />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/mukundlalge100"
        >
          <YouTube className={classes.Footer_SocialMedia__Icon} />
        </a>
      </div>
      <div className={classes.Footer_ImageContainer}>
        <img
          src={Wave}
          alt=""
          className={classes.Footer_ImageContainer__Image}
        />
      </div>
    </footer>
  );
};

export default Footer;
