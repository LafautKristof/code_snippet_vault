import ProfilePageClient from "@/components/ProfilePageClient";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getUserInfo } from "@/queries";
import { User } from "@/types";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const userId = await getCurrentUser();

    if (!userId) redirect("/login");
    console.log("user", userId);
    const getUser: User | null = await getUserInfo(userId);
    return <ProfilePageClient user={getUser} />;
}
