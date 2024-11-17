import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import AddAndEditEmployee from "./AddAndEditEmployee";

const EmployeesHome = () => {
  const [EmployeesData, setEmployeesData] = useState([]);
  const [onClickAdd, setOnClickAdd] = useState(false);
  const [searchedEmployee, setSearchedEmployee] = useState("");

  useEffect(() => {
    axios
      .get("/sample.json")
      .then((res) => {
        setEmployeesData(res.data);
      })
      .catch((e) => {
        console.error("Error loading", e);
      });
  }, []);

  const onClickCancel = () => {
    setOnClickAdd(false);
  };

  const addEmployee = (newEmployee) => {
    setEmployeesData((prevData) => [...prevData, newEmployee]);
    setOnClickAdd(false);
  };

  const deleteEmployee = (id) => {
    let updatedData = filteredEmployees.filter((employee) => employee.id !== id);
    setEmployeesData(updatedData)
  };

  const filteredEmployees = EmployeesData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchedEmployee) ||
      employee.mobile.includes(searchedEmployee)
  );

  return (
    <div className="flex justify-center lg:items-center h-screen bg-[#A1BE95] py-5">
      <div className="flex flex-col gap-3 md:w-4/5">
        <h1 className="text-xl font-semibold font-serif text-center ">
          Developer Employees List
        </h1>
        <div className="flex items-center p-1 border md:w-2/3 mx-auto  ">
          <input
            type="search"
            id="search"
            className="outline-none bg-transparent w-full"
            onChange={(e) => setSearchedEmployee(e.target.value.toLowerCase())}
          />
          <label htmlFor="search" className="px-1">
            <IoSearchOutline />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            className="flex items-center bg-[#F98866] gap-1 p-1 px-4 font-semibold text-gray-200 rounded-lg"
            onClick={() => setOnClickAdd(true)}
          >
            Add Employee
            <span>
              <FaPlus />
            </span>
          </button>
        </div>

        {onClickAdd && (
          <AddAndEditEmployee
            onClickCancel={onClickCancel}
            onAdd={addEmployee}
          />
        )}

        <div>
          {filteredEmployees.length > 0 ? (
            <ul className="bg-orange-300 md:grid grid-cols-2 lg:grid-col-3 gap-3 p-2 max-md:space-y-3">
              {filteredEmployees.map((employee) => (
                <li
                  key={employee.id}
                  className="flex items-center bg-gray-200 p-2 justify-between"
                >
                  <div className="flex items-center gap-1">
                    <span>
                      <IoMdContact size={40} />
                    </span>
                    <div className="">
                      <strong className="text-nowrap text-sm">
                        {employee.name}
                      </strong>
                      <p className="text-sm">{employee.mobile}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="hover:text-blue-400">
                      <MdModeEdit />
                    </span>
                    <span
                      onClick={() => deleteEmployee(employee.id)}
                      className="hover:text-red-400"
                    >
                      <MdDelete />
                    </span>
                    <span className="hover:text-cyan-400">
                      <IoEye />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center font-bold text-2xl bg-[#F98866] py-3 text-white">
              No Data Found ...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeesHome;
