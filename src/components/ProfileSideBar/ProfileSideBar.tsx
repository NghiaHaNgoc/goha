import { Menu } from "primereact/menu";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProfileSideBar() {
  const navigate = useNavigate();
  let items = [
    {
      label: "Hồ sơ",
      icon: "pi pi-plus",
      command: () => {
        navigate("/ho-so");
      },
    },
    {
      label: "Đổi mật khẩu",
      icon: "pi pi-unlock",
      command: () => {
        navigate("/doi-mat-khau");
      },
    },
  ];
  return (
    <>
      <div className="w-full flex justify-content-center mt-6">
        <div className="w-full lg:w-10 grid">
          <div className="col-12 md:col-3">
            <Menu className="w-full md:h-full" model={items} />
          </div>

          <Outlet />
        </div>
      </div>
    </>
  );
}
