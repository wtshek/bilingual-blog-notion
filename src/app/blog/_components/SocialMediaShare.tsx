"use client";

import { cn } from "@/lib/utils";
import {
  FaLink,
  FaLinkedinIn,
  FaSquareFacebook,
  FaSquareWhatsapp,
  FaSquareXTwitter,
} from "react-icons/fa6";

const iconStyle = { fontSize: "1.2em" };

const SocialMediaShare = ({ className }: { className?: string }) => {
  const shareUrl = window.location.href;

  return (
    <div className={cn("", className)}>
      <button
        className="cursor-pointer"
        onClick={() => navigator.clipboard.writeText(shareUrl)}
      >
        <FaLink style={iconStyle} />
      </button>
      <a
        href={`https://www.linkedin.com/shareArticle?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedinIn style={iconStyle} />
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaSquareWhatsapp style={iconStyle} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaSquareFacebook style={iconStyle} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaSquareXTwitter style={iconStyle} />
      </a>
    </div>
  );
};

export default SocialMediaShare;
