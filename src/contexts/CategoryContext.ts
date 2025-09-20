import type { CategoryContextType } from "@/types";
import { createContext } from "react";

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export default CategoryContext;
