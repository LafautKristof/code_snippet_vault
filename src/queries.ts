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
    user: string,
    isPublic: boolean
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
            isPublic,
        });
        const result = await snippet.save();
        console.log("Snippet added:", result);
        return { type: "success", message: "Snippet added successfully" };
    } catch (error) {
        console.error("Error adding snippet:", error);
        return { type: "error", message: "Error adding snippet" };
    }
}

export async function getSnippets({
    userId,
    onlyPublic,
    query,
    language,
}: {
    userId?: string;
    onlyPublic?: boolean;
    query?: string;
    language?: string;
}) {
    try {
        await connectDB();

        const andConditions: Record<string, unknown>[] = [];

        if (userId) {
            andConditions.push({ user: userId });
        }

        if (onlyPublic) {
            andConditions.push({ isPublic: true });
        }

        let matchedUserIds: string[] = [];
        if (query) {
            const users = await User.find({
                username: { $regex: query, $options: "i" },
            }).select("_id");
            matchedUserIds = users.map((u) => u._id.toString());
        }

        if (query) {
            andConditions.push({
                $or: [
                    { title: { $regex: query, $options: "i" } },
                    { description: { $regex: query, $options: "i" } },
                    { tags: { $regex: query, $options: "i" } },
                    { code: { $regex: query, $options: "i" } },
                    ...(matchedUserIds.length > 0
                        ? [{ user: { $in: matchedUserIds } }]
                        : []),
                ],
            });
        }

        if (language && language !== "all") {
            andConditions.push({ language });
        }

        const mongoQuery =
            andConditions.length > 0 ? { $and: andConditions } : {};

        const shouldPopulate = onlyPublic;

        const queryBuilder = Snippet.find(mongoQuery)
            .sort({ createdAt: -1 })
            .lean();

        if (shouldPopulate) {
            queryBuilder.populate("user", "username");
        }

        const snippets = await queryBuilder;

        return snippets.map((s) => ({
            _id: String(s._id),
            title: s.title,
            description: s.description,
            language: s.language,
            tags: s.tags,
            code: s.code,
            user: s.user,
            isPublic: s.isPublic,
            createdAt: s.createdAt ?? undefined,
            updatedAt: s.updatedAt ?? undefined,
        }));
    } catch (error) {
        console.error("❌ Error fetching snippets:", error);
        return [];
    }
}

export async function deleteSnippet(snippetId: string, userId: string) {
    try {
        await connectDB();
        const result = await Snippet.deleteOne({
            _id: snippetId,
            user: userId,
        });
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
        const snippet = await Snippet.findById(id)
            .populate("user")
            .lean<SnippetType>();
        if (!snippet) return null;
        console.log("Snippet added:", snippet);
        return {
            _id: snippet._id.toString(),
            title: snippet.title,
            description: snippet.description,
            language: snippet.language,
            tags: snippet.tags || [],
            code: snippet.code,
            user: {
                _id: snippet.user._id.toString(),
                username: snippet.user.username,
                email: snippet.user.email,
                snippetCount: snippet.user.snippetCount,
            },
            isPublic: snippet.isPublic,
            createdAt: snippet.createdAt?.toString?.() ?? null,
            updatedAt: snippet.updatedAt?.toString?.() ?? null,
        };
    } catch (error) {
        console.error("Error adding snippet:", error);
        return null;
    }
}
export async function updateSnippet(
    id: string,
    userId: string,
    data: Partial<SnippetType>
) {
    try {
        await connectDB();
        await Snippet.findOneAndUpdate({ _id: id, user: userId }, data);
    } catch (error) {
        console.error("Error updating snippet:", error);
    }
}

export async function deleteAccount(userId: string) {
    try {
        await connectDB();
        await Snippet.deleteMany({ user: userId });
        await User.deleteOne({ _id: userId });
    } catch (error) {
        console.error("Error deleting account:", error);
    }
}

export async function getUserInfo(userId: string) {
    try {
        await connectDB();

        const user = await User.findById(userId).select("-password");

        if (!user) return null;
        const snippetCount = await Snippet.countDocuments({ user: userId });
        return {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            snippetCount,
        };
    } catch (error) {
        console.error("❌ Error fetching user info:", error);
        return null;
    }
}
