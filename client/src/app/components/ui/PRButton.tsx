'use client';
import React, { HTMLAttributes } from 'react'
import { CButton } from '../styled/CButton.styled';
import { useRouter } from 'next/navigation';

interface PRButtonAction {
  onClick: {
    redirect? : string;
    func?: () => void;
  }
}

interface PRButtonProps extends HTMLAttributes<HTMLButtonElement> {
    onAction?: PRButtonAction
}

const PRButton = ( {onAction , ...props} : PRButtonProps ) => {
  const router = useRouter();

  const clickEvent = () => {
    if (onAction?.onClick.redirect) {
      router.push(onAction.onClick.redirect);
      return;
    }

    if (onAction?.onClick.func) {
      onAction.onClick.func();
      return;
    }
  }

  return (
    <CButton onClick={ clickEvent } style={props.style} className={props.className}>{props.children}</CButton>
  )
}

export default PRButton;