"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import UserDeatilsIcon from "./UserDeatilsIcon";
import {
  LinkListContainer,
  ListItem,
  SideMenuWidth,
} from "./styled/SideMenu.styled";
import { signOut, useSession } from "next-auth/react";
import { CButton } from "./styled/CButton.styled";
import { usePathname } from "next/navigation";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const menuOptions = [
    { title: "Home", href: "/" },

    { title: "Personal", href: "/personal-info" },
    { title: "Programs", href: "/programs" },
  ];
  const { data: session } = useSession();
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const handleSignOutAction = () => {
    signOut({ callbackUrl: "/" });
  };
  const path = usePathname();

  const getOnComponentMountIndex = () => {
    const pathList = path.split("/");
    const currentItemIndex = menuOptions.findIndex(
      (option) => option.href.replace("/", "") === pathList[pathList.length - 1]
    );
    return currentItemIndex;
  };

  useEffect(() => {
    const index = getOnComponentMountIndex();
    setSelectedItem(index);
  }, []);

  const onChanged = (index: number) => {
    setSelectedItem(index);
  };
  return (
    <SideMenuWidth width={isOpen ? "150px" : "50px"}>
      {/* <button onClick={() => setIsOpen(prev => !prev)}>{isOpen ? 'close' : 'open'}</button> */}

      <UserDeatilsIcon session={session} />

      <LinkListContainer>
        {menuOptions.map((item, index) => (
          <React.Fragment key={`${item.title}-${index}`}>
            <Link href={item.href}>
              <ListItem
                style={
                  selectedItem === index
                    ? {
                        textDecoration: "underline",
                        textUnderlineOffset: "10px",
                        textDecorationColor: "#ED5050",
                      }
                    : {}
                }
                onClick={() => {
                  onChanged(index);
                }}
               
              >
                {isOpen && item.title}
              </ListItem>
            </Link>
          </React.Fragment>
        ))}
      </LinkListContainer>

      <div style={{ position: "absolute", bottom: "10px" }}>
        <div
          style={{ width: "150px", display: "flex", justifyContent: "center" }}
        >
          {isOpen && (
            <CButton
              style={{ height: "30px", padding: "0px 30px 0px 30px" }}
              onClick={() => {
                handleSignOutAction();
              }}
            >
              {" "}
              Logout{" "}
            </CButton>
          )}
        </div>
      </div>
    </SideMenuWidth>
  );
};

export default SideMenu;
