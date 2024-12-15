"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { AiOutlineFileAdd } from "react-icons/ai";

function Logout({ firstname = undefined }) {
  function handleLogout() {
    Cookies.remove("token");
    Cookies.remove("email");
    Cookies.remove("firstname");
    Cookies.remove("lastname");

    window.location.reload();

    return;
  }

  return (
    <>
      {firstname && (
        <>
          <div>Hello {firstname}</div>
          <div className="flex flex-col justify-center text-xl">
            <Link href={"./createBlog"}>
              {" "}
              <AiOutlineFileAdd />
            </Link>
          </div>
        </>
      )}
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
}

export default Logout;
