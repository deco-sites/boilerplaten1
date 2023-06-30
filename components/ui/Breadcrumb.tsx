import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class="breadcrumbs py-5 px-3">
      <ul class={`text-emphasis`}>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class={`last:text-secondary-focus text-base-300`}>
              <a href={item}>{name}</a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
