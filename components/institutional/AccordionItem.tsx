import Markdown from "deco-sites/std/components/Markdown.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";

export interface Props {
  /**
   * @description Content will be rendered as markdown.
   */
  content: HTML;
  title: string;
}

export function AccordionItem({ title, content }: Props) {
  return (
    <details>
      <summary class="marker::hidden list-none flex justify-between items-center font-bold text-[20px] leading-[35px] mb-[25px] border-b-1 border-[#ccc]">
        {title}
      </summary>
      <Markdown
        text={content.replace(/<p>|<\/p>/g, "\n")}
      />
    </details>
  );
}
