import { NavLink as RouterNavLink, useLocation, useNavigate } from "react-router-dom";
import { useFinance } from "@/context/FinanceContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Moon, Sun, Shield, Eye, UserCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Role } from "@/data/mockData";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Transactions", url: "/transactions", icon: ArrowLeftRight },
  { title: "Insights", url: "/insights", icon: Lightbulb },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole, isDark, toggleDark, profile } = useFinance();

  const initials = profile.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <button onClick={() => navigate("/profile")} className="p-4 flex items-center gap-2.5 hover:bg-muted/50 transition-colors rounded-lg mx-1 mt-1 text-left">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={profile.photo} alt={profile.name} />
          <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        {!collapsed && <span className="text-lg font-bold tracking-tight truncate">{profile.name}</span>}
      </button>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <RouterNavLink
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                          isActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!collapsed && <span className="text-sm">{item.title}</span>}
                      </RouterNavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 space-y-2">
        {!collapsed && (
          <RouterNavLink to="/profile" className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/50 transition-colors mb-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profile.photo} alt={profile.name} />
              <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                {profile.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{profile.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{profile.email}</p>
            </div>
          </RouterNavLink>
        )}

        {!collapsed && (
          <>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-1">Role</label>
              <Select value={role} onValueChange={v => setRole(v as Role)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <span className="flex items-center gap-1.5"><Shield className="h-3 w-3" /> Admin</span>
                  </SelectItem>
                  <SelectItem value="viewer">
                    <span className="flex items-center gap-1.5"><Eye className="h-3 w-3" /> Viewer</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <button
          onClick={toggleDark}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors w-full text-muted-foreground hover:text-foreground"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {!collapsed && <span className="text-xs">{isDark ? "Light Mode" : "Dark Mode"}</span>}
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
