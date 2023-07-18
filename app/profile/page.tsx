'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { SavedCity } from '@/components/SavedCity';
import { ISavedCity } from '@/utils/weatherInterfaces';

const MyProfile = () => {
  const { data: session }: any = useSession();
  const [savedCities, setSavedCities] = useState([]);

  useEffect(() => {
    const getSavedCities = async () => {
      try {
        const res = await fetch(`/api/users/${session?.user.id}/cities`);
        const data = await res.json();
        setSavedCities(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (session?.user.id) getSavedCities();
  }, []);

  const handleDelete = async (data) => {
    const hasConfirmed = confirm('Are you sure you want to delete this city?');
    if (hasConfirmed) {
      try {
        await fetch(`/api/city/delete/${data._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPost = savedCities.filter((city: any) => city._id !== data._id);
        setSavedCities(filteredPost);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">Welcome to your profile</span>
      </h1>
      <p className="desc text-left">Here you can find your saved cities</p>
      <div className="mt-10 prompt_layout">
        {savedCities.length !== 0 ? (
          savedCities.map((city: ISavedCity) => <SavedCity key={city._id} data={city} onDelete={handleDelete} />)
        ) : (
          <h1>You have no saved cities</h1>
        )}
      </div>
    </section>
  );
};

export default MyProfile;
