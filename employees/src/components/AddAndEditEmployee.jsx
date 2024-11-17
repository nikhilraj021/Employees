import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";

const AddAndEditEmployee = ({
  onClickCancel,
  onAdd,
  editingEmployee,
  onUpdate,
}) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name || "");
      setMobile(editingEmployee.mobile || "");
      setEmail(editingEmployee.email || "");
      setAddress(editingEmployee.address || "");
    } else {
      setName("");
      setMobile("");
      setEmail("");
      setAddress("");
    }
  }, [editingEmployee]);

  const validateForm = () => {
    let formErrors = {};

    if (!name || !name.trim()) {
      formErrors.name = "Name is required";
    }

    if (!mobile || !mobile.trim()) {
      formErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile.trim())) {
      formErrors.mobile = "Mobile number must be 10 digits";
    }

    if (!email || !email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      formErrors.email = "Please enter a valid email address";
    }

    if (!address || !address.trim()) {
      formErrors.address = "Address is required";
    }

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (editingEmployee) {
      const updatedEmployee = {
        ...editingEmployee,
        name: name ? name.trim() : "",
        mobile: mobile ? mobile.trim() : "",
        email: email ? email.trim() : "",
        address: address ? address.trim() : "",
      };
      onUpdate(updatedEmployee);
    } else {
      const newEmployee = {
        id: uuidv4(),
        name: name ? name.trim() : "",
        mobile: mobile ? mobile.trim() : "",
        email: email ? email.trim() : "",
        address: address ? address.trim() : "",
      };
      onAdd(newEmployee);
    }

    setName("");
    setMobile("");
    setEmail("");
    setAddress("");
  };

  const handleClear = () => {
    setName("");
    setMobile("");
    setEmail("");
    setAddress("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-orange-100 bg-opacity-50">
      <div className="bg-[#A1BE95] w-60 md:w-1/2 p-5 rounded-3xl">
        <div className="flex items-center justify-between border-b pb-2">
          <h1 className="font-serif text-lg font-bold">
            {editingEmployee ? "Edit Employee" : "Add Employee"}
          </h1>
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
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="mobile"
              className="font-semibold text-sm lg:text-lg cursor-pointer"
            >
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              className="bg-transparent border p-1 px-2 rounded-lg outline-none placeholder:text-gray-800 text-sm lg:text-lg"
              placeholder="Enter Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm">{errors.mobile}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="font-semibold text-sm lg:text-lg cursor-pointer"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-transparent border p-1 px-2 rounded-lg outline-none placeholder:text-gray-800 text-sm lg:text-lg"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="address"
              className="font-semibold text-sm lg:text-lg cursor-pointer"
            >
              Address
            </label>
            <textarea
              id="address"
              className="bg-transparent border p-1 px-2 rounded-lg outline-none placeholder:text-gray-800 text-sm lg:text-lg"
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-300 p-1 px-2 rounded-lg hover:bg-gray-400 text-sm lg:text-lg"
            >
              Clear
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#F98866] p-1 px-2 rounded-lg text-white hover:bg-orange-400 text-sm lg:text-lg"
            >
              {editingEmployee ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAndEditEmployee;
