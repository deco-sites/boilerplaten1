import type { SectionProps } from "$live/types.ts";
import {
  BUTTON_VARIANTS,
  ButtonVariant,
} from "$store/components/minicart/Cart.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { Runtime } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";
import { useEffect, useRef } from "preact/compat";
import { getCookies } from "std/http/mod.ts";
const subscribe = Runtime.create(
  "deco-sites/std/actions/vtex/newsletter/subscribe.ts",
);

export interface INewsletterInputProps {
  /**
   * @title Hide input?
   */
  show?: boolean;
  /**
   * @title placeholder
   */
  placeholder?: string;
}

export interface INewsletterFormProps {
  email: INewsletterInputProps;
  name: INewsletterInputProps;
  button: {
    /**
     * @title button variant
     * @default primary
     */
    variant?: ButtonVariant;
    /**
     * @title button label?
     * @default cadastrar
     */
    label?: string;
  };
}

export interface Props {
  /**
   * @title Newsletter Form
   */
  form: INewsletterFormProps;
  /**
   * @title newsletter message text?
   * @format html
   */
  text: string;

  /**
   * @title Tempo para Reabrir o modal, caso o usuario tenha se cadastrado.
   */
  modalSignExpiredDate: number;

  /**
   * @title Tempo para Reabrir o modal, caso o usuario tenha clicado em fechar.
   */
  modalCloseExpiredDate: number;

  /**
   * @title Define se a modal vai estar ativo ou não.
   */
  modalActive: boolean;
}

interface InputNewletterProps {
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
}

export const loader = (props: Props, req: Request) => {
  const cookies = getCookies(req.headers);
  const isOpen = !!cookies["DecoNewsletterModal"];

  return { ...props, isOpen };
};

function InputNewsletter(
  { name, placeholder, required, type }: InputNewletterProps,
) {
  return (
    <input
      name={name}
      type={type}
      class="input lg:h-12 h-9 px-5 join-item w-full mb-2.5 first:mt-5 border-2 border-neutral rounded-full placeholder:text-placeholder !outline-none lg:text-base text-xs"
      placeholder={placeholder}
      required={required}
    />
  );
}

function NewsletterModal(
  {
    isOpen,
    form,
    text,
    modalSignExpiredDate,
    modalCloseExpiredDate,
    modalActive,
  }: SectionProps<
    ReturnType<typeof loader>
  >,
) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const loading = useSignal(false);
  const success = useSignal(false);

  if (!modalActive) {
    return null;
  }

  useEffect(() => {
    if (isOpen !== true) {
      modalRef.current?.showModal();
    }
  }, []);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      let name = "";

      if (form?.name?.show) {
        name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
          ?.value;
      }

      await subscribe({ email, name });
    } finally {
      loading.value = false;
      success.value = true;

      if (success.value === true) {
        setCookieOnCloseModal("registed", modalSignExpiredDate);
      }

      setTimeout(() => {
        success.value = false;
      }, 5000);
    }
  };

  const setCookieOnCloseModal = (
    cookieValue: string,
    expirationSeconds: number,
  ) => {
    // deno-lint-ignore no-var
    var date = new Date();

    date.setTime(date.getTime() + (expirationSeconds * 1000));
    // deno-lint-ignore no-var
    var expires = "expires=" + date.toUTCString();

    document.cookie = "DecoNewsletterModal" + "=" + cookieValue + ";" +
      expires +
      ";path=/";

    console.log("Cookie setado");
  };

  const emailInput = !form?.email?.show
    ? (
      <InputNewsletter
        name="email"
        required
        type="email"
        placeholder={form?.email?.placeholder || "E-mail"}
      />
    )
    : null;

  const nameInput = !form?.name?.show
    ? (
      <InputNewsletter
        name="name"
        type="text"
        placeholder={form?.name?.placeholder || "Nome"}
        required
      />
    )
    : null;

  return (
    <>
      <dialog id="my_modal_3" ref={modalRef} class="modal">
        <form method="dialog" class="modal-box">
          <Icon
            class="mx-auto mb-5 block"
            id="Logo"
            width={120}
            height={27}
          />
          <div
            dangerouslySetInnerHTML={{ __html: text }}
            class="text-base lg:text-xl text-center text-base-100 lg:pr-0 "
          />
          {success.value
            ? (
              <div class="text-base lg:text-xl text-left text-base-100">
                E-mail cadastrado com sucesso!
              </div>
            )
            : (
              <form
                class="w-full form-control"
                onSubmit={handleSubmit}
              >
                <div class="text-center">
                  {nameInput}
                  {emailInput}
                  <button
                    style={{
                      minWidth: "150px",
                    }}
                    type="submit"
                    class={`capitalize md:ml-5 font-medium btn disabled:loading rounded-full join-item btn-${
                      BUTTON_VARIANTS[form?.button?.variant as string] ||
                      BUTTON_VARIANTS["primary"]
                    }`}
                    disabled={loading}
                  >
                    {form?.button?.label || "Cadastrar"}
                  </button>
                </div>
              </form>
            )}
        </form>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() =>
              setCookieOnCloseModal("closed", modalCloseExpiredDate)}
          >
            close
          </button>
        </form>
      </dialog>
      )
    </>
  );
}

export default NewsletterModal;
