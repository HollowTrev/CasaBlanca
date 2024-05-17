import React, { useState } from "react";
import { generateDate, months } from ".././utils/calendar.js";
import cn from ".././utils/cn.js";
import dayjs from "dayjs";
import { IoCloseSharp } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import Navbar from "../screens/dashboard/Navbar.jsx";


function Calendar() {
  const days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

  const currentDate = dayjs();
  const navigate = useNavigate();

  const [today, setToday] = useState(currentDate);
  const [select, setSelect] = useState(currentDate);
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null); // Initialize selectedTodo state

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    contactNo: "",
    roomType: "",
    tableNumber: "",
    numberOfPersons: "",
    startTime:"",
    endTime: "",
    purpose: "",
  });

  const handleAddTodo = () => {
    setShowModal(true);
    setSelectedTodo(null); 
    setFormData({
    fullname: "",
    email: "",
    contactNo: "",
    roomType: "",
    tableNumber: "",
    numberOfPersons: "",
    startTime:"",
    endTime: "",
    purpose: "",
    });
  };

  // Function to filter todos for the selected date
  const todosForSelectedDate = () => {
    return todos.filter(todo => todo.date === select.format("YYYY-MM-DD"));
  };

  // Function to add todo for selected date
  const addTodo = () => {
    const newTodo = {
      id: todos.length + 1,
      date: select.format("YYYY-MM-DD"),
      fullname: formData.fullname,
      email: formData.email,
      contactNo: formData.contactNo,
      tableNumber: formData.tableNumber,
      numberOfPersons: formData.numberOfPersons,
      startTime:formData.startTime,
      endTime: formData.endTime,
      purpose: formData.purpose
    };
    setTodos([...todos, newTodo]);
    setShowModal(false); // Close modal after adding todo
  };

  // Function to handle editing a todo item
  const handleEdit = (todo) => {
    
    setSelectedTodo(todo); // Set the selected todo
   

    setFormData({
      fullname: todo.fullname,
      email: todo.email,
      contactNo: todo.contactNo,
      roomType: todo.roomType,
      tableNumber: todo.tableNumber,
      numberOfPersons: todo.numberOfPersons,
      startTime:todo.startTime,
      endTime: todo.endTime,
      purpose: todo.purpose,
    });
    setShowModal(true); // Show modal for editing
  };

  // Function to handle updating a todo item
  const updateTodo = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === selectedTodo.id) {
        return {
          ...todo,
          fullname: formData.fullname,
          email: formData.email,
          contactNo: formData.contactNo,
          tableNumber: formData.tableNumber,
          numberOfPersons: formData.numberOfPersons,
          startTime:formData.startTime,
          endTime: formData.endTime,
          purpose: formData.purpose
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setShowModal(false); // Close modal after updating todo
  };

  // Function to handle deleting a todo item
  const handleDelete = (todo) => {
    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (confirmed) {
      const updatedTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(updatedTodos);
    }
  };

  // Function to handle form submission
const handleSubmit = (e) => {
  e.preventDefault();
  document.getElementById("approved_request").showModal();

  // Destructure formData
  const { fullname, email, contactNo, roomType, tableNumber, numberOfPersons, startTime, endTime, purpose, } = formData;
  
 


  // Ensure all required fields are filled
  if (fullname && email && contactNo && roomType && tableNumber && numberOfPersons && startTime && endTime && purpose) {
    // Create a newTodo object
    const newTodo = {
      fullname,
      email,
      contactNo,
      roomType,
      tableNumber,
      numberOfPersons,
      startTime, // Reset start time
      endTime,
      purpose
    };

    // Check if it's an edit or add action
    if (selectedTodo) {
      // If selectedTodo is present, it's an edit action
      updateTodo();
    } else {
      // If selectedTodo is null, it's an add action
      addTodo();
    }

    // Reset formData and close the modal
    setFormData({
      fullname: "",
      email: "",
      contactNo: "",
      roomType: "",
      tableNumber: "",
      numberOfPersons: "",
      startTime: "", // Reset start time
      endTime: "",
      purpose: ""
    });
    setShowModal(false);
  } else {
    // Handle case where required fields are not filled
    console.log("Please fill in all required fields");
  }
};


  return (
    <>
    <dialog id="approved_request" className="modal">
        <form
          method="dialog"
          className="modal-box w-[90%] tablet:w-full rounded-[15px]"
        >
          <section className="z-10 flex flex-row justify-between w-full">
            <h1 className="text-center w-full text-primary font-bold text-[24px] ml-[2rem]"></h1>
            {/* if there is a button tag in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost  mt-[-0.7rem] mr-[-0.4rem]">
              <IoCloseSharp size={24} />
            </button>
          </section>
          <div className="flex flex-col items-center justify-center w-full my-4">
            <MdCheckCircleOutline className="text-green-600 text-[175px]" />
            <p className="text-[28px] mt-2 text-center">Book Successfully</p>
          </div>
          <div className="flex items-center w-full mx-auto modal-action">
            {/* change the button into span tag if you are dealing with api request */}
            <button
              className="btn bg-green-600 hover:bg-green-700 text-white tablet:h-[45px] w-[80%]
              mx-auto rounded-[80px] text-[18px] font-medium"
            >
              DONE
            </button>
          </div>
        </form>
      </dialog>
      <Navbar />
    <div className="flex items-center justify-center w-full min-h-screen overflow-y-auto bg-no-repeat bg-cover bg-ImageBg ">
  
    <div className="flex items-center w-3/4 py-8 divide-x-2 shadow-lg bg-white/30 backdrop-blur-md rounded-xl md:flex-row md:h-auto md:w-3/4 lg:w-2/3 xl:w-1/2 ring-1 ring-black/5">
      <div className="w-1/2 px-5 h-96 ">
        {/* Calendar Header */}
        <div className="flex justify-between">
          <h1 className="font-semibold text-white">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex items-center gap-5">
            <GrFormPrevious
              className="w-5 h-5 text-white cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="text-white cursor-pointer"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 text-white cursor-pointer"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>

        {/* Calendar Days */}
        <div className="grid w-full grid-cols-7 text-white ">
          {days.map((day, index) => (
            <h1 key={index} className="grid text-sm h-14 place-content-center">
              {day}
            </h1>
          ))}
        </div>

        {/* Calendar Dates */}
        <div className="grid w-full grid-cols-7">
          {generateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
            <div key={index} className="grid border-t border-t-gray-50 h-14 place-content-center text-stone-50">
              <h1
                className={cn(
                  currentMonth ? "" : "text-stone-400",
                  today ? "bg-red-600 text-white" : "",
                  "h-10 w-10 grid place-content-center rounded-full hover:bg-black hover:text-white transition-all cursor-pointer",
                  select.toDate().toDateString() === date.toDate().toDateString() ? "bg-black text-white" : ""
                )}
                onClick={() => {
                  setSelect(date);
                }}
              >
                {date.date()}
              </h1>
              {select.toDate().toDateString() === date.toDate().toDateString() && (
                <ul>
                  {todos[date.format("YYYY-MM-DD")] &&
                    todos[date.format("YYYY-MM-DD")].map((todo, index) => <li key={index}>{todo}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Todo Section */}
        
        <div className="relative w-1/2 px-5 overflow-y-auto h-96 ">
            <h1 className="items-center font-semibold text-white">Schedule for {select.format("dddd, MMMM D, YYYY")}</h1>

            {/* Display todos for selected date */}
            {todosForSelectedDate().length > 0 ? (
              

              <div className="flex flex-col items-start justify-start " >
                    {todosForSelectedDate().map((todo, index) => (
                      
                      <div key={index}  className="flex items-center justify-between w-full px-2 py-2 my-1 border rounded-lg shadow-lg bg-white/20 backdrop-blur-lg ring-1 ring-black/5 ">
                        <p className="font-medium text-white " >Name: {todo.fullname}</p>
                        <div  className="flex justify-between ">
                      { /*  <MdEditCalendar onClick={() =>  handleEdit(todo)}
                        className="w-[2rem] h-[2rem] p-1 mr-2 text-white transition ease-in-out delay-75 bg-green-600 rounded-md cursor-pointer hover:bg-green-700 hover:-translate-y-1 hover:scale-110 ">
                    </MdEditCalendar> */ }
                        <button onClick={() =>  handleEdit(todo)}
                        className="w-[1.5rem] h-[1.5rem] text-center mt-1  mr-[1rem]  transition ease-in-out delay-75 border-b-2  cursor-pointer text-white hover:-translate-y-1 hover:scale-110 ">Edit
                        </button>
                        
                        <button onClick={() => handleDelete(todo)}
                        className="p-1 mr-[1rem] text-sm font-medium text-center  transition ease-in-out delay-7  rounded-md text-red-800 hover:-translate-y-1 hover:scale-110"
                        //Delete button
                        > 
                                  <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6 "
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                stroke-width="2"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
                                </svg>
                              </button>
                        </div>
                      </div>
                    ))}

                  </div>
              
            ) : (
              <div className="my-[10rem] text-xl text-center text-white ">No Books for Today 😭
              </div>
              
    
            )}

            

            

                {/* Button to open modal */}
                <div className="fixed bottom-5 right-7 overscroll-x-none ">
                  
                    <button onClick={handleAddTodo}
                    className="inline-flex items-center w-full px-4 py-2 overflow-hidden text-sm font-medium text-white transition ease-in-out delay-75 bg-green-600 rounded-md hover:bg-green-700 whitespace-nowrap hover:-translate-y-1 hover:scale-110"
                        >
                          Add Book
                      
                        </button>
                  
                </div>
        </div>



     {/* Modal for adding/editing todo */}
     
     {showModal && (
      <div className="fixed left-0 z-50 flex items-center justify-center w-full h-full my-6 top-[-2rem] ">
        <div className="relative z-10 max-w-md p-8 mx-auto overflow-hidden bg-gray-800 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
          <h2 className="mb-4 text-2xl font-bold text-center text-white">
            {selectedTodo ? "Edit Book" : "Add Booking"}
          </h2>
          <form className="flex flex-wrap" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              placeholder="Full Name"
              className="bg-gray-700 border border-gray-600 rounded-md text-white p-2 mb-4 focus:bg-white-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              className="bg-gray-700 border border-gray-600 rounded-md text-white p-2 mb-4 focus:bg-white-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"            />
            <input
              type="tel"
              name="contactNo"
              value={formData.contactNo}
              onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
              placeholder="Contact No."
              className="bg-gray-700 border border-gray-600 rounded-md text-white p-2 mb-4 focus:bg-white-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"            />
            <select
              name="roomType"
              value={formData.roomType}
              onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
              className="bg-gray-700 border border-gray-600 rounded-md text-white p-2 mb-4 focus:bg-white-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"            >
              <option value="">Select Room Type</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
            <input
              type="number"
              name="tableNumber"
              value={formData.tableNumber}
              onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
              placeholder="Table Number"
              className="bg-gray-700 border  border-gray-600 rounded-md text-white p-2 mb-4 focus:bg-white-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"            />
            <input
              type="text"
              name="numberOfPersons"
              value={formData.numberOfPersons}
              onChange={(e) => setFormData({ ...formData, numberOfPersons: e.target.value })}
              placeholder="Number of Persons"
              className="bg-gray-700 border border-gray-600 rounded-md text-white p-2 mb-4 focus:bg-white-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"            />
            <select
            name="startTime"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className="bg-gray-700 border border-gray-600 rounded-md text-white p-2 mb-4 focus:bg-white-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"          >
            <option value="">Select Start Time</option>
            <option value="8:00am ">8:00am</option>
            <option value="11:00am ">11:00am</option>
            <option value="12:00am">12:00am</option>
          </select>
          <select
              name="endTime"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="bg-gray-700 border border-gray-600 rounded-md text-white p-2 mb-4 focus:bg-white-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"            >
              <option value="">Select End Time</option>
              <option value="11:00am">11:00am</option>
              <option value="12:00am">12:00am</option>
              <option value="1:00pm">1:00pm</option>
            </select>
            </div>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              placeholder="Purpose"
              className="bg-gray-700 border border-gray-600 rounded-md text-white p-2 mb-4 focus:bg-white-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"            />
            
            
              <button
                type="submit" 
                className="px-4 py-2 mt-4  font-bold text-white transition duration-150 ease-in-out rounded-md md:mt-0 bg-gradient-to-r bg-green-700 from-green-500 to-green-400 hover:bg-green-600 hover:to-green-600 w-full md:w-[48%] mr-[4%]"
              >
                {selectedTodo ? "Update" : "Submit"}
              </button>
              
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 mt-4 font-bold text-white transition duration-150 ease-in-out rounded-md md:mt-0 bg-gradient-to-r border-solid border-2 border-white from-red-500 to-red-500 hover:bg-red-600 hover:to-red-600 w-full md:w-[48%] mr-[2%]"
              >
                Cancel
              </button>
           
          </form>
        
      </div>
      </div>
    )}
    

    </div>
    </div>
    </>
  );
}

export default Calendar;
