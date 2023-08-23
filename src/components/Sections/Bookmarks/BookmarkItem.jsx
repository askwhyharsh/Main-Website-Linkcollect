// Package Imports
import React, { useRef, useState, useEffect, useMemo } from "react";
// Assets Imports
import copyIcon from "../../../assets/copyIcon.svg";
import menuIcon from "../../../assets/3dot.svg";
import redirectIcon from "../../../assets/redirectIcon.svg";
import approveIcon from "../../../assets/approve.svg";
import bookmarkDefalutIcon from "../../../assets/bookmarkDefault.svg";
import pinIcon from "../../../assets/bookmarkPin.svg"

// Utils Imports
import { nameShortner, getOrigin, fromNow } from "../../../utils/utils";

// Components
import EcBookamrkModal from "./ECBookmarkModal";
import { MenuItem } from "../../Common/ActiondropDown";

const BookmarkItem = ({
  id,
  name,
  url,
  favicon,
  windowWidth,
  updatedAt,
  isOwner,
  clickedId,
  setClickedId,
  isSelected,
  isPinned,
  isStillOneBookmarkSelected,
  onSelectedBookmark,
  onUnSelectBookamrk,
  collectionId,
  movebokmark,
  deleteBookmark,
  toggleBookmarkPin,
}) => {
  // to see if checked or not
  const [checked, setChecked] = useState(false);
  const [openEditBookmarkModal, setOpenEditBookmarkModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    if (isSelected) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [isSelected])


  const copyRef = useRef();

  const bookmarkEditModalHandler = () => {
    setOpenEditBookmarkModal(prev => !prev);
  }

  const onCopy = () => {
    console.log(copyRef);
    if (copyRef) copyRef.current.src = approveIcon;
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      copyRef.current.src = copyIcon;
    }, 1500);
  };

  const onActionClickeHandler = (type) => {
    switch (type) {
      case "EDIT":
        bookmarkEditModalHandler();
        setClickedId(null);
        return;
      case "MOVE":
        // moveBookmark(id)
        setClickedId(null);
        return;
      case "PIN":
        setClickedId(null);
        toggleBookmarkPin(id);
        return;
    }
  }


  // Popup Action menu
  const popupActionMenu = useMemo(() => {
    return [
      {
        name: "Edit",
        onClick: onActionClickeHandler,
        type: "EDIT"
      },
      {
        name: !isPinned ? "Pin" : "Unpin",
        onClick: onActionClickeHandler,
        type: "PIN",
      },
      // Move Menu will be here
      
      {
        name: "Delete",
        onClick: onActionClickeHandler,
        type: "DELETE"
      }
    ]
  }, [isPinned])


  return (
    <>
      <EcBookamrkModal isOpen={openEditBookmarkModal} onClose={bookmarkEditModalHandler} isEditing={true} collectionID={collectionId} originalData={{
        title: name,
        link: url
      }} bookmarkID={id}
      />

      <div className={`cursor-pointer relative flex items-center justify-between w-full h-[60px] rounded-xl ${checked ? "bg-neutral-300" : "bg-neutral-100"} border border-neutral-200  duration-200 transition-all group`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} >
        {/* Note this below input is to be shown to owner only after  implementing state mangement resolve it */}
          {/* {isOwner && <input
            type="checkbox"
            className={` cursor-pointer custom-checkbox rounded-md ${isStillOneBookmarkSelected
                ? "ml-2"
                : "opacity-0 group-hover:opacity-100 absolute top-0 -left-1"
              } `}
            checked={checked}
            onChange={handleCheck}
          />} */}
          {isOwner && isPinned && <div className="absolute z-[9999] top-[22px] left-[-13px] cursor-pointer border border-neutral-300 bg-neutral-100 rouded" >
            <img key="pin-icon"
              className=""
              src={pinIcon} alt="" />
          </div>
          }


        <div className="flex">
          {/* Bookamrk Info: Name , Link, Image */}
          <div className="flex items-center">
            {/* Bookmark Image */}
            <div className="w-[48px] h-[48px] flex items-center justify-center">
              <img
                src={
                  favicon !== "undefined" && favicon !== undefined
                    ? favicon
                    : bookmarkDefalutIcon
                }
                alt="Icon"
                className="w-[30.68px] h-[30px] rounded-md object-contain"
              />
            </div>

            {/* Bookmark Name, Link name */}
            <div className="flex flex-col items-start justify-center gap-[2.63px] h-10 sm:h-10">
              {/* Bookmark Name */}
              <p className="font-normal text-start para text-[16px] text-neutral-900  sm:w-max sm:h-[21px]">
                {windowWidth < 600
                  ? nameShortner(name, 20)
                  : nameShortner(name, 60)}
              </p>

              {/* Link Name */}
              <p className="text-start text-[14px] sm:text-[12px] sm:w-[271px] text-neutral-500 mt-[0.1rem]">
                {windowWidth < 700
                  ? nameShortner(getOrigin(url), 15)
                  : nameShortner(getOrigin(url), 30)}
              </p>
            </div>
          </div>
        </div>


        {/* Timestamp, Actions: Note, Open Link, Popup menu */}
        <div className="flex items-center gap-[4rem]">
          {/* Timestamp */}
          <p className="text-xs font-medium whitespace-nowrap  text-neutral-500 mr-5">
            Added {fromNow(updatedAt)}
          </p>

          {/* Actions: Note, Open Link, Popup menu */}
          {/* All actions should work only when all links is not selected */}
          {!isStillOneBookmarkSelected && isOwner && <div className="flex gap-4 mr-2">
            <button
              onClick={onCopy}
              className="flex items-center justify-center "
            >
              <img
                ref={copyRef}
                src={copyIcon}
                alt=""
                className="block mx-auto cursor-pointer"
              />
            </button>
            <a className="flex items-center" href={url} target="_blank">
              <img
                src={redirectIcon}
                alt=""
                className="block mx-auto cursor-pointer "
              />
            </a>
            <div className="relative">
              <button className="flex items-center" onClick={() => setClickedId(prev => prev === id ? null : id)}>
                <img
                  src={menuIcon}
                  alt=""
                  className="block mx-auto cursor-pointer"
                />
              </button>
              {clickedId === id &&
                <div className="w-[135px] rounded border absolute z-[9990] top-[20px] transition-all duration-500 right-0 border-neutral-300 p-3 flex items-start justify-center flex-col gap-2 bg-neutral-100 ">
                  {popupActionMenu.map((menuItem, index) => (
                    <>
                      <MenuItem name={menuItem.name} onClick={menuItem.onClick} type={menuItem.type} key={menuItem.type}/>
                      {(index !== popupActionMenu.length - 1) && <div className="w-full h-[1px] bg-neutral-300" />}
                    </>
                  ))}

                </div>
              }
            </div>
          </div>
          }
        </div>
      </div>
    </>
  );
};

export default BookmarkItem;
