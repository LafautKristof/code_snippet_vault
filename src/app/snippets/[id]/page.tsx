import ViewSnippet from "@/components/ViewSnippet";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getSnippetById } from "@/queries";
import { redirect } from "next/navigation";

export default async function EditSnippetPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const snippet = await getSnippetById(params.id);
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }
    if (!snippet) {
        return <p className="text-gray-500">Snippet not found.</p>;
    }
    console.log("snippet", snippet);

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
            <ViewSnippet snippet={snippet} />
        </div>
    );
}
