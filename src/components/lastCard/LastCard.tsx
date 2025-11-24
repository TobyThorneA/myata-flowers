interface LastCardProps {
  nameNav?: () => void;
}

const LastCard = ({nameNav}: LastCardProps) => {

  const handleSeeMore = () => {
    nameNav?.()
  };

  return (
    <div
      className="
        flex flex-col h-full
        bg-colorPrimary rounded-xl shadow-md
        hover:shadow-lg hover:scale-[1.02]
        transition-transform duration-200
        cursor-pointer select-none
        relative overflow-hidden
      "
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={handleSeeMore}
    >
      <img
        src="https://storage.yandexcloud.net/myata-bouquets-v2/13mixRoz/photo_5452037340039082669_y.webp"
        alt="Больше букетов"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <span className="fint-main text-sm md:text-xl text-white text-lg text-center font-semibold group-hover:underline">
          Больше букетов
        </span>
      </div>
    </div>
  );
};

export default LastCard;

