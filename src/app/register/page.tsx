import RegisterForm from "@/components/RegisterForm";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const user = await getCurrentUser();

    if (user) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <RegisterForm />
        </div>
    );
}
