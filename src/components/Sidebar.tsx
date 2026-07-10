import { BrainIcon } from "../icons/BrainIcon";
import { GridIcon } from "../icons/GridIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Button } from "./Button";
import type { ContentType } from "./CreateContentModal";
import { Sidebaritem } from "./Sidebaritem";

interface SidebarProps {
  onSelectType: (type: ContentType | null) => void;
}

export const Sidebar = ({ onSelectType }: SidebarProps) => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin"
  }
  
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 flex flex-col">
      
      <div className="flex text-2xl pt-8 items-center mb-8">
        <div className="pr-2">
          <BrainIcon />
        </div>
        Brainly
      </div>
      
      <div className="flex-1">
        <Sidebaritem
          icon={<GridIcon />}
          text="All"
          onClick={() => onSelectType(null)}
        />
        <Sidebaritem
          icon={<TwitterIcon />}
          text="Twitter"
          onClick={() => onSelectType("twitter")}
        />
        <Sidebaritem
          icon={<YoutubeIcon />}
          text="Youtube"
          onClick={() => onSelectType("youtube")}
        />
      </div>
      
      <div className="mt-auto pb-6 pt-5 pl-4">
        <Button variant={"danger"} text="Logout" onClick={handleLogout}/>
      </div>
      
    </div>
  );
};
