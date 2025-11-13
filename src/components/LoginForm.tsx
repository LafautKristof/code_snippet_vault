"use client";
// action imports
import { handleLogin } from "@/actions";
// shadcn imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
// type import
import { Message } from "@/types";
// next imports
import { useRouter } from "next/navigation";
// react imports
import { useActionState, useEffect } from "react";

const LoginForm = () => {
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
        <Card className="max-w-md mx-auto  shadow-sm border border-border/50 bg-background">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">
                    Login
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
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    <CardFooter className="flex justify-end p-0 pt-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
