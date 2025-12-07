import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Loading from "../../Shared/Loading";
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

    if (isLoading) return null;

    return (
        <section className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">Trusted by Companies</h2>
            <p className="text-gray-600 mb-6">100+ Businesses use AssetVerse daily</p>

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
                        <div className="p-6 bg-base-100 rounded-xl shadow flex flex-col justify-between w-full h-full border border-gray-300 my-5 min-h-[186px]">
                            <p className="italic text-gray-600 mb-4 flex-1">
                                “{item.review}”
                            </p>

                            <div>
                                <h3 className="font-bold text-lg">{item.company}</h3>
                                <p className="text-sm text-gray-500">{item.author}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}