import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const DailyMenu = () => {
  const [date, setDate] = useState('');
  const [menu, setMenu] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchMenu = async () => {
      if (date) {
        const token = getToken();
        try {
          const response = await axios.get(`http://localhost:3500/olmm/dailymenu`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            params: { date },
          });
          setMenu(response.data);
        } catch (error) {
          console.error('Error fetching menu:', error);
        }
      }
    };

    fetchMenu();
  }, [date, getToken]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-xl font-bold mb-4">Daily Menu</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handleDateChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {menu.length > 0 ? (
          <ul className="list-disc pl-5">
            {menu.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.lunch_option}
              </li>
            ))}
          </ul>
        ) : (
          <div>No menu available for the selected date.</div>
        )}
      </main>
    </div>
  );
};

export default DailyMenu;