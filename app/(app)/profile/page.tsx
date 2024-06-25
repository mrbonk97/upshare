"use client";
import { Faq } from "./_components/faq";
import { Policy } from "./_components/policy";
import { EditProfile } from "./_components/edit-profile";
import { useSearchParams } from "next/navigation";

const ProfilePage = () => {
  const mode = useSearchParams().get("mode");

  return (
    <main className="md:pl-80 pt-14 min-h-full grid bg-secondary">
      {mode == null && <EditProfile />}
      {mode == "faq" && <Faq />}
      {mode == "policy" && <Policy />}
    </main>
  );
};

export default ProfilePage;
