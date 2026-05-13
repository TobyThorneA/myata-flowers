interface LastCardProps {
  nameNav?: () => void;
}

const LastCard = ({ nameNav }: LastCardProps) => {
  const handleSeeMore = () => {
    nameNav?.();
  };

  return (
    <div
      className="relative flex h-full cursor-pointer select-none flex-col overflow-hidden rounded-xl bg-colorPrimary shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={handleSeeMore}
    >
      <img
        src="https://storage.yandexcloud.net/myata-bouquets-v2/13mixRoz/photo_5452037340039082669_y.webp"
        alt="Больше букетов"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <span className="fint-main text-center text-lg text-sm font-semibold text-white group-hover:underline md:text-xl">
          Больше букетов
        </span>
      </div>
    </div>
  );
};

export default LastCard;
