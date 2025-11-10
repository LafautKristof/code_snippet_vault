import mongoose, { Schema, model, models } from "mongoose";

const SnippetSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        language: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
            default: [],
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
    },
    { timestamps: true }
);

export const Snippet = models.Snippet || model("Snippet", SnippetSchema);
