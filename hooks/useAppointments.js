import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('/api/appointment');
      setAppointments(res.data.appointments);
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setError('Could not load appointments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optional: Auto-fetch on mount
    // fetchAppointments();
  }, []);

  return {
    appointments,
    fetchAppointments,
    loading,
    error,
  };
}
