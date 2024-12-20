import React from "react";
import "./style.scss";

import GithubLogo from '../../images/github.png';
import LinkedinLogo from '../../images/linkedin.png';
import Needle from '../../images/needle.png';

export default function Header() {
    return (
    <section className={"header-section"}>
        

        <div class="col-table">
            <div class="col-1">
                <h1 id="header-text">Hi, I'm Dario. </h1>
                <p id="header-text">I study Linguistics and Computer Science at Trinity College Dublin.</p>
                <div className="logo-container">
                    <a  href="https://www.github.com/dcipani" target="_blank" rel="noopener noreferrer">
                        <img src={GithubLogo} alt="github"  className="logo" />               
                    </a>
                    <a  href="https://www.linkedin.com/in/dario-cipani-b82bb3269" target="_blank" rel="noopener noreferrer">
                        <img src={LinkedinLogo} alt="linkedin" className="logo"/>
                    </a>
                </div>
            </div>
            <div class="col-2">
                {/* <img src={Yarn} alt="Yarn"  className="yarn-ball" />                */}
                <img src={Needle} alt="Needle"  className="needle" />               
            </div>
        </div>    


       
    </section>);
}