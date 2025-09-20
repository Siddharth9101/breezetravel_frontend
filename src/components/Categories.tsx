import { getAllCategories } from "@/http";
import type { ICategory } from "@/types";
import {
  Box,
  Button,
  Container,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState, useCallback } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import CategoriesDrawer from "./CategoriesDrawer";
import useCategory from "@/hooks/useCategory";

const PAGE_SIZE = 10;

const Categories = () => {
  const isDesktop = useBreakpointValue({ base: false, xl: true });
  const { data, isLoading, isError, error } = useQuery<ICategory[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  const [open, setOpen] = useState(false);
  const { categoryState, setCategoryState } = useCategory();

  const [startIndex, setStartIndex] = useState(0);

  const categoriesToShow =
    data?.slice(startIndex, startIndex + PAGE_SIZE) || [];

  const handleRightClick = useCallback(() => {
    if (!data) return;
    setStartIndex((prev) =>
      Math.min(prev + PAGE_SIZE, data.length - PAGE_SIZE)
    );
  }, [data]);

  const handleLeftClick = useCallback(() => {
    setStartIndex((prev) => Math.max(prev - PAGE_SIZE, 0));
  }, []);

  const handleCategoryClick = (category: string) => {
    setCategoryState(category);
  };

  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return (
      <Text>
        {error instanceof AxiosError
          ? error.response?.data?.message
          : "Something went wrong!"}
      </Text>
    );
  }

  return isDesktop ? (
    <Box
      background="#fafafa"
      position="sticky"
      top="4.2rem"
      zIndex="1"
      pt="5px"
    >
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Left Button */}
        <IconButton
          aria-label="Scroll left"
          size="sm"
          borderRadius="full"
          bg="white"
          _hover={{ bg: "gray.100" }}
          color="gray.500"
          boxShadow="sm"
          onClick={handleLeftClick}
          disabled={startIndex === 0}
        >
          <FaAngleLeft />
        </IconButton>

        {/* Categories */}
        {categoriesToShow.map(({ _id, category }) => (
          <Button key={_id} background="transparent">
            <Text
              fontSize="18px"
              onClick={() => handleCategoryClick(category)}
              borderBottom={
                category === categoryState ? "1px solid black" : "none"
              }
            >
              {category}
            </Text>
          </Button>
        ))}

        {/* Right Button */}
        <IconButton
          aria-label="Scroll right"
          size="sm"
          borderRadius="full"
          bg="white"
          _hover={{ bg: "gray.100" }}
          color="gray.500"
          boxShadow="sm"
          onClick={handleRightClick}
          disabled={!data || startIndex + PAGE_SIZE >= data.length}
        >
          <FaAngleRight />
        </IconButton>
      </Container>
    </Box>
  ) : (
    <>
      <Box
        w="full"
        pt={"10px"}
        display={"flex"}
        justifyContent={"right"}
        alignItems={"center"}
      >
        <IconButton
          mr={"25px"}
          aria-label="Filters"
          size="sm"
          borderRadius="full"
          bg="white"
          _hover={{ bg: "gray.100" }}
          color="gray.500"
          boxShadow="sm"
          onClick={() => setOpen(true)}
        >
          <CiFilter color="#000" />
        </IconButton>
        <CategoriesDrawer categories={data} open={open} setOpen={setOpen} />
      </Box>
    </>
  );
};

export default Categories;
