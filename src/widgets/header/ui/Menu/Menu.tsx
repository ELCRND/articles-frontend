import Link from "next/link";

import { AccountButton } from "../AccountButton/AccountButton";

import styles from "./Menu.module.scss";

const menuItems = [
  {
    blockTitle: "Информация",
    blockLinks: [
      {
        path: "1",
        text: "Соглашение",
      },
      {
        path: "2",
        text: "Конфиденциальность",
      },
      {
        path: "3",
        text: "Задать вопрос",
      },
    ],
  },
];

type Props = {
  isOpen: boolean;
  onClick: VoidFunction;
};

export const Menu = ({ isOpen, onClick }: Props) => {
  return (
    <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
      <div className={styles.menu__btns}>
        <AccountButton />
        <button onClick={onClick} className={styles.menu__closeBtn}></button>
      </div>
      <nav className={styles.menu__nav}>
        <ul className={styles.menu__list}>
          {menuItems.map((item) => (
            <li key={item.blockTitle} className={styles.menu__item}>
              <h2 className={styles.menu__itemTitle}>{item.blockTitle}</h2>
              <ul className={styles.menu__itemList}>
                {item.blockLinks.map((l) => (
                  <li key={l.path} className={styles.menu__itemLink}>
                    <Link href={l.path}>{l.text}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
