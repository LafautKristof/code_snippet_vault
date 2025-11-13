"use server";
import { cookies } from "next/headers";
import {
    addSnippet,
    addUser,
    deleteAccount,
    deleteSnippet,
    getSnippets,
    loginUser,
    updateSnippet,
} from "./queries";
import { Message, SnippetType } from "./types";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function handleSignUp(
    initialState: Message,
    formData: FormData
): Promise<Message> {
    const userName: string = formData.get("username") as string;
    const password: string = formData.get("password") as string;
    const confirmPassword: string = formData.get("confirm-password") as string;
    const email: string = formData.get("email") as string;

    if (!userName || !password || !confirmPassword || !email) {
        return { type: "error", message: "Please fill in all fields" };
    }
    if (password !== confirmPassword) {
        return { type: "error", message: "Passwords do not match" };
    }
    if (userName.length < 3) {
        return {
            type: "error",
            message: "Username must be at least 3 characters",
        };
    }
    if (password.length < 6) {
        return {
            type: "error",
            message: "Password must be at least 6 characters",
        };
    }
    const passwordRegex = new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$"
    );
    if (!passwordRegex.test(password)) {
        return {
            type: "error",
            message:
                "Password must contain at least one capital letter, one lowercase letter, one number and one special character",
        };
    }
    await addUser(userName, password, email);
    return { type: "success", message: "Account created successfully" };
}

export async function handleLogin(
    initialState: Message,
    formData: FormData
): Promise<Message> {
    const email: string = formData.get("email") as string;
    const password: string = formData.get("password") as string;

    if (!email || !password) {
        return { type: "error", message: "Please fill in all fields" };
    }

    const result = await loginUser(email, password);
    if (result.type === "error") return result;
    const cookieStore = await cookies();
    cookieStore.set("userId", result.userId, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    revalidatePath("/");
    return { type: "success", message: "Login successful" };
}

export async function handleLogout(initialState: Message): Promise<Message> {
    const cookieStore = await cookies();
    cookieStore.delete("userId");
    redirect("/login");
}

export async function handleAddSnippet(
    initialState: Message,
    formData: FormData
) {
    const title: string = formData.get("title") as string;
    const description: string = formData.get("description") as string;
    const language: string = formData.get("language") as string;
    const code: string = formData.get("code") as string;
    const tags: string[] = formData.getAll("tags") as string[];
    const isPublic = formData.get("isPublic") === "true";
    console.log("is public", isPublic);
    const cookieStore = await cookies();
    const userId: string = cookieStore.get("userId")?.value as string;
    console.log("tags", tags);
    if (!title || !description || !code) {
        return { type: "error", message: "Please fill in all fields" };
    }
    if (!language)
        return { type: "error", message: "Please select a language" };
    if (tags.length === 0) {
        return { type: "error", message: "Please add at least one tag" };
    }
    if (title.length < 3) {
        return {
            type: "error",
            message: "Title must be at least 3 characters",
        };
    }
    if (description.length < 3) {
        return {
            type: "error",
            message: "Description must be at least 3 characters",
        };
    }
    if (code.length < 3) {
        return {
            type: "error",
            message: "Code must be at least 3 characters",
        };
    }
    if (description.length >= 300) {
        return {
            type: "error",
            message: "Description must be less than 300 characters",
        };
    }

    await addSnippet(
        title,
        description,
        language,
        tags,
        code,
        userId,
        isPublic
    );
    revalidatePath("/");
    return { type: "success", message: "Snippet added successfully" };
}

export async function handleDeleteSnippet(formData: FormData): Promise<void> {
    const id: string = formData.get("id") as string;
    const cookiesStore = await cookies();
    const userId = cookiesStore.get("userId")?.value as string;
    await deleteSnippet(id, userId);
    revalidatePath("/");
}

export async function getMySnippets(
    query?: string,
    language?: string
): Promise<SnippetType[]> {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
        return [];
    }

    const mySnippets = await getSnippets({ userId, query, language });
    return mySnippets;
}

export async function handleUpdateSnippet(
    initialState: Message,
    formData: FormData
) {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const language = formData.get("language") as string;
    const code = formData.get("code") as string;
    const tags = formData.getAll("tags") as string[];
    const isPublic = formData.get("isPublic") === "true";
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value as string;
    console.log("tags", tags);
    if (!title || !description || !code) {
        return { type: "error", message: "Please fill in all fields" };
    }
    if (!language)
        return { type: "error", message: "Please select a language" };
    if (tags.length === 0) {
        return { type: "error", message: "Please add at least one tag" };
    }
    if (title.length < 3) {
        return {
            type: "error",
            message: "Title must be at least 3 characters",
        };
    }
    if (description.length < 3) {
        return {
            type: "error",
            message: "Description must be at least 3 characters",
        };
    }
    if (code.length < 3) {
        return {
            type: "error",
            message: "Code must be at least 3 characters",
        };
    }
    if (description.length >= 300) {
        return {
            type: "error",
            message: "Description must be less than 300 characters",
        };
    }

    await updateSnippet(id, userId, {
        title,
        description,
        language,
        code,
        tags,
        isPublic,
    });
    revalidatePath("/");
    return { type: "success", message: "Snippet updated successfully" };
}

export async function handleDeleteAccount() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) return;

    await deleteAccount(userId);
    cookieStore.delete("userId");

    redirect("/login");
}
