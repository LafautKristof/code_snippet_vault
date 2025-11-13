import { getSnippets } from "@/queries";
import SnippetCard from "./SnippetCard";

export default async function PublicSnippetsList({
    searchParams,
}: {
    searchParams?: { q?: string; language?: string };
}) {
    const query = searchParams?.q || "";
    const language = searchParams?.language || "all";

    const snippets = await getSnippets({ onlyPublic: true, query, language });

    if (!snippets.length)
        return (
            <p className="text-center text-muted-foreground py-10">
                No public snippets found.
            </p>
        );

    return (
        <div className="flex flex-wrap gap-6">
            {snippets.map((snip) => (
                <SnippetCard
                    key={snip._id}
                    snippet={snip}
                    showActions={false}
                />
            ))}
        </div>
    );
}
