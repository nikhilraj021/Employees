import React from "react";
import { RxCrossCircled } from "react-icons/rx";

const AddAndEditEmployee = ({onClickCancel}) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-orange-100 bg-opacity-50">
      <div className="bg-[#A1BE95] w-60 md:w-3/5 p-2">
        <div className="flex items-center justify-between ">
          <h1 className="font-serif text-lg">Add Employees</h1>
          <button type="button" onClick={onClickCancel}>
            <RxCrossCircled size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAndEditEmployee;
