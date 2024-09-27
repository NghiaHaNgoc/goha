import { Button } from "primereact/button";
import { getSalonDetailService } from "../../service/salonService";

export default function SalonDetailPage() {
  getSalonDetailService("1").then((res) => console.log(res));
  return (
    <div>
      <Button label="Đặt ngay" size="small" />
    </div>
  );
}
