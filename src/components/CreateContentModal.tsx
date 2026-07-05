import { useRef } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

// controlled component. a modal will popup when user clicks on it.
export const CreateContentModal = ({ open, onClose }: CreateContentModalProps) => {

  const modalRef = useRef<HTMLSpanElement>(null);

  useOutsideClick(modalRef, onClose);
  
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-60 flex justify-center">
          <div className="flex flex-col justify-center">
            <span ref={modalRef} className="bg-white opacity-100 p-4 rounded">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>

              <div>
                <Input placeholder={"Title"} />
                <Input placeholder={"Link"} />
              </div>

              <div className="flex justify-center">
                <Button variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};


