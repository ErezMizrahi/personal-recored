import React from "react";
import { SideMenuContainer, SideMenuWrapper } from "./styled/SideMenu.styled";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AutoSignIn from "./auth/AutoSignIn";
import SideMenu from "./SideMenu";

const NavigationMenu = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return <AutoSignIn />;
  }


  return (
    <SideMenuWrapper>
      <SideMenuContainer>
        <SideMenu />
      </SideMenuContainer>
    </SideMenuWrapper>
  );
};

export default NavigationMenu;
