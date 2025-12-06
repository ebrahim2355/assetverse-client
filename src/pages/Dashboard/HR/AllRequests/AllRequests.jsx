import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading";

export default function AllRequests() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ["hr-requests", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/requests?hrEmail=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />;

    /* ------------------ APPROVE ------------------ */
    const handleApprove = async (reqItem) => {
        Swal.fire({
            title: "Approve this request?",
            text: `${reqItem.requesterName} will receive the asset.`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Approve",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#16a34a"
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                await axiosSecure.patch(`/assets/${reqItem.assetId}`, {
                    $inc: { availableQuantity: -1 }
                });

                const affCheck = await axiosSecure.get(
                    `/affiliations/employee/${reqItem.requesterEmail}`
                );

                const alreadyAffiliated = affCheck.data.some(
                    a => a.hrEmail === reqItem.hrEmail
                );

                if (!alreadyAffiliated) {
                    await axiosSecure.post("/affiliations", {
                        employeeEmail: reqItem.requesterEmail,
                        employeeName: reqItem.requesterName,
                        hrEmail: reqItem.hrEmail,
                        companyName: reqItem.companyName
                    });

                    await axiosSecure.patch(`/users/${reqItem.hrEmail}`, {
                        $inc: { currentEmployees: 1 }
                    });
                }

                await axiosSecure.post("/assigned-assets", {
                    assetId: reqItem.assetId,
                    assetName: reqItem.assetName,
                    assetImage: reqItem.assetImage,
                    assetType: reqItem.assetType,
                    employeeEmail: reqItem.requesterEmail,
                    employeeName: reqItem.requesterName,
                    hrEmail: reqItem.hrEmail,
                    companyName: reqItem.companyName
                });

                await axiosSecure.patch(`/requests/${reqItem._id}`, {
                    requestStatus: "approved",
                    approvalDate: new Date()
                });

                Swal.fire("Approved!", "Request approved successfully.", "success");
                refetch();

            } catch (error) {
                Swal.fire("Error!", error.response?.data?.error || "Something went wrong!", "error");
            }
        });
    };


    /* ------------------ REJECT ------------------ */
    const handleReject = async (id) => {
        Swal.fire({
            title: "Reject this request?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Reject",
            confirmButtonColor: "#dc2626"
        }).then(async (result) => {
            if (!result.isConfirmed) return;

            try {
                await axiosSecure.patch(`/requests/${id}`, {
                    requestStatus: "rejected"
                });

                Swal.fire("Rejected", "The request has been rejected.", "success");
                refetch();

            } catch {
                Swal.fire("Error!", "Failed to reject request.", "error");
            }
        });
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-6">All Requests</h2>


            {/* ------------------ DESKTOP TABLE ------------------ */}
            <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Requester</th>
                            <th>Asset</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.map(req => (
                            <tr key={req._id}>
                                <td>
                                    <p className="font-semibold">{req.requesterName}</p>
                                    <p className="text-xs text-gray-500">{req.requesterEmail}</p>
                                </td>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <img src={req.assetImage} className="w-12 h-12 rounded-md" />
                                        <span>{req.assetName}</span>
                                    </div>
                                </td>

                                <td>
                                    <span className="badge badge-outline whitespace-nowrap">
                                        {req.assetType}
                                    </span>
                                </td>

                                <td>{new Date(req.requestDate).toLocaleDateString()}</td>

                                <td>
                                    <span
                                        className={`badge ${req.requestStatus === "pending"
                                            ? "badge-warning"
                                            : req.requestStatus === "approved"
                                                ? "badge-success"
                                                : "badge-error"
                                            }`}
                                    >
                                        {req.requestStatus}
                                    </span>
                                </td>

                                <td className="text-center">
                                    {req.requestStatus === "pending" ? (
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleApprove(req)}
                                                className="btn btn-success btn-sm"
                                            >
                                                Approve
                                            </button>

                                            <button
                                                onClick={() => handleReject(req._id)}
                                                className="btn btn-error btn-sm"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 text-sm">No actions</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



            {/* ------------------ MOBILE CARD VIEW ------------------ */}
            <div className="grid md:hidden grid-cols-1 gap-4 mt-4">
                {requests.map(req => (
                    <div
                        key={req._id}
                        className="p-4 bg-base-100 shadow rounded-lg space-y-3"
                    >
                        {/* Top Row */}
                        <div className="flex items-center gap-4">
                            <img
                                src={req.assetImage}
                                className="w-20 h-20 rounded-md object-cover"
                            />
                            <div>
                                <h3 className="font-bold text-lg">{req.assetName}</h3>
                                <p className="text-sm text-gray-500">{req.requesterName}</p>
                                <p className="text-xs text-gray-400">{req.requesterEmail}</p>
                            </div>
                        </div>

                        <p>
                            <span className="font-semibold">Type:</span>{" "}
                            <span className="badge badge-outline whitespace-nowrap">
                                {req.assetType}
                            </span>
                        </p>

                        <p>
                            <span className="font-semibold">Requested:</span>{" "}
                            {new Date(req.requestDate).toLocaleDateString()}
                        </p>

                        <p>
                            <span className="font-semibold">Status:</span>{" "}
                            <span
                                className={`badge ${req.requestStatus === "pending"
                                    ? "badge-warning"
                                    : req.requestStatus === "approved"
                                        ? "badge-success"
                                        : "badge-error"
                                    }`}
                            >
                                {req.requestStatus}
                            </span>
                        </p>

                        {/* Action Buttons */}
                        {req.requestStatus === "pending" ? (
                            <div className="flex gap-3 pt-2 w-full">
                                <button
                                    onClick={() => handleApprove(req)}
                                    className="btn btn-sm btn-success w-full flex-1"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() => handleReject(req._id)}
                                    className="btn btn-sm btn-error w-full flex-1"
                                >
                                    Reject
                                </button>
                            </div>
                        ) : ""}
                    </div>
                ))}
            </div>
        </div>
    );
}
