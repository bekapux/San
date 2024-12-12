import Link from "next/link";
import LoginModal from "./LoginModal";
import RegistrationModal from "./RegistrationModal";
import Sidebar from "./Sidebar";
import Logout from "./Logout";
import { cookies } from "next/headers";

function Header() {
  const cookieStore = cookies();
  const isAuthenticated = !!cookieStore.get("token")?.value;
  let firstname;

  if (isAuthenticated) {
    firstname = cookieStore.get("firstname")?.value;
  }

  return (
    <header className="bg-black text-white py-4 flex justify-center">
      <div className="w-[1000px] flex justify-between mx-4">
        <div className="font-bold text-nowrap">
          <Link href="./">Beka&apos;s Blog</Link>
        </div>

        <div className="hidden sm:flex gap-3">
          {isAuthenticated ? (
            <>
              <Logout firstname={firstname} />
            </>
          ) : (
            <>
              <LoginModal />
              <RegistrationModal />
            </>
          )}
        </div>

        <Sidebar />
      </div>
    </header>
  );
}

export default Header;
