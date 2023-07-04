
import Markdown from "deco-sites/std/components/Markdown.tsx";
import type { HTML } from "deco-sites/std/components/types.ts";

export interface Props {
    /**
     * @description Content will be rendered as markdown.
     */
    content: HTML;
}

function TextContent({ content }: Props) {
    return <Markdown text={content.replace(/<p>|<\/p>/g, "\n")} />;
}

export default TextContent;