import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaUser } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import AddEmployeeModal from "../../components/dashboard-components/AddEmployeeModal";
import UpdateEmployeeModal from "../../components/dashboard-components/UpdateEmployeeModal";
import axios from "./../../utils/Path";

const PayrollScreen = () => {
  const [attachFile, setAttachFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);
  const [updateEmployeeModal, setUpdateEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const response = await axios.get(`auth/employees`);
        console.log(response.data); // Log the fetched data
        setFilteredEmployees(response.data);
      } catch (error) {
        console.log(error.message);
        console.error("Error fetching pending bookings:", error);
      }
    };

    fetchPendingBookings();
  }, []);

  // Function to filter employees based on search query
  const filterEmployees = () => {
    const filtered = filteredEmployees.filter((employee) =>
      employee.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(filtered); // Log the filtered data
    setFilteredEmployees(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredEmployees(filteredEmployees);
    } else {
      filterEmployees();
    }
  };

  // Handle file upload button click
  const handleUploadClick = () => {
    // Add your logic here to upload the file. The file is stored in attachFile state
  };

  const AddEmployeeHandler = () => {
    setAddEmployeeModal(true);
  };

  const CloseEmployeeHandler = () => {
    setAddEmployeeModal(false);
  };

  const updateEmployeeHandler = (data) => {
    setSelectedEmployee(data);
    setUpdateEmployeeModal(true);
  };

  const CloseUpdateEmployeeHandler = () => {
    setUpdateEmployeeModal(false);
  };

  const RemoveRecordHandler = () => {
    //your remove employee record logic here
    document.getElementById("remove_record").showModal();
  };
  return (
    <>
      {addEmployeeModal && (
        <AddEmployeeModal
          openModal={addEmployeeModal}
          closeModal={CloseEmployeeHandler}
        />
      )}

      {updateEmployeeModal && (
        <UpdateEmployeeModal
          openModal={updateEmployeeModal}
          closeModal={CloseUpdateEmployeeHandler}
          selectedEmployee={selectedEmployee}
        />
      )}

      <dialog id="remove_record" className="modal">
        <form
          method="dialog"
          className="modal-box w-[90%] tablet:w-full rounded-[15px]"
        >
          <section className="z-10 flex flex-row w-full  justify-between">
            <h1 className="text-center w-full text-primary font-bold text-[24px] ml-[2rem]">
              REMOVE RECORD
            </h1>
            {/* if there is a button tag in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost  mt-[-0.7rem] mr-[-0.4rem]">
              <IoCloseSharp size={24} />
            </button>
          </section>
          <p className="px-4 pt-4">
            You are about to remove the employee record. Press{" "}
            <strong>'REMOVE'</strong> if you wish to proceed, or{" "}
            <strong>'CANCEL'</strong> if you do not.
          </p>
          <div className="modal-action w-full mx-auto flex tablet:flex-row flex-col items-center gap-2 tablet:gap-0">
            {/* change the button into span tag if you are dealing with api request */}
            <button
              className="btn border-red-500 border-[1.5px] text-red-500 bg-white hover:bg-red-500 hover:text-white  tablet:h-[45px] tablet:w-[50%] w-full
              mx-auto rounded-[80px] text-[18px] font-medium"
            >
              CANCEL
            </button>
            {/* change the button into span tag if you are dealing with api request */}
            <span
              className="btn bg-green-600 hover:bg-green-700 text-white tablet:h-[45px] tablet:w-[50%] w-full
              mx-auto rounded-[80px] text-[18px] font-medium"
              onClick={() => {
                document.getElementById("remove_record").close();
              }}
            >
              REMOVE
            </span>
          </div>
        </form>
      </dialog>

      <div className="flex flex-col w-full overflow-y-hidden text-white tablet:ml-0 ml-[55px]">
        <h1 className="tablet:hidden p-4 text-[24px] font-bold w-full text-center">
          CASA BLANCA <br />
          BAR AND RESTAURANT
        </h1>
        <h1 className="p-4 text-[32px] hidden tablet:block font-bold w-full text-center">
          CASA BLANCA - BAR AND RESTAURANT
        </h1>

        <div className="flex flex-col tablet:px-12 h-full">
          <div className="flex flex-col w-full bg-secondary h-[80vh] rounded-[20px] p-4">
            {/* ------Payroll Header-------- */}
            <div className="flex flex-row w-full gap-2">
              <input
                type="file"
                accept=".xls, .xlsx, .csv, .doc, .docx, .pdf"
                onChange={(e) => {
                  setAttachFile(e.target.files[0]);
                }}
                className="file-input file-input-bordered text-black w-full"
              />
              <button
                className="btn btn-primary border-[1.5px]
                rounded-[20px] text-[18px] w-[160px] font-medium text-white"
                onClick={handleUploadClick}
              >
                UPLOAD
              </button>
            </div>
            <div className="flex tablet:flex-row flex-col w-full justify-between items-center tablet:gap-10 laptop:gap-0">
              <h2 className="font-bold text-[35px] mt-2">EMPLOYEES</h2>
              <div className="flex flex-row mt-4 gap-2">
                <div className=" text-black">
                  <FiSearch
                    size={20}
                    className="absolute mt-[11px] right-50 font-black ml-3 text-black"
                  />
                  <input
                    type="text"
                    placeholder="Search Employee"
                    className="laptop:w-[406px] w-full p-2 pl-10 border rounded-[360px] shadow-sm"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <button
                  className="btn btn-primary border-[1.5px]
                rounded-[50%] text-[18px] min-w-[50px] font-medium text-white"
                  onClick={AddEmployeeHandler}
                >
                  <MdOutlineAdd className="text-[40px] absolute" />
                </button>
              </div>
            </div>
            {/* ------Payroll Header ends here-------- */}

            <div className=" w-full h-full mt-2 overflow-y-auto flex flex-col gap-4 p-2">
              {/* ------Populate tables row here, Change this with the actual data-------- */}
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="min-h-[55px] bg-accent rounded-[10px] flex flex-row justify-between items-center hover:bg-[#c2c1b7] text-black px-4"
                  >
                    <div className="h-full flex flex-row gap-2 items-center">
                      {/* ----Add your logic here for dynamic employee profile---- */}
                      <div className="h-[42px] min-w-[42px] rounded-[50%] bg-secondary flex items-center justify-center">
                        <FaUser className="text-[22px] text-white" />
                      </div>
                      <p className="text-[16px]">{employee.fullname}</p>
                    </div>

                    <div className="h-full flex flex-row gap-2 items-center">
                      <AiFillEdit
                        className="text-[28px] cursor-pointer hover:text-purple-600"
                        onClick={() => {
                          updateEmployeeHandler(employee);
                        }}
                      />
                      <RiDeleteBin2Fill
                        className="text-[28px] cursor-pointer hover:text-red-600"
                        onClick={RemoveRecordHandler}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <p className="text-[16px] text-gray-400">
                    No employee found.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayrollScreen;
