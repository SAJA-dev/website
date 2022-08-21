import * as MdIcon from "react-icons/md";
import * as FaIcon from "react-icons/fa";
import * as BiIcon from "react-icons/bi";
import * as IoIcon from "react-icons/io";
import * as ImIcon from "react-icons/im";
import * as GoIcon from "react-icons/go";
import Strings from "../../data/strings";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { globalState } from "../../global/states/globalStates";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { stat } from "fs/promises";
import { Role } from "../../global/types/User";

function Navbar() {
  const state = useRecoilValue(globalState);
  const setGlobalState = useSetRecoilState(globalState);
  const router = useRouter();
  const [isUserValide, setIsUserValid] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isShowMobileMenu, setIsShowMobile] = useState(false);
  const [username, setUsername] = useState(Strings.loginOrSignup);
  const bgTopNavbar = "bg-[#0ba]";

  const loginHanler = () => {
    state.loggedIn ? () => {} : router.push("/login");
  };
  const handleScroll = () => {
    let offsetY = window.scrollY;

    // console.log(offset);
    if (offsetY > 500) {
      setScrolled(true);
    } else if (offsetY < 10) {
      setScrolled(false);
    }
  };
  const handleResize = () => {
    let width = window.innerWidth;
    if (width > 639) {
      setIsShowMobile(false);
    }
  };
  useEffect(() => {
    state.loggedIn
      ? setUsername("کاک کمال")
      : setUsername(Strings.loginOrSignup);
    state.loggedIn ? setIsUserValid(true) : setIsUserValid(false);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    if (isShowMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isShowMobileMenu, state]);

  const goto = (path: string): void => {
    setIsShowMobile(false);
    router.push(path);
  };
  const exite = () => {
    setGlobalState({
      loggedIn: false,
      role: Role.USER,
      token: "",
      userId: "",
    });
    router.push("/");
  };

  return (
    <div className="w-full select-none">
      <div
        className={`${
          scrolled && "fixed w-full "
        } sm:static w-full h-12 text-white ${bgTopNavbar}  z-10`}
      >
        <div className="container flex flex-row justify-between items-center h-full">
          <div
            onClick={() => setIsShowMobile(true)}
            className="flex h-full items-center sm:hidden cursor-pointer"
          >
            <IoIcon.IoIosMenu className="w-8 h-8" />
          </div>
          <div
            onClick={() => setIsShowMobile(false)}
            className={`fixed top-0 bottom-0 w-full ${
              isShowMobileMenu ? "right-0" : "-right-[20000px]"
            } bg-black/40  z-20`}
          ></div>
          <div
            className={`fixed top-0 bottom-0 w-64 z-30 transition-all duration-500 ease-in-out ${
              isShowMobileMenu ? "right-0" : "-right-[20000px]"
            }  bg-[#0ba]`}
          >
            <div className="flex flex-col items-start justify-between h-full py-2">
              <div className="w-full">
                <IoIcon.IoMdCloseCircle
                  className="bg-[#0ba] w-10 h-10 mr-4 cursor-pointer"
                  onClick={() => setIsShowMobile(false)}
                />
                <ul className="flex flex-col mt-4 w-full divide-y">
                  <li
                    onClick={() => goto("/")}
                    className="flex items-center h-full w-full px-4 py-2 cursor-pointer"
                  >
                    {Strings.home}
                  </li>
                  <li
                    onClick={() => goto("/search-estate")}
                    className="flex items-center h-full w-full px-4 py-2 cursor-pointer"
                  >
                    {Strings.searchEstates}
                  </li>
                  <li
                    onClick={() => goto("/")}
                    className="flex items-center h-full w-full px-4 py-2 cursor-pointer"
                  >
                    {Strings.inquiries}
                  </li>
                  <li
                    onClick={() => goto("/")}
                    className="flex items-center h-full w-full px-4 py-2 cursor-pointer"
                  >
                    {Strings.contractSamples}
                  </li>
                  <li
                    onClick={() => goto("/")}
                    className="flex items-center h-full w-full px-4 py-2 cursor-pointer"
                  >
                    {Strings.laws}
                  </li>
                  <li
                    onClick={() => goto("/")}
                    className="flex items-center h-full w-full px-4 py-2 cursor-pointer"
                  >
                    {Strings.commissionCalculation}
                  </li>
                </ul>
              </div>
              <div className="w-full flex flex-col gap-4 justify-center items-center">
                <div className="">
                  <div className="flex flex-row justify-center items-center">
                    {/* <ImIcon.ImSection className=" w-10 h-10" /> */}
                    <h1 className="text-lg">
                      <Link href="/">{Strings.sajaSystem}</Link>
                    </h1>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-2 bg-black/20 h-10 px-2 text-sm">
                  <MdIcon.MdPhoneEnabled className="w-5 h-5" />
                  <span dir="ltr"> {Strings.phoneNumber}</span>
                </div>
                <div className="flex flex-row gap-2">
                  <FaIcon.FaTelegram className="w-6 h-6" />
                  <FaIcon.FaInstagram className="w-6 h-6" />
                  <FaIcon.FaWhatsapp className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-row items-center gap-2 bg-black/30 h-full px-2 text-sm">
            <MdIcon.MdPhoneEnabled className="w-5 h-5" />
            <span dir="ltr"> {Strings.phoneNumber}</span>
          </div>

          <div className="h-full hidden sm:flex flex-row items-center gap-3">
            <FaIcon.FaTelegram className="w-6 h-6" />
            <FaIcon.FaInstagram className="w-6 h-6" />
            <FaIcon.FaWhatsapp className="w-6 h-6" />
          </div>
          <div
            onClick={() => {
              loginHanler();
            }}
            className="flex flex-row h-full items-center gap-2 group"
          >
            <div className="flex flex-row items-center gap-2 cursor-pointer relativ">
              <BiIcon.BiUser className="w-5 h-5" />
              <span>{username}</span>
            </div>
            {isUserValide && (
              <div className="absolute left-4 hidden w-[120px] group-hover:block top-12 bg-white text-gray-700 z-30 rounded-br-md rounded-bl-md shadow-md">
                <ul className="">
                  <li
                    onClick={() => router.push("/dashboard")}
                    className="flex flex-row items-center gap-2 py-2 pr-4 cursor-pointer"
                  >
                    <GoIcon.GoDashboard className="w-5 h-6 text-[#2c3e50]" />
                    <span className="text-[#a6a6a6] underline group-hover:no-underline group-hover:text-[#2c3e50] transition-all duration-300">
                      داشبورد
                    </span>
                  </li>
                  <li
                    onClick={() => exite()}
                    className="flex flex-row items-center gap-2 py-2 pr-4 cursor-pointer"
                  >
                    <MdIcon.MdOutlineExitToApp className="w-5 h-6 text-[#2c3e50]" />
                    <span className="text-[#a6a6a6] underline group-hover:no-underline group-hover:text-[#2c3e50] transition-all duration-300">
                      خروج
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`hidden z-50  transition-all duration-300 inset-0 sm:flex flex-row justify-between items-center ${
          scrolled
            ? "fixed top-0 h-16 bg-white text-gray-600 w-full  shadow-md"
            : "top-12 bg-[#f6f6f6] text-gray-600 container h-16"
        }
        `}
      >
        <div
          className={`${
            scrolled && "container"
          } flex flex-row justify-between items-center w-full`}
        >
          <div className="flex flex-row items-center gap-3">
            <ImIcon.ImSection className=" w-10 h-10" />
            <h1 className="text-lg">
              <Link href="/">{Strings.sajaSystem}</Link>
            </h1>
          </div>
          <div className="flex-1">
            <ul className="flex flex-row justify-end sm:gap-3 sm:text-[13px] md:text-sm lg:text-base md:gap-4 lg:gap-8">
              <li>
                <Link href="/search-estate">{Strings.searchEstates}</Link>
              </li>
              <li>
                <Link href="/">{Strings.inquiries}</Link>
              </li>
              <li>
                <Link href="/">{Strings.contractSamples}</Link>
              </li>
              <li>
                <Link href="/">{Strings.laws}</Link>
              </li>
              <li>
                <Link href="/">{Strings.commissionCalculation}</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
