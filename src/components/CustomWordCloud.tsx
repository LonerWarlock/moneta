"use client";
import D3WordCloud from "react-d3-cloud";
import { useTheme } from "next-themes";
import React from "react";

// type Props = {};

const data = [
  { text: "AI", value: 1 },
  { text: "Machine Learning", value: 10 },
  { text: "Data Science", value: 100 },
  { text: "Blockchain", value: 1000 },
  { text: "Cybersecurity", value: 5 },
  { text: "Cloud Computing", value: 50 },
  { text: "DevOps", value: 500 },
  { text: "Web Development", value: 5000 },
];

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const WordCloud = ({/*props: Props*/}) => {
  const { theme } = useTheme();

  return (
    <>
      <D3WordCloud
        data={data}
        font="Times New Roman"
        fontSize={fontSizeMapper}
        padding={10}
        rotate={0}
        fill={theme === "dark" ? "#fff" : "#000"}
        height={550}
      />
    </>
  );
};

export default WordCloud;
