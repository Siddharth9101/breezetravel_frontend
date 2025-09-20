import { Box, Image, Text, IconButton } from "@chakra-ui/react";
import { IoIosStar } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import type { IHotel } from "@/types";

const HotelCard = ({ hotel }: { hotel: IHotel }) => {
  const { _id, name, image, address, state, price, rating } = hotel;
  return (
    <Box
      position="relative"
      w="100%"
      borderRadius="lg"
      bg="white"
      boxShadow="xs"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ transform: "translateY(-4px)", boxShadow: "sm" }}
      cursor="pointer"
    >
      {/* Hotel Image */}
      <Image src={image} alt={name} h="15rem" w="full" objectFit="cover" />

      {/* Hotel Info */}
      <Box p={3} color="gray.800">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Text fontWeight="semibold" fontSize="lg">
            {address}, {state}
          </Text>
          <Box display="flex" alignItems="center" gap={1}>
            <IoIosStar color="#FBBF24" />
            <Text fontSize="sm">{rating.toFixed(1)}</Text>
          </Box>
        </Box>

        <Text fontSize="sm" color="gray.600" mb={2}>
          {name}
        </Text>

        <Box display="flex" alignItems="baseline" gap={1}>
          <Text fontWeight="bold" fontSize="md">
            ₹{price}
          </Text>
          <Text fontSize="sm" color="gray.600">
            / night
          </Text>
        </Box>
      </Box>

      {/* Favorite Button */}
      <IconButton
        aria-label="Add to wishlist"
        position="absolute"
        top={2}
        right={2}
        size="sm"
        borderRadius="full"
        bg="white"
        _hover={{ bg: "gray.100" }}
        color="gray.500"
        boxShadow="xs"
      >
        <FaHeart />
      </IconButton>
    </Box>
  );
};

export default HotelCard;
