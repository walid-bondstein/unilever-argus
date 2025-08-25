"use client"

import { Button } from "@/components/ui/button"
import SidebarData from "@/data/sidebarData"
import { useAppDispatch } from "@/lib/store"
import { AnimatePresence, motion } from "motion/react";
import { logoutByUser } from "@/lib/store/thaunks/authThunk"
import { cn } from "@/lib/utils"
import {
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useEffect, useState } from "react"
import Link from "next/link";
import { usePathname } from "next/navigation";


interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [menuItems, setMenuItems] = useState(SidebarData);
  const [highlightPath, setHighLightPath] = useState("");
  const [currentPathaname, setCurrentPathname] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleItemClicked = (item: any, isSubMenu = false) => {
    if (!isSubMenu && item.hasSubmenu) {
      setMenuItems((prev) => {
        return prev.map((curr) => ({
          ...curr,
          expanded: curr.id == item.id ? !curr.expanded : false,
        }));
      });
      setHighLightPath(item.route);
    } else {

    }
  };

  const submenuContainer = {
    hidden: {
      opacity: 0,
      y: -60,
      transition: {
        staggerChildren: 0,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  const submenuItem = {
    hidden: { x: -10, opacity: 0, y: -20 },
    show: { x: 0, opacity: 1, y: 0 },
  };

  useEffect(() => {
    setHighLightPath(pathname);
    setCurrentPathname(pathname);
    setMenuItems((prev) => {
      return prev.map((curr) => ({
        ...curr,
        expanded: pathname.includes(curr.route) ? true : false,
      }));
    });
  }, [pathname]);
  return (
    <div
      className={cn(
        "max-h-screen flex flex-col border-r bg-white dark:bg-gray-900 glass-bg transition-all duration-300 shadow-lg",
        collapsed ? "w-16" : "w-80",
      )}
    >
      <div className="flex flex-col h-full flex-grow">
        <div className="flex items-center justify-between h-16 p-4 dark:border-gray-700">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold">
                Unilever
              </h2>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={onToggle} className="text-gray-500">
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>
        <div className="overflow-y-auto flex-grow p-4 justify-between space-y-4 flex flex-col">

          {/* THE MAIN URL TABS */}
          <div id="sidebar" className="max-h-full flex-grow overflow-y-auto">
            {menuItems.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClicked(item)}
                  // onMouseOver={(e) => handleMouseOver(e, item)}
                  // onMouseLeave={handleMouseLeave}
                  className="cursor-pointer mb-2"
                >
                  <div
                    className={`w-full relative group ${highlightPath.includes(item.route)
                      ? "bg-primary font-bold shadow-sm rounded-l-full"
                      : "text-gray-800 hover:text-black hover:border-primary hover:rounded-l-full"
                      } ${collapsed ? "justify-center" : "pl-6 justify-start"} py-1 text-left border border-transparent rounded-l-full flex items-center gap-2`}
                  >
                    {!collapsed ? (
                      <>
                        {item?.hasSubmenu ? (
                          <>
                            <div className="relative group">{item.icon}</div>
                            <span>{item.name}</span>
                          </>
                        ) : (
                          <>
                            <div className="relative group">{item.icon}</div>
                            <Link className="w-full" href={item?.route}>
                              {item.name}
                            </Link>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="relative group">{item.icon}</div>
                    )}
                  </div>
                  {!collapsed && (
                    <AnimatePresence>
                      {item.hasSubmenu && item.expanded && (
                        <motion.div
                          initial="hidden"
                          animate="show"
                          variants={submenuContainer}
                          className="flex flex-col items-start ml-12 mt-2 gap-1 animate-in overflow-hidden"
                        >
                          {item?.subItemList?.map((subItem) => {
                            return (
                              <motion.div
                                key={subItem.id}
                                variants={submenuItem}
                                className={`${currentPathaname == subItem.route
                                  ? "text-primary font-bold"
                                  : "text-gray-600 font-normal hover:text-gray-800"
                                  }`}
                                onClick={() => handleItemClicked(subItem, true)}
                              >
                                <Link
                                  href={subItem?.route}
                                // onClick={() =>
                                //    setIsHovered({
                                //      state: false,
                                //      position: { top: 0, left: 0 },
                                //      name: "",
                                //    })
                                // }
                                >
                                  • {subItem.name}
                                </Link>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </div>

          <Button className="w-full" variant="outline" size="sm" onClick={async () => await dispatch(logoutByUser()).unwrap()}>
            {collapsed ? <LogOut className="h-4 w-4" /> : "Logout"}
          </Button>
        </div>
      </div>

    </div>
  )
}
