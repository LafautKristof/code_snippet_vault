import SnippetsForm from "@/components/SnippetsForm";
import SnippetsList from "@/components/SnippetsList";
import SnippetsSearchForm from "@/components/SnippetsSearchForm";

export default function Home() {
    return (
        <div>
            <SnippetsForm />
            <SnippetsSearchForm />
            <SnippetsList />
        </div>
    );
}
