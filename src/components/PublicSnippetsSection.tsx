import { Card, CardHeader, CardContent } from "@/components/ui/card";
import PublicSnippetsList from "./PublicSnippetsList";
import SnippetsSearchForm from "./SnippetsSearchForm";

export default function PublicSnippetsSection({
    searchParams,
}: {
    searchParams?: { q?: string; language?: string };
}) {
    return (
        <Card className="border border-border/50 shadow-sm bg-background">
            <CardHeader>
                <SnippetsSearchForm mode="public" />
            </CardHeader>

            <CardContent>
                <label className="block mb-1 font-semibold text-lg">
                    Snippets
                </label>
                <PublicSnippetsList searchParams={searchParams} />
            </CardContent>
        </Card>
    );
}
