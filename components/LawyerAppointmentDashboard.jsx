"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useLawyer } from "@/context/LawyerContext";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Settings } from "lucide-react";

const getStatusColor = (status) => {
  switch (status) {
    case "approved":
      return "bg-green-500";
    case "rejected":
      return "bg-red-500";
    case "completed":
      return "bg-blue-500";
    default:
      return "bg-yellow-500";
  }
};

export default function LawyerAppointmentsDashboard() {
  const { loggedinLawyer } = useLawyer();
  console.log(loggedinLawyer);
  const [appointments, setAppointments] = useState([]);
  const [openPopoverId, setOpenPopoverId] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!loggedinLawyer?._id) return;
      try {
        const res = await axios.get(
          `/api/appointment/lawyer/${loggedinLawyer._id}`
        );
        setAppointments(res.data.appointments || []);
      } catch (err) {
        console.error("Error fetching lawyer appointments:", err);
      }
    };

    fetchAppointments();
  }, [loggedinLawyer]);

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      await axios.patch(`/api/appointment/${appointmentId}`, { status });
      // Refresh the list after update
      const updatedAppointments = appointments.map((appt) =>
        appt._id === appointmentId ? { ...appt, status } : appt
      );
      setAppointments(updatedAppointments);
      setOpenPopoverId(null); // close popover
    } catch (err) {
      console.error("Error updating appointment status:", err);
    }
  };

  if (!loggedinLawyer) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Your Consultations
        </h2>
        <p className="text-gray-600 text-sm">
          View upcoming and past client appointments
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-gray-100 text-center py-6 rounded border border-gray-300">
          <p className="text-gray-600">No appointments yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Client</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time Slot</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50 h-40">
                  <td className="py-3 px-4">{appt.userId?.name || "N/A"}</td>
                  <td className="py-3 px-4">
                    {format(new Date(appt.date), "PPP")}
                  </td>
                  <td className="py-3 px-4">
                    {appt.timeSlot || "Not specified"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs font-medium ${getStatusColor(
                        appt.status
                      )}`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {format(new Date(appt.createdAt), "PPP")}
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2 justify-center relative">
                      {/* View Button */}
                      <button
                        onClick={() =>
                          router.push(
                            `/consult-lawyer/${loggedinLawyer._id}/appointment/${appt._id}`
                          )
                        }
                        className="p-2 hover:bg-blue-100 rounded"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </button>

                      {/* Settings Popover Button */}
                      <button
                        onClick={() =>
                          setOpenPopoverId(
                            openPopoverId === appt._id ? null : appt._id
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded"
                      >
                        <Settings className="w-4 h-4 text-gray-700" />
                      </button>

                      {/* Status Popover */}
                      {openPopoverId === appt._id && (
                        <div className="absolute -top-14 right-14 z-10 bg-white border border-gray-200 rounded shadow w-32">
                          {["pending", "approved", "rejected", "completed"].map(
                            (statusOption) => (
                              <button
                                key={statusOption}
                                onClick={() =>
                                  handleStatusUpdate(appt._id, statusOption)
                                }
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                {statusOption}
                              </button>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
