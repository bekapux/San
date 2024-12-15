"use client";
import { useEffect, useState } from "react";
import { getBlogs } from "@/actions/authActions";
import BlogCard from "./blogCard";
import LoadingSpinner from "../LoadingSpinner";
import { useInView } from "react-intersection-observer";

function BlogList({ initialList }) {
  const [blogs, setBlogs] = useState(initialList);
  const [pageToFetch, setPageToFetch] = useState(2);
  const { ref, inView } = useInView();
  const [allBlogsFetched, setAllBlogsFetched] = useState(false);

  async function loadMoreBlogs() {
    if (!allBlogsFetched) {
      const moreBlogs = await getBlogs(pageToFetch);

      if (moreBlogs.length > 0) {
        setBlogs((blogs) => [...blogs, ...moreBlogs]);
        setPageToFetch((pages) => pages + 1);
      } else if (moreBlogs.length === 0) {
        setAllBlogsFetched(true);
      }
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreBlogs();
    }
  }, [inView]);

  return (
    <main className="flex flex-1 justify-center">
      <div className="flex flex-col gap-6 pt-4">
        {blogs.map(
          (
            blog: {
              title: string;
              shortDescription: string;
              fullDescription: string;
              email: string;
            },
            index: number
          ) => {
            return (
              <BlogCard
                key={index}
                id={blog.id}
                title={blog.title}
                email={blog.email}
                shortDescription={blog.shortDescription}
              />
            );
          }
        )}
        {!allBlogsFetched && (
          <div className="flex justify-center">
            {" "}
            <div ref={ref}>
              <LoadingSpinner />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default BlogList;
