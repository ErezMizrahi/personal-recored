'use client';
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
    const { data: session } = useSession();

    if(session) {
        return (
            <>
                {session?.user?.name} <br />
                <button onClick={() => signOut()}> Sign out </button>
            </>
        );
    }

    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn("google")}> Sign in </button>
        </>
    );
}


const NavigationMenu = () => {
    return (
        <div>
            <AuthButton />
        </div>
    )
}

export default NavigationMenu;