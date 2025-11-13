"use client";

//react import
import { useActionState } from "react";
//shadcn imports
import { Button } from "./ui/button";
//action imports
import { handleLogout } from "@/actions";
//type imports
import { Message } from "@/types";

const LogoutButton = () => {
    const initState: Message = { type: "", message: "" };
    const [state, action, isPending] = useActionState(handleLogout, initState);
    return (
        <form action={action}>
            <Button>Logout</Button>
        </form>
    );
};
export default LogoutButton;
