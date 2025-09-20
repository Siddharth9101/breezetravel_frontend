import {
  Box,
  Container,
  Text,
  Flex,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <Box
      borderBottom="1px solid"
      borderColor="gray.200"
      boxShadow="xs"
      bg="white"
      position={"sticky"}
      top="0"
      zIndex={"1"}
      background="#fafafa"
    >
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={3}
      >
        {/* Logo */}
        <Text fontSize="2xl" fontWeight="extrabold" color="#ff6525">
          Breeze
        </Text>

        {/* Search Bar */}
        {isDesktop ? (
          <Flex
            border="1px solid"
            borderColor="gray.300"
            borderRadius="full"
            boxShadow="xs"
            cursor="pointer"
            alignItems="center"
            overflow="hidden"
            _hover={{ boxShadow: "sm" }}
          >
            <Box px={4} py={2} borderRight="1px solid" borderColor="gray.300">
              <Text fontWeight="medium" fontSize="sm" color="gray.700">
                Anywhere
              </Text>
            </Box>
            <Box px={4} py={2} borderRight="1px solid" borderColor="gray.300">
              <Text fontWeight="medium" fontSize="sm" color="gray.700">
                Any week
              </Text>
            </Box>
            <Box px={4} py={2}>
              <Text fontWeight="medium" fontSize="sm" color="gray.700">
                Add guests
              </Text>
            </Box>
            <Flex
              align="center"
              justify="center"
              bg="#ff6525"
              p={2}
              borderRadius="full"
              mx={2}
            >
              <IoIosSearch size={20} color="#fff" />
            </Flex>
          </Flex>
        ) : (
          <Flex
            align="center"
            justify="center"
            bg="#ff6525"
            p={2}
            borderRadius="full"
            mx={2}
          >
            <IoIosSearch size={20} color="#fff" />
          </Flex>
        )}

        {/* Menu Btn */}
        <HStack
          gap={2}
          border="1px solid"
          borderColor="gray.300"
          borderRadius="full"
          px={3}
          py={2}
          boxShadow="xs"
          _hover={{ boxShadow: "sm" }}
          cursor="pointer"
        >
          <LuMenu size={22} />
          <FaRegUser size={22} />
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
