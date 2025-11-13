//components imports
import ReadOnlyEditor from "@/components/ReadOnlyEditor";
import CopyButton from "@/components/CopyButton";
//shadcn imports
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TechBadge from "@/components/TechBadge";
import { Button } from "./ui/button";
//helpers import
import languages from "@/app/helpers/languages";
import { tagColors } from "@/app/helpers/tagColors";
//next imports
import Image from "next/image";
import Link from "next/link";
//icons import
import { House, Pencil } from "lucide-react";
//types import
import { SnippetType } from "@/types";

export default async function ViewSnippet({
    snippet,
}: {
    snippet: SnippetType;
}) {
    const lang = languages.find((l) => l.key === snippet.language);

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <Card className="border border-border/50 shadow-sm bg-background">
                <CardHeader className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            {/* Title */}
                            <CardTitle className="text-2xl font-semibold">
                                {snippet.title}
                            </CardTitle>
                            {/* Copy button */}
                            <CopyButton
                                code={snippet.code}
                                data-slot="card-action"
                            />

                            {snippet.isPublic ? (
                                <Badge className="bg-green-600">Public</Badge>
                            ) : (
                                <Badge variant="secondary">Private</Badge>
                            )}
                        </div>
                        {/* Language badge with icon or picture */}
                        <Badge
                            variant="outline"
                            className="flex items-center gap-2 text-xs font-medium capitalize"
                        >
                            {lang ? (
                                lang.key === "cprogramming" ? (
                                    <Image
                                        src="/C_Programming_Language.png"
                                        alt="C Programming Language"
                                        width={18}
                                        height={18}
                                        className="rounded-sm"
                                    />
                                ) : (
                                    <TechBadge language={lang} />
                                )
                            ) : (
                                snippet.language
                            )}
                            {lang?.label || snippet.language}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Description */}
                    {snippet.description && (
                        <p className="text-muted-foreground text-sm">
                            {snippet.description}
                        </p>
                    )}
                    {/* Tags */}
                    {snippet.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {snippet.tags.map((tag, i) => {
                                const color = tagColors[i % tagColors.length];
                                return (
                                    <span
                                        key={tag}
                                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${color}`}
                                    >
                                        # {tag}
                                    </span>
                                );
                            })}
                        </div>
                    )}
                    {/* Code Editor */}
                    <ReadOnlyEditor
                        code={snippet.code}
                        language={snippet.language}
                    />
                    {/* Edit button */}
                    <div className="flex items-center justify-between mt-4">
                        <Button
                            asChild
                            variant="default"
                            size="sm"
                            className="gap-1"
                        >
                            <Link href="/dashboard">
                                <House size={14} />
                                Dashboard
                            </Link>
                        </Button>

                        <Button
                            asChild
                            variant="default"
                            size="sm"
                            className="gap-1"
                        >
                            <Link href={`/snippets/${snippet._id}/edit`}>
                                <Pencil size={14} />
                                Edit
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
