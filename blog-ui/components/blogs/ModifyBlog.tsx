"use client";

import { useState } from "react";
import { modifyBlog } from "@/actions/authActions";
import { IoMdClose } from "react-icons/io";
import Router from "next/navigation";

interface ModifyBlogProps {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
}

function ModifyBlog({
  id,
  title,
  shortDescription,
  fullDescription,
}: ModifyBlogProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleBlog, setTitleBlog] = useState(title);
  const [shortDescriptionBlog, setShortDescriptionBlog] =
    useState(shortDescription);
  const [fullDescriptionBlog, setFullDescriptionBlog] =
    useState(fullDescription);

  async function handleSubmit() {
    const response = await modifyBlog(
      id,
      titleBlog,
      shortDescriptionBlog,
      fullDescriptionBlog
    );

    if (!response) {
      return;
    }
    setIsModalOpen(false);
    window.location.reload();
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(!isModalOpen)}>Modify</button>
      {/* Modify Modal */}
      {isModalOpen && (
        <div className="w-full h-full bg-black/50 absolute left-0 flex justify-center text-center">
          <div className="relative border bg-white w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[40%]">
            <div
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="absolute top-2 right-0 text-2xl hover:bg-slate-200 cursor-pointer rounded-md"
            >
              <IoMdClose />
            </div>
            <div className="font-bold text-xl text-black">Modify Blog</div>
            <form
              className="mx-auto my-8 w-[90%] md:w-[70%] flex flex-col gap-4 p-4"
              onSubmit={handleSubmit}
            >
              <label className="flex flex-col text-lg font-medium text-gray-700">
                Title:
                <input
                  className="p-2 w-full rounded-lg border-2 border-black"
                  type="text"
                  required
                  value={titleBlog}
                  onChange={(e) => setTitleBlog(e.target.value)}
                />
              </label>
              <label className="flex flex-col text-lg font-medium text-gray-700">
                Short Description:
                <textarea
                  className="p-2 w-full rounded-lg min-h-[150px] border-2 border-black resize-none"
                  required
                  value={shortDescriptionBlog}
                  onChange={(e) => setShortDescriptionBlog(e.target.value)}
                ></textarea>
              </label>
              <label className="flex flex-col text-lg font-medium text-gray-700">
                Full Description:
                <textarea
                  className="p-2 w-full rounded-lg min-h-[300px] border-2 border-black resize-none"
                  required
                  value={fullDescriptionBlog}
                  onChange={(e) => setFullDescriptionBlog(e.target.value)}
                ></textarea>
              </label>

              <button
                className="mx-auto my-9 p-3 rounded-lg bg-black text-white hover:bg-zinc-600 border-2 border-slate-50 w-[40%]"
                type="submit"
              >
                Modify
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModifyBlog;
