import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface BagdeItem {
  /**
   * @description Title
   */
  title: string;
  /**
   * @description Color
   * @default secondary
   */
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base"
    | "info"
    | "success"
    | "warning"
    | "error";
  /**
   * @description Text Color
   * @default secondary
   */
  textColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base"
    | "info"
    | "success"
    | "warning"
    | "error";
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
   * @default primary
   */

  backgroundColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base"
    | "info"
    | "success"
    | "warning"
    | "error";

  /**
   * @description Text color
   * @default primary
   */

  textColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base"
    | "info"
    | "success"
    | "warning"
    | "error";

  /**
   * @description Label
   * @default "Title"
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

  /**
   * @description button background
   * @default primary
   */
  buttonBackgroundColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base"
    | "info"
    | "success"
    | "warning"
    | "error";

  /**
   * @description button text color
   * @default primary
   */

  buttonColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base"
    | "info"
    | "success"
    | "warning"
    | "error";

  /**
   * @description button background on Hover
   * @default primary
   */

  hoveredButtonBackgroundColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base"
    | "info"
    | "success"
    | "warning"
    | "error";

  hoveredButtonColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base"
    | "info"
    | "success"
    | "warning"
    | "error";
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
  itemsPerColumn: {
    /** @default 2 */
    mobile?: 1 | 2;
    /** @default 2*/
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

  /**
   * @description Hover Backfround Color
   */

  hoverBackgroundColor?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base"
    | "info"
    | "success"
    | "warning"
    | "error";

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

export const CONTENT_COLORS_BACKGROUND = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  neutral: "bg-neutral",
  base: "bg-base",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

export const CONTENT_HOVER_COLORS_BACKGROUND = {
  primary: "hover:bg-primary",
  secondary: "hover:bg-secondary",
  accent: "hover:bg-accent",
  neutral: "hover:bg-neutral",
  base: "hover:bg-base",
  info: "hover:bg-info",
  success: "hover:bg-success",
  warning: "hover:bg-warning",
  error: "hover:bg-error",
};

export const CONTENT_HOVER_COLORS = {
  primary: "hover:text-primary-content",
  secondary: "hover:text-secondary-content",
  accent: "hover:text-accent-content",
  neutral: "hover:text-neutral-content",
  base: "hover:text-base-content",
  info: "hover:text-info-content",
  success: "hover:text-success-content",
  warning: "hover:text-warning-content",
  error: "hover:text-error-content",
};

export const CONTENT_COLORS = {
  primary: "text-primary-content",
  secondary: "text-secondary-content",
  accent: "text-accent-content",
  neutral: "text-neutral-content",
  base: "text-base-content",
  info: "text-info-content",
  success: "text-success-content",
  warning: "text-warning-content",
  error: "text-error-content",
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
  itemsPerColumn: itemsColumn,
  itemsPerLine,
  columnGap,
  borderRadius,
  hoverBackgroundColor,
  banners = [],
}: Props) {
  return (
    <section class="w-full md:px-0 mx-auto py-24">
      <div
        class={`flex flex-col grid-cols-auto lg:grid  ${
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
              textColor,
              buttonColor,
              hoveredButtonColor,
              hoveredButtonBackgroundColor,
              buttonBackgroundColor,
            },
            index,
          ) => (
            <div
              key={index}
              class={`group relative overflow-hidden items-center transition duration-300 brightness-100 relative block gap-4
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
                        class={`text-[40px]  md:text-7xl my-2 md:my-4 font-medium ${
                          CONTENT_COLORS[textColor ?? "primary"]
                        }`}
                      >
                        {label}
                      </span>
                      <div class="flex mt-2 items-center justify-between">
                        <ul class="flex flex-wrap gap-2 items-center justify-start">
                          {text?.badges?.length
                            ? text.badges.map((item) => (
                              <li
                                class={`p-2 rounded-lg   text-[10px] md:text-xs uppercase 
                                  ${
                                  CONTENT_COLORS[
                                    item.textColor ?? "primary"
                                  ]
                                }
                                  ${
                                  CONTENT_COLORS_BACKGROUND[
                                    item.color ?? "primary"
                                  ]
                                }
                                `}
                              >
                                {item.title}
                              </li>
                            ))
                            : null}
                        </ul>
                        <a
                          href={href ? href : "/"}
                          class={`hidden flex border-2 border-current transition duration-300 hover:border-transparent pt-3 pb-3 pl-8 pr-8 rounded-full items-center group-hover:flex 
                          
                          
                          
                          ${
                            CONTENT_COLORS_BACKGROUND[
                              buttonBackgroundColor ?? "primary"
                            ]
                          }
                          ${
                            CONTENT_COLORS[
                              buttonColor ?? "primary"
                            ]
                          } 

                          ${
                            CONTENT_HOVER_COLORS_BACKGROUND[
                              hoveredButtonBackgroundColor ?? "primary"
                            ]
                          }
                          ${
                            CONTENT_HOVER_COLORS[
                              hoveredButtonColor ?? "primary"
                            ]
                          }
                        `}
                        >
                          Conferir
                          <Icon id="ArrowRight" width="22" height="22" />
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
                class={`invisible transition duration-700 group-hover:visible w-full z-999 top-0 opacity-0 group-hover:opacity-60 h-full  absolute
                 ${
                  CONTENT_COLORS_BACKGROUND[
                    hoverBackgroundColor ?? "primary"
                  ]
                }
                 ${RADIUS_MOBILE[borderRadius.mobile ?? "none"]}
                 ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]}`}
              >
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
