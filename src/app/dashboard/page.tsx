import SnippetsForm from "@/components/SnippetsForm";
import SnippetsSearchSection from "@/components/SnippetsSearchSection";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Home(props: {
    searchParams: Promise<{ q?: string; language?: string }>;
}) {
    const searchParams = await props.searchParams;
    const user = await getCurrentUser();
    if (user === null) redirect("/");
    return (
        <div className="flex flex-col gap-6 mx-6">
            <SnippetsForm />
            <SnippetsSearchSection searchParams={searchParams} />
        </div>
    );
}
