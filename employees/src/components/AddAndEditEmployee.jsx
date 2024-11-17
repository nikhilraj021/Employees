import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";

const AddAndEditEmployee = ({ onClickCancel, onAdd }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!name.trim()) {
      formErrors.name = "Name is required";
    }

    if (!mobile.trim()) {
      formErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile.trim())) {
      formErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      formErrors.email = "Please enter a valid email address";
    }

    if (!address.trim()) {
      formErrors.address = "Address is required";
    }

    return formErrors;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const newEmployee = {
      id: uuidv4(),
      name: name.trim(),
      mobile: mobile.trim(),
      address: address.trim(),
    };

    onAdd(newEmployee);
    setName("");
    setMobile("");
    setEmail("");
    setAddress("");
  };

  const handleCLear = () => {
    setName("");
    setMobile("");
    setEmail("");
    setAddress("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-orange-100 bg-opacity-50">
      <div className="bg-[#A1BE95] w-60 md:w-1/2 p-5 rounded-3xl">
        <div className="flex items-center justify-between ">
          <h1 className="font-serif text-lg font-bold">Add Employees</h1>
          <button
            type="button"
            onClick={onClickCancel}
            className="hover:text-white"
          >
            <RxCrossCircled size={30} />
          </button>
        </div>
        <form className="my-2 flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="name"
              className="font-semibold text-sm lg:text-lg cursor-pointer"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-transparent border p-1 px-2 rounded-lg outline-none placeholder:text-gray-800 text-sm lg:text-lg"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="mobile"
              className="font-semibold text-sm lg:text-lg cursor-pointer"
            >
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              className="bg-transparent border p-1 px-2 rounded-lg outline-none placeholder:text-gray-800 text-sm lg:text-lg"
              placeholder="Enter Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="font-semibold text-sm lg:text-lg cursor-pointer"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-transparent border p-1 px-2 rounded-lg outline-none placeholder:text-gray-800 text-sm lg:text-lg"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="address"
              className="font-semibold text-sm lg:text-lg cursor-pointer"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              className="bg-transparent border p-1 px-2 rounded-lg outline-none placeholder:text-gray-800 text-sm lg:text-lg"
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="flex gap-3 justify-center">
            <button
              type="submit"
              className="bg-[#F98866] text-white font-bold rounded-lg py-1 w-20 "
              onClick={handleAdd}
            >
              Add
            </button>
            <button
              type="button"
              className="bg-gray-300 font-bold rounded-lg py-1 w-20 "
              onClick={handleCLear}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAndEditEmployee;
