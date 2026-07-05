import { useEffect, useRef } from "react";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

declare global {
  interface Window {
    twttr?: any;
  }
}

const getYouTubeEmbedUrl = (link: string) => {
  const url = new URL(link);
  const videoId = url.searchParams.get("v");
  return `https://www.youtube.com/embed/${videoId}`;
};

export const Card = ({ title, link, type }: CardProps) => {
  const tweetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type !== "twitter") return;

    const loadWidget = () => {
      if (window.twttr?.widgets && tweetRef.current) {
        window.twttr.widgets.load(tweetRef.current);
      }
    };

    if (window.twttr?.widgets) {
      loadWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.x.com/widgets.js";
      script.async = true;
      script.onload = loadWidget;
      document.body.appendChild(script);
    }
  }, [type, link]);

  return (
    <div>
      <div className="p-4 bg-white rounded-md border-r-gray-200 max-w-72 border min-h-48 min-w-72">
        <div className="flex justify-between">
          <div className="flex items-center text-md">
            <div className="pr-2 text-gray-500">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank">
                <ShareIcon />
              </a>
            </div>
            <div className="text-gray-500">
              <ShareIcon />
            </div>
          </div>
        </div>
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={getYouTubeEmbedUrl(link)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <div ref={tweetRef}>
              <blockquote className="twitter-tweet">
                <a href={link}></a>
              </blockquote>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};