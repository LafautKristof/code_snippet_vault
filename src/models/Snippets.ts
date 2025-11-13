import mongoose, { Schema, model, models } from "mongoose";
import { minify } from "next/dist/build/swc/generated-native";

const SnippetSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function (value: string) {
                    const wordCount = value.trim().split(/\s+/).length;
                    return wordCount >= 1 && wordCount <= 200;
                },
                message: "Description must contain between 1 and 200 words.",
            },
        },
        language: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
            default: [],
            minlength: 3,
        },
        code: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Snippet = models.Snippet || model("Snippet", SnippetSchema);
