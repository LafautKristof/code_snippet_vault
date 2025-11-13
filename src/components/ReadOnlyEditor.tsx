"use client";
//lib imports
import { languageExtensions } from "@/lib/getExtensionFromLanguage";
//next imports
import dynamic from "next/dynamic";
//react imports
import { useMemo } from "react";

//component imports=> Editor may only run on client
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export default function ReadOnlyEditor({
    code,
    language,
    height = "500px",
    title,
}: {
    code: string;
    language: string;
    height?: string;
    title?: string;
}) {
    console.log("language", language);
    const extension = useMemo(
        () => languageExtensions[language] || "txt",
        [language]
    );
    console.log("extension", extension);
    return (
        <div className="relative border rounded-lg overflow-hidden shadow-sm">
            {/* Headerbar */}
            <div className="absolute top-0 left-0 w-full bg-[#252526] text-gray-400 text-xs px-4 py-2 rounded-t-lg border-b border-border/40 flex items-center gap-2 z-10">
                <div className="flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                </div>
                <span className="ml-3 italic text-gray-400">
                    {title}.{extension}
                </span>
            </div>

            {/* Editor */}
            <div className="pt-8">
                <Editor
                    height={height}
                    theme="vs-dark"
                    language={language}
                    value={code}
                    options={{
                        readOnly: true,
                        domReadOnly: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        lineNumbers: "on",
                        lineNumbersMinChars: 3,
                        renderLineHighlight: "none",
                        overviewRulerBorder: false,
                        wordWrap: "on",
                        automaticLayout: true,
                        scrollbar: {
                            vertical: "auto",
                            horizontal: "auto",
                        },
                    }}
                />
            </div>
        </div>
    );
}
