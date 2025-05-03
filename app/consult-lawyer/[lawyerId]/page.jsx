'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLawyer } from '@/context/LawyerContext';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';

export default function LawyerDetailPage() {
  const { lawyers: allLawyers, lawyerLoading } = useLawyer();
  const { lawyerId } = useParams();
  const router = useRouter();

  const [lawyer, setLawyer] = useState(null);

  useEffect(() => {
    if (allLawyers && lawyerId) {
      const found = allLawyers.find(l => l._id === lawyerId);
      setLawyer(found);
    }
  }, [allLawyers, lawyerId]);

  if (lawyerLoading || !lawyer) {
    return <Loader text="Loading Lawyer Details..." />;
  }

  const {
    name,
    profilePhoto,
    bio,
    expertise,
    experienceYears,
    languages,
    gender,
    age,
    location,
    isVerified,
    availability,
    category,
    email,
    phone,
  } = lawyer;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div className="flex items-center gap-6 ">
          <div className="w-24 rounded-full overflow-hidden border">
            <Image
              src={profilePhoto || '/default-avatar.png'}
              alt={name}
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              {name}
              {isVerified && <BadgeCheck className="w-5 h-5 text-green-500" />}
            </h1>
            <p className="text-gray-600">{bio}</p>
            <p className="text-sm text-gray-500">{location}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Detail label="Experience" value={`${experienceYears} years`} />
          <Detail label="Expertise" value={expertise?.join(', ')} />
          <Detail label="Languages" value={languages?.join(', ')} />
          <Detail label="Gender" value={gender} />
          <Detail label="Age" value={age} />
          <Detail label="Email" value={email} />
          <Detail label="Phone" value={phone} />
          <Detail label="Availability" value={availability || 'Not specified'} />
          <Detail label="Categories" value={category?.join(', ')} />
        </div>

        <div className="pt-4">
          <button
            onClick={() => router.push(`/consult-lawyer/${lawyerId}/appointment`)}
            className="px-6 py-3 w-full bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value || '—'}</p>
    </div>
  );
}
