import Link from "next/link";
import React from "react";

const MyArticles = () => {
  return (
    <div>
      <Link href={"/profile/my-articles/create"} style={{ color: "#fff" }}>
        создать
      </Link>
    </div>
  );
};

export default MyArticles;
