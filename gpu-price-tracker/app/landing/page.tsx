import "./landing.scss";
export default function Landing() {
  return (
    <section className="">
      <div className="absolute flex w-full h-full z-10 justify-center items-center">
        <div className=" mb-96">
          <h1 className="font-kinetika">GPU PRICE TRACKER</h1>
        </div>
      </div>
      <div className="noiseOverlay">
        <video
          className="mouse-md opacity-40"
          loop={true}
          muted
          autoPlay
          playsInline
          // poster={}
          data-aos="zoom-in-down"
        >
          <source
            src={
              "https://res.cloudinary.com/dyudvhug1/video/upload/v1716148067/vlc-record-2024-05-18-15h48m58s-ROG_Strix_GeForce_RTX_2080_Ti_and_2080_Graphics_Cards_Victory_Redefined-_erj2nz.mp4"
            }
            type="video/mp4"
          />
        </video>
      </div>
    </section>
  );
}
