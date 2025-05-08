import React, { useState } from "react";
import Footer from "../components/footer";
import "../App.css";
import BlogNav from "../components/blogComponents/blognav";
import PreviewBlog from "../components/submitpage/PreviewBlog";
import Instructions from "../components/submitpage/Instructions";
import Accordion from "../components/submitpage/Accordion";

export const Submit = () => {
    const [value, setValue] = useState<string>("");
    const title = "";
    const content = "";

    return (
        <>
            <div className="bg-black py-[1px] ">
                <BlogNav />        
                <Instructions />
                <PreviewBlog />
                <Accordion />
                <Footer />
            </div>
        </>
    );
};
