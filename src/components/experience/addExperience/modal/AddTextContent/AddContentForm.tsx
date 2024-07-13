"use client";
import React, { useState } from "react";
import LabelGroup from "../../labelGroup/LabelGroup";
import TypeOfExperience from "../../typeOfExperience/TypeOfExperience";
import AddTextContent from "./AddTextContent";
import addExperienceAction from "@/components/actions/addExperienceAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddContentForm({ date }: { date: any }) {
  const router = useRouter();
  async function clientAddExperienceAction(formData: FormData) {
    try {
      const response = await addExperienceAction(formData);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success(response.message);
        router.push("/experience/add-experience/activate");
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <>
      <form action={clientAddExperienceAction} className="relative">
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
