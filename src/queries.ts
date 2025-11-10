"use server";
import bcrypt from "bcryptjs";
import { connectDB } from "./lib/mongodb";
import { User } from "./models/User";
import { cookies } from "next/headers";
import { Snippet } from "./models/Snippets";
import { SnippetType } from "./types";

export async function addUser(
    username: string,
    password: string,
    email: string
) {
    try {
        await connectDB();
        const existingUser = await User.findOne({ username, email });
        if (existingUser) {
            return { type: "error", message: "User already exists" };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email });
        const result = await user.save();
        console.log("User added:", result);
        return { type: "success", message: "Account created successfully" };
    } catch (error) {
        console.error("Error adding user:", error);
        return { type: "error", message: "Error adding user" };
    }
}

export async function loginUser(email: string, password: string) {
    try {
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
            return { type: "error", message: "User not found" };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { type: "error", message: "Invalid password" };
        }
        return {
            type: "success",
            message: "Login successful",
            userId: user._id.toString(),
        };
    } catch (error) {
        console.error("Error logging in:", error);
        return { type: "error", message: "Error logging in" };
    }
}

export async function addSnippet(
    title: string,
    description: string,
    language: string,
    tags: string[],
    code: string,
    user: string
) {
    try {
        await connectDB();
        const snippet = new Snippet({
            title,
            description,
            language,
            tags,
            code,
            user,
        });
        const result = await snippet.save();
        console.log("Snippet added:", result);
        return { type: "success", message: "Snippet added successfully" };
    } catch (error) {
        console.error("Error adding snippet:", error);
        return { type: "error", message: "Error adding snippet" };
    }
}

export async function getSnippet(userId: string): Promise<SnippetType[]> {
    console.log("userId in getSnippet", userId);
    try {
        await connectDB();
        const snippets = await Snippet.find({ user: userId })
            .sort({ createdAt: -1 })
            .lean<SnippetType[]>();
        console.log("Snippet added:", snippets);
        return snippets.map((s) => ({
            ...s,
            _id: s._id.toString(),
            user: s.user.toString(),
        }));
    } catch (error) {
        console.error("Error adding snippet:", error);
        return [];
    }
}

export async function deleteSnippet(snippetId: string) {
    try {
        await connectDB();
        const result = await Snippet.deleteOne({ _id: snippetId });
        console.log("Snippet deleted:", result);
        return { type: "success", message: "Snippet deleted successfully" };
    } catch (error) {
        console.error("Error deleting snippet:", error);
        return { type: "error", message: "Error deleting snippet" };
    }
}

export async function getSnippetById(id: string) {
    try {
        await connectDB();
        const snippet = await Snippet.findById(id).lean<SnippetType>();
        if (!snippet) return null;
        console.log("Snippet added:", snippet);
        return snippet;
    } catch (error) {
        console.error("Error adding snippet:", error);
        return null;
    }
}
export async function updateSnippet(id: string, data: Partial<SnippetType>) {
    await connectDB();
    await Snippet.findByIdAndUpdate(id, data);
}
