import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Modal from "$store/components/ui/Modal.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

type Props = Pick<
  ProductListingPage,
  "filters" | "breadcrumb" | "sortOptions"
> & {
  displayFilter?: boolean;
};

function SearchControls({
  filters,
  breadcrumb,
  displayFilter,
  sortOptions,
}: Props) {
  const open = useSignal(false);

  return (
    <div class="flex flex-col justify-between mb-4 p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] sm:border-b sm:border-base-200">
      <div class="flex flex-row items-center sm:p-0 mb-2">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>

      <div class="flex flex-row items-center justify-between border-0 sm:gap-4 sm:border-none">
        {displayFilter && (
          <Button
            class={`flex justify-around bg-primary btn items-center border-transparent`}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
            <Icon class="ml-2" id="FilterList" width={16} height={16} />
          </Button>
        )}
      </div>

      <Modal
        showHeader
        class="lg:w-[20%] "
        loading="lazy"
        title="Filtrar"
        mode="sidebar-left"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <div class="p-8 py-2">
          <Filters filters={filters} />
        </div>
      </Modal>
    </div>
  );
}

export default SearchControls;
