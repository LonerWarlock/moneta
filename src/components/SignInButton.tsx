"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import React from 'react';
import Image from 'next/image';

type Props = {
    text: string;
    image?: string; 
};

const SignInButton = ({ text, image }: Props) => {
  return (
    <Button className="bg-slate-300 text-black hover:bg-slate-400" onClick={() => {
        signIn('google');
    }}>
        {image && (
            <Image
                src={image}
                alt="Sign in icon"
                width={20}
                height={20}
                className="mr-1" // Add some margin to the right of the image
            />
        )}
        {text}
    </Button>
  );
};

export default SignInButton;