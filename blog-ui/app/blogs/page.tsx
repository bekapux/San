import { getBlogs } from "@/actions/authActions";
import BlogList from "@/components/blogs/BlogList";
import BlogCard from "@/components/blogs/blogCard";

async function Blogs() {
  const blogList = await getBlogs(1);

  if (!blogList) {
    return (
      <main className="flex flex-1 justify-center">
        <div className="w-[1024px]">
          <div className="d-flex justify-center text-center">
            <div className="text-3xl border p-5 m-5 bg-black text-white d-flex justify-center text-center">
              Network Problem. Try Again Later
            </div>
          </div>
        </div>
      </main>
    );
  }

  return blogList.length > 0 ? (
    <BlogList initialList={blogList} />
  ) : (
    <main className="flex flex-1 justify-center">
      <div className="w-[1024px]">
        <div className="d-flex justify-center text-center">
          <div className="text-3xl border p-5 m-5 bg-black text-white d-flex justify-center text-center">
            No Blogs Found.
          </div>
        </div>
      </div>
    </main>
  );
}

export default Blogs;
