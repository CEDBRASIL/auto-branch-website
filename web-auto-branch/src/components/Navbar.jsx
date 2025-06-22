import { Box, Container } from "@radix-ui/themes";
import styles from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthContext } from "../context/authContext";

function Navbar() {
    const location = useLocation();
    const { logout } = useAuthContext();

    const pathname = decodeURIComponent(location.pathname)

    const isAuthenticatedRoute = ['/branches', '/vehicles', '/sellHistory', '/employees'].includes(pathname) || pathname.startsWith("/vehicles/");

    if (!isAuthenticatedRoute) {
        return null;
    }

    return (
        <div className={styles.box}>
            <h1 className={styles.title}>
                A<span className="titleSpan">B</span>
            </h1>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <NavLink
                            to="/branches"
                            className={({ isActive }) =>
                                isActive ? styles.navLinkActive : styles.navLink
                            }
                        >
                            Concessionárias
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/vehicles"
                            className={({ isActive }) =>
                                isActive ? styles.navLinkActive : styles.navLink
                            }
                        >
                            Veículos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/sellHistory"
                            className={({ isActive }) =>
                                isActive ? styles.navLinkActive : styles.navLink
                            }
                        >
                            Vendas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/employees"
                            className={({ isActive }) =>
                                isActive ? styles.navLinkActive : styles.navLink
                            }
                        >
                            Funcionários
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <LogOut className={styles.logout} onClick={logout} />
        </div>
    );
}

export default Navbar;