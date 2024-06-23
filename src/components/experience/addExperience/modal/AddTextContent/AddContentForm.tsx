"use client";
import React, { useEffect, useState } from "react";
import LabelGroup from "../../labelGroup/LabelGroup";
import TypeOfExperience from "../../typeOfExperience/TypeOfExperience";
import AddTextContent from "./AddTextContent";
import addExperienceAction from "@/components/actions/addExperienceAction";
import toast from "react-hot-toast";

interface IMessage {
  successfully: boolean;
  message: string;
}
export default function AddContentForm({ date }: { date: any }) {
  const [message, setMessage] = useState<IMessage | undefined>(undefined);
  async function clientAddExperienceAction(formData: FormData) {
    try {
      const response = await addExperienceAction(formData);

      response.error
        ? toast.error(response.error)
        : toast.success(response.message);
    } catch (error: any) {}
  }
  useEffect(() => {
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
  }, [message]);

  return (
    <>
      <form action={clientAddExperienceAction}>
        <div className="body">
          <LabelGroup date={date} />
          <TypeOfExperience />
          <AddTextContent />
        </div>
        <div className="footer">
          <div className="add-experience-button">
            <button>Add Experience</button>
          </div>
        </div>
      </form>
    </>
  );
}
