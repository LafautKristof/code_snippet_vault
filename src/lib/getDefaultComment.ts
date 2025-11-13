export function getDefaultComment(language: string): string {
    switch (language) {
        case "python":
            return "# Write your Python code here...";
        case "ruby":
            return "# Write your Ruby code here...";
        case "shell":
            return "# Write your Shell here...";
        case "html5":
            return "<!-- Write your HTML code here... -->";
        case "css3":
            return "/* Write your CSS code here... */";
        case "scss":
            return "// Write your SCSS code here...";
        case "cprogramming":
            return "/* Write your C code here... */";
        case "c++":
            return "/* Write your C++ code here... */";
        case "java":
            return "/* Write your Java code here... */";
        case "csharp":
            return "/* Write your C# code here... */";
        case "php":
            return "/* Write your PHP code here... */";
        case "go":
            return "/* Write your Go code here... */";
        case "kotlin":
            return "/* Write your Kotlin code here... */";
        case "swift":
            return "/* Write your Swift code here... */";
        case "sql":
            return "-- Write your SQL code here...";
        case "js":
            return "// Write your JavaScript code here...";
        case "typescript":
            return "// Write your TypeScript code here...";
        default:
            return "// Write your code here...";
    }
}
