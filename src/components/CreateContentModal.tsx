import { useRef, useState } from "react";
import axios from "axios";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import { useContent } from "../hooks/useContent";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;
export type ContentType = (typeof ContentType)[keyof typeof ContentType];

// controlled component. a modal will popup when user clicks on it.
export const CreateContentModal = ({ open, onClose }: CreateContentModalProps) => {
  const modalRef = useRef<HTMLSpanElement>(null);
  useOutsideClick(modalRef, onClose);
  
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  const { refresh, contents, setContents } = useContent()
  
  function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    const newItem = {
      _id: Date.now.toString(),
      title: title || "",
      link: link || "",
      type
    }
    
    setContents([...contents, newItem])
    onClose();
    
    axios.post(`${BACKEND_URL}/api/v1/content`, {
      link,
      title,
      type
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
    }).then(() => {
      onClose();
      refresh()
    });
  }

  return (
    <div>
      <div
        inert={!open ? true : undefined}
        className={`w-screen h-screen bg-black/60 fixed top-0 left-0 flex items-center justify-center z-50
                  transition-opacity duration-300 ease-out
                  ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex flex-col justify-center">
          <span ref={modalRef} className="bg-white opacity-100 p-4 rounded">
            <div className="flex justify-end">
              <div onClick={onClose} className="cursor-pointer">
                <CrossIcon />
              </div>
            </div>

            <div>
              <Input ref={titleRef} placeholder={"Title"} />
              <Input ref={linkRef} placeholder={"Link"} />
            </div>

            <h1 className="text-gray-500 text-sm mt-2">Type</h1>
            <div className="flex gap-2 justify-center my-4">
              <Button
                text="Youtube"
                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Youtube)}
              />
              <Button
                text="Twitter"
                variant={type === ContentType.Twitter ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Twitter)}
              />
            </div>

            <div className="flex justify-center mt-2">
              <Button onClick={addContent} variant="primary" text="Submit" />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};
