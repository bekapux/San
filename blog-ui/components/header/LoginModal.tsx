"use client";
import { useState, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { SignIn } from "@/actions/authActions";

function LoginModal() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleModal = useCallback(() => {
    setShowModal((value) => !value);
  }, []);

  async function handleSubmit() {
    const response = await SignIn(email, password);

    if (!response) {
      return;
    }

    window.location.reload();
  }

  return (
    <>
      <button onClick={toggleModal}>Sign In</button>
      {showModal && (
        <div className="flex justify-center h-full bg-neutral-400">
          <div className="absolute top-[30%] sm:left-[15%] md:left-[30%] md:w-1/2 lg:w-1/4 py-2 px-4 w-full sm:rounded-lg sm:w-2/3  text-center bg-white">
            <div className="font-bold border-b-2 text-2xl pb-2 mb-3 text-black">
              Sign In
            </div>
            <div
              onClick={(showModal) => setShowModal(!showModal)}
              className="absolute top-2 right-0 text-2xl bg-black hover:bg-slate-200 cursor-pointer rounded-md"
            >
              <IoMdClose />
            </div>
            <form className="px-2">
              <div className="flex flex-col gap-4 my-5 text-black">
                <div>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-100 w-full border py-1 ps-2"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-100 w-full border py-1 ps-2"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div
                onClick={handleSubmit}
                className="bg-black text-white border rounded-3xl py-2 px-14 cursor-pointer"
              >
                SIGN IN
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginModal;
