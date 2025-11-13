"use client";
//react imports
import { useEffect, useState } from "react";
//shadcn imports
import { Button } from "./ui/button";
import { Input } from "./ui/input";
//helpers import
import { tagColors } from "@/app/helpers/tagColors";

export default function TagsInput({
    value,
    onTagsChange,
}: {
    value: string[];
    onTagsChange?: (tags: string[]) => void;
}) {
    //states
    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState<string[]>(value);
    const [error, setError] = useState("");

    //funtion to handle add tag
    const handleAddTag = (e?: React.FormEvent) => {
        e?.preventDefault();
        addTag();
    };

    // Add tag
    const addTag = () => {
        const newTag = inputValue.trim();

        // Reset error
        setError("");

        if (newTag.length == 0) return;

        const words = newTag.split(/\s+/);
        if (words.length > 2) {
            setError("Tags cannot contain more than 2 words.");
            return;
        }

        if (tags.includes(newTag)) {
            setError("This tag already exists.");
            return;
        }

        if (tags.length >= 5) {
            setError("You can have a maximum of 5 tags.");
            return;
        }

        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        onTagsChange?.(updatedTags);
        setInputValue("");
    };

    // Remove a tag
    const handleDeleteTag = (tag: string) => {
        setError("");
        const updatedTags = tags.filter((t) => t !== tag);
        setTags(updatedTags);
        onTagsChange?.(updatedTags);
    };

    useEffect(() => {
        setTags(value);
    }, [value]);

    return (
        <div className="flex flex-col gap-2 mt-2">
            {/*  ERROR MESSAGE */}
            {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            {/* Inputveld + Add button */}
            <div className="flex gap-2">
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setError("");
                        setInputValue(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            addTag();
                        }
                    }}
                    placeholder="Add a new tag..."
                />
                <Button
                    type="button"
                    onClick={handleAddTag}
                    variant="secondary"
                    className="whitespace-nowrap"
                >
                    Add
                </Button>
            </div>

            {/* View tags */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => {
                        const color = tagColors[index % tagColors.length];
                        return (
                            <div
                                key={tag}
                                className={`flex items-center gap-1 px-3 py-1 rounded-full ${color}`}
                            >
                                <span className="text-sm font-medium">
                                    #{tag}
                                </span>
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteTag(tag)}
                                    className="h-4 w-4 p-0 text-muted-foreground hover:text-foreground"
                                >
                                    ✕
                                </Button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
