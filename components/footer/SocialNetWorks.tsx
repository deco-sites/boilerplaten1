import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface SocialItem {
  icon: LiveImage;
  label: string;
  href: string;
  openNewView: boolean;
}

export interface ISocialNetworkProps {
  socialItems: SocialItem[];
}

export default function SocialNetWorks(
  { socialItems }: ISocialNetworkProps,
) {
  return (
    <div class="mt-5 border-b border-base-content pb-5">
      <ul class="gap-5 flex items-center justify-between">
        {socialItems.map((social) => (
          <li
            key={social.icon}
            class="bg-base-300 w-8 h-8 rounded-full hover:bg-emphasis transition-all duration-500"
          >
            <a
              href="#"
              class="flex items-center justify-center w-full h-full"
              target={social.openNewView ? "_blank" : ""}
            >
              <img
                title={social.label}
                alt={social.label}
                id={social.icon}
                src={social.icon}
                class="relative"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
