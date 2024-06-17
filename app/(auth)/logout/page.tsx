"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/auth-context";

import Link from "next/link";
import { useEffect } from "react";

const LogoutPage = () => {
  const { signOut } = useAuth();
  useEffect(() => {
    localStorage.removeItem("access_token");
    signOut();
  }, []);

  return (
    <main className="h-full w-full">
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>로그아웃</DialogTitle>
            <DialogDescription>안전하게 로그아웃 완료!</DialogDescription>
          </DialogHeader>
          <div>
            <h4 className="text-6xl text-center py-6">😎</h4>
            <h4 className="mt-5 text-center">
              메인 화면으로{" "}
              <Link href={"/"}>
                <u>이동</u>
              </Link>
            </h4>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default LogoutPage;
