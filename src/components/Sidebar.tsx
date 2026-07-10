import { BrainIcon } from "../icons/BrainIcon";
import { GridIcon } from "../icons/GridIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import type { ContentType } from "./CreateContentModal";
import { Sidebaritem } from "./Sidebaritem";

interface SidebarProps {
  onSelectType: (type: ContentType | null) => void;
}

export const Sidebar = ({ onSelectType }: SidebarProps) => {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
      <div className="flex text-2xl pt-8 items-center">
        <div className="pr-2">
          <BrainIcon />
        </div>
        Brainly
      </div>
      <div className="pt-8 pl-4">
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
    </div>
  );
};
