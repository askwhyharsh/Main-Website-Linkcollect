import React from "react";
import Card from "./Card";
import BookmarkIcon from "../../assets/Frame 40250.svg";
import ShareIcon from "../../assets/Frame 40250share.svg";
import SearchIcon from "../../assets/Frame 40250search.svg";
import CommandIcon from "../../assets/Frame 40250command.svg";
import Card1 from "../../assets/Card.mp4";
import LCLogo from "../../assets/LCLogo.svg";
import mainlogoWhite from "../../assets/mainlogoWhite.svg";
import instagram from "../../assets/instagram.svg";
import medium from "../../assets/medium.svg";
import discord from "../../assets/discord.svg";
import twitter from "../../assets/twitter.svg";
import Grill from "../../assets/Grill.svg";
import Vector from "../../assets/Vector.png";
import { Link } from "react-router-dom";
import FamewallEmbed from "react-famewall";

const Features = ({ windowWidth }) => {
  return (
    <>
      <div
        id="how-it-works"
        className={`flex flex-wrap ${
          windowWidth < 700 ? "flex-col" : ""
        } w-[100%] gap-[26px] items-center justify-center mx-auto mt-[50px] lg:w-[800px] lg:mt-[200px] xl:w-[780px] xl:mt-[400px] 2xl:-[800px]`}
      >
        <Card
          img={BookmarkIcon}
          title={"Save from anywhere"}
          details={
            "Use our browser extension on any browser to save any link to your collection with just a right click ✅"
          }
        />
        <Card
          img={ShareIcon}
          title={"Share to anyone"}
          details={
            "we create a shareable link instantly so you can share your bookmarks with your friends supa fast "
          }
        />
        <Card
          img={SearchIcon}
          title={"Discover the best"}
          details={
            "Explore what people are liking the most, upvote and save collections you like 💼"
          }
        />
        {windowWidth > 700 && (
          <Card
            img={CommandIcon}
            title={"Access bookmarks using commands"}
            details={
              "Use our commands and key shortcuts anywhere on your browser to save your time, do shit that matters instead 👀"
            }
          />
        )}
      </div>
      {/* Card Animation Section  */}

      {/*Mobile design only*** */}
      <div className="flex  flex-col justify-center items-center mx-auto my-12  xl:ml-48 xl:flex-row">
        <div className="block sm:hidden">
          <div className="flex  flex-col items-center justify-center gap-2 mx-auto w-72">
            <img src={Vector} alt="banner image" className="w-64 h-60" />
            <h1 className="w-72 h-[3.4rem] lexend font-semibold text-center text-textPrimary mx-auto">
              Stay organized, save your web links
            </h1>
          </div>
          <div className="w-[21.8rem] h-44 mx-auto  py-6 flex flex-col items-center justify-cemter gap-2 rounded-md my-6 border-solid border-[1px] border-primary">
            <div className="flex items-center justify-start gap-2">
              <img src={LCLogo} alt="" className="w-[1.3rem] h-[1.3rem] ml-4" />
              <h1 className="text-primary lexend text-[1.2rem] leading-5 w-[21.7rem] h-5 font-bold text-start">
                Share your LinkCollect profile
              </h1>
            </div>
            <p className="text-textPrimary text-sm text-left lexend font-light mt-4  mx-auto w-[18.4rem] h-[5.32rem] flex items-center justify-center">
              with anyone and they can view all your public collections that you
              have created, do research and curate good collections and share
              with the worlds
            </p>
          </div>

          {/*Create Aweasome collection of links */}
          <div className="w-[21.8rem] h-44 mx-auto  py-6 flex flex-col items-center justify-cemter gap-3 rounded-md my-6 border-solid border-[1px] border-primary">
            <div className="flex items-center justify-start gap-2">
              <img src={LCLogo} alt="" className="w-[1.3rem] h-[1.3rem] ml-4" />
              <h1 className="text-primary lexend text-[1.2rem] leading-5 w-[21.7rem] h-5 font-bold text-start">
                Create awesome collections of links{" "}
              </h1>
            </div>
            <p className="text-textPrimary text-sm text-left lexend font-light mt-4  mx-auto w-[18.4rem] h-[5.32rem] flex items-center justify-center">
              maybe your favourite videos, blogs, twitter threads, ai tools or
              learning resources and share these collections with your friends
              in just one click right from our browser extension, yes it's that
              simple 😉
            </p>
          </div>
        </div>

        {/* Dekstop Design*** */}
        <div className="hidden sm:flex sm:items-center sm:justify-between sm:w-11/12 sm:flex-row">
          <div className="mt-10 ">
            <video
              style={{ width: "825px", height: "448px" }}
              src={Card1}
              muted
              autoPlay
              loop
            ></video>
          </div>
          <div className="main-div  mx-auto mt-4  xl:mt-24">
            <div className="sub-div flex">
              <div>
                <img src={LCLogo} alt="" className="sm:w-[20px] xl:w-[30px]" />
              </div>
              <div>
                <h1 className=" text-[#6166F1] font-bold sm:text-2xl xl:text-4xl xl:ml-5">
                  Create awesome collections of links
                </h1>
              </div>
            </div>
            <div className="w-3/5 text-left leading-8 xl:ml-9">
              <p className="">
                maybe your favourite videos, blogs, twitter threads, ai tools or
                learning resources and share these collections with your friends
                in just one click right from our browser extension, yes it's
                that simple 😉{" "}
              </p>
            </div>
            <div className="main-div mt-8 ">
              <div className="sub-div flex ">
                <div>
                  <img
                    src={LCLogo}
                    alt=""
                    className="sm:w-[20px] xl:w-[30px]"
                  />
                </div>
                <div>
                  <h1 className="ml-5 text-[#6166F1] font-bold sm:text-2xl xl:text-4xl">
                    Share your LinkCollect profile
                  </h1>
                </div>
              </div>
              <div className="w-3/5 text-left ml-9 leading-8 ">
                <p>
                  with anyone and they can view all your public collections that
                  you have created or if you will create later{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full">
        <FamewallEmbed wallUrl="linkcollect" carouselMode={true} />
      </div>
      {/* Footer */}
      <div className="bg-primary-500 text-white w-full h-max py-5">
        {/* Top */}
        <div className="flex justify-start md:justify-around items-start h-full py-10 flex-wrap"  >
          {/* Left : Logo Social Links */}
            <div className="h-full">
              {/* Logo */}
                <img src={mainlogoWhite} alt="linkcollect" className="w-60"/> 
              {/* Caption */}
             
              <p className="text-left  text-white font-light leading-4 xl:leading-[30px] ml-7 text-[12px]  md:text-[18px]">
                When you find something you like on the internet,<br/> save it with
                linkcollect before you forget
              </p>
              {/* Socal Links mt-4 ml-3 xl:ml-7 xl:mt-14 */} 
              <div  className="flex gap-4 items-center xl:gap-8 ml-7 mt-5 ">
                
               <a href="https://twitter.com/linkcollect_io" target="_blank" rel="noreferrer"  className="cursor-pointer flex justify-center items-center"><img src={twitter} alt="" /></a>
                <a href="https://www.instagram.com/linkcollect/" target="_blank" rel="noreferrer" className="cursor-pointer flex justify-center items-center"><img src={instagram} alt="" /></a>
                <a href="https://medium.com/@askwhyharsh" target="_blank" rel="noreferrer" className="cursor-pointer flex justify-center items-center"><img src={medium} alt="" /></a>
                <a href="https://discord.gg/Pt9b4AefE9" target="_blank" rel="noreferrer" className="flex justify-center items-center cursor-pointer"><img src={discord} alt="" /></a>
              </div>
            </div>
          {/* Right : Info */}
            <div className=" flex flex-col text-left mt-8 font-light gap-2 ml-7 md:ml-0">
            <p>How it works</p>
            <p>FAQs</p>
            <p>Request demo</p>
            <Link to="/privacy">
              <p>Privacy Policy</p>
            </Link>
            <p>Contact us</p>
            </div>
        </div>
        {/* Bottom */}
        <div className="flex justify-around md:justify-evenly text-light text-[12px]">
          <div></div>
          {/* <div></div> */}
          <p>2023 @linkcollect.io</p>
          <p>Help@linkcollect.xyz</p>
        </div>
      </div>
    </>
  );
};

export default Features;
