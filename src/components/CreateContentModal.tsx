import { useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;
type ContentType = (typeof ContentType)[keyof typeof ContentType];

// controlled component. a modal will popup when user clicks on it.
export const CreateContentModal = ({
  open,
  onClose,
}: CreateContentModalProps) => {
  const modalRef = useRef<HTMLSpanElement>(null);
  useOutsideClick(modalRef, onClose);

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    const [type, setType] = useState<ContentType>(ContentType.Youtube);
  }

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
                <Input ref={titleRef} placeholder={"Link"} />
                <Input ref={linkRef} placeholder={"Title"} />
              </div>

              <div>
                <Button
                  text="Youtube"
                  variant={
                // @ts-ignore
                    type === ContentType.Youtube ? "primary" : "secondary"
                  } // ← dot, not comma
                // @ts-ignore
                  onClick={() => setType(ContentType.Youtube)}
                />
                <Button
                  text="Twitter"
                  variant={
                // @ts-ignore
                    type === ContentType.Youtube ? "primary" : "secondary"
                  } // ← dot, not comma
                // @ts-ignore
                  onClick={() => setType(ContentType.Twitter)}
                />
              </div>

              <div className="flex justify-center">
                <Button onClick={addContent} variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
