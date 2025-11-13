"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { handleDeleteAccount } from "@/actions";
import { User } from "@/types";

export default function ProfilePageClient({ user }: { user: User | null }) {
    const [confirm, setConfirm] = useState(false);
    const [isPending, startTransition] = useTransition();

    return (
        <div className="max-w-xl mx-auto mt-10">
            <Card className="border border-border/50 shadow-sm">
                <CardHeader>
                    <h2 className="text-xl font-semibold">Your Profile</h2>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-muted-foreground text-sm">
                            Username
                        </p>
                        <p className="text-lg font-medium">{user?.username}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-muted-foreground text-sm">Email</p>
                        <p className="text-lg font-medium">{user?.email}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-muted-foreground text-sm">
                            Snippets
                        </p>
                        <p className="text-lg font-medium">
                            {user?.snippetCount}
                        </p>
                    </div>

                    {/* CONFIRM DELETE BOX */}
                    {confirm && (
                        <div className="border border-red-500/30 bg-red-500/10 p-4 rounded-md flex flex-col gap-3 mt-4">
                            <div className="flex items-center gap-2 text-red-600 font-medium">
                                <AlertTriangle size={18} />
                                This action is permanent.
                            </div>

                            <p className="text-sm text-muted-foreground">
                                All your snippets and your entire account will
                                be deleted forever.
                            </p>

                            <div className="flex gap-3 justify-end">
                                <Button
                                    variant="outline"
                                    onClick={() => setConfirm(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    variant="destructive"
                                    disabled={isPending}
                                    onClick={() =>
                                        startTransition(() =>
                                            handleDeleteAccount()
                                        )
                                    }
                                >
                                    {isPending
                                        ? "Deleting..."
                                        : "Delete Account"}
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-end">
                    {!confirm && (
                        <Button
                            variant="destructive"
                            onClick={() => setConfirm(true)}
                        >
                            Delete Account
                        </Button>
                    )}
                    {/*  */}
                </CardFooter>
            </Card>
        </div>
    );
}
