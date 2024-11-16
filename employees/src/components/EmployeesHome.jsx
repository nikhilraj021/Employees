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
  const [onClickAdd, setOnClickAdd] = useState(false)

  useEffect(() => {
    axios
      .get("/sample.json")
      .then((res) => {
        setEmployeesData(res.data);
      })
      .catch((e) => {
        console.error("Error loading", e);
      });
  });

  const onClickCancel = () =>{
    setOnClickAdd(false)
  }

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
          />
          <label htmlFor="search" className="px-1">
            <IoSearchOutline />
          </label>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center bg-[#F98866] gap-1 p-1 px-4 font-semibold text-gray-200 rounded-lg" onClick={() => setOnClickAdd(true)}>
            Add Employee
            <span>
              <FaPlus />
            </span>
          </button>
        </div>

        {onClickAdd && <AddAndEditEmployee onClickCancel={onClickCancel} />}

        <div >
          {EmployeesData.length > 0 ? (
            <ul className="bg-orange-300 md:grid grid-cols-2 lg:grid-col-3 gap-3 p-4 max-md:space-y-3">
              {EmployeesData.map((employee) => (
                <li key={employee.id} className="flex items-center bg-gray-200 p-2 justify-between">
                  <div className="flex items-center gap-2">
                    <span>
                      <IoMdContact size={40} />
                    </span>
                    <div className="">
                      <strong className="text-nowrap">{employee.name}</strong>
                      <p>{employee.mobile}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span>
                      <MdModeEdit />
                    </span>
                    <span>
                      <MdDelete />
                    </span>
                    <span>
                      <IoEye />
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading ...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeesHome;
