import Link from "next/link";
import React from "react";
import LiModal from "./LiModal";

export default function ListItem({ item }: { item: any }) {
  return (
    <LiModal item={item}>
      <Link href={`/${item.link}`}>
        <span className="navbar-text">{item.name}</span>
      </Link>
    </LiModal>
  );
}
