import { Nullable } from "primereact/ts-helpers";

export function formatbirthDate(date?: Nullable<Date>) {
  return `${date?.getFullYear()}-${(date?.getMonth() || 0) + 1}-${date?.getDate()}`;
}
