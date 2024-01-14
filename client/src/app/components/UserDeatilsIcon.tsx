"use client";
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'
import { ImageContainer } from './styled/UserDeatilsIcon.styled';

const UserDeatilsIcon = () => {
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
            <button onClick={() => { handleSignOutAction() }}> SignOut? </button>
        </ImageContainer>
    )
}


export default UserDeatilsIcon