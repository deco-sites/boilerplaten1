export interface Props {
  /**
   * @description Title to be displayed in the not found section
   */
  title?: string;
  /**
   * @description Description to be displayed in the not found section
   */
  termNotFoundDescription?: string;
}

export default function NotFound({
  termNotFoundDescription = "Resultados de busca encontrados para:",
  title = "Ops!",
}: Props) {
  return (
    <div class="w-full">
      <div class="flex flex-col px-5 py-[30px] gap-5">
        <div class="text-emphasis font-bold text-[70px]">{title}</div>
        <p class="font-medium text-base-300">
          {termNotFoundDescription} "Adidas"
        </p>
        <p>barra de pesquisa</p>
      </div>
    </div>
  );
}
