import { getMySnippets, handleDeleteSnippet } from "@/actions";
import { SnippetType } from "@/types";
import RemoveSnippetButton from "./RemoveSnippetButton";
import { Button } from "./ui/button";
import Link from "next/link";

const SnippetsList = async () => {
    const snippets: SnippetType[] = await getMySnippets();

    if (snippets.length === 0)
        return <p className="text-gray-500">No snippets found.</p>;
    const handleEditDetailPage = (id: string) => {};
    return (
        <div className="space-y-4">
            {snippets.map((snippet) => (
                <div
                    key={String(snippet._id)}
                    className="border rounded-lg p-4 hover:shadow transition"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-lg">
                            {snippet.title}
                            {snippet._id}
                        </h2>
                        <span className="text-sm text-gray-500">
                            {snippet.language}
                        </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-1">
                        {snippet.description}
                    </p>

                    <pre className="bg-muted p-2 rounded-md mt-3 text-sm overflow-x-auto whitespace-pre-wrap">
                        {snippet.code}
                    </pre>

                    {snippet.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {snippet.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                    <form
                        action={handleDeleteSnippet}
                        className="flex items-center gap-2"
                    >
                        <input type="hidden" name="id" value={snippet._id} />
                        <RemoveSnippetButton />
                        <Link
                            href={`/snippets/${snippet._id}/edit`}
                            className="text-blue-600 hover:underline text-sm"
                        >
                            Edit
                        </Link>
                    </form>
                </div>
            ))}
        </div>
    );
};

export default SnippetsList;
