import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSalonDetailService } from "../../service/salonService";
import { Salon } from "../../model/salon";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import HTMLReactParser from "html-react-parser";

export default function SalonDetailPage() {
  const { salonId } = useParams<{ salonId: string }>();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    if (salonId) {
      getSalonDetailService(salonId).then((response) => {
        if (response.data) {
          console.log("Dữ liệu salon:", response.data);
          setSalon(response.data);
          setCurrentImage(response.data.coverPhoto || "");
        }
      });
    }
  }, [salonId]);

  if (!salon) {
    return <div>Đang tải thông tin salon...</div>;
  }

  const handleImageClick = (image: string) => {
    setCurrentImage(image);
  };

  const handleNextImage = () => {
    if (salon && salon.coverPhoto) {
      setCurrentImage(salon.coverPhoto || "");
    }
  };

  const handlePrevImage = () => {
    if (salon && salon.coverPhoto) {
      setCurrentImage(salon.coverPhoto || "");
    }
  };

  return (
    <div className="w-full flex justify-content-center">
      <div className="w-full lg:w-8 p-4">
        <Card>
          <div className="flex flex-col md:flex-row">
            {/* Ảnh chính */}
            <div className="flex-1 md:mr-4">
              <div className="relative">
                <img
                  alt={salon.name}
                  src={currentImage || ""}
                  className="w-full h-40rem rounded-lg"
                  style={{ objectFit: "cover" }}
                />
                <Button
                  icon="pi pi-chevron-left"
                  className="absolute left-0 top-50"
                  onClick={handlePrevImage}
                />
                <Button
                  icon="pi pi-chevron-right"
                  className="absolute right-0 top-50"
                  onClick={handleNextImage}
                />
              </div>

              {/* Ảnh phụ */}
              {salon.coverPhoto && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={salon.coverPhoto || ""}
                    alt="Cover"
                    className={`w-4rem h-4rem mx-2 cursor-pointer ${
                      currentImage === salon.coverPhoto
                        ? "border-2 border-primary"
                        : ""
                    }`}
                    style={{ objectFit: "cover" }}
                    onClick={() => handleImageClick(salon.coverPhoto || "")}
                  />
                </div>
              )}

              {/* Mô tả salon */}
              <p className="mt-4 text-left">
                <strong>Mô tả:</strong>
                <div>{HTMLReactParser(salon.description || "")}</div>
              </p>
            </div>

            {/* Thông tin salon */}
            <div className="flex-1 text-center">
              <Avatar
                image={salon.logo || ""}
                shape="circle"
                size="xlarge"
                className="mt-4 mx-auto"
              />
              <h2 className="text-center">{salon.name}</h2>
              <div className="mt-2 text-left">
                <p>
                  <strong>Số điện thoại:</strong> {salon.phone}
                </p>
                <p>
                  <strong>Email:</strong> {salon.email}
                </p>
              </div>
              <div className="mt-4">
                <Button
                  label="Đặt ngay"
                  size="large"
                  className="p-button-success"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
