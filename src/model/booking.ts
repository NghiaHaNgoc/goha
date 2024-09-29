export type Booking = {
  id: number;
  salonName: string;
  bookingTime: string;
  notes?: string;
  status: BookingStatus;
  address: string;
};

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}
