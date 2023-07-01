import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface BagdeItem {
  /**
   * @description Title
   */
  title: string;
  /**
   * @description Color
   */
  color?: string;
  /**
   * @description Text Color
   */
  textColor?: string;
}

export interface Banner {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  /**
   * @description Background color
   */
  backgroundColor?: string;

  /**
   * @description Label
   */
  label?: string;

  /**
   * @description Text
   */
  text?: {
    /**
     * @description Color
     */
    /**
     * @description Reverse?
     * @default false
     */
    reverse?: boolean;
    color?: string;
    /**
     * @description Vertical Alignment
     */
    verticalAlignment?: "Top" | "Middle" | "Bottom";

    /**
     * @description Vertical Alignment
     */
    horizontalAlignment?: "Left" | "Center" | "Right";

    /**
     * @description Badges
     */
    badges?: BagdeItem[];
  };

  /**
   * @description Coluna inicial
   */

  columnStart?: number;

  /**
   * @description Linha inicial
   */

  rowStart?: number;

  /**
   * @description Quantidade de linhas que irá ocupar
   */

  rowSpan?: number;

  /**
   * @description Quantidade de colunas que irá ocupar
   */

  colSpan?: number;

  hoverUrl?: string;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  /**
   * @description Default is 2 for mobile and all for desktop
   */
  itemsPerLine: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 4 */
    desktop?: 1 | 2 | 3 | 4 | 6 | 8;
  };
  /**
   * @description Columns per line
   */
  itemsColumn: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 4 */
    desktop?: 1 | 2 | 3 | 4 | 6 | 8;
  };

  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };

  columnGap: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 4 */
    desktop?: 1 | 2 | 3 | 4 | 6;
  };

  /** @max 4 */
  banners: Banner[];
}

export const MOBILE_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

export const DESKTOP_COLUMNS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  6: "sm:grid-cols-6",
  8: "sm:grid-cols-8",
};

export const GRID_ROWS: Record<number, string> = {
  1: "grid-rows-1",
  2: "grid-rows-2",
  3: "grid-rows-3",
  4: "grid-rows-4",
  5: "grid-rows-5",
  6: "grid-rows-6",
};

export const GRID_COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

export const GRID_COL_START: Record<number, string> = {
  1: "col-start-1",
  2: "col-start-2",
  3: "col-start-3",
  4: "col-start-4",
  5: "col-start-5",
  6: "col-start-6",
};

export const GRID_ROW_START: Record<number, string> = {
  1: "row-start-1",
  2: "row-start-2",
  3: "row-start-3",
  4: "row-start-4",
  5: "row-start-5",
  6: "row-start-6",
};

export const GRID_ROW_SPAN: Record<number, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
};

export const GRID_COL_SPAN: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
};

export const GRID_GAP: Record<number, string> = {
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
};

export const RADIUS_MOBILE = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

export const RADIUS_DESKTOP = {
  none: "sm:rounded-none",
  sm: "sm:rounded-sm",
  md: "sm:rounded-md",
  lg: "sm:rounded-lg",
  xl: "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  full: "sm:rounded-full",
};

const VERTICAL_ALIGNMENT: Record<string, string> = {
  Top: "top-0",
  Middle: "top-1/2 -translate-y-1/2",
  Bottom: "bottom-0",
};

export const HORIZONTAL_ALIGNMENT: Record<string, string> = {
  Left: "items-left",
  Center: "items-center",
  Right: "items-end",
};

export default function BannnerGrid({
  itemsColumn,
  itemsPerLine,
  columnGap,
  borderRadius,
  banners = [],
}: Props) {
  return (
    <section class="w-full md:px-0 mx-auto py-24">
      <div
        class={`flex flex-col items-center auto-cols-auto lg:grid  ${
          GRID_GAP[columnGap?.desktop ?? 2]
        } ${GRID_COLUMNS[itemsColumn?.desktop ?? 2]} ${
          GRID_ROWS[itemsPerLine?.desktop ?? 1]
        }`}
      >
        {banners.map(
          (
            {
              href,
              srcMobile,
              alt,
              backgroundColor,
              text,
              columnStart,
              rowStart,
              rowSpan,
              colSpan,
              label,
              hoverUrl,
            },
            index,
          ) => (
            <div
              key={index}
              class={`group overflow-hidden transition duration-300 brightness-100 hover:bg-blue-500 relative block gap-4
              ${GRID_ROW_START[rowStart ?? 0]}
              ${GRID_COL_START[columnStart ?? 0]}
              ${GRID_ROW_SPAN[rowSpan ?? 0]}
              ${GRID_COL_SPAN[colSpan ?? 0]}
           `}
            >
              <a class="block relative" href={href}>
                {text
                  ? (
                    <div
                      class={`w-full absolute flex z-10 md:p-10 p-5  ${
                        VERTICAL_ALIGNMENT[text.verticalAlignment ?? "Top"]
                      } ${text.reverse ? "flex-col-reverse" : "flex-col"} ${
                        HORIZONTAL_ALIGNMENT[text.horizontalAlignment ?? "Left"]
                      }`}
                    >
                      <span
                        class={`text-[40px] md:text-7xl my-2 md:my-4 font-medium`}
                        style={{
                          color: text?.color ? text.color : "#482BE7",
                        }}
                      >
                        {label}
                      </span>
                      <div class="flex justify-between">
                        <ul class="flex flex-wrap gap-2 items-center justify-start">
                          {text?.badges?.length
                            ? text.badges.map((item) => (
                              <li
                                class={`p-2 rounded-lg text-[10px] md:text-xs uppercase`}
                                style={{
                                  color: item.textColor
                                    ? item.textColor
                                    : "#fff",
                                  backgroundColor: item.color
                                    ? item.color
                                    : "#482BE7",
                                }}
                              >
                                {item.title}
                              </li>
                            ))
                            : null}
                        </ul>
                        <a
                          href={hoverUrl ? hoverUrl : "/"}
                          class="hidden border-2 text-white hover:text-dark-blue border-white transition duration-300 hover:border-light-green pt-3 pb-3 pl-8 pr-8 rounded-full items-center group-hover:flex hover:bg-light-green"
                        >
                          Conferir
                          <svg
                            class="ml-2"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="Icon">
                              <path
                                id="Vector"
                                d="M3.75 9H14.25"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                id="Vector_2"
                                d="M9 3.75L14.25 9L9 14.25"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                          </svg>
                        </a>
                      </div>
                    </div>
                  )
                  : null}
                <img
                  class={`w-full h-full  ${
                    RADIUS_MOBILE[borderRadius.mobile ?? "none"]
                  } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
                  src={srcMobile}
                  alt={alt}
                  style={{
                    backgroundColor,
                  }}
                  decoding="async"
                  loading="lazy"
                  preload=""
                />
              </a>
              <div
                class={`invisible transition duration-700 group-hover:visible w-full z-999 top-0 opacity-0 group-hover:opacity-60 h-full bg-default-blue absolute ${
                  RADIUS_MOBILE[borderRadius.mobile ?? "none"]
                } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]}`}
              >
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
