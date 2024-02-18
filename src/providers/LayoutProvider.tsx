"use client";
import { UserButton } from "@clerk/nextjs";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setRequestMeta } from "next/dist/server/request-meta";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const menusForAdmin = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Events",
      path: "/admin/events",
    },
    {
      title: "Bookings",
      path: "/admin/bookings",
    },
    {
      title: "Users",
      path: "/admin/users",
    },
    {
      title: "Reports",
      path: "/admin/reports",
    },
  ];
  const menusForUser = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Bookings",
      path: "/bookings",
    },
  ];

  const pathname = usePathname();
  const router = useRouter();
  const [menuToShow, setMenuToShow] = React.useState<
    { title: string; path: string }[]
  >([]);
  const isPrivateRoute = !["/sign-in", "/sign-up"].includes(pathname);

  const getUserData = async () => {
    try {
      const response = await axios.get("/api/current-user");
      if (response.data.user.isAdmin) {
        setMenuToShow(menusForAdmin);
      } else {
        setMenuToShow(menusForUser);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isPrivateRoute) {
      getUserData();
    }
  }, []);

  return (
    <div className="bg-gray-200 px-5 lg:px-20">
      {isPrivateRoute && (
        <div className="bg-white flex justify-between items-center shadow px-3 py-5">
          <h1
            className="font-semibold text-2xl cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            KAI EVENTS
          </h1>

          <div className="flex gap-5">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="flat" size="sm" color="primary">
                  Profile
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {menuToShow.map((menu) => (
                  <DropdownItem
                    key={menu.title}
                    onClick={() => router.push(menu.path)}
                  >
                    {menu.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      )}
      <div className="py-3">{children}</div>
    </div>
  );
}
export default LayoutProvider;
