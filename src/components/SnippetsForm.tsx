"use client";
import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import languages from "@/app/helpers/languages";
import dynamic from "next/dynamic";
import { getDefaultComment } from "@/lib/getDefaultComment";

import TagsInput from "./TagsInput";
import { Message } from "@/types";
import { handleAddSnippet } from "@/actions";
import DropDownMenuLanguage from "./DropDownMenuLanguage";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const SnippetsForm = () => {
    const initState: Message = { type: "", message: "" };
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState(getDefaultComment("javascript"));
    const [tags, setTags] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const selected =
        languages.find((l) => l.key === language)?.label || "Select language";

    useEffect(() => {
        setCode(getDefaultComment(language));
    }, [language]);

    const [state, action, isPending] = useActionState(
        handleAddSnippet,
        initState
    );
    useEffect(() => {
        if (state.type === "success") {
            // Reset all fields
            setTitle("");
            setDescription("");
            setLanguage("javascript");
            setCode(getDefaultComment("javascript"));
            setTags([]);
        }
    }, [state]);
    return (
        <div>
            <form action={action}>
                <div>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <TagsInput onTagsChange={setTags} value={tags} />
                    {tags.map((tag) => (
                        <input
                            key={tag}
                            type="hidden"
                            name="tags"
                            value={tag}
                        />
                    ))}
                </div>
                <DropDownMenuLanguage
                    language={language}
                    setLanguage={setLanguage}
                />
                {/* <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">{selected}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>
                                Programming Language
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                                value={language}
                                onValueChange={setLanguage}
                            >
                                {languages.map((lang) => (
                                    <DropdownMenuRadioItem
                                        key={lang.key}
                                        value={lang.key}
                                    >
                                        {lang.label}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <input type="hidden" name="language" value={language} />
                </div> */}
                <div className="border rounded-lg ">
                    <Editor
                        height="400px"
                        theme="vs-dark"
                        language={language}
                        value={code}
                        onChange={(value) => setCode(value ?? "")}
                    />
                </div>
                <input type="hidden" name="code" value={code} />
                <div>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </div>
    );
};
export default SnippetsForm;
