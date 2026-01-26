"use client";

import React from "react";

interface SafeTextProps {
  text: string;
  className?: string;
}

/**
 * Safely renders text that may contain <strong> and <br> tags
 * without using dangerouslySetInnerHTML
 */
export function SafeText({ text, className }: SafeTextProps) {
  const parts = text.split(/(<strong>.*?<\/strong>|<br\s*\/?>)/gi);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
          const content = part.slice(8, -9);
          return <strong key={index}>{content}</strong>;
        }
        if (part.match(/<br\s*\/?>/i)) {
          return <br key={index} />;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
