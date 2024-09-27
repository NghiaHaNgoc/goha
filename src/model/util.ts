import React from "react";

export type Props = {
  children: React.ReactNode;
};

export enum GeneralStatus {
  ACTIVATE = "ACTIVATE",
  DEACTIVE = "DEACTIVE",
}

export interface ImageResponse {
  id?: string;
  title?: string;
  url_viewer?: string;
  url?: string;
  display_url?: string;
  width?: number;
  height?: number;
  size?: number;
  time?: number;
  expiration?: number;
}
