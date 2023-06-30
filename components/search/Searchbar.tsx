import ProductTile from "$store/components/product/ProductTile.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Spinner from "$store/components/ui/Spinner.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useAutocomplete } from "deco-sites/std/packs/vtex/hooks/useAutocomplete.ts";
import { useEffect, useRef } from "preact/compat";

function CloseButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn-ghost btn-circle"
      onClick={() => (displaySearchbar.value = false)}
    >
      <Icon id="XMark" width={20} height={20} strokeWidth={2} />
    </Button>
  );
}

// Editable props
export interface EditableProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export type Props = EditableProps & {
  variant?: "desktop" | "mobile";
};

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  query,
  variant = "mobile",
}: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const hasProducts = Boolean(suggestions.value?.products?.length);
  const hasTerms = Boolean(suggestions.value?.searches?.length);
  const notFound = !hasProducts && hasTerms;

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  return (
    <div class="flex flex-col relative">
      <div class="flex items-center gap-2">
        <form
          id="searchbar"
          action={action}
          class="lg:flex hidden items-center w-[300px] h-10 justify-between border-2 border-base-content outline-none rounded-full placeholder-base-200 px-4"
        >
          <input
            ref={searchInputRef}
            id="search-input"
            class="max-lg:hidden flex w-full outline-none placeholder:text-neutral-300 placeholder:font-normal pl-2 placeholder:font-dm-sans font-dm-sans text-sm placeholder:text-sm"
            name={name}
            defaultValue={query}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              setSearch(value);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
          <Button
            class="btn-ghost"
            aria-label="Search"
            htmlFor="searchbar"
            tabIndex={-1}
          >
            <Icon
              class="text-base-content"
              id="MagnifyingGlass"
              size={20}
              strokeWidth={0.01}
            />
          </Button>
        </form>
        {variant === "desktop" && <CloseButton />}
      </div>
      {notFound
        ? (
          <div
            class="absolute w-full top-0 left-0 p-5 z-50 bg-white rounded-xl lg:flex hidden"
            style={{}}
          >
            <span
              class="font-medium text-xl text-center"
              role="heading"
              aria-level={3}
            >
              Nenhum resultado encontrado
            </span>
            <span class="text-center text-base-300">
              Vamos tentar de outro jeito? Verifique a ortografia ou use um
              termo diferente
            </span>
          </div>
        )
        : null}
      {hasProducts
        ? (
          <>
            <div class="absolute w-full top-0 left-0 p-5 z-50 bg-white rounded-xl lg:flex hidden">
              <div class="flex gap-2 items-center">
                <span
                  class="font-medium text-xl"
                  role="heading"
                  aria-level={3}
                >
                  Sugestões
                </span>
                {loading.value && <Spinner />}
              </div>
              <ul id="search-suggestion" class="flex flex-col gap-6">
                {suggestions.value!.searches?.map(({ term }) => (
                  <li>
                    <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                      <span>
                        {term}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div class="flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden">
              <div class="flex gap-2 items-center">
                <span
                  class="font-medium text-xl"
                  role="heading"
                  aria-level={3}
                >
                  Produtos sugeridos
                </span>
                {loading.value && <Spinner />}
              </div>
              {suggestions.value!.products?.map((product, index) => (
                <ProductTile
                  product={product}
                  key={index}
                  imageHeight={50}
                  imageWidth={50}
                  preload
                />
              ))}
            </div>
          </>
        )
        : null}
    </div>
  );
}

export default Searchbar;
