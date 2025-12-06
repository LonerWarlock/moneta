// src/components/CustomWordCloud.tsx
"use client";

import React from "react";
// Removed import for 'react-d3-cloud'

type Props = {
  formattedTopics: { text: string; value: number }[];
};

// Replaced the WordCloud logic with a placeholder
const WordCloud = ({ formattedTopics }: Props) => {
  return (
    <div className="flex items-center justify-center p-8 h-[550px] text-muted-foreground border-2 border-dashed rounded-lg">
      <p className="text-center">
        Word Cloud visualization is temporarily disabled due to incompatibility with React 19.
        <br />
        Found {formattedTopics.length} topics.
      </p>
    </div>
  );
};

export default WordCloud;