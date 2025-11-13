import StackIcon from "tech-stack-icons";

type Languages = {
    key: string;
    label: string;
    variant?: "light" | "dark" | "grayscale";
};
const TechBadge = ({ language }: { language: Languages }) => {
    return (
        <div>
            <StackIcon
                name={language.key}
                variant={language.variant}
                className="w-6 h-6"
            />
        </div>
    );
};
export default TechBadge;
