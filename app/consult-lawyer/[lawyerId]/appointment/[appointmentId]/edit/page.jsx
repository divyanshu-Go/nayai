'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { useLawyer } from '@/context/LawyerContext';
import axios from 'axios';
import Loader from '@/components/Loader';

export default function EditAppointmentPage() {
  const { lawyerId, appointmentId } = useParams();
  const { user } = useUser();
  const { lawyers } = useLawyer();
  const router = useRouter();

  const selectedLawyer = lawyers?.find((l) => l._id === lawyerId);

  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [issueSummary, setIssueSummary] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await axios.get(`/api/appointment/${appointmentId}`);
        const appt = res.data.appointment;

        if (appt.userId._id !== user._id) {
          alert('Unauthorized to edit this appointment.');
          router.push('/user/appointments');
        }

        setDate(appt.date?.slice(0, 10) || '');
        setTimeSlot(appt.timeSlot || '');
        setIssueSummary(appt.issueSummary || '');
      } catch (err) {
        console.error('Error loading appointment:', err);
        alert('Failed to load appointment');
        router.push('/user/appointments');
      } finally {
        setLoading(false);
      }
    };

    if (user && appointmentId) {
      fetchAppointment();
    }
  }, [user, appointmentId, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !selectedLawyer) return;

    setSubmitting(true);
    try {
      const res = await axios.put(`/api/appointment/${appointmentId}`, {
        userId: user._id,
        lawyerId: selectedLawyer._id,
        date,
        timeSlot,
        issueSummary,
      });

      if (res.status === 200) {
        alert('Appointment updated successfully!');
        router.push('/user/appointments');
      } else {
        alert('Failed to update appointment.');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating appointment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !user || !selectedLawyer) return <Loader text="Loading appointment form..." />;

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Edit Appointment with {selectedLawyer.name}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Time Slot</label>
          <input
            type="text"
            placeholder="e.g., 10:00 AM - 11:00 AM"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brief Summary of Your Issue</label>
          <textarea
            required
            rows={4}
            value={issueSummary}
            onChange={(e) => setIssueSummary(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {submitting ? 'Updating...' : 'Update Appointment'}
        </button>
      </form>
    </div>
  );
}
