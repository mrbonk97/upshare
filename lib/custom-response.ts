import { NextResponse } from "next/server";

export const CustomErrorResponse = (message: string, status: number) => {
  return NextResponse.json({ code: "error", message: message }, { status: status });
};
