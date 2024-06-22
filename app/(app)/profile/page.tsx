"use client";
import { Faq } from "./_components/faq";
import { Policy } from "./_components/policy";
import { EditProfile } from "./_components/edit-profile";
import { useSearchParams } from "next/navigation";

const ProfilePage = () => {
  const mode = useSearchParams().get("mode");
  console.log(mode);

  return (
    <main className="pl-80 pt-14 h-full grid bg-secondary">
      <section className="h-full px-5 rounded-tl-lg bg-background">
        {mode == null && <EditProfile />}
        {mode == "faq" && <Faq />}
        {mode == "policy" && <Policy />}
      </section>
    </main>
  );
};

export default ProfilePage;
