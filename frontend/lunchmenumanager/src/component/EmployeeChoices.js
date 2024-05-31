import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const EmployeeChoices = () => {
  const [choices, setChoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [date, setDate] = useState('');
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchChoices = async () => {
      const token = getToken();
      try {
        const response = await axios.get(`http://localhost:3500/olmm/employeechoices?page=${currentPage}&limit=10&date=${date}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setChoices(response.data.choices);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching employee choices:', error);
      }
    };

    if (date) {
      fetchChoices();
    }
  }, [getToken, currentPage, date]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setCurrentPage(1); // Reset to first page when date changes
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-xl font-bold mb-4">Employee Choices</h1>
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
        {choices.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lunch Option
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {choices.map((choice, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{choice.employeename}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{choice.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{choice.lunchoption}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No choices found for the selected date.</div>
        )}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default EmployeeChoices;