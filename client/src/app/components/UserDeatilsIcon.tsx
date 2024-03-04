"use client";
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'
import { ImageContainer } from './styled/UserDeatilsIcon.styled';
import { CButton } from './styled/CButton.styled';

interface UserDeatilsProps { 
    isMenuOpen: boolean;
}

const UserDeatilsIcon = ({ isMenuOpen } : UserDeatilsProps) => {
    const { data: session } = useSession();

    const handleSignOutAction = () => {
        signOut({callbackUrl:'/'});
    }

    return (
        <ImageContainer>
                <Image src={session?.user.image ?? ''} alt='' width={60} height={60} style={{borderRadius: '50%'}}/>
            <div>
                { session?.user.name }
            </div>
            {isMenuOpen && <CButton onClick={() => { handleSignOutAction() }}> Logout </CButton> }
        </ImageContainer>
    )
}


export default UserDeatilsIcon