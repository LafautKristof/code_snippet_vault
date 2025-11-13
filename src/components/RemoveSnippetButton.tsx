"use client";
//shadcn imports
import { Button } from "./ui/button";
//icon imports
import { Trash2, LoaderPinwheel } from "lucide-react";
//react imports
import { useFormStatus } from "react-dom";
const RemoveSnippetButton = () => {
    const { pending } = useFormStatus();
    return (
        <Button
            variant="outline"
            size="icon"
            disabled={pending}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
            {pending ? (
                <LoaderPinwheel className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
        </Button>
    );
};
export default RemoveSnippetButton;
