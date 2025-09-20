import { Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

const HotelSkeleton = () => {
  const fakeHotels = Array.from({ length: 8 });
  return (
    <>
      {fakeHotels.map((_, idx) => (
        <Stack key={idx} gap="6" w="100%" mt={"20px"}>
          <Skeleton height="200px" background="gray.200" />
          <SkeletonText noOfLines={2} background="gray.200" />
        </Stack>
      ))}
    </>
  );
};

export default HotelSkeleton;
