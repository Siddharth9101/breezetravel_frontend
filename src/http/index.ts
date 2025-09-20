import type { hotelsResponse, ICategory } from "@/types";
import { api } from "./client";

export const getHotelsByCategory = async (
  category: string
): Promise<hotelsResponse> => {
  const hotels = await api.get(`/hotels?category=${category}`);
  return hotels.data;
};

export const getAllCategories = async (): Promise<ICategory[]> => {
  const categories = await api.get("/categories");
  return categories.data.data;
};
