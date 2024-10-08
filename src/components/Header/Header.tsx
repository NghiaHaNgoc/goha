import React, { useRef } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { MenuItem } from "primereact/menuitem";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { useAccountStore } from "../../store/zustand";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { Role } from "../../model/user";

export default function Header() {
  const account = useAccountStore((state) => state.account);
  const signOutAccount = useAccountStore((state) => state.signOut);
  const userMenu = useRef<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      label: "Trang chủ",
      url: "/trang-chu",
      className:
        location.pathname == "/trang-chu" || location.pathname == "/"
          ? "p-menuitem-active border-round"
          : "",
    },

    {
      label: "Features",
      icon: "pi pi-star",
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
    },
  ];

  const getUserMenu = (role?: Role) => {
    switch (role) {
      case Role.ADMIN:
        return [
          {
            label: "Hồ sơ",
            command: () => {
              navigate("/ho-so");
            },
          },
          {
            label: "Quản lý",
          },
          {
            label: "Đăng xuất",
            command: () => {
              signOutAccount();
              navigate("/");
            },
          },
        ];
      case Role.SALON_OWNER:
        return [
          {
            label: "Hồ sơ",
            command: () => {
              navigate("/ho-so");
            },
          },
          {
            label: "Quản lý",
            command: () => {
              navigate("/chu-tiem/quan-ly")
            }
          },
          {
            label: "Đăng xuất",
            command: () => {
              signOutAccount();
              navigate("/");
            },
          },
        ];
      case Role.CUSTOMER:
        return [
          {
            label: "Hồ sơ",
            command: () => {
              navigate("/ho-so");
            },
          },
          {
            label: "Danh sách đặt",
          },
          {
            label: "Đăng xuất",
            command: () => {
              signOutAccount();
              navigate("/");
            },
          },
        ];
      default:
        return [
          {
            label: "Đăng nhập",
            url: "/dang-nhap",
          },
          {
            label: "Đăng ký",
            url: "dang-ky",
          },
        ];
    }
  };

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );

  const end = (
    <div className="flex align-items-center justify-content-around">
      <InputText placeholder="Search" type="text" className="w-6 mr-3" />
      <Menu
        ref={userMenu}
        popup
        model={account ? getUserMenu(account?.role) : getUserMenu()}
        id="user_popup_menu"
        popupAlignment="right"
      />
      <div
        className="flex align-items-center justify-content-center"
        aria-controls="user_popup_menu"
        aria-haspopup
        onClick={(event: any) => userMenu.current?.toggle(event)}
      >
        <p>{account ? account.fullName : "Tài khoản"}</p>
        <Avatar
          className="ml-2"
          image={
            account?.avatar ||
            "https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
          }
          shape="circle"
          size="large"
        />
      </div>
    </div>
  );

  return (
    <div className="card" id="goha-nav-bar">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
