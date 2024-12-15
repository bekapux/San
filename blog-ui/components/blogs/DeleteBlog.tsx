"use client";
import { deleteBlog } from "@/actions/authActions";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

function DeleteBlog({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit() {
    const response = await deleteBlog(id);
    if (!response) {
      return;
    }
    setIsModalOpen(false);
    window.location.reload();
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(!isModalOpen)}>Delete</button>
      {/* Modify Modal */}
      {isModalOpen && (
        <div className="w-full h-full bg-black/50 absolute left-0 flex justify-center text-center">
          <div className="relative border bg-white w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[40%] h-[40%]">
            <div
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="absolute top-2 right-0 text-2xl hover:bg-slate-200 cursor-pointer rounded-md"
            >
              <IoMdClose />
            </div>
            <div className="font-bold text-xl text-black">
              Do You Really Want To Delete This Blog?
            </div>
            <div className="">
              <button
                className="mx-auto my-9 p-3 rounded-lg bg-red-700 text-white hover:bg-red-950 border-2 border-slate-50 w-[40%]"
                onClick={handleSubmit}
              >
                Yes
              </button>
              <button
                className="mx-auto my-9 p-3 rounded-lg bg-slate-300 text-black hover:bg-slate-500 border-2 border-slate-50 w-[40%]"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteBlog;
