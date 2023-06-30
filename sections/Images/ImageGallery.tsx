import {
  DESKTOP_COLUMNS,
  MOBILE_COLUMNS,
} from "$store/components/ui/BannerGrid.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface ImageGalleryItem {
  /** @description Title */
  title?: string;

  /** @description Image url */
  image: LiveImage;

  /** @description Alt text */
  alt: string;

  /** @description Link */
  href?: string;
}

export interface Props {
  /** @description Banners */
  images: ImageGalleryItem[];
  /** @description Items per page Desktop */
  itemPerPageDesktop?: 1 | 2 | 3 | 4 | 5;
  /** @description Items per page Mobile */
  itemPerPageMobile?: 1 | 2;
}

export default function ImageGallery(props: Props) {
  const { images, itemPerPageMobile = 1, itemPerPageDesktop = 3 } = props;

  return (
    <section class="grid w-full gap-8 my-12 max-md:my-8">
      <div
        class={`w-full grid justify-center lg:gap-8 gap-5 ${
          MOBILE_COLUMNS[itemPerPageMobile ?? 1]
        }} ${DESKTOP_COLUMNS[itemPerPageDesktop ?? 3]}`}
      >
        {images.map((item) => (
          <div class="relative overflow-hidden rounded-xl w-full m-auto group">
            <a href={item.href} class="block">
              <span class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 max-sm:text-7xl text-5xl lg:text-7xl font-medium text-base-100 whitespace-nowrap ">
                {item.title}
              </span>
              <img
                class="w-full h-full scale-105 group-hover:scale-100 transition-all duration-1000"
                title={item.alt}
                src={item.image}
                alt={item.alt}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
