import Link from "next/link";
type Room = {
  id: number;
  name: string;
  img: string[]; // Array of image URLs
  desc: string; // Room description
  person: number; // Number of people the room can accommodate
  roomSize: string; // Room size as a string (e.g., "678 sqf | 63 m2")
  prices: {
    high: number; // High price
    low: number; // Low price
    Diciembre: number; // Price for December
    range: {
      low: string; // Low price range start date
      high: string; // High price range end date
    };
  };
};
const RoomsGrid = ({ rooms }: { rooms: Room[] }) => {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="relative">
      <div className="container">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]"
          id="rooms-container"
        >
          {rooms.map((room) => (
            <div
              key={room.id}
              className="overflow-hidden rounded-[10px] border-[1px] border-solid border-[#F1F1F1] max-w-[420px]"
            >
              <div className="relative">
                <Link href={`/detalles?id=${room.id}`}>
                  <h6
                    className="absolute top-[30px] left-[30px] rounded-[6px] text-primary text-[20px] p-[10px_15px] bg-white leading-none"
                    style={{ color: "#b0916b" }}
                  >
                    {formatter.format(room.prices.high)}
                  </h6>
                  <img
                    className="h-[300px]"
                    src={room.img[0]}
                    width="420"
                    height="310"
                    alt="room card"
                  />
                </Link>
              </div>
              <div className="relative p-[30px] pt-[20px]">
                <Link href={`/detalles?id=${room.id}`}>
                  <p
                    className="heading h5 text-2xl "
                    style={{ fontFamily: "GreatVibes" }}
                  >
                    {room.name}
                  </p>
                </Link>
                <div className="flex gap-[20px] items-center mt-2 mb-3 text-[18px] font-jost">
                  <span className="flex gap-2" style={{ fontFamily: "Rubik" }}>
                    <i className="flaticon-construction"></i>
                    {room.roomSize}
                  </span>
                  <span className="flex gap-2" style={{ fontFamily: "Rubik" }}>
                    <i className="flaticon-user"></i>
                    {room.person}
                  </span>
                </div>
                <p
                  className="mb-[15px] text-sm"
                  style={{ fontFamily: "Rubik" }}
                >
                  {room.desc}
                </p>
                <Link href={`/detalles?id=${room.id}`}>
                  <p
                    className="text-[18px] border-b-[#20517] border-solid border-b-[1px] font-jost font-medium bg-[#00beba] p-2 text-center mx-10 rounded-md"
                    style={{ color: "white", fontFamily: "Rubik" }}
                  >
                    Reserva Ahora
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomsGrid;