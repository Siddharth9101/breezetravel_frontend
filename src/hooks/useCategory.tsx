import { useContext } from "react";
import CategoryContext from "@/contexts/CategoryContext";

const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("App must be wrapped inside provider before using!");
  }
  return context;
};

export default useCategory;
