"use client";
import Cookies from "js-cookie";
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import Link from "next/link";
import MenuItem from "./MenuItem";
import Logout from "./Logout";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";

function Sidebar() {
  // const isAuthenticated = !!Cookies.get("token");
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("token")
  );

  const toggleSidebar = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative sm:hidden">
      <button onClick={toggleSidebar} className="sm:hidden">
        <AiOutlineMenu />
      </button>
      {isOpen && (
        <div className="sm:hidden absolute right-0 top-12 rounded-xl shadow-md w-[30vh] bg-white">
          <div className="flex flex-col gap-1 cursor-pointer">
            {/* Login */}

            {!isAuthenticated ? (
              <>
                <MenuItem>
                  <LoginModal />
                </MenuItem>
                <MenuItem>
                  <RegistrationModal />
                </MenuItem>{" "}
              </>
            ) : (
              <>
                <MenuItem>
                  <div>
                    <Link href={"./createBlog"}>Create A Blog</Link>
                  </div>
                </MenuItem>
                <MenuItem>
                  <Logout />
                </MenuItem>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
