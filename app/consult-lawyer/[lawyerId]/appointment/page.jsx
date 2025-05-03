// app/consult-lawyer/[lawyerId]/appointment/page.jsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useLawyer } from '@/context/LawyerContext';
import Loader from '@/components/Loader';

export default function AppointmentFormPage() {
  const { lawyerId } = useParams();
  const { user } = useUser();
  const { lawyers } = useLawyer();
  const router = useRouter();

  const selectedLawyer = lawyers?.find(l => l._id === lawyerId);
  console.log(selectedLawyer)

  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [issueSummary, setIssueSummary] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !selectedLawyer) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          lawyerId: selectedLawyer._id,
          date,
          timeSlot,
          issueSummary,
        }),
      });

      if (res.ok) {
        alert('Appointment requested successfully!');
        router.push('/user/appointments'); 
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to create appointment');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user || !selectedLawyer) return <Loader text="Loading Appointment form"/>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Book an Appointment with {selectedLawyer.name}
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
          <p className="text-xs text-gray-500 mt-1">Choose a suitable date for the appointment.</p>
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
          <p className="text-xs text-gray-500 mt-1">Suggest a time range. Lawyer will confirm based on availability.</p>
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
          <p className="text-xs text-gray-500 mt-1">This helps the lawyer prepare for your consultation.</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {submitting ? 'Submitting...' : 'Request Appointment'}
        </button>
      </form>
    </div>
  );
}
