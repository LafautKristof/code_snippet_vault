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

interface DropDownMenuLanguageProps {
    language: string;
    setLanguage: (lang: string) => void;
}

const DropDownMenuLanguage = ({
    language,
    setLanguage,
}: DropDownMenuLanguageProps) => {
    const selected =
        languages.find((l) => l.key === language)?.label || "Select language";

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">{selected}</Button>
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
                            >
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
