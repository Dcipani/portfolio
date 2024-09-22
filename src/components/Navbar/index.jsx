import React from "react";
import { useState } from 'react';

import "./style.scss";

export default function Navbar() {
    const [active, setActive] = useState('intro');

    return <div className={"navbar"}>
        
        <ul>  
            <li> <a href="#home" id="active"> Home </a></li>
            <li> <a href="#about"> About </a></li>
            <li> <a href="#portfolio"> Projects </a></li>
        </ul>
    </div>;
}




// export default Navbar;