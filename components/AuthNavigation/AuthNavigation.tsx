"use client";
import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import TagsMenu from "../TagsMenu/TagsMenu";
const AuthNavigation = () => {
  const router = useRouter();
  const handleClickLogOut = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };
  const { user, isAuthenticated, clearIsAuthenticated: clearIsAuthenticated } = useAuthStore();
  return (
    <>
      {isAuthenticated ? (
        <>
          <li>
            <TagsMenu />
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.username}</p>
            <button onClick={handleClickLogOut} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;