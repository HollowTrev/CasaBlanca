import React, { useState } from "react";

function ModalActivator() {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contactNo: "",
    roomType: "",
    tableNumber: "",
    numberOfPersons: "",
    time: "",
    purpose: "",
  });

  // Function to activate the modal
  const activateModal = () => {
    setShowModal(true);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission logic, such as sending the form data to a server
    console.log(formData);
    // Reset form data after submission
    setFormData({
      fullname: "",
      email: "",
      contactNo: "",
      roomType: "",
      tableNumber: "",
      numberOfPersons: "",
      time: "",
      purpose: "",
    });
    // Close the modal
    setShowModal(false);
  };
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <button
        onClick={activateModal}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
      >
        Open Modal
      </button>

      {/* Modal for adding/editing todo */}
      {showModal && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
          <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-200">
              Contact Form
            </h2>
            <form className="flex flex-wrap"/*  onSubmit={handleSubmit} */>
              <input
                type="text"
                name="fullname"
                /* value={formData.fullname}
                onChange={handleChange} */
                placeholder="Full Name"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
              />
              <input
                type="email"
                name="email"
                /* value={formData.email}
                onChange={handleChange} */
                placeholder="Email"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
              />
              <input
                type="tel"
                name="contact"
                /* value={formData.contact}
                onChange={handleChange} */
                placeholder="Contact No."
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
              />
              <select
                name="roomType"
                /* value={formData.roomType}
                onChange={handleChange} */
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
              >
                <option value="">Select Room Type</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
              <input
                type="number"
                name="tableNumber"
                /* value={formData.tableNumber}
                onChange={handleChange} */
                placeholder="Table Number"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
              />
              <input
                type="time"
                name="time"
               /*  value={formData.time}
                onChange={handleChange} */
                placeholder="Time"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
              />
              <input
                type="text"
                name="purpose"
                /* value={formData.purpose}
                onChange={handleChange} */
                placeholder="Purpose"
                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
              />
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded-lg mr-[2%]"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 mt-4 font-bold text-white transition duration-150 ease-in-out rounded-md md:mt-0 bg-gradient-to-r from-indigo-500 to-blue-500 hover:bg-indigo-600 hover:to-blue-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalActivator;
