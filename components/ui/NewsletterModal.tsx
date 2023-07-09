import Newsletter, {
  INewsletterInputProps,
} from "$store/components/newsletter/Newsletter.tsx";
import { setCookie } from "std/http/mod.ts";
import { Cookie } from "std/http/cookie.ts";

export interface Form {
  email: INewsletterInputProps;
  name: INewsletterInputProps;
  button: {
    label: string;
  };
}

export interface Props {
  newsform: Form;
  /**
   * @title Description
   * @format html
   */
  html?: string;
}

export const loader = () => {
  const headers = new Headers();

  const cookie: Cookie = {
    name: "NewsLetterModal",
    value: "true",
    expires: Date.now() + 10000,
  };

  setCookie(headers, cookie);

  const cookieHeader = headers.get("set-cookie");
  console.log(cookieHeader);
};

function NewsletterModal({ newsform, html }: Props) {
  return (
    <>
      <dialog id="my_modal_3" class="modal" open>
        <form method="dialog" class="modal-box">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 class="font-bold text-lg">teste</h3>
          <Newsletter
            className="!block"
            text=""
            form={newsform}
          />
        </form>
      </dialog>
    </>
  );
}

export default NewsletterModal;
