import { DefaultSession } from "next-auth";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { LogOutIcon } from "lucide-react";

export const UserCard = ({ user }: { user: DefaultSession["user"] }) => {
  useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="card">
      <div className="card-body flex">
        <div className="relative inline-block text-left">
          <button
            type="button"
            onClick={handleButtonClick}
            className="inline-flex justify-center items-center w-full rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
          >
            <Image
              src={user?.image as string}
              alt={"img"}
              width={40}
              height={40}
              className="rounded-full"
            />
          </button>

          {isMenuOpen && (
            <div
              ref={menuRef}
              className="text-center justify-center absolute mt-2 w-40 rounded-md shadow-lg pt-3 bg-white ring-1 ring-black ring-opacity-25 z-10"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="font-semibold text-center p-2 pb-1">
                {user?.name}
              </div>
              <div className="py-2 px-3 flex items-center" role="none">
                <button
                  onClick={() => signOut()}
                  className="flex rounded-md w-full font-medium text-left px-4 py-2 text-md text-gray-700 hover:bg-gray-300 hover:text-gray-900 border"
                  role="menuitem"
                >
                  Sign-out
                  <LogOutIcon className="ml-2 p-0.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
