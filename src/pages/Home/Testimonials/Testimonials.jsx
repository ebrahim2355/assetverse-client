import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function Testimonials() {
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ["testimonials"],
        queryFn: async () => {
            const res = await axiosSecure.get("/testimonials");
            return res.data;
        }
    });

    return (
        <section className="max-w-5xl mx-auto px-6 text-center">

            <h2 className="text-4xl font-bold mb-4">Trusted by Companies</h2>
            <p className="text-gray-600 mb-6">100+ Businesses use AssetVerse daily</p>

            {/* Skeleton loader */}
            {isLoading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="animate-pulse bg-base-200 rounded-xl h-40"></div>
                    <div className="hidden md:block animate-pulse bg-base-200 rounded-xl h-40"></div>
                    <div className="hidden lg:block animate-pulse bg-base-200 rounded-xl h-40"></div>
                </div>
            )}


            {!isLoading && (
                <Swiper
                    modules={[Pagination, Autoplay]}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                >
                    {reviews.map((item, i) => (
                        <SwiperSlide key={i} className="h-auto flex mb-5">
                            <div className="p-6 bg-base-100 rounded-xl shadow w-full border my-5">
                                <p className="italic text-gray-600 mb-4 h-[60px]">
                                    “{item.review}”
                                </p>

                                <h3 className="font-bold text-lg">{item.company}</h3>
                                <p className="text-sm text-gray-500">{item.author}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
}
