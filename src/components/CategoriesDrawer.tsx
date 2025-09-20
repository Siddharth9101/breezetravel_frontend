import useCategory from "@/hooks/useCategory";
import type { ICategory } from "@/types";
import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";

const CategoriesDrawer = ({
  categories,
  open,
  setOpen,
}: {
  categories: ICategory[] | undefined;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { categoryState, setCategoryState } = useCategory();
  const handleCategoryClick = (category: string) => {
    setCategoryState(category);
  };
  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header background="#fafafa">
              <Drawer.Title textAlign="center">Categories</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body background="#fafafa">
              <VStack>
                {categories &&
                  categories?.map(({ _id, category }) => (
                    <Button key={_id} background="transparent">
                      <Text
                        fontSize="15px"
                        onClick={() => handleCategoryClick(category)}
                        borderBottom={
                          category === categoryState
                            ? "1px solid black"
                            : "none"
                        }
                      >
                        {category}
                      </Text>
                    </Button>
                  ))}
              </VStack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default CategoriesDrawer;
