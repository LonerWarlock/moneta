"use client"

import Image from 'next/image';
import React from 'react';
import { Progress } from './ui/progress';
import { useTheme } from 'next-themes';

type Props = {
    finished: boolean;
};

const loadingTexts = [
    "Generating Questions...",
    "Unleashing the Power of Curiosity",
    "Harnessing the knowledge of the Cosmos...",
    "Igniting the flow of wonder and exploration...",
]

const LoadingQues = ({finished}: Props) => {
    const { theme } = useTheme();
    const [progress, setProgress] = React.useState(0);
    const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * loadingTexts.length);
            setLoadingText(loadingTexts[randomIndex]);
        }, 2000);
        return () => clearInterval(interval)
    }, []); // Added empty dependency array for correctness

    React.useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if(finished) return 100;
                if(prev >= 95) return 95; // Prevents reaching 100 prematurely
                if(Math.random() < 0.1){
                    return prev + 2;
                }
                return prev + 0.5;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [finished])

 return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] md:w-[60vw] flex flex-col items-center">
        <Image
            src={theme === "dark" ? "/Loading-dark.gif" : "/Loading.gif"}
            width={400}
            height={400}
            alt="Loading animation"
        />
        <Progress value={progress} className="w-full mt-4"/>
        <h1 className="mt-3 text-xl text-center">{loadingText}</h1>

        <div className="mt-12 text-center">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Animated illustration by{' '}
                <a 
                    href="https://storyset.com/people" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:underline text-blue-600 dark:text-blue-400"
                >
                    Storyset
                </a>
            </p>
        </div>
    </div>
);
};

export default LoadingQues;