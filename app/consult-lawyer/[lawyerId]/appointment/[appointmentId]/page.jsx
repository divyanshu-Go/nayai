// app/consult-lawyer/[lawyerId]/appointment/[appointmentId]/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { format } from 'date-fns';

export default function AppointmentDetailsPage() {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`/api/appointment/${appointmentId}`);
        setAppointment(res.data.appointment);
      } catch (err) {
        console.error('Failed to load appointment:', err);
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) {
      fetchAppointment();
    }
  }, [appointmentId]);

  if (loading) return <div className="p-6 text-gray-600">Loading appointment details...</div>;
  if (!appointment) return <div className="p-6 text-red-600">Appointment not found.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Appointment Details</h1>

      <div className="space-y-4 text-gray-800">
        <div>
          <span className="font-medium">Client Name:</span>{' '}
          {appointment.userId?.name || 'Unknown'}
        </div>
        <div>
          <span className="font-medium">Client Email:</span>{' '}
          {appointment.userId?.email || 'Unknown'}
        </div>
        <div>
          <span className="font-medium">Date:</span>{' '}
          {format(new Date(appointment.date), 'PPP')}
        </div>
        <div>
          <span className="font-medium">Time Slot:</span>{' '}
          {appointment.timeSlot || 'Not specified'}
        </div>
        <div>
          <span className="font-medium">Status:</span>{' '}
          <span className="inline-block px-2 py-1 text-white rounded text-sm bg-blue-600">
            {appointment.status}
          </span>
        </div>
        <div>
          <span className="font-medium">Created At:</span>{' '}
          {format(new Date(appointment.createdAt), 'PPP')}
        </div>
        <div>
          <span className="font-medium">Issue Summary:</span>
          <p className="mt-1 text-gray-700 border rounded p-2 bg-gray-50">
            {appointment.issueSummary}
          </p>
        </div>
      </div>
    </div>
  );
}
