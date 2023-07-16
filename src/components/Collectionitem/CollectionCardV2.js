import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import upvote from "../../assets/Upvote.svg";
import paste from "../../assets/paste.svg";
import pinSvg from "../../assets/pinSvg.svg";
import filledPinSvg from "../../assets/filledPinSvg.svg";
import viewsSvg from "../../assets/views.svg";
import defultCollectionImage from "../../assets/defaultCollectio.svg";
import { nameShortner } from "../../utils/utils";
import approve from "../../assets/approve.svg";
import bmSidebar from "../../assets/bmSidebar.svg";
const CollectionitemV2 = ({
  id,
  image,
  title,
  links,
  username,
  type,
  upVote,
  windowWidth,
  isOwner,
  vistiedUser,
  views,
  isSavedOptionVisible
}) => {
  const copyImageRef = useRef();
  const [copyText, setCopyText] = useState("Copy Link");
  const [display, setDisplay] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [isPinned, setIsPinned] = useState(false);
  const menuhandler = () => {
    setDisplay((prev) => !prev);
  };
  //collection Popup stuff
  const menuRef = useRef();
  const popupRef = useRef();

  // Popup menu close functiinality if users clocked outside of it
  window.addEventListener("click", (e) => {
    if (
      e.target !== popupRef.current &&
      e.target !== menuRef.current &&
      display
    ) {
      setDisplay(false);
    }
  });

  const handleCopy = (collectionId) => {
    setCopyText("Copied!");
    if (copyImageRef) {
      copyImageRef.current.src = approve;
    }

    navigator.clipboard.writeText(
      `http://linkcollect.io/${vistiedUser.username}/c/${collectionId}`
    );

    setTimeout(() => {
      copyImageRef.current.src = paste;

      setCopyText("Copy Link");
    }, 2500);
  };
  // Privacy handler
  const handlePrivacy = () => {
    setIsPublic(!isPublic);
  };
  return (
    <>
      <div
        className="relative bg-bgPrimary border  border-neutral-300 rounded-lg w-[48%] md:w-[calc(100%/2-24px)] lg:w-[calc(100%/3-24px)] xl:w-[calc(100%/4-24px)] 3xl:w-[calc(100%/5-20px)] group 
        hover:shadow-md h-[210px] transition duration-300 ease-in-out"
      >
        {isOwner && (
          <div
            className="absolute p-1 transition-all duration-500 rounded-sm opacity-0 cursor-pointer bg-black/[0.20] top-2 left-2 group-hover:opacity-100"
            onClick={() => {
              setIsPinned(!isPinned);
            }}
          >
            {isPinned ? (
              <img src={filledPinSvg} alt="pin" />
            ) : (
              <img src={pinSvg} alt="pin" />
            )}
          </div>
        )}
        <Link to={`/${username}/c/${id}`}>
          <div className="w-full h-[109px]">
            <img
              src={
                image !== "undefined" && image !== undefined
                  ? image
                  : defultCollectionImage
              }
              className="object-cover w-full h-full rounded-t-md "
              alt="collection img"
            />
          </div>
          <div className="flex items-center justify-between pt-2.5 px-1.5 ">
            <p className="text-sm font-normal text-neutral-900">
              {windowWidth > 700
                ? nameShortner(title, 20)
                : nameShortner(title, 10)}
            </p>
            <p className="text-sm font-normal text-neutral-600">
              {links} Links
            </p>
          </div>
        </Link>
        <div className="flex items-start justify-between pt-2.5 px-1.5 gap-2 flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <p className=" px-2 bg-neutral-200  text-neutral-500 border border-neutral-300  rounded-[24px] text-[10px] sm:text-xs  font-normal">
              {type ? "Public" : "Private"}
            </p>
            <p className="px-2  bg-neutral-200  text-neutral-500 border border-neutral-300  rounded-[24px] text-[10px] sm:text-xs  font-normal">
              Design
            </p>
            <p className=" px-2 bg-neutral-200  text-neutral-500 border border-neutral-300  rounded-[24px] text-[10px] sm:text-xs  font-normal">
              Product
            </p>
          </div>
          <div className="flex items-center w-full justify-between ">
            <div className="flex items-center ">
              {/* veiws */}
              <div className="flex items-center m-1">
                <img src={viewsSvg} alt="views" className="w-5 h-5 mr-1" />
                <p className="text-sm font-normal text-neutral-500 ">
                  {views ? views : 0}
                </p>
              </div>
              {/* votes */}
              <div className="flex items-center m-1">
                <img src={upvote} alt="upvote" className="w-4 h-4 mr-1" />

                <p className="text-sm font-normal text-neutral-500 ">
                  {upVote ? upVote : 0}
                </p>
              </div>
            </div>

            {/* Saved  */}
          { isSavedOptionVisible &&
            <div className="flex items-center justify-between gap-1">
              <img src={bmSidebar}  />
              <p className="text-neutral-500 text-[14px]" >save</p>
            </div>
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionitemV2;
