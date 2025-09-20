import { Navbar, HotelCard, HotelSkeleton, Categories } from "@/components";
import useCategory from "@/hooks/useCategory";
import { getHotelsByCategory } from "@/http";
import type { hotelsResponse, IHotel } from "@/types";
import {
  AbsoluteCenter,
  Container,
  Grid,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const { categoryState } = useCategory();
  const {
    data: hotels,
    isLoading,
    error,
    isError,
  } = useQuery<hotelsResponse>({
    queryKey: ["hotels", categoryState],
    queryFn: () => getHotelsByCategory(categoryState),
  });
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [hasMore, setHasMore] = useState(true);
  const [currIdx, setCurrIdx] = useState(0);
  const [tempData, setTempData] = useState<IHotel[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setTempData(hotels?.data ? hotels.data.slice(0, isDesktop ? 16 : 8) : []);
    }
  }, [hotels?.data, isDesktop, isLoading]);

  const fetchHotels = useCallback(() => {
    if (!hotels?.data) return;
    if (tempData.length >= hotels.data.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (tempData && tempData.length > 0) {
        setTempData((p) => [
          ...p,
          ...hotels.data.slice(currIdx, currIdx + (isDesktop ? 16 : 8)),
        ]);
        setCurrIdx((p) => p + (isDesktop ? 16 : 8));
      } else {
        setTempData([]);
      }
    }, 1000);
  }, [currIdx, hotels?.data, isDesktop, tempData]);

  return (
    <>
      <Navbar />
      <Categories />
      <main>
        <Container py="3rem">
          {isLoading ? (
            <Grid
              mt={"20px"}
              templateColumns={{
                base: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              }}
              gap={6}
            >
              <HotelSkeleton />
            </Grid>
          ) : isError || !hotels ? (
            <AbsoluteCenter>
              <Text color="#ff6525" fontWeight="medium">
                {error instanceof AxiosError
                  ? error.response?.data.message
                  : "Failed to fetch hotels!"}
              </Text>
            </AbsoluteCenter>
          ) : hotels.data.length === 0 ? (
            <AbsoluteCenter>
              <Text color="#ff6525" fontWeight="medium">
                No hotels found!
              </Text>
            </AbsoluteCenter>
          ) : (
            tempData &&
            tempData.length > 0 && (
              <InfiniteScroll
                dataLength={tempData.length}
                next={fetchHotels}
                hasMore={hasMore}
                loader={
                  tempData &&
                  tempData.length > 0 &&
                  (isDesktop ? (
                    <Grid
                      py={2}
                      templateColumns={{
                        base: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(3, 1fr)",
                        lg: "repeat(4, 1fr)",
                      }}
                      gap={6}
                    >
                      <HotelSkeleton />
                    </Grid>
                  ) : (
                    <Stack gap="6" w="100%" mt="20px">
                      <Skeleton height="200px" background="gray.200" />
                      <SkeletonText noOfLines={2} background="gray.200" />
                    </Stack>
                  ))
                }
                endMessage={
                  <Text w="100%" textAlign={"center"} pt="20px" color="#ff6525">
                    You have reached the end!
                  </Text>
                }
              >
                <Grid
                  templateColumns={{
                    base: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={6}
                >
                  {tempData &&
                    tempData.map((hotel) => (
                      <HotelCard key={hotel._id} hotel={hotel} />
                    ))}
                </Grid>
              </InfiniteScroll>
            )
          )}
        </Container>
      </main>
    </>
  );
};

export default Home;
