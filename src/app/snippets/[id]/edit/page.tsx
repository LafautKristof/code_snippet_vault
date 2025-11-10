import EditSnippetForm from "@/components/EditSnippetForm";
import { getSnippetById } from "@/queries";

export default async function EditSnippetPage({
    params,
}: {
    params: { id: string };
}) {
    const snippet = await getSnippetById(params.id);

    if (!snippet) {
        return <p className="text-gray-500">Snippet not found.</p>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
            <h1 className="text-2xl font-semibold">Edit Snippet</h1>
            <EditSnippetForm snippet={snippet} />
        </div>
    );
}
