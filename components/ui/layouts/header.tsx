"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector, type RootState } from "@/lib/store"
import { logoutUser } from "@/lib/store/slices/authSlice"
import { LogOut, Settings, User } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
// import { setTheme } from "@/lib/store/slices/appSlice"

export function Header() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const user = useAppSelector((state: RootState) => state.auth.user)

  const handleLogout = () => {
    dispatch(logoutUser())
    router.push("/")
  }

  const handelRouteChange = (route: string) => {
    router.push(route)
  }

  const handleThemeToggle = () => {
    console.log("Current theme:", theme)
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-900 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">

      </div>

      <div className="flex items-center space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="font-medium">
                  {/* {user?.name?.charAt(0).toUpperCase()} */}
                  test User
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium"> test User</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handelRouteChange('/profile')} className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
