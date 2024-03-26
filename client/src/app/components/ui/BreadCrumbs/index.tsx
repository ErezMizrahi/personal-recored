"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BreadCrumbsContainer } from "../../styled/Container.styled";

export default function index() {
  const path = usePathname();
  const pathList = path.split("/");

  const isLastOrFirstItem = (index: number) => {
    return index === pathList.length - 1 || index === 0;
  };

  return (
    <BreadCrumbsContainer>
      {pathList[1] === "" ? (
        <Link href="/">Home</Link>
      ) : (
        pathList.map((item, index) => (
          <Link
            style={{ textTransform: "capitalize" }}
            href={pathList.slice(0, index + 1).join("/")}
            key={`${index}-breadCrum`}
          >
            {item.replaceAll("-", " ")}
            {isLastOrFirstItem(index) ? "" : " / "}
          </Link>
        ))
      )}
    </BreadCrumbsContainer>
  );
}
