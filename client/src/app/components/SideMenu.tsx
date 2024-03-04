"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import UserDeatilsIcon from './UserDeatilsIcon';
import { LinkListContainer, ListItemWithImage, SideMenuWidth } from './styled/SideMenu.styled';


const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(true);
    const menuOptions = [
        { title: 'Home' , href: '/', icon: `/images/home_FILL0_wght400_GRAD0_opsz24.svg` },
        { title: 'Workouts' , href: '/workouts', icon: `/images/home_FILL0_wght400_GRAD0_opsz24.svg`  },
        { title: 'Protected' , href: '/protected', icon: `/images/home_FILL0_wght400_GRAD0_opsz24.svg`  },
        { title: 'Personal Information' , href: '/personal-info', icon: `/images/home_FILL0_wght400_GRAD0_opsz24.svg`  }
    ];
  return (
    <SideMenuWidth width={isOpen ? '200px' : '40px'}>
        <button onClick={() => setIsOpen(prev => !prev)}>{isOpen ? 'close' : 'open'}</button>
            <div style={{width: '100%'}}>
                <UserDeatilsIcon isMenuOpen={isOpen} />
            </div>
        
            <LinkListContainer>
                { menuOptions.map((item, index) => (
                    <React.Fragment key={`${item.title}-${index}`}>
                    <Link href={item.href}>
                        <ListItemWithImage icon={item.icon}>
                            {isOpen && item.title} 
                        </ListItemWithImage>
                    </Link>
                    </React.Fragment>
                    
                ))}
            </LinkListContainer>
    </SideMenuWidth>
  )
}

export default SideMenu