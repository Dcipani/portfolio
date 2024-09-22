import React from "react";
import "./style.scss";
import SectionHeader from "../SectionHeader";

export default function About() {
    return (
    <section className={"about-section"}>
        <SectionHeader title='about'/>
        <p id="about-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nisi reiciendis at magnam pariatur sint. Vitae voluptatibus nihil ex recusandae quibusdam porro labore delectus in, hic facere dolorem repellendus minima?</p>
    </section>);
}