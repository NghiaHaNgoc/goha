import { Outlet, useNavigate } from "react-router-dom";
import { Role } from "../../model/user";
import { Menu } from "primereact/menu";
import { useAccountStore } from "../../store/zustand";

export default function ManageSideBar() {
  const navigate = useNavigate();
  const account = useAccountStore((state) => state.account);
  const getSideBarMenu = (role?: Role) => {
    switch (role) {
      case Role.ADMIN:
        return [
          {
            label: "Quản lý người dùng",
            icon: "pi pi-plus",
            command: () => {
              navigate("/admin/quan-ly/nguoi-dung");
            },
          },
        ];
      case Role.SALON_OWNER:
        return [
          {
            label: "Quản lý salon",
            icon: "pi pi-plus",
            command: () => {
              navigate("/chu-tiem/quan-ly/salon");
            },
          },
          {
            label: "Quản lý chi nhánh",
            icon: "pi pi-plus",
            command: () => {
              navigate("chu-tiem/quan-ly/chi-nhanh");
            },
          },
          {
            label: "Quản lý đặt lịch",
            icon: "pi pi-plus",
            command: () => {
              navigate("/chu-tiem/quan-ly/giuong");
            },
          },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="flex justify-content-center">
      <div className="w-full lg:w-10 grid mt-6">
        <div className="col-12 md:col-3 mt-3">
          <Menu
            className="w-full md:h-full"
            model={account ? getSideBarMenu(account?.role) : getSideBarMenu()}
          />
        </div>
        <Outlet/>
      </div>
    </div>
  );
}
