export interface Props {
  menuItems: {
    label: string;
    href: string;
  }[];
}

function AsideMenu({ menuItems }: Props) {
  return (
    <aside class="md:min-w-[25%]">
      <ul class="border-1 border-[#ccc] rounded-[6px] text-[#616161]">
        {menuItems.map(
          (item, index) => (
            <li key={index} class="px-[16px] py-[13px] leading-[21px]">
              <a
                href={item.href}
                class="text-[14px] font-light hover:text-underline"
              >
                {item.label}
              </a>
            </li>
          ),
        )}
      </ul>
    </aside>
  );
}

export default AsideMenu;
