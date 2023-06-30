import ProductTile from "$store/components/product/ProductTile.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Spinner from "$store/components/ui/Spinner.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";
import { useAutocomplete } from "deco-sites/std/packs/vtex/hooks/useAutocomplete.ts";
import { useEffect, useRef } from "preact/compat";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

function CloseButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class="btn-ghost"
      aria-label="Search"
      htmlFor="searchbar"
      tabIndex={-1}
      onClick={() => (displaySearchbar.value = false)}
    >
      <Icon
        id="XMark"
        width={20}
        height={20}
        strokeWidth={2}
        class="text-base-content"
      />
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
  variant,
}: Props) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const hasProducts = Boolean(suggestions.value?.products?.length);
  const hasTerms = Boolean(suggestions.value?.searches?.length);
  const notFound = !hasProducts && hasTerms;
  const { displaySearchbar } = useUI();

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  useEffect(() => {
    if (displaySearchbar.value) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [displaySearchbar.value]);

  return (
    <div
      class={`${variant === "mobile" ? "lg:hidden" : ""} ${
        variant === "desktop" ? "max-lg:hidden" : ""
      } flex flex-col relative max-lg:w-full max-lg:px-5`}
    >
      <div class="flex items-center gap-2 max-lg:w-full">
        <form
          id="searchbar"
          action={action}
          class={`${
            variant === "desktop" ? "max-lg:hidden w-[300px]" : "flex w-full"
          } flex items-center h-10 justify-between border-2 border-neutral outline-none rounded-full px-4 `}
        >
          <input
            ref={searchInputRef}
            id="search-input"
            class="flex w-full outline-none placeholder:text-neutral placeholder:font-normal pl-2 placeholder:font-dm-sans font-dm-sans text-sm placeholder:text-sm"
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
          {variant === "desktop"
            ? (
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
            )
            : <CloseButton />}
        </form>
      </div>
      {notFound
        ? (
          <div
            class="bg-base-100 max-lg:fixed absolute w-full left-0 p-5 z-50 bg-white rounded-3xl flex flex-col shadow-md max-md:shadow-lg max-md:rounded-none"
            style={{
              top: variant === "desktop" ? "50px" : "65px",
              display: !displaySearchbar.peek() && variant === "mobile"
                ? "none"
                : "flex",
            }}
          >
            <span
              class="font-medium text-lg text-center"
              role="heading"
              aria-level={3}
            >
              Nenhum resultado encontrado
            </span>
            <span class="text-center text-base-300 text-sm mt-4">
              Vamos tentar de outro jeito? Verifique a ortografia ou use um
              termo diferente
            </span>
          </div>
        )
        : null}
      {hasProducts
        ? (
          <div
            class="top-full absolute w-full left-0 p-5 z-50 bg-white rounded-3xl flex flex-col max-md:shadow-lg items-center justify-center shadow-md max-md:rounded-none bg-base-100"
            style={{
              display: !displaySearchbar.peek() && variant === "mobile"
                ? "none"
                : "flex",
            }}
          >
            <ul
              id="search-suggestion"
              class="flex flex-col gap-2 w-full justify-start items-start text-left"
            >
              {suggestions.value!.searches?.map(({ term }) => (
                <li>
                  <a
                    href={`/s?q=${term}`}
                    class="flex gap-2 items-center text-base-300 font-bold hover:text-emphasis text-xs"
                  >
                    {term}
                  </a>
                </li>
              ))}
            </ul>
            <div class="flex flex-col pt-2 md:pt-0 gap-2 overflow-x-hidden w-full">
              <div class="flex gap-2 items-center">
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
          </div>
        )
        : null}
    </div>
  );
}

export default Searchbar;
