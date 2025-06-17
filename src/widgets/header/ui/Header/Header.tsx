"use client";

import { useState } from "react";

import { Menu } from "../Menu/Menu";
import { MenuButton } from "../MenuButton/MenuButton";
import { AccountButton } from "../AccountButton/AccountButton";
import { SearchBar } from "../SearchBar/SearchBar";

import styles from "./Header.module.scss";

export const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuIsOpen((p) => !p);
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <div className={styles.header__btns}>
          <MenuButton isOpen={menuIsOpen} onClick={handleMenuClick} />
          <AccountButton />
        </div>
        <SearchBar />
      </div>

      <Menu isOpen={menuIsOpen} onClick={handleMenuClick} />
    </header>
  );
};
