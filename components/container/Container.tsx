import { Section } from "$live/blocks/section.ts";

type VerticalSpacing = "top" | "bottom" | "both" | "none";

export interface Props {
  sections: {
    label: string;
    section: Section;
    withContainer?: boolean;
    /**
     * @description Section background
     */
    backgroundColor?: string;
    /** @default both */
    verticalSpacing?: "both" | "top" | "bottom" | "none";
    /**
     * @description Vertical margin between sections multiple of 4px
     * @default 0
     */
    spacing?: number;
  }[];
}

function Container({ sections }: Props) {
  return (
    <>
      {sections?.map((
        {
          section: { Component, props },
          withContainer = false,
          backgroundColor = "",
          verticalSpacing = "both",
          spacing = 0,
        },
      ) => (
        <div
          class={`${VERTICAL_SPACING[verticalSpacing]} ${
            SPACING[spacing]
          } w-full`}
          style={backgroundColor && { background: `${backgroundColor}` }}
        >
          {withContainer
            ? (
              <div class="container w-full m-auto px-5">
                <Component {...props} />
              </div>
            )
            : <Component {...props} />}
        </div>
      ))}
    </>
  );
}

const VERTICAL_SPACING: Record<
  VerticalSpacing,
  string
> = {
  top: "!mb-0",
  bottom: "!mt-0",
  none: "!my-0",
  both: "",
};

const SPACING = [
  "my-0",
  "my-1",
  "my-2",
  "my-3",
  "my-4",
  "my-5",
  "my-6",
  "my-7",
  "my-8",
  "my-9",
  "my-10",
];

export default Container;
