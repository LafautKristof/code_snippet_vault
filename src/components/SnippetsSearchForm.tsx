"use client";
//react imports
import { useState, useEffect } from "react";
//next imports
import { useRouter, useSearchParams } from "next/navigation";
//shadcn imports
import { Input } from "./ui/input";
import { Button } from "./ui/button";
//component imports
import DropDownMenuLanguage from "./DropDownMenuLanguage";

export default function SnippetsSearchForm({
    mode,
}: {
    mode: "private" | "public";
}) {
    console.log("MODE = ", mode);
    //variables
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQ = searchParams.get("q") ?? "";
    const initialLang = searchParams.get("language") ?? "all";
    //states
    const [q, setQ] = useState(initialQ);
    const [language, setLanguage] = useState(initialLang);

    const baseRoute = mode === "public" ? "/public-snippets" : "/dashboard";
    //  Debounce search
    useEffect(() => {
        const t = setTimeout(() => {
            const params = new URLSearchParams();

            if (q.trim()) params.set("q", q);
            if (language !== "all") params.set("language", language);

            router.push(`${baseRoute}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(t);
    }, [q, language, router, baseRoute]);
    //clear search
    const handleReset = () => {
        setQ("");
        setLanguage("all");
        router.push(baseRoute);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
                <label className="block mb-1 font-semibold text-lg">
                    Search
                </label>
                <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search snippets..."
                />
            </div>

            <div>
                <label className="block mb-1">Language</label>
                <DropDownMenuLanguage
                    language={language}
                    setLanguage={setLanguage}
                />
            </div>

            <Button variant="outline" onClick={handleReset}>
                Reset
            </Button>
        </div>
    );
}
