import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const SelectLunch = () => {
  const [date, setDate] = useState('');
  const [menu, setMenu] = useState([]);
  const [selectedLunch, setSelectedLunch] = useState('');
  const [message, setMessage] = useState('');
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
    setSelectedLunch('');
    setMessage('');
  };

  const handleLunchSelection = async () => {
    const token = getToken();
    try {
      const response = await axios.post('http://localhost:3500/olmm/selectlunch', {
        date,
        lunchOption: selectedLunch,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setMessage('Lunch option selected successfully!');
      } else {
        setMessage('Failed to select lunch option.');
      }
    } catch (error) {
      console.error('Error selecting lunch option:', error);
      setMessage('Failed to select lunch option.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-xl font-bold mb-4">Select Lunch</h1>
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Lunch Option:
            </label>
            <select
              value={selectedLunch}
              onChange={(e) => setSelectedLunch(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>Select an option</option>
              {menu.map((item, index) => (
                <option key={index} value={item.lunch_option}>
                  {item.lunch_option}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>No menu available for the selected date.</div>
        )}
        {selectedLunch && (
          <button
            onClick={handleLunchSelection}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Submit
          </button>
        )}
        {message && <div className="mt-4 text-green-700">{message}</div>}
      </main>
    </div>
  );
};

export default SelectLunch;