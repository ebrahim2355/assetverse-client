import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";

export default function Packages() {
    const axiosSecure = useAxiosSecure();

    const { data: packages = [], isLoading } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const res = await axiosSecure.get("/packages");
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    return (
        <section className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Our Packages</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.map((pack) => (
                    <div key={pack._id} className="p-8 bg-base-100 rounded-xl shadow border">
                        <h3 className="text-2xl font-bold">{pack.name}</h3>
                        <p className="text-gray-600 mt-2 mb-3">{pack.description}</p>

                        <p className="text-3xl font-bold">
                            ${pack.price}
                            <span className="text-sm text-gray-500"> / month</span>
                        </p>

                        <p className="mt-3 text-sm">
                            Employee Limit: <b>{pack.employeeLimit}</b>
                        </p>

                        <a href="/login" className="btn btn-primary mt-6 w-full">
                            Choose Plan
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
