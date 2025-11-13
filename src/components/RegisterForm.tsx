"use client";
//action imports
import { handleSignUp } from "@/actions";
//shadcn imports
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
//type imports
import { Message } from "@/types";
//next imports
import { useRouter } from "next/navigation";
//react imports
import { useActionState, useEffect, useState } from "react";

const RegisterForm = () => {
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
        <Card className="max-w-md mx-auto shadow-sm border border-border/50 bg-background">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">
                    Create an Account
                </CardTitle>
                {state.message && (
                    <p
                        className={`mt-2 text-sm text-center font-medium ${
                            state.type === "error"
                                ? "text-red-500"
                                : "text-green-600"
                        }`}
                    >
                        {state.message}
                    </p>
                )}
            </CardHeader>

            <CardContent>
                <form action={action} className="space-y-4">
                    {/* USERNAME */}
                    <div className="space-y-1">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="space-y-1">
                        <Label htmlFor="confirm-password">
                            Confirm Password
                        </Label>
                        <Input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="Confirm Password"
                        />
                    </div>

                    <CardFooter className="flex justify-end p-0 pt-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Signing up..." : "Sign Up"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};

export default RegisterForm;
