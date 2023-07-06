import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";

import type { LoaderReturnType } from "$live/types.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

export interface Props {
  page: LoaderReturnType<ProductListingPage | null>;
}

function NotFound() {
  return <div />;
}

function BreadcrumbCategory({ page }: Props) {
  if (!page || !page.breadcrumb) {
    return <NotFound />;
  }

  return (
    <div class="container">
      <Breadcrumb itemListElement={page.breadcrumb.itemListElement} />
    </div>
  );
}

export default BreadcrumbCategory;
