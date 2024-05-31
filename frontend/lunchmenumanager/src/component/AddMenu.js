import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AddMenu = () => {
  const [date, setDate] = useState('');
  const [lunchOption, setLunchOption] = useState('');
  const { getToken } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = getToken();
    try {
      const response = await axios.post(
        'http://localhost:3500/olmm/adminmenu',
        { date, lunchOption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Menu added successfully:', response.data);
      // Clear form
      setDate('');
      setLunchOption('');
    } catch (error) {
      console.error('Error adding menu:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Add Menu</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Lunch Option</label>
            <input
              type="text"
              value={lunchOption}
              onChange={(e) => setLunchOption(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Add Menu
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddMenu;