import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getCurrentUser } from "@/lib/getCurrentUser";

const Navbar = async () => {
    const user = await getCurrentUser();
    const nav = [
        { name: "Login", href: "/login" },
        { name: "Register", href: "/register" },
    ];
    return (
        <nav>
            {!user &&
                nav.map((item, index) => (
                    <Link key={index} href={item.href}>
                        {item.name}
                    </Link>
                ))}

            {user && <LogoutButton />}
        </nav>
    );
};
export default Navbar;
