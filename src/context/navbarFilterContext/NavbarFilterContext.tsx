"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface INavbarFilterContext {
  currentCategoryValue: string;
  setCurrentCategoryValue: Dispatch<SetStateAction<string>>;
  currentItemPerPage: string;
  setCurrentItemPerPage: Dispatch<SetStateAction<string>>;
}

const NavbarFilterContext = createContext<INavbarFilterContext>({
  currentCategoryValue: "",
  setCurrentCategoryValue: () => undefined,
  currentItemPerPage: "",
  setCurrentItemPerPage: () => undefined,
});

export default function NavbarFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentCategoryValue, setCurrentCategoryValue] =
    useState<string>("All");
  const [currentItemPerPage, setCurrentItemPerPage] = useState<string>("20");

  return (
    <NavbarFilterContext.Provider
      value={{
        currentCategoryValue,
        setCurrentCategoryValue,
        currentItemPerPage,
        setCurrentItemPerPage,
      }}
    >
      {children}
    </NavbarFilterContext.Provider>
  );
}

export const useNavbarFilterContext = () => useContext(NavbarFilterContext);
