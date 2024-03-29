import React from 'react'
import UserDeatilsIcon from './UserDeatilsIcon';
import { SideMenuContainer } from './styled/SideMenu.styled';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AutoSignIn from './AutoSignIn';
import SideMenu from './SideMenu';

const NavigationMenu = async () => {
    const session = await getServerSession(authOptions);
    if(!session?.user) {
        return <AutoSignIn />
    }

    if(session?.user.isNew) {
        return null;
    }

    return (
        <SideMenuContainer>
            <SideMenu/>
        </SideMenuContainer>
    )
}

export default NavigationMenu