import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { getCurrentUser } from "@/lib/getCurrentUser";

export default async function HomePage() {
    const user = await getCurrentUser();
    console.log("user", user);
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            {/* HERO */}
            <h1 className="text-4xl font-bold mb-4">Snippet Vault</h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8">
                Store, organize, and search all your code snippets in one place.
                Snippet Vault helps you develop faster by keeping all your
                reusable code neatly centralized.
            </p>
            {user ? (
                <div className="flex gap-4">
                    <Button asChild size="lg" className="w-40">
                        <Link href="/dashboard">Dashboard</Link>
                    </Button>
                </div>
            ) : (
                <div className="flex gap-4">
                    <Button asChild size="lg" className="w-40">
                        <Link href="/login">Login</Link>
                    </Button>
                </div>
            )}

            {/* FEATURES */}
            <section className="mt-16 max-w-3xl">
                <h2 className="text-2xl font-semibold mb-6">Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    {/* Feature 1 */}
                    <Card className="shadow-sm min-w-[260px]">
                        <CardHeader>
                            <CardTitle>🔍 Fast Search</CardTitle>
                            <CardDescription>
                                Filter by name, tag, or language.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    {/* Feature 2 */}
                    <Card className="shadow-sm min-w-[260px]">
                        <CardHeader>
                            <CardTitle>💻 Syntax Highlighting</CardTitle>
                            <CardDescription>
                                Clean, readable code via Monaco Editor.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    {/* Feature 3 */}
                    <Card className="shadow-sm min-w-[260px]">
                        <CardHeader>
                            <CardTitle>🏷️ Tags & Categories</CardTitle>
                            <CardDescription>
                                Organize snippets your way.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    {/* Feature 4 */}
                    <Card className="shadow-sm min-w-[260px]">
                        <CardHeader>
                            <CardTitle>📦 Safe Storage</CardTitle>
                            <CardDescription>
                                All snippets stored securely in your database.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>
        </main>
    );
}
