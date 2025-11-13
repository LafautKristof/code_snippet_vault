import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";
import PublicSnippetsSection from "@/components/PublicSnippetsSection";

export default async function PublicSnippetsPage(props: {
    searchParams?: Promise<{ q?: string; language?: string }>;
}) {
    const searchParams = await props.searchParams;
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    return (
        <div className="mx-6 mt-6">
            <PublicSnippetsSection searchParams={searchParams} />
        </div>
    );
}
