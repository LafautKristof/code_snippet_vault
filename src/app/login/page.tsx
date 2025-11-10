"use client";
import { handleLogin } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Message } from "@/types";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const login = () => {
    const initState: Message = { type: "", message: "" };
    const [state, action, isPending] = useActionState(handleLogin, initState);
    const router = useRouter();
    useEffect(() => {
        if (state.type === "success") {
            const timer = setTimeout(() => {
                router.push("/");
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [state, router]);
    return (
        <form action={action}>
            {state.message && (
                <p
                    className={`mt-3 text-sm font-medium ${
                        state.type === "error"
                            ? "text-red-500"
                            : "text-green-600"
                    }`}
                >
                    {state.message}
                </p>
            )}
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                />
            </div>

            <Button type="submit">Login</Button>
        </form>
    );
};
export default login;
