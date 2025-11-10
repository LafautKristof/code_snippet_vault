"use client";
import { handleSignUp } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Message } from "@/types";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
const register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const initState: Message = { type: "", message: "" };
    const [state, action, isPending] = useActionState(handleSignUp, initState);
    useEffect(() => {
        if (state.type === "success") {
            const timer = setTimeout(() => {
                router.push("/login");
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [state, router]);
    return (
        <form action={action}>
            <div>
                <Label htmlFor="username">Username</Label>
                <Input
                    type="text"
                    placeholder={userName.length > 0 ? userName : "Username"}
                    id="username"
                    name="username"
                    required
                    onChange={() => {
                        setUserName(userName);
                    }}
                />
            </div>{" "}
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    onChange={() => {
                        setEmail(email);
                    }}
                />
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    required
                    onChange={() => {
                        setPassword(password);
                    }}
                />
            </div>
            <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirm-password"
                    name="confirm-password"
                />
            </div>
            <Button type="submit" disabled={isPending}>
                {" "}
                {isPending ? "Loading..." : "SignUp"}
            </Button>
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
        </form>
    );
};
export default register;
