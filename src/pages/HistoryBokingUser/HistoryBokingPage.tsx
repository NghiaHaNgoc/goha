import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Booking, BookingStatus } from "../../model/booking";
// import { getBookingHistoryService } from "../../service/bookingService";

export default function HistoryBookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const mockData: Booking[] = [
    {
      id: 1,
      salonName: "Salon Tóc Đẹp",
      bookingTime: "2024-09-30T14:30:00",
      notes: "gội đầu im lặng",
      status: BookingStatus.CONFIRMED,
      address: "225 Trần Đăng Ninh, p. Dịch Vọng, q. Cầu Giấy, Hà Nội",
    },
    {
      id: 2,
      salonName: "Beauty Salon",
      bookingTime: "2024-09-20T09:00:00",
      notes: "dùng nước ấm, không tư vấn thêm",
      status: BookingStatus.COMPLETED,
      address: "hcm",
    },
    {
      id: 3,
      salonName: "Spa Thư Giãn",
      bookingTime: "2024-09-15T17:00:00",
      notes: "thêm tẩy tế bào chết",
      status: BookingStatus.CANCELLED,
      address: "hcm",
    },
  ];

  useEffect(() => {
    setBookings(mockData);
  }, []);

  // todo hàm để call api
  //   useEffect(() => {

  //     getBookingHistoryService().then((response) => {
  //       if (response.data) {
  //         setBookings(response.data);
  //       }
  //     });
  //   }, []);

  const getStatusDetails = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return { color: "orange", label: "Đang chờ" };
      case BookingStatus.CONFIRMED:
        return { color: "green", label: "Đã xác nhận" };
      case BookingStatus.COMPLETED:
        return { color: "blue", label: "Hoàn thành" };
      case BookingStatus.CANCELLED:
        return { color: "red", label: "Đã hủy" };
      default:
        return { color: "gray", label: "Không xác định" };
    }
  };

  // Render cột thời gian theo định dạng Việt Nam
  const dateBody = (rowData: Booking) => {
    return new Date(rowData.bookingTime).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Render cột trạng thái
  const statusBody = (rowData: Booking) => {
    const { color, label } = getStatusDetails(rowData.status);
    return <span style={{ color }}>{label}</span>;
  };

  // Nút "Hủy lịch hẹn"
  const cancelButton = (rowData: Booking) => {
    const isPastBooking = new Date(rowData.bookingTime) < new Date();

    return isPastBooking ? (
      <span> </span>
    ) : (
      <Button label="Hủy lịch hẹn" className="p-button-danger" />
    );
  };

  return (
    <div className="p-4">
      <h2>Lịch sử đặt lịch</h2>
      <DataTable value={bookings} paginator rows={10} responsiveLayout="scroll">
        <Column field="salonName" header="Tên Salon" />
        <Column body={dateBody} header="Thời gian" />
        <Column field="notes" header="Ghi chú" />
        <Column field="address" header="Địa chỉ" />
        <Column body={statusBody} header="Trạng thái" />
        <Column body={cancelButton} header="Hành động" />{" "}
      </DataTable>
    </div>
  );
}
