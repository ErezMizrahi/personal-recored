"use client";
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'
import { ImageContainer } from './styled/UserDeatilsIcon.styled';
import { CButton } from './styled/CButton.styled';
import { Session } from 'next-auth';

interface UserDeatilsProps { 
    session:Session|null;
}

const UserDeatilsIcon = ({ session } : UserDeatilsProps) => {
    return (
        <ImageContainer>
            <Image src={session?.user.image ?? ''} alt='' width={60} height={60} style={{borderRadius: '50%'}}/>
            <div>
                { session?.user.name }
            </div>
        </ImageContainer>
    )
}


export default UserDeatilsIcon