import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log("session", session);
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Fullscreen video */}
      <video
        src="/videos/home.mp4"
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />

      {/* right half overlay with blend effect */}
      <div className="absolute right-0 top-0 w-1/2 h-full bg-black mix-blend-multiply z-10 flex items-center ">
        <h1 className="text-[200px] text-white font-bold text-center  m-0 pl-0 ">
          Green Doors Association
        </h1>
      </div>
      {/* <button className="absolute left-1/2 top-1/2  z-30  text-white ">
        Tab
      </button> */}
      {/* <img
        src="/readme/hero.png"
        alt="Overlay Image"
        className="absolute bottom-10 left-2/4  w-[40%] h-48 object-cover z-50"
      /> */}
      {/* Optional: Right side transparent section to show clean video (not necessary since no overlay) */}
    </div>
  );
}
