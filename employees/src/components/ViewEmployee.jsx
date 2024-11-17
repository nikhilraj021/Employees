import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const ViewEmployee = ({onClose, employee}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-orange-100 bg-opacity-50">
      <div className="bg-[#A1BE95] w-60 md:w-1/2 p-5 rounded-3xl">
        <div className="flex items-center justify-between border-b pb-2">
          <h1 className="text-xl font-serif ">Employee Details</h1>
          <span onClick={onClose} className=" cursor-pointer">
            <RxCrossCircled size={20}/>
          </span>
        </div>
        <div className="my-2 flex flex-col gap-3">
          <div className="flex gap-1">
            <strong className="text-sm lg:text-lg">Name:</strong>
            <p className="text-sm lg:text-lg">{employee.name}</p>
          </div>
          <div className="flex  gap-1">
            <strong className="text-sm lg:text-lg">Mobile:</strong>
            <p className="text-sm lg:text-lg">{employee.mobile}</p>
          </div>
          <div className="flex  gap-1">
            <strong className="text-sm lg:text-lg">Email:</strong>
            <p className="text-sm lg:text-lg">{employee.email}</p>
          </div>
          <div className="flex gap-1">
            <strong className="text-sm lg:text-lg">Address:</strong>
            <p className="text-sm lg:text-lg">{employee.address ? employee.address : "Not Specified"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
