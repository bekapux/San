import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  shortDescription: string;
  email: string;
}

function BlogCard({ title, email, shortDescription }: BlogCardProps) {
  return (
    <div className="border border-black shadow-2xl p-2 w-full lg:w-[1024px] flex flex-col text-center md:flex-row md:text-start gap-7 my-6">
      <div className="flex md:flex-col justify-center md:max-w-[170px]">
        <Image
          src={
            "https://fastly.picsum.photos/id/551/500/300.jpg?hmac=qjb_xOkmup1yga7l_VRB_11wVK6NttYdJpRx9lLMVrs"
          }
          alt="Dog"
          width={300}
          height={400}
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <div>
          <div className="font-bold text-2xl">{title}</div>
          <div className="text-neutral-500">
            By {email} | 7 december 2024 | Blog
          </div>
        </div>
        <div className="text-neutral-500">{shortDescription}</div>
        <div>
          <button className="bg-black text-white py-1 px-3 rounded-sm hover:text-neutral-500">
            <Link href={`/blogs/id`}>Continue Reading</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
