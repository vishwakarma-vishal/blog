import React from 'react';

const ConfirmDialog = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <p className="text-lg text-black mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onConfirm(true)} // Pass true for confirmation
            className="bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete
          </button>
          <button
            onClick={() => onCancel()} // No argument needed for cancel
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
