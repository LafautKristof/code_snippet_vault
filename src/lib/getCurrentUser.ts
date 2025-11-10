import { cookies } from "next/headers";

export async function getCurrentUser() {
    try {
        const cookieStore = await cookies();
        const userId = cookieStore.get("userId");

        if (!userId) return null;
        return userId.value;
    } catch (err) {
        return null;
    }
}
