"use client";
import { useState } from "react";
import DropDownMenuLanguage from "./DropDownMenuLanguage";
import { Input } from "./ui/input";

const SnippetsSearchForm = () => {
    const [language, setLanguage] = useState("javascript");
    return (
        <div>
            <form>
                <Input type="text" />
                <DropDownMenuLanguage
                    language={language}
                    setLanguage={setLanguage}
                />
                <Input type="text" />
                <Input type="text" />
            </form>
        </div>
    );
};
export default SnippetsSearchForm;
