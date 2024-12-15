import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { getBlogsById } from "@/actions/authActions";
import ModifyBlog from "@/components/blogs/ModifyBlog";
import DeleteBlog from "@/components/blogs/DeleteBlog";

interface BlogPageProps {
  params: {
    id: string;
  };
}

async function BlogPage({ params }: BlogPageProps) {
  const { id } = params;

  const blog = await getBlogsById(id);

  return blog ? (
    <main className="flex flex-1 justify-center relative">
      <div className="text-xl">
        <Link href="/blogs">
          <IoArrowBack />
        </Link>
      </div>

      <div className="w-[1024px] flex flex-col gap-8 text-center mt-4">
        <div className="text-4xl font-bold border-b-2 pb-4">{blog.title}</div>
        <div className="flex justify-center">
          <Image
            src={
              "https://fastly.picsum.photos/id/551/500/300.jpg?hmac=qjb_xOkmup1yga7l_VRB_11wVK6NttYdJpRx9lLMVrs"
            }
            alt="Dog"
            width={300}
            height={400}
          />
        </div>
        <div className="text-center px-8 xl:px-0">{blog.fullDescription}</div>
      </div>
      <div className="flex flex-col text-red-700">
        <ModifyBlog
          id={blog.id}
          title={blog.title}
          shortDescription={blog.shortDescription}
          fullDescription={blog.fullDescription}
        />
        <DeleteBlog id={blog.id} />
      </div>
    </main>
  ) : (
    <main className="flex flex-1 justify-center">
      <div className="w-[1024px]">
        <div className="d-flex justify-center text-center">
          <div className="text-3xl border p-5 m-5 bg-slate-300 text-black d-flex justify-center text-center">
            No Blog Found!{" "}
            <Link className="font-semibold text-blue-700" href={"/blogs"}>
              Go Back To The List Of Blogs
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BlogPage;
