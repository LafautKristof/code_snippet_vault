//component imports
import SnippetsSearchForm from "./SnippetsSearchForm";
import SnippetsList from "./SnippetsList";
//shadcn imports
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function SnippetsSearchSection({
    searchParams,
}: {
    searchParams?: { q?: string; language?: string };
}) {
    return (
        <Card className="border border-border/50 shadow-sm bg-background">
            {/* Searchform  */}
            <CardHeader>
                <SnippetsSearchForm mode="private" />
            </CardHeader>

            {/* Results */}
            <CardContent>
                <label className="block mb-1 font-semibold text-lg">
                    Snippets
                </label>
                <SnippetsList searchParams={searchParams} />
            </CardContent>
        </Card>
    );
}
