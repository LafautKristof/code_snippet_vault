"use client";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { handleLogout } from "@/actions";
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
