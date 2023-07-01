import { ICartProps } from "$store/components/minicart/Cart.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Modals from "$store/islands/HeaderModals.tsx";
import SearchBar from "$store/islands/HeaderSearchbar.tsx";
import NavItem, { INavItem } from "./NavItem.tsx";
import { megaMenuDefaultItems } from "./constants.ts";
export interface Props {
  /**
   * @title Items do menu
   * @description Items do menu desktop e mobile
   */
  navItems?: INavItem[];
  /**
   * @default O que esta procurando?
   * @title Titulo da busca
   */
  placeholder?: string;

  /**
   * @title Configurar minicart
   */
  minicart: ICartProps;
}

function HeaderLayout(
  {
    navItems = megaMenuDefaultItems as INavItem[],
    placeholder = "O que esta procurando?",
    minicart,
  }: Props,
) {
  return (
    <header class="z-50 lg:p-0 py-4">
      <div class="flex justify-between items-center lg:p-0">
        <div class="flex items-center">
          <Buttons variant="menu" />
          <a href="/" class="" aria-label="Store logo">
            <Icon id="Logo" width={120} height={27} />
          </a>
        </div>
        <div class="max-lg:hidden flex justify-between">
          {navItems && navItems?.length
            ? navItems?.map((item) => <NavItem key={item.label} item={item} />)
            : null}
        </div>
        <div class="flex items-center w-auto lg:justify-between xl:gap-8 lg:gap-2">
          <div class="flex items-center xl:gap-4 lg:gap-2">
            <Buttons variant="search" />
            <SearchBar searchbar={{ variant: "desktop", placeholder }} />
            <a
              class="max-lg:hidden rounded-full border-2 border-solid no-animation btn-square btn-ghost flex items-center justify-center"
              href=""
            >
              <Icon
                class="text-base-content"
                id="User"
                width={24}
                height={24}
              />
            </a>
            <Buttons variant="cart" />
          </div>
        </div>
      </div>

      <Modals
        minicart={minicart}
        menu={{ items: navItems }}
        searchbar={{
          placeholder,
        }}
      />
    </header>
  );
}

export default HeaderLayout;
