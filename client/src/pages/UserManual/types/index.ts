

export interface Tab {
  value: string;
  label: string;

}

export interface UserManualProps {
  search: string;
  setSearch: (search: string) => void;
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}