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
   * @description Text
   */
  text?: {
    /**
     * @description Title
     */
    title?: string;
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
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
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

export const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

export const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

const BANNER_LAYOUTS: Record<number, string> = {
  1: '"banner-0"',
  2: '"banner-0 banner-1"',
  3: `
    "banner-0 banner-1"
    "banner-0 banner-2"
    `,
  4: `
    "banner-0 banner-2"
    "banner-1 banner-3"
    `,
};

const VERTICAL_ALIGNMENT: Record<string, string> = {
  "Top": "top-0",
  "Middle": "top-1/2 -translate-y-1/2",
  "Bottom": "bottom-0",
};

export const HORIZONTAL_ALIGNMENT: Record<string, string> = {
  "Left": "items-left",
  "Center": "items-center",
  "Right": "items-end",
};

export default function BannnerGrid({
  borderRadius,
  banners = [],
}: Props) {
  return (
    <section class="w-full md:px-0 mx-auto py-24">
      <div
        class={`flex flex-col lg:grid lg:grid-rows-2 gap-4 md:gap-6`}
        style={{
          gridTemplateAreas: BANNER_LAYOUTS[banners?.length ?? 1] as string,
        }}
      >
        {banners.map((
          { href, srcMobile, alt, backgroundColor, text },
          index,
        ) => (
          <div
            class="overflow-hidden relative block"
            style={{
              gridArea: `banner-${index}`,
            }}
          >
            <a
              class="block relative"
              href={href}
            >
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
                      class="text-[40px] md:text-7xl my-2 md:my-4 font-medium"
                      style={{
                        color: text?.color ? text.color : "#482BE7",
                      }}
                    >
                      {text.title}
                    </span>
                    <ul class="flex flex-wrap gap-2 items-center justify-start">
                      {text?.badges?.length
                        ? text.badges.map((item) => (
                          <li
                            class="p-2 rounded-lg text-[10px] md:text-xs uppercase"
                            style={{
                              color: item.textColor ? item.textColor : "#fff",
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
                  </div>
                )
                : null}
              <img
                class={`w-full h-full ${
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
          </div>
        ))}
      </div>
    </section>
  );
}
