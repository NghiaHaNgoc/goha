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

export default function LoginPage() {
  const toast = useRef<any>(null);
  const navigate = useNavigate();
  const loginAccount = useAccountStore((state) => state.signIn);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      let result = await signInService(value);
      if (result.status == 200) {
        loginAccount(result?.data);
        navigate("/");
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Đăng nhập thất bại",
          detail: "Tên người dùng hoặc mật khẩu không hợp lệ!",
          life: 3000,
        });
      }
    },
  });

  return (
    <>
      <Toast ref={toast} />
      <div className="flex align-items-center justify-content-center mt-6">
        <Card
          header={<h1 className="text-center">Đăng nhập</h1>}
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
                  />
                  <label htmlFor="username">Tên người dùng</label>
                </FloatLabel>
              )}
            />
            <form.Field
              name="password"
              children={(field) => (
                <FloatLabel className="w-full mt-6">
                  <Password
                    className="w-full"
                    inputClassName="w-full"
                    feedback={false}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    toggleMask
                    pt={{ iconField: { root: { className: "w-full" } } }}
                  />
                  <label htmlFor="password">Nhập mật khẩu</label>
                </FloatLabel>
              )}
            />

            <Button
              className="mt-6"
              type="submit"
              label="Đăng nhập"
            />
          </form>
        </Card>
      </div>
    </>
  );
}
