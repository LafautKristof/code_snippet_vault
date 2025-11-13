"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import languages from "@/app/helpers/languages";
import { Button } from "./ui/button";

import TechBadge from "./TechBadge";
import Image from "next/image";

interface DropDownMenuLanguageProps {
    language: string;
    setLanguage?: (lang: string) => void;
    includeAllOption?: boolean;
}

const DropDownMenuLanguage = ({
    language,
    setLanguage,
}: DropDownMenuLanguageProps) => {
    const selected =
        languages.find((l) => l.key === language)?.label || "Select language";
    console.log("selected", selected);
    const selectedLang = languages.find((l) => l.key === language);
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        {selectedLang?.key === "cprogramming" ? (
                            <Image
                                src="/C_Programming_Language.png"
                                alt="C Programming Language"
                                width={20}
                                height={20}
                                className="rounded-sm"
                            />
                        ) : (
                            selectedLang && (
                                <TechBadge language={selectedLang} />
                            )
                        )}
                        {selected}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Programming Language</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                        value={language}
                        onValueChange={setLanguage}
                    >
                        {languages.map((lang) => (
                            <DropdownMenuRadioItem
                                key={lang.key}
                                value={lang.key}
                                className="flex items-center gap-2"
                            >
                                {lang.key === "cprogramming" ? (
                                    <Image
                                        src="/C_Programming_Language.png"
                                        alt="C Programming Language"
                                        width={20}
                                        height={20}
                                        className="rounded-sm"
                                        priority
                                    />
                                ) : (
                                    <TechBadge language={lang} />
                                )}
                                {lang.label}
                            </DropdownMenuRadioItem>
                        ))}
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dit zorgt ervoor dat de language wordt meegestuurd in het formulier */}
            <input type="hidden" name="language" value={language} />
        </div>
    );
};

export default DropDownMenuLanguage;
