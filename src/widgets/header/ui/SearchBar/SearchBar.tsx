"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import styles from "./SearchBar.module.scss";

export const SearchBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("querySearchBar");

    console.log(pathname);

    if (pathname !== "/") {
      router.push(`/?q=${query}`);
      return;
    }

    window.history.replaceState(null, "", `/?q=${query}`);
  };

  const handleClear = (e: React.InputEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") {
      window.history.replaceState(null, "", `/?q=${""}`);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <input
          type="search"
          className={styles.searchBar__input}
          placeholder="Поиск статей"
          name="querySearchBar"
          defaultValue={searchParams.get("q") || ""}
          onInput={handleClear}
        />
        <button type="submit" className={styles.searchBar__button}>
          <span>
            <span>П</span>
            <span>о</span>
            <span>и</span>
            <span>с</span>
            <span>к</span>
          </span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.6818 23.6245L14.0455 15.9772C13.3636 16.5235 12.5795 16.9559 11.6932 17.2745C10.8068 17.5932 9.86364 17.7525 8.86364 17.7525C6.38636 17.7525 4.29 16.8935 2.57455 15.1756C0.858182 13.4568 0 11.357 0 8.87624C0 6.39545 0.858182 4.29565 2.57455 2.57684C4.29 0.858947 6.38636 0 8.86364 0C11.3409 0 13.4377 0.858947 15.1541 2.57684C16.8695 4.29565 17.7273 6.39545 17.7273 8.87624C17.7273 9.87767 17.5682 10.8222 17.25 11.7098C16.9318 12.5974 16.5 13.3826 15.9545 14.0654L23.625 21.7468C23.875 21.9972 24 22.3044 24 22.6686C24 23.0327 23.8636 23.3513 23.5909 23.6245C23.3409 23.8748 23.0227 24 22.6364 24C22.25 24 21.9318 23.8748 21.6818 23.6245ZM8.86364 15.0213C10.5682 15.0213 12.0173 14.4241 13.2109 13.2297C14.4036 12.0344 15 10.5832 15 8.87624C15 7.16927 14.4036 5.71812 13.2109 4.52279C12.0173 3.32836 10.5682 2.73115 8.86364 2.73115C7.15909 2.73115 5.71 3.32836 4.51636 4.52279C3.32364 5.71812 2.72727 7.16927 2.72727 8.87624C2.72727 10.5832 3.32364 12.0344 4.51636 13.2297C5.71 14.4241 7.15909 15.0213 8.86364 15.0213Z"
              fill="#0E070D"
            />
          </svg>
        </button>
      </form>
    </Suspense>
  );
};
