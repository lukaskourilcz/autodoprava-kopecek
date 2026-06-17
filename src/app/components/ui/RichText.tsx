import type { ReactNode } from "react";

/**
 * Renders text that may contain `<b>...</b>` (the only markup used in vehicle
 * descriptions) as real <strong> elements, without dangerouslySetInnerHTML.
 */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = (text ?? "").split(/(<b>.*?<\/b>)/g).map((part, index) => {
    const bold = part.match(/^<b>(.*?)<\/b>$/);
    return bold ? <strong key={index}>{bold[1]}</strong> : part;
  });
  return <>{parts}</>;
}
