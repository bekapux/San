"use client";

import { IoMdClose } from "react-icons/io";
import { useCallback, useState } from "react";
import { Register } from "@/actions/authActions";

function RegistrationModal() {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successResponse, setSuccessResponse] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleModal = useCallback(() => {
    setShowModal((value) => !value);
  }, []);

  async function handleSubmit() {
    setErrorMessage([]);
    setSuccessResponse(false);
    const response = await Register(
      email,
      username,
      firstName,
      lastName,
      password
    );

    const { success, data } = response;

    if (!success) {
      setErrorMessage((prev) => [
        ...prev,
        ...data.map((message) => message.description),
      ]);

      return;
    }

    if (success) {
      setSuccessResponse(true);
    }
  }

  return (
    <>
      <button onClick={toggleModal}>Sign Up</button>

      {showModal && (
        <div className="flex justify-center h-full bg-neutral-400">
          <div className="absolute top-[30%] sm:left-[15%] md:left-[30%] md:w-1/2 lg:w-1/4 py-2 px-4 w-full sm:rounded-lg sm:w-2/3  text-center bg-white">
            <div className="font-bold border-b-2 text-2xl pb-2 mb-3 text-black">
              Sign Up
            </div>
            <div
              onClick={(showModal) => setShowModal(!showModal)}
              className="absolute top-2 right-0 text-2xl bg-black hover:bg-slate-200 cursor-pointer rounded-md"
            >
              <IoMdClose />
            </div>
            <form className="px-2">
              <div className="flex flex-col gap-4 my-5">
                <div>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-100 w-full border py-1 ps-2 text-black"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-slate-100 w-full border py-1 ps-2 text-black"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <input
                    name="firstname"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-slate-100 w-full border py-1 ps-2 text-black"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <div>
                    <input
                      name="lastname"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-slate-100 w-full border py-1 ps-2 text-black"
                      placeholder="Last Name"
                    />
                  </div>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-100 w-full border py-1 ps-2 text-black"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-slate-100 w-full border py-1 ps-2 text-black"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>
              {errorMessage.length > 0 && (
                <div className="flex justify-center mb-2">
                  <div className="flex flex-col text-start">
                    {errorMessage.map((message, index) => (
                      <div key={index} className="text-red-700">
                        • {message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {successResponse && (
                <div className="flex justify-center mb-2">
                  <div className="flex flex-col text-start">
                    <div className="text-green-700">
                      • Registration Was Successful! Please Close This Window
                      And Sign In!
                    </div>
                  </div>
                </div>
              )}
              <div
                onClick={handleSubmit}
                className="bg-black text-white border rounded-3xl py-2 px-14 cursor-pointer"
              >
                SIGN UP
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default RegistrationModal;
