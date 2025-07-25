"use client";

import { useTheme } from "next-themes";
import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamically import the D3WordCloud component with SSR turned off
const D3WordCloud = dynamic(() => import("react-d3-cloud"), {
  ssr: false,
});

type Props = {
  formattedTopics: { text: string; value: number }[];
};

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const WordCloud = ({ formattedTopics }: Props) => {
  // Destructure resolvedTheme from the hook
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  
  return (
    <div className="word-cloud-container">
      <D3WordCloud
        data={formattedTopics}
        font="Times New Roman"
        fontSize={fontSizeMapper}
        padding={10}
        onWordClick={(event, word) => {
          router.push(`/quiz?topic=${encodeURIComponent(word.text)}`);
        }}
        rotate={0}
        // Use resolvedTheme to determine the fill color
        fill={resolvedTheme === "light" ? "#000" : "#fff"}
        height={550}
      />
    </div>
  );
};

export default WordCloud;