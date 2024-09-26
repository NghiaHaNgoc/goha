import { useForm } from "@tanstack/react-form";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { signInService } from "../../service/accountService";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useAccountStore } from "../../store/zustand";
import { Dropdown } from "primereact/dropdown";
import { Gender } from "../../model/user";

const genderOptions = [
  {
    name: "Nam",
    code: Gender.MALE,
  },
  {
    name: "Nữ",
    code: Gender.FEMALE,
  },
];

export default function RegisterPage() {
  const toast = useRef<any>(null);
  const navigate = useNavigate();
  const loginAccount = useAccountStore((state) => state.signIn);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
      gender: null,
    },
    onSubmit: async ({ value }) => {
      //   let result = await loginService(value);
      //   if (result.status == 200) {
      //     loginAccount(result?.data);
      //     navigate("/");
      //   } else {
      //     toast.current?.show({
      //       severity: "error",
      //       summary: "Đăng nhập thất bại",
      //       detail: "Tên người dùng hoặc mật khẩu không hợp lệ!",
      //       life: 3000,
      //     });
      //   }
    },
  });

  return (
    <>
      <Toast ref={toast} />
      <div className="flex align-items-center justify-content-center mt-5">
        <Card
          header={<h1 className="text-center">Đăng ký</h1>}
          className="sm:w-12 md:w-8 lg:w-4"
        >
          <form
            className="flex flex-column align-items-center justify-content-center p-6"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="username"
              children={(field) => (
                <FloatLabel className="w-full">
                  <InputText
                    className="w-full"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  <label htmlFor="username">Tên người dùng</label>
                </FloatLabel>
              )}
            />
            <form.Field
              name="password"
              children={(field) => (
                <FloatLabel className="w-full mt-5">
                  <Password
                    className="w-full"
                    inputClassName="w-full"
                    feedback={false}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    toggleMask
                    required
                    pt={{ iconField: { root: { className: "w-full" } } }}
                  />
                  <label htmlFor="password">Nhập mật khẩu</label>
                </FloatLabel>
              )}
            />

            <form.Field
              name="fullName"
              children={(field) => (
                <FloatLabel className="w-full mt-5">
                  <InputText
                    className="w-full"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  <label htmlFor="fullName">Tên đầy đủ</label>
                </FloatLabel>
              )}
            />

            <form.Field
              name="gender"
              children={(field) => (
                <FloatLabel className="w-full mt-5">
                  <Dropdown
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    options={genderOptions}
                    optionLabel="name"
                    className="w-full"
                    required
                  />
                  <label htmlFor="gender">Giới tính</label>
                </FloatLabel>
              )}
            />

            <form.Field
              name="email"
              children={(field) => (
                <FloatLabel className="w-full mt-5">
                  <InputText
                    className="w-full"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </FloatLabel>
              )}
            />
            <Button
              className="mt-6"
              // loading={true}
              type="submit"
              label="Đăng nhập"
            />
          </form>
        </Card>
      </div>
    </>
  );
}
