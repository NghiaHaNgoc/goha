import {
  getSalonOfOwnerService,
  updateSalonOfOwnerService,
} from "../../service/salonService";
import { useAccountStore } from "../../store/zustand";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { Salon } from "../../model/salon";
import { useForm } from "@tanstack/react-form";
import { FileUpload, FileUploadHandlerEvent } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { uploadImageService } from "../../service/utilService";
import { Editor } from "primereact/editor";

export default function SalonManagerPage() {
  const toast = useRef<any>();
  const logoUploadRef = useRef<any>();
  const coverPhotoUploadRef = useRef<any>();
  const [disableUpload, setDisableUpload] = useState(false);
  const token = useAccountStore((state) => state.account?.token);
  const [salonProfile, setSalonProfile] = useState<Salon | undefined>();
  const form = useForm({
    defaultValues: {
      name: salonProfile?.name || "",
      logo: salonProfile?.logo || "",
      coverPhoto: salonProfile?.coverPhoto || "",
      email: salonProfile?.email,
      phone: salonProfile?.phone || "",
      description: salonProfile?.description || "",
    },
    onSubmit: async ({ value }) => {
      let res = await updateSalonOfOwnerService(token || "", value);
      setSalonProfile(res.data);
      toast.current.show({
        severity: "success",
        summary: "Cập nhật thành công",
        detail: "",
        life: 3000,
      });
      form.reset();
    },
  });
  const isDirty = form.useStore((state) => state.isDirty);

  const logoUploadHandler = async (event: FileUploadHandlerEvent) => {
    setDisableUpload(true);
    let file = event.files[0];
    let data = new FormData();
    data.append("image", file);
    toast.current.show({
      severity: "info",
      summary: "Đang tải ảnh lên",
      detail: "Nhấn nút cập nhật để lưu thau đổi",
      life: 3000,
    });
    let res = await uploadImageService(data);
    form.setFieldValue("logo", res.data?.url || "");
    logoUploadRef.current?.clear();
    setDisableUpload(false);
  };

  const coverPhotoUploadHandler = async (event: FileUploadHandlerEvent) => {
    setDisableUpload(true);
    let file = event.files[0];
    let data = new FormData();
    data.append("image", file);
    toast.current.show({
      severity: "info",
      summary: "Đang tải ảnh lên",
      detail: "Nhấn nút cập nhật để lưu thau đổi",
      life: 3000,
    });
    let res = await uploadImageService(data);
    form.setFieldValue("coverPhoto", res.data?.url || "");
    logoUploadRef.current?.clear();
    setDisableUpload(false);
  };
  let tool = useRef<any>();

  useEffect(() => {
    getSalonOfOwnerService(token || "").then((res) =>
      setSalonProfile(res.data)
    );
    console.log(tool.current.getToolbar())
  }, []);

  return (
    <div className="col-12 md:col-9 flex justify-content-center mt-2">
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
              disabled={!isDirty}
              onClick={() => form.reset()}
            />
            <Button
              label="Cập nhật"
              size="small"
              rounded
              className="ml-4"
              disabled={!isDirty}
              onClick={() => form.handleSubmit()}
            />
          </div>
        }
      >
        <form className="grid">
          {/* Logo */}
          <div className="col-12 md:col-6 mb-5">
            <div className="flex justify-content-center mb-3">
              <form.Field
                name="logo"
                children={(field) => (
                  <img
                    src={
                      field.state.value ||
                      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    }
                    className="w-5 border-circle"
                    style={{
                      objectFit: "cover",
                      aspectRatio: 1,
                    }}
                  />
                )}
              />
            </div>
            <FileUpload
              ref={logoUploadRef}
              className="flex justify-content-center mt-4"
              chooseLabel="Logo"
              mode="basic"
              name="logo"
              accept="image/*"
              customUpload
              auto
              disabled={disableUpload}
              maxFileSize={10000000}
              uploadHandler={logoUploadHandler}
            />
          </div>

          {/* Cover photo */}
          <div className="col-12 md:col-6 mb-5">
            <div className="flex justify-content-center mb-3">
              <form.Field
                name="coverPhoto"
                children={(field) => (
                  <img
                    src={
                      field.state.value ||
                      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    }
                    className="w-8 border-round"
                    style={{
                      objectFit: "cover",
                      aspectRatio: 3 / 2,
                    }}
                  />
                )}
              />
            </div>
            <FileUpload
              ref={coverPhotoUploadRef}
              className="flex justify-content-center"
              chooseLabel="Background"
              mode="basic"
              name="coverPhoto"
              accept="image/*"
              customUpload
              auto
              disabled={disableUpload}
              maxFileSize={10000000}
              uploadHandler={coverPhotoUploadHandler}
            />
          </div>

          {/* Name */}
          <div className="col-12 md:col-6 mt-3">
            <form.Field
              name="name"
              children={(field) => (
                <FloatLabel className="w-full">
                  <InputText
                    className="w-full"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  <label htmlFor="name">Tên tiệm</label>
                </FloatLabel>
              )}
            />
          </div>

          {/* Email */}
          <div className="col-12 md:col-6 mt-3">
            <form.Field
              name="email"
              children={(field) => (
                <FloatLabel className="w-full">
                  <InputText
                    className="w-full"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </FloatLabel>
              )}
            />
          </div>

          <div className="col-12 md:col-6 mt-3">
            <form.Field
              name="phone"
              children={(field) => (
                <FloatLabel className="w-full">
                  <InputText
                    className="w-full"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                  />
                  <label htmlFor="phone">Điện thoại</label>
                </FloatLabel>
              )}
            />
          </div>

          {/* Description */}
          <div className="col-12 mt-3">
            <label htmlFor="description" className="text-xs ml-3">
              Mô tả
            </label>
            <form.Field
              name="description"
              children={(field) => (
                <Editor
                ref={tool}
                  spellCheck={false}
                  value={field.state.value}
                  onTextChange={(e) => field.handleChange(e.htmlValue || "")}
                  style={{ height: "320px" }}
                />
              )}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}
