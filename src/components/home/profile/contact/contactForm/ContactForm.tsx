"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import "./contactForm.scss";
import ButtonForm from "./buttonForm/ButtonForm";
import sendEmail from "@/_lib/send";
export default function ContactForm() {
  const [isActive, setIsActive] = useState();
  const ref = useRef<HTMLFormElement>(null);
  async function formHandler(formData: FormData) {
    const email = formData.get("email");
    const textarea = formData.get("textarea");

    await sendEmail({ email, textarea });

    ref.current?.reset();
  }
  return (
    <div className="contact-form-container">
      <div className="contact-form-inner text-center py-8">
        <div className="header">
          <div className="title text-3xl">Contact Me</div>
          <div className="description py-4 text-xl">
            Please contact me directly at
            <span className="font-semibold break-words">
              {" "}
              alex.roventa94@gmail.com{" "}
            </span>
            or through this form
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
