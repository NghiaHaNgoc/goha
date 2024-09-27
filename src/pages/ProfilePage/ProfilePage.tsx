import { Menu } from "primereact/menu";
import {
  getProfileService,
  updateProfileService,
} from "../../service/accountService";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Gender, User } from "../../model/user";
import { useForm } from "@tanstack/react-form";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useAccountStore } from "../../store/zustand";
import { Avatar } from "primereact/avatar";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { uploadImageService } from "../../service/utilService";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { formatbirthDate } from "../../utils/utils";
import { Toast } from "primereact/toast";

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

export default function ProfilePage() {
  let token = useAccountStore((state) => state.account?.token);
  const toast = useRef<any>(null);
  const fileUploadRef = useRef<any>(null);

  const [profile, setProfile] = useState<User | undefined>();
  const [date, setDate] = useState(null);
  const form = useForm({
    defaultValues: {
      fullName: profile?.fullName || "",
      email: profile?.email || "",
      gender: genderOptions.find((value) => value.code == profile?.gender),
      avatar: profile?.avatar || null,
      dateOfBirth: profile?.dateOfBirth || "",
    },
    onSubmit: async ({ value }) => {
      let data = {
        ...value,
        gender: value.gender?.code,
      };
      let res = await updateProfileService(token || "", data);
      setProfile(res.data);
      toast.current.show({
        severity: "success",
        summary: "Cập nhật thành công",
        detail: "",
        life: 3000,
      });
    },
  });

  const imageUploadHandler = async (event: FileUploadHandlerEvent) => {
    let file = event.files[0];
    let data = new FormData();
    data.append("image", file);
    let res = await uploadImageService(data);
    form.setFieldValue("avatar", res.data?.url || "");
    fileUploadRef.current?.clear();
  };

  useEffect(() => {
    getProfileService(token).then((res) => {
      setProfile(res.data);
    });
  }, []);
  return (
    <div className="grid col-12 md:col-9 flex justify-content-center">
      <Toast ref={toast} />
      <Card
        className="w-full md:w-10 mt-1"
        footer={
          <div className="flex justify-content-end">
            <Button
              label="Hủy"
              size="small"
              rounded
              outlined
              onClick={() => form.reset()}
            />
            <Button
              label="Cập nhật"
              size="small"
              rounded
              className="ml-4"
              onClick={() => form.handleSubmit()}
            />
          </div>
        }
      >
        <form className="grid">
          <div className="col-12 mb-5">
            <div className="flex justify-content-center mb-3">
              <form.Field
                name="avatar"
                children={(field) => (
                  <img
                    src={
                      field.state.value ||
                      "https://cdn-icons-png.flaticon.com/512/6681/6681204.png"
                    }
                    className="w-3 border-circle"
                    style={{
                      objectFit: "cover",
                      aspectRatio: 1,
                    }}
                  />
                )}
              />
            </div>
            <FileUpload
              ref={fileUploadRef}
              className="flex justify-content-center"
              chooseLabel="Avatar"
              mode="basic"
              name="avatar"
              accept="image/*"
              customUpload
              auto
              maxFileSize={10000000}
              uploadHandler={imageUploadHandler}
            />
          </div>

          <div className="grid">
            <div className="col-12 md:col-6 mt-3">
              <form.Field
                name="fullName"
                children={(field) => (
                  <FloatLabel className="w-full">
                    <InputText
                      className="w-full"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                    <label htmlFor="fullName">Tên đầy đủ</label>
                  </FloatLabel>
                )}
              />
            </div>

            <div className="col-12 md:col-6 mt-3">
              <form.Field
                name="gender"
                children={(field) => (
                  <FloatLabel className="w-full">
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
            </div>

            <div className="col-12 md:col-6 mt-3">
              <form.Field
                name="dateOfBirth"
                children={(field) => (
                  <FloatLabel className="w-full">
                    <Calendar
                      id="buttondisplay"
                      value={
                        field.state.value
                          ? new Date(field.state.value || "")
                          : null
                      }
                      dateFormat="dd-mm-yy"
                      onChange={(e) => {
                        field.handleChange(formatbirthDate(e.value));
                      }}
                      showIcon
                      required
                    />
                    <label htmlFor="dateOfBirth">Ngày sinh</label>
                  </FloatLabel>
                )}
              />
            </div>

            <div className="col-12 md:col-6 mt-3">
              <form.Field
                name="email"
                children={(field) => (
                  <FloatLabel className="w-full">
                    <InputText
                      required
                      className="w-full"
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                  </FloatLabel>
                )}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
