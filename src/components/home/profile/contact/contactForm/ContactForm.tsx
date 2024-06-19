"use client";
import React, { useEffect, useRef, useState } from "react";
import "./contactForm.scss";
import ButtonForm from "./buttonForm/ButtonForm";
import sendEmail from "../../../../../_lib/send";
export default function ContactForm() {
  const [isActive, setIsActive] = useState();
  const [isCopied, setIsCopied] = useState(false);
  const [copyAddress, setCopyAddress] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  const refCopy = useRef<HTMLDivElement>(null);
  async function formHandler(formData: FormData) {
    const email = formData.get("email");
    const textarea = formData.get("textarea");

    await sendEmail({ email, textarea });

    ref.current?.reset();
  }

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  }, [isCopied]);

  const copiedHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsCopied(true);
    navigator.clipboard.writeText(e.currentTarget.innerText);
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-inner text-center py-8">
        <div className="header">
          <div className="title text-3xl">Contact Me</div>
          <div className="description py-4 text-xl">
            Please contact me directly at this form or at this email:
            <div
              className={`border w-fit mx-auto p-4 m-1 rounded-lg border-gray-600 cursor-pointer `}
              onClick={(e) => copiedHandler(e)}
            >
              <span
                className={`my-email${isCopied ? " isCopied" : ""}`}
                ref={refCopy}
              >
                business@alexandru-roventa.ro
              </span>
            </div>
            <span className="block py-2">Thank you!</span>
          </div>
        </div>
        <div className="body">
          <div className="form">
            <form
              ref={ref}
              action={formHandler}
              className={`${isActive ? "active" : ""}`}
            >
              <div className="label-group py-2 flex flex-col justify-center mx-auto">
                <label htmlFor="email">Add an email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address"
                  placeholder="Add on email..."
                  required
                  className="mx-auto border text-black border-white rounded-lg py-1 px-3 my-2 w-full bg-white dark:text-black"
                />
              </div>
              <div className="label-group">
                <textarea
                  placeholder="Add your text here..."
                  name="textarea"
                  id=""
                  className="border rounded-lg w-full h-[300px] resize-none bg-white text-black p-3"
                ></textarea>
              </div>
              <ButtonForm />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
