'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';

const getStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-green-500';
    case 'rejected':
      return 'bg-red-500';
    case 'completed':
      return 'bg-blue-500';
    default:
      return 'bg-yellow-500';
  }
};

export default function UserAppointmentsDashboard() {
  const [userAppointments, setUserAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('/api/appointment/user');
      setUserAppointments(res.data.appointments || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (appointmentId) => {
    const confirm = window.confirm('Are you sure you want to delete this appointment?');
    if (!confirm) return;

    try {
      await axios.delete(`/api/appointment/${appointmentId}`);
      setUserAppointments((prev) => prev.filter((appt) => appt._id !== appointmentId));
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Your Appointments</h2>
        <p className="text-gray-600 text-sm">View and manage your lawyer appointments</p>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : userAppointments.length === 0 ? (
        <div className="bg-gray-100 text-center py-6 rounded border border-gray-300">
          <p className="text-gray-600">No appointments made yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Lawyer</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time Slot</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Created At</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userAppointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{appt.lawyerId?.name || 'Unknown'}</td>
                  <td className="py-3 px-4">{format(new Date(appt.date), 'PPP')}</td>
                  <td className="py-3 px-4">{appt.timeSlot || 'Not selected'}</td>
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
                    {format(new Date(appt.createdAt), 'PPP')}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() =>
                          router.push(`/consult-lawyer/${appt.lawyerId?._id}/appointment/${appt._id}/edit`)
                        }
                        className="p-2 rounded hover:bg-gray-200"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleDelete(appt._id)}
                        className="p-2 rounded hover:bg-gray-200 text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
