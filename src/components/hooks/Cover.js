const Cover = ({ img, title }) => {
  return (
    <div
      className="hero relative w-full"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "300px",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <h1 className="lg:text-6xl md:text-3xl sm:text-xl text-lg font-bold uppercase text-white">{title}</h1>
      </div>
    </div>
  );
};

export default Cover;
