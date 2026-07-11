export interface NavLink {
  href: string;
  label: string;
}

export type NavMenuType = 'stack' | 'grid' | 'columns';

export interface NavDropdownItem {
  label: string;
  menu: NavMenuType;
  children: NavLink[] | NavLink[][];
}

export interface NavSimpleItem {
  href: string;
  label: string;
}

export type NavItem = NavSimpleItem | NavDropdownItem;

export function isNavDropdown(item: NavItem): item is NavDropdownItem {
  return 'children' in item;
}
