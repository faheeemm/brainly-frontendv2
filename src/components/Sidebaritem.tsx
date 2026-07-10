import type { ReactElement } from "react";

interface SibeBarItems {
  icon: ReactElement;
  text: string;
  onClick: () => void;
}

export const Sidebaritem = ({ icon, text, onClick }: SibeBarItems) => {
  return (
    <div className="flex items-center text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-60 pl-4 transition-all duration-150" onClick={onClick}>
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
};
