import Loading from "$store/components/ui/Loading.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { lazy, Suspense } from "preact/compat";

import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

import { ICartProps } from "$store/components/minicart/Cart.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Cart = lazy(() => import("$store/components/minicart/Cart.tsx"));
const Searchbar = lazy(() => import("$store/islands/SearchBar.tsx"));

interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  minicart?: ICartProps;
}

function Modals({ menu, searchbar, minicart }: Props) {
  const { displayCart, displayMenu, displaySearchbar } = useUI();

  const fallback = (
    <div class="flex justify-center items-center w-full h-full">
      <span class="loading loading-ring" />
    </div>
  );

  return (
    <>
      <Modal
        title="Entrar"
        menuIcon="User"
        mode="sidebar-left"
        loading="lazy"
        id="menu-modal"
        showHeader={false}
        open={displayMenu.value}
        onClose={() => {}}
        class="backdrop:bg-base-content backdrop:opacity-70"
      >
        <Suspense fallback={fallback}>
          <Menu {...menu} />
        </Suspense>
      </Modal>

      <Modal
        title="Buscar"
        mode="center"
        style={{
          height: "80px",
          overflow: "initial",
          background: "#fff",
        }}
        id="search-modal"
        loading="lazy"
        class="h-20 bg-white left-0 max-w-none top-7 backdrop:bg-transparent"
        showHeader={false}
        open={displaySearchbar.value &&
          window?.matchMedia("(max-width: 1024px)")?.matches}
        onClose={() => {
          displaySearchbar.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Searchbar {...searchbar} variant="mobile" />
        </Suspense>
      </Modal>

      <Modal
        class="ml-auto"
        title="Meu carrinho"
        mode="sidebar-right"
        showHeader
        id="minicart-modal"
        loading="lazy"
        open={displayCart.value}
        onClose={() => {
          displayCart.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Cart {...minicart as ICartProps} />
        </Suspense>
      </Modal>
    </>
  );
}

export default Modals;
