import React, { ReactNode } from "react";

import styles from "./Breadcrumbs.module.scss";

type Props = {
  children: ReactNode;
  separator?: ReactNode;
  className?: string;
};

export const Breadcrumbs = ({
  children,
  separator = "/",
  className = "",
}: Props) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <nav
      aria-label="Breadcrumb"
      className={`${styles.breadcrumbs} ${className}`}
    >
      <ol className={styles.list}>
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < childrenArray.length - 1 && (
              <li aria-hidden="true" className={styles.separator}>
                {separator}
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
