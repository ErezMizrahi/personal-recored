"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import UserDeatilsIcon from './UserDeatilsIcon';
import { LinkListContainer, ListItemWithImage, SideMenuWidth } from './styled/SideMenu.styled';


const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuOptions = [
        { title: 'Home' , href: '/', icon: `/images/home_FILL0_wght400_GRAD0_opsz24.svg` },
        { title: 'Workouts' , href: '/workouts', icon: `/images/home_FILL0_wght400_GRAD0_opsz24.svg`  },
        { title: 'Protected' , href: '/protected', icon: `/images/home_FILL0_wght400_GRAD0_opsz24.svg`  }
    ];
  return (
    <SideMenuWidth width={!isOpen ? 200 : 0}>
        <button onClick={() => setIsOpen(prev => !prev)}>{isOpen ? 'close' : 'open'}</button>
        <div style={{width: '100%'}}>
            <UserDeatilsIcon />
        </div>
            <LinkListContainer>
                { menuOptions.map((item, index) => (
                    <React.Fragment key={`${item.title}-${index}`}>
                    <ListItemWithImage icon={item.icon}>
                        <Link href={item.href}> {item.title} </Link>
                    </ListItemWithImage>
                    </React.Fragment>
                    
                ))}
            </LinkListContainer>
    </SideMenuWidth>
  )
}

export default SideMenu