interface SidebarItem {
  href: string;
  icon: JSX.Element;
  text: string;
  isActive?: boolean;
}

export type { SidebarItem }