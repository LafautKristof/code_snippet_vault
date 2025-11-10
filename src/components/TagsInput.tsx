"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function TagsInput({
    value,
    onTagsChange,
}: {
    value: string[];
    onTagsChange?: (tags: string[]) => void;
}) {
    const [inputValue, setInputValue] = useState("");
    const [tags, setTags] = useState<string[]>(value);

    // Add tag (with Enter or click)
    const handleAddTag = (e?: React.FormEvent) => {
        e?.preventDefault();
        const newTag = inputValue.trim();
        if (newTag && !tags.includes(newTag)) {
            const updatedTags = [...tags, newTag];
            setTags(updatedTags);
            onTagsChange?.(updatedTags);
            setInputValue("");
        }
    };

    // Remove a tag
    const handleDeleteTag = (tag: string) => {
        const updatedTags = tags.filter((t) => t !== tag);
        setTags(updatedTags);
        onTagsChange?.(updatedTags);
    };

    useEffect(() => {
        setTags(value);
    }, [value]);
    return (
        <div className="flex flex-col gap-2 mt-2">
            {/* Inputveld + Add button */}
            <div className="flex gap-2">
                <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            handleAddTag();
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
                    {tags.map((tag) => (
                        <div
                            key={tag}
                            className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full"
                        >
                            <span className="text-sm">{tag}</span>
                            <Button
                                type="button"
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteTag(tag)}
                            >
                                ✕
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
