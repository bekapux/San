"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postBlog } from "@/actions/authActions";

function CreateBlog() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await postBlog(title, shortDescription, fullDescription);

    if (response === 401) {
      setError(
        `${response} error: You Are Unauthorized To Create A Blog! Please Sign In/Up!`
      );
      return;
    }

    // if (!response?.ok) {
    //   setError("There Was A Network Error! Please Try Again Later!");
    //   return;
    // }

    router.push(`/blogs`);
  }

  return (
    <main className="flex flex-1 justify-center">
      <div className="w-[1024px] flex flex-col gap-8 text-center mt-4">
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="flex flex-col text-lg font-medium text-gray-700">
            Short Description:
            <textarea
              className="p-2 w-full rounded-lg min-h-[150px] border-2 border-black resize-none"
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            ></textarea>
          </label>
          <label className="flex flex-col text-lg font-medium text-gray-700">
            Full Description:
            <textarea
              className="p-2 w-full rounded-lg min-h-[300px] border-2 border-black resize-none"
              required
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
            ></textarea>
          </label>
          {error && <div className="bg-red-700 text-white">{error}</div>}
          <button
            className="mx-auto my-9 p-3 rounded-lg bg-black text-white hover:bg-zinc-600 border-2 border-slate-50 w-[40%]"
            type="submit"
          >
            CREATE
          </button>
        </form>
      </div>
    </main>
  );
}

export default CreateBlog;
