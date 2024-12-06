"use client";

import { Logo } from "@/components/logo";
import { useLogout } from "@/hooks/useLogout";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  const { logout } = useLogout();

  return (
    <div className={styles.navbar}>
      <Logo />
      <button className={styles.button} onClick={() => logout()}>
        Выход
      </button>
    </div>
  );
};
