import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { SnippetType } from "@/types";
import TechBadge from "./TechBadge";
import ReadOnlyEditor from "./ReadOnlyEditor";
import { tagColors } from "@/app/helpers/tagColors";
import languages from "@/app/helpers/languages";
import RemoveSnippetButton from "./RemoveSnippetButton";
import { handleDeleteSnippet } from "@/actions";
import { Eye, Pencil } from "lucide-react";
import { Button } from "./ui/button";

interface SnippetCardProps {
    snippet: SnippetType;
    showActions?: boolean; // show Edit/Delete?
}

export default function SnippetCard({
    snippet,
    showActions,
}: SnippetCardProps) {
    const lang = languages.find((l) => l.key === snippet.language);

    return (
        <Card className="w-[420px] border border-border/50 shadow-sm hover:shadow-md transition">
            <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex gap-2 items-center">
                        {/* LANGUAGE BADGE */}
                        <Badge
                            variant="secondary"
                            className="flex items-center gap-2 text-xs font-medium capitalize"
                        >
                            {lang ? (
                                lang.key === "cprogramming" ? (
                                    <Image
                                        src="/C_Programming_Language.png"
                                        alt="C Programming Language"
                                        width={18}
                                        height={18}
                                    />
                                ) : (
                                    <TechBadge language={lang} />
                                )
                            ) : (
                                <span>{snippet.language}</span>
                            )}
                        </Badge>

                        {/* PUBLIC / PRIVATE */}
                        {snippet.isPublic ? (
                            <Badge className="bg-green-600">Public</Badge>
                        ) : (
                            <Badge variant="secondary">Private</Badge>
                        )}
                    </div>

                    {/* TITLE */}
                    <span className="text-sm font-semibold text-foreground truncate max-w-[200px]">
                        {snippet.title}
                    </span>
                </div>
            </CardHeader>

            <CardContent>
                <ReadOnlyEditor
                    code={snippet.code}
                    language={snippet.language}
                    height="200px"
                    title={snippet.title}
                />

                {snippet.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                        {snippet.description}
                    </p>
                )}
                {/* TAGS */}
                {snippet.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {snippet.tags.map((tag, index) => {
                            const color = tagColors[index % tagColors.length];
                            return (
                                <div
                                    key={tag}
                                    className={`flex items-center gap-1 px-3 py-1 rounded-full ${color}`}
                                >
                                    <span className="text-sm font-medium">
                                        #{tag}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
                {!showActions && snippet.user && (
                    <p className="text-xs text-muted-foreground mt-2">
                        Created by{" "}
                        <span className="font-medium">
                            @{snippet.user.username}
                        </span>
                    </p>
                )}
            </CardContent>

            <CardFooter className="flex justify-between items-center border-t pt-3">
                {showActions ? (
                    <>
                        <form
                            action={handleDeleteSnippet}
                            className="flex items-center gap-2"
                        >
                            <input
                                type="hidden"
                                name="id"
                                value={snippet._id}
                            />
                            <RemoveSnippetButton />
                        </form>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                asChild
                                className="h-8 w-8 text-muted-foreground hover:text-ellepsis"
                            >
                                <Link href={`/snippets/${snippet._id}/edit`}>
                                    <Pencil size={16} />
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                size="icon"
                                asChild
                                className="h-8 w-8 text-muted-foreground hover:text-ellipsis"
                            >
                                <Link href={`/snippets/${snippet._id}`}>
                                    <Eye size={16} />
                                </Link>
                            </Button>
                        </div>
                    </>
                ) : (
                    // 🔵 Public-only
                    <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="h-8 w-8 text-muted-foreground hover:text-ellipsis"
                    >
                        <Link href={`/snippets/${snippet._id}`}>
                            <Eye size={16} />
                        </Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
