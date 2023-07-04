import type { HTML } from "deco-sites/std/components/types.ts";
import { AccordionItem } from './AccordionItem.tsx';

export interface Props {
  accordions: {
    label: string;
    /**
     * @description Content will be rendered as markdown.
     */
    content: HTML;
  }[];
}

function AccordionsContent({ accordions }: Props) {
    return (
        <div>
        {accordions.map(
            (item, index) => (
                <AccordionItem
                    title={item.label}
                    content={item.content}
                    key={index}
                />
            )
        )}
        </div>
    )
}

export default AccordionsContent;