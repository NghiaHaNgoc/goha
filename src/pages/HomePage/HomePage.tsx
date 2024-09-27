import React, { useEffect, useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { listSalonService } from "../../service/salonService";
import { Salon } from "../../model/salon";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import { Avatar } from "primereact/avatar";
import HTMLReactParser from "html-react-parser/lib/index";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [salons, setSalons] = useState<Salon[] | undefined>([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    first: 1,
    rows: 6,
    totalRecord: 0,
  });
  useEffect(() => {
    listSalonService(pagination.first, pagination.rows).then((data) => {
      setSalons(data?.data?.salons);
      setPagination((prev) => ({
        ...prev,
        totalRecord: data?.data?.total || 0,
      }));
    });
  }, []);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    listSalonService(event.first, event.rows).then((res) => {
      setSalons(res?.data?.salons);
      setPagination((prev) => ({
        ...prev,
        first: event.first,
        totalRecord: res?.data?.total || 0,
      }));
    });
  };

  return (
    <>
      <div className="w-full flex justify-content-center">
        <div className="w-full lg:w-8" style={{ background: "#EEEEEE" }}>
          <div className="grid mt-4">
            {salons?.map((salon) => (
              <div
                key={salon.id}
                className="h-20rem col-12 md:col-6 lg:col-4 flex justify-content-center align-content-center"
              >
                <Card
                  className="w-11 h-17rem"
                  title={salon.name}
                  header={
                    <>
                      <div className="h-7rem flex flex-column">
                        <img
                          alt="Card"
                          className="border-round h-full"
                          style={{
                            objectFit: "none",
                            objectPosition: "center",
                          }}
                          src={salon.coverPhoto}
                        />
                        <Avatar
                          image={salon.logo}
                          shape="circle"
                          size="xlarge"
                          style={{
                            position: "relative",
                            top: "-30px",
                            left: "70%",
                          }}
                        />
                      </div>
                    </>
                  }
                >
                  {/* <ScrollPanel className="w-full h-3rem" style={{background: "lightgrey"}}>
                  {salon.description && HTMLReactParser(salon.description)}
                </ScrollPanel> */}

                  <Button
                    className="w-full mt-3"
                    label="Xem chi tiết"
                    size="small"
                    outlined
                    onClick={() => navigate(`/salon/${salon.id}`)}
                  />
                </Card>
              </div>
            ))}
          </div>

          <div className="card">
            <Paginator
              first={pagination.first}
              rows={pagination.rows}
              totalRecords={pagination.totalRecord}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
