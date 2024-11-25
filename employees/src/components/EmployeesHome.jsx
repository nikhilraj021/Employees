import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import AddAndEditEmployee from "./AddAndEditEmployee";
import ViewEmployee from "./ViewEmployee";

const EmployeesHome = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [onClickAdd, setOnClickAdd] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewEmployeeData, setViewEmployeeData] = useState(null);
  const [searchedEmployee, setSearchedEmployee] = useState("");

  // Load data from local storage on component mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("employeesData"));
    if (storedData) {
      setEmployeesData(storedData);
    } else {
      // Fetch initial data if not present in local storage (optional)
      axios
        .get("/sample.json")
        .then((res) => {
          setEmployeesData(res.data);
          localStorage.setItem("employeesData", JSON.stringify(res.data));
        })
        .catch((e) => {
          console.error("Error loading", e);
        });
    }
  }, []);

  const onClickCancel = () => {
    setOnClickAdd(false);
    setEditingEmployee(null);
  };

  const addEmployee = (newEmployee) => {
    const updatedData = [...employeesData, newEmployee];
    setEmployeesData(updatedData);
    localStorage.setItem("employeesData", JSON.stringify(updatedData));
    setOnClickAdd(false);
  };

  const deleteEmployee = (id) => {
    const updatedData = employeesData.filter((employee) => employee.id !== id);
    setEmployeesData(updatedData);
    localStorage.setItem("employeesData", JSON.stringify(updatedData));
  };

  const updateEmployee = (updatedEmployee) => {
    const updatedData = employeesData.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployeesData(updatedData);
    localStorage.setItem("employeesData", JSON.stringify(updatedData));
    setOnClickAdd(false);
    setEditingEmployee(null);
  };

  const handleEdit = (employee) => {
    setOnClickAdd(true);
    setEditingEmployee(employee);
  };

  const filteredEmployees = employeesData.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchedEmployee.toLowerCase()) ||
      employee.mobile.includes(searchedEmployee)
  );

  const handleView = (employee) => {
    setViewEmployeeData(employee);
  };

  const handleCloseView = () => {
    setViewEmployeeData(null);
  };

  return (
    <div className="flex justify-center lg:items-center h-screen bg-[#A1BE95] py-5">
      <div className="flex flex-col gap-3 md:w-4/5">
        <h1 className="text-xl font-semibold font-serif text-center">
          Employee Management System
        </h1>
        <div className="flex items-center p-1 border md:w-2/3 mx-auto">
          <input
            type="search"
            id="search"
            className="outline-none bg-transparent w-full placeholder:text-gray-700"
            placeholder="Search..."
            onChange={(e) => setSearchedEmployee(e.target.value)}
          />
          <label htmlFor="search" className="px-1">
            <IoSearchOutline />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            className="flex items-center bg-[#F98866] gap-1 p-1 px-4 font-semibold text-gray-200 rounded-lg"
            onClick={() => {
              setOnClickAdd(true);
              setEditingEmployee(null);
            }}
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
            editingEmployee={editingEmployee}
            onUpdate={updateEmployee}
          />
        )}

        {viewEmployeeData && (
          <ViewEmployee onClose={handleCloseView} employee={viewEmployeeData} />
        )}

        <div>
          {filteredEmployees.length > 0 ? (
            <ul className="md:grid grid-cols-2 lg:grid-cols-3 gap-3 p-2 max-md:space-y-3">
              {filteredEmployees.map((employee) => (
                <li
                  key={employee.id}
                  className="flex items-center bg-gray-200 p-2 justify-between"
                >
                  <div className="flex items-center gap-1">
                    <span>
                      <IoMdContact size={40} />
                    </span>
                    <div>
                      <strong className="text-nowrap text-sm">
                        {employee.name}
                      </strong>
                      <p className="text-sm">{employee.mobile}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span
                      onClick={() => handleEdit(employee)}
                      className="hover:text-blue-400 cursor-pointer"
                    >
                      <MdModeEdit />
                    </span>
                    <span
                      onClick={() => deleteEmployee(employee.id)}
                      className="hover:text-red-400 cursor-pointer"
                    >
                      <MdDelete />
                    </span>
                    <span
                      onClick={() => handleView(employee)}
                      className="hover:text-cyan-400 cursor-pointer"
                    >
                      <IoEye />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center font-bold text-2xl py-3 text-white">
              No Data Found ...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeesHome;
