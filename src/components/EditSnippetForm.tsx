"use client";
//react imports
import { useEffect, useState, useActionState } from "react";
//shadcn imports
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
//action imports
import { handleUpdateSnippet } from "@/actions";
//type imports
import { SnippetType, Message } from "@/types";
//component imports
import TagsInput from "./TagsInput";
import TechBadge from "./TechBadge";
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });
//next imports
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Image from "next/image";
//helpers import
import languages from "@/app/helpers/languages";
//icons import
import { LoaderPinwheel, Pencil } from "lucide-react";

export default function EditSnippetForm({ snippet }: { snippet: SnippetType }) {
    const [title, setTitle] = useState(snippet.title);
    const [description, setDescription] = useState(snippet.description);
    const [language, setLanguage] = useState(snippet.language);
    const [code, setCode] = useState(snippet.code);
    const [tags, setTags] = useState<string[]>(snippet.tags);
    const [isPublic, setIsPublic] = useState(snippet.isPublic);
    const router = useRouter();

    const initState: Message = { type: "", message: "" };
    const [state, action, isPending] = useActionState(
        handleUpdateSnippet,
        initState
    );

    const lang = languages.find((l) => l.key === language);

    useEffect(() => {
        if (state.type === "success") {
            router.push("/dashboard");
        }
    }, [state]);

    return (
        <Card className="max-w-3xl mx-auto shadow-sm border border-border/50 bg-background">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    Edit Snippet
                </CardTitle>
            </CardHeader>

            <form action={action} className="space-y-4">
                <CardContent>
                    {state.type && (
                        <p
                            className={`text-sm mt-2 mb-2 ${
                                state.type === "error"
                                    ? "text-red-500 font-semibold"
                                    : "text-green-600 font-semibold"
                            }`}
                        >
                            {state.message}
                        </p>
                    )}
                    <input type="hidden" name="id" value={snippet._id} />

                    {/* HEADER LINE: Title + Language + Switch */}
                    <div className="flex gap-3 items-center flex-wrap">
                        <Input
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="flex-1"
                            required
                        />

                        {/* Language */}
                        <Badge
                            variant="outline"
                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground border border-border/50 rounded-md px-2 py-1"
                        >
                            {lang ? (
                                lang.key === "cprogramming" ? (
                                    <Image
                                        src="/C_Programming_Language.png"
                                        alt="C Programming Language"
                                        width={20}
                                        height={20}
                                        className="rounded-sm"
                                    />
                                ) : (
                                    <TechBadge language={lang} />
                                )
                            ) : (
                                <span>no logo</span>
                            )}
                            <span className="capitalize">
                                {lang?.label || language}
                            </span>
                        </Badge>

                        <input type="hidden" name="language" value={language} />

                        {/* Public switch */}
                        <div className="flex items-center gap-2">
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

                    {/* DESCRIPTION */}
                    <Input
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        required
                    />

                    {/* TAGS */}
                    <div>
                        <TagsInput value={tags} onTagsChange={setTags} />
                        {tags.map((tag) => (
                            <input
                                key={tag}
                                type="hidden"
                                name="tags"
                                value={tag}
                            />
                        ))}
                    </div>

                    {/* CODE EDITOR */}
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
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button onClick={() => router.push("/dashboard")}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        formAction={action}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <LoaderPinwheel className="h-4 w-4 animate-spin" />{" "}
                                Saving
                            </>
                        ) : (
                            <>
                                <Pencil size={14} />
                                Save Changes
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
