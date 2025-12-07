import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";

export default function PaymentSuccess() {
    const [params] = useSearchParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const sessionId = params.get("session_id");
    const [session, setSession] = useState(null);

    useEffect(() => {
        if (!sessionId) return;

        const loadSession = async () => {
            try {
                const res = await axiosSecure.get(`/checkout-session/${sessionId}`);
                const s = res.data;
                setSession(s);

                const plan = s.metadata.plan;
                const limit = Number(s.metadata.limit);

                await axiosSecure.post("/payments", {
                    hrEmail: user.email,
                    transactionId: sessionId,
                    plan,
                    packageLimit: limit,
                    status: "successful",
                    amount: s.amount_total / 100
                })
                    .then(res => {
                        if (res.data.insertedId) {
                            queryClient.invalidateQueries(["hr-profile", user.email]);
                            toast.success("Subscription upgraded!");
                        }
                    })

                await axiosSecure.patch(`/users/${user.email}`, {
                    $set: {
                        subscription: plan,
                        packageLimit: limit,
                    }
                });



            } catch (error) {
                console.log(error);
                toast.error("Payment verification failed!");
            }
        };

        loadSession();
    }, [sessionId, axiosSecure, user, queryClient]);

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-[70vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">

            <div className="bg-base-100 shadow-lg p-8 rounded-xl max-w-md w-full">
                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    🎉 Payment Successful!
                </h1>

                <p className="text-lg mb-2">
                    Your <span className="font-semibold text-primary">{session.metadata.plan.toUpperCase()}</span> plan is now active.
                </p>

                <p className="text-sm text-gray-500 mb-4">
                    Transaction ID:
                    <br />

                    <div className="flex items-center justify-center gap-6 mt-1 p-2">
                        <span className="font-mono text-base break-all">{sessionId}</span>

                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(sessionId);
                                toast.success("Transaction ID copied!");
                            }}
                            title="Copy trx Id"
                            className="btn btn-xs btn-outline"
                        >
                            <FaRegCopy size={15} />
                        </button>
                    </div>
                </p>

                <div className="p-4 bg-base-200 rounded-lg mb-4">
                    <p><strong>New Package Limit:</strong> {session.metadata.limit} employees</p>
                </div>

                <Link to="/dashboard" className="btn btn-primary w-full mt-4">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}
