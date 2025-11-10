"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { handleUpdateSnippet } from "@/actions";
import { SnippetType } from "@/types";
import { useActionState } from "react";
import TagsInput from "./TagsInput";
import DropDownMenuLanguage from "./DropDownMenuLanguage";
import dynamic from "next/dynamic";
import { getDefaultComment } from "@/lib/getDefaultComment";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function EditSnippetForm({ snippet }: { snippet: SnippetType }) {
    const [title, setTitle] = useState(snippet.title);
    const [description, setDescription] = useState(snippet.description);
    const [language, setLanguage] = useState(snippet.language);
    const [code, setCode] = useState(snippet.code);
    const [tags, setTags] = useState(snippet.tags);

    const initState = { type: "", message: "" };
    const [state, action, isPending] = useActionState(
        handleUpdateSnippet,
        initState
    );

    return (
        <form action={action}>
            <input type="hidden" name="id" value={snippet._id} />

            <Input
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />

            <Input
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />

            <TagsInput value={tags} onTagsChange={setTags} />
            {tags.map((tag) => (
                <input key={tag} type="hidden" name="tags" value={tag} />
            ))}

            <DropDownMenuLanguage
                language={language}
                setLanguage={setLanguage}
            />
            <input type="hidden" name="language" value={language} />

            <div className="border rounded-lg">
                <Editor
                    height="400px"
                    theme="vs-dark"
                    language={language}
                    value={code}
                    onChange={(value) => setCode(value ?? "")}
                />
            </div>
            <input type="hidden" name="code" value={code} />

            <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Update Snippet"}
            </Button>
        </form>
    );
}
