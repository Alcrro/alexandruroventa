"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface iExperienceContext {
  compId: number | null;
  setCompId: Dispatch<SetStateAction<number | null>>;
}
const ExperienceContext = createContext<iExperienceContext>({
  compId: -1,
  setCompId: (): number => -1,
});

export const ExperienceContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [compId, setCompId] = useState<number | null>(null);

  return (
    <ExperienceContext.Provider value={{ compId, setCompId }}>
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperienceContext = () => useContext(ExperienceContext);
