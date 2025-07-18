"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";  
import React from 'react';


type Props = {
    text: string
}

const SignInButton = ({text}: Props) => {
  return (
    <Button onClick={() => {
        signIn('google')
    }}>
        {text}
    </Button>
  );
};

export default SignInButton;
