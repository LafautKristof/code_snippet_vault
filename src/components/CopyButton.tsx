"use client";
// react imports
import { useState } from "react";
// shadcn imports
import { Button } from "./ui/button";
// icon imports
import { Copy, Check } from "lucide-react";

export default function CopyButton({
    code,
    ...props
}: { code: string } & React.HTMLAttributes<HTMLButtonElement>) {
    // state
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("❌ Failed to copy:", err);
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            title="Copy code"
            className=" hover:bg-muted opacity-75 hover:opacity-100 transition-opacity z-20"
            {...props}
        >
            {copied ? (
                <Check size={18} className="text-green-500 transition" />
            ) : (
                <Copy size={18} className="text-muted-foreground" />
            )}
        </Button>
    );
}
