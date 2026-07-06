import React from "react";
import { ArrowUpRight, FileText } from "lucide-react";

type TopicItem = {
  name: string;
  description: string;
  link: string;
};

type TopicGroupProps = {
  categoryName: string;
  topics: TopicItem[];
};

export const TopicGroup = ({ categoryName, topics }: TopicGroupProps) => {
  return (
    <div className="pb-6">
      <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-primary">
        {categoryName}
      </h3>
      <div className="space-y-2">
        {topics.map((topic, index) => (
          <a
            key={index}
            href={topic.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3 bg-card border rounded-lg transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center space-x-4">
              <FileText className="w-5 h-5 text-emerald-500 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-semibold">{topic.name}</span>
                <span className="text-sm text-muted-foreground">
                  {topic.description}
                </span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-primary shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
};
