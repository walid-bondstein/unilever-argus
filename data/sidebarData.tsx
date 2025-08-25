import { LayoutDashboard, Shield, Users, Video } from "lucide-react";

const SidebarData = [
    {
        id: 0,
        name: "Dashboard",
        hasSubmenu: false,
        expanded: false,
        icon: <LayoutDashboard className="h-5 w-5" />,
        route: "/dashboard",
        open: false,
        for: null,// null means for all roles
        subItemList: [
            { id: 1, open: false, for: null, name: "Dashboard", route: "/dashboard" },
        ],
    },
    {
        id: 1,
        name: "Cameras",
        hasSubmenu: false,
        expanded: false,
        icon: <Video className="h-5 w-5" />,
        route: "/cameras",
        open: false,
        for: null,// null means for all roles
        subItemList: [

        ],
    },
    {
        id: 2,
        name: "Users",
        hasSubmenu: false,
        expanded: false,
        icon: <Users className="h-5 w-5" />,
        route: "/users",
        open: false,
        for: null,// null means for all roles
        subItemList: [

        ],
    },
    {
        id: 3,
        name: "Roles",
        hasSubmenu: false,
        expanded: false,
        icon: <Shield className="h-5 w-5" />,
        route: "/roles",
        open: false,
        for: null,// null means for all roles
        subItemList: [

        ],
    },

];


export default SidebarData;
