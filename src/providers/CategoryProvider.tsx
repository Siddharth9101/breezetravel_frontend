import React, { useState } from "react";
import CategoryContext from "@/contexts/CategoryContext";

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoryState, setCategoryState] = useState("National Parks");

  return (
    <CategoryContext.Provider value={{ categoryState, setCategoryState }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
