"use client";
//react imports
import { useActionState, useEffect, useState } from "react";
//shadcn imports
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
//next imports
import dynamic from "next/dynamic";
//lib imports
import { getDefaultComment } from "@/lib/getDefaultComment";
//type imports
import { Message } from "@/types";
//action imports
import { handleAddSnippet } from "@/actions";
//component imports
import TagsInput from "./TagsInput";
import DropDownMenuLanguage from "./DropDownMenuLanguage";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function SnippetsForm() {
    //states
    const [mode, setMode] = useState<"manual" | "ai">("manual");
    const [language, setLanguage] = useState("");
    const [code, setCode] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(false);

    // Action state
    const initState: Message = { type: "", message: "" };
    const [state, action, isPending] = useActionState(
        handleAddSnippet,
        initState
    );

    // Only runs when language changes
    useEffect(() => {
        if (language) setCode(getDefaultComment(language));
    }, [language]);

    // Reset after success
    useEffect(() => {
        if (state.type === "success") {
            setTitle("");
            setDescription("");
            setLanguage("");
            setCode("");
            setTags([]);
            setIsPublic(false);
        }
    }, [state]);

    // Clear form
    const handleClear = () => {
        setTitle("");
        setDescription("");
        setLanguage("");
        setCode("");
        setTags([]);
        setIsPublic(false);
        setTimeout(() => setCode(""), 0);
    };
    return (
        <Card className="shadow-md border border-border/50 bg-background">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">
                        Add New Snippet
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            variant={mode === "manual" ? "default" : "outline"}
                            onClick={() => setMode("manual")}
                        >
                            Manual
                        </Button>
                        <Button
                            type="button"
                            variant={mode === "ai" ? "default" : "outline"}
                            onClick={() => setMode("ai")}
                        >
                            AI
                        </Button>
                    </div>
                </div>

                {state.type && (
                    <p
                        className={`text-sm mt-2 ${
                            state.type === "error"
                                ? "text-red-500 font-semibold"
                                : "text-green-600 font-semibold"
                        }`}
                    >
                        {state.message}
                    </p>
                )}
            </CardHeader>

            <CardContent>
                <form action={action} className="flex flex-col gap-6 relative">
                    {/* ------- Blur Wrapper ------- */}
                    <div
                        className={`
                ${
                    mode === "ai"
                        ? "pointer-events-none blur-[2px] opacity-50"
                        : ""
                }
                flex flex-col gap-6
            `}
                    >
                        {/* Title + Language + Public checkbox  */}
                        <div className="flex w-full gap-4 items-end justify-between">
                            <div className="flex-1 space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="e.g. Sort an array of objects"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="flex gap-4 items-end ">
                                {/* Language */}
                                <div className="space-y-2">
                                    <Label>Language</Label>
                                    <DropDownMenuLanguage
                                        language={language}
                                        setLanguage={setLanguage}
                                    />
                                </div>

                                {/* Public checkbox */}
                                <div className="flex items-center space-x-2 pb-2 ">
                                    <div className="flex items-center gap-2 ">
                                        <Switch
                                            id="isPublic"
                                            checked={isPublic}
                                            onCheckedChange={setIsPublic}
                                        />
                                        <Label htmlFor="isPublic">
                                            {isPublic ? "Public" : "Private"}
                                        </Label>
                                    </div>
                                    <input
                                        type="hidden"
                                        name="isPublic"
                                        value={isPublic ? "true" : "false"}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Short description of what this snippet does"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <Label>Tags</Label>
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

                        {/* Code editor */}
                        {language ? (
                            <div className="space-y-2">
                                <Label>Code</Label>
                                <div className="rounded-lg overflow-hidden border border-border">
                                    <Editor
                                        height="400px"
                                        theme="vs-dark"
                                        language={language}
                                        value={code}
                                        onChange={(v) => setCode(v ?? "")}
                                    />
                                </div>
                                <input type="hidden" name="code" value={code} />
                            </div>
                        ) : (
                            mode === "manual" && (
                                <p className="text-sm text-muted-foreground">
                                    Choose a programming language to start
                                    typing your snippet.
                                </p>
                            )
                        )}
                        {/* Reset + Submit */}
                        <div className="flex justify-end gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClear}
                                className="w-full sm:w-auto"
                            >
                                Clear All
                            </Button>

                            <Button
                                type="submit"
                                disabled={isPending || mode === "ai"}
                                className="w-full sm:w-auto"
                            >
                                {isPending ? "Saving..." : "Submit Snippet"}
                            </Button>
                        </div>
                    </div>
                    {/* -------  BLUR WRAPPER ------- */}

                    {/* AI overlay */}
                    {mode === "ai" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-background/80 backdrop-blur-lg border shadow-md p-5 rounded-lg text-center max-w-sm">
                                <p className="font-semibold text-red-500 text-lg">
                                    AI Mode Unavailable
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    AI generation is disabled because I'm far
                                    too stingy to spend money on tokens. Manual
                                    mode will just have to do for now.
                                </p>
                            </div>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
