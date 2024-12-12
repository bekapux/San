import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="h-full flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="border shadow-lg text-3xl">
            <div className="bg-black text-white px-20 py-3 cursor-pointer hover:bg-slate-600">
              <Link href="/createBlog">
                <div>Create A Blog</div>
                <div className="text-xl italic">
                  Share your thoughts with the world
                </div>
              </Link>
            </div>
            <div className="bg-white text-black px-20 py-3 cursor-pointer hover:bg-slate-600">
              <Link href="/blogs">
                <div>See The List Of Blogs</div>
                <div className="text-xl italic">
                  Explore inspiring stories and ideas
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
