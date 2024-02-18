import { connectDB } from "@/config/dbConfig";
import { EventType } from "@/interfaces/events";
import BookingModel from "@/models/booking-model";
import EventModel from "@/models/event-model";
import { EventEmitter } from "stream";

connectDB();

interface Props {
  params: {
    eventid: string;
  };
}

async function EventReportPage({ params }: Props) {
  const event: EventType = (await EventModel.findById(params.eventid)) as any;
  const eventBookings = await BookingModel.find({
    event: params.eventid,
    status: "booked",
  });

  let ticketTypesAndTheirRevenue: any = {};

  eventBookings.forEach((booking) => {
    // 이미 존재하는 티켓 타입이면 수량과 수익을 더하고, 아니면 새로운 티켓 타입을 추가
    if (ticketTypesAndTheirRevenue[booking.ticketType]) {
      ticketTypesAndTheirRevenue[booking.ticketType].ticketsSold +=
        booking.ticketsCount;
      ticketTypesAndTheirRevenue[booking.ticketType].revenue +=
        booking.totalAmount;
    } else {
      ticketTypesAndTheirRevenue[booking.ticketType] = {
        ticketsSold: booking.ticketsCount,
        revenue: booking.totalAmount,
      };
    }

    // 버그가 있는 쌤의 코드 {
    // ticketTypesAndTheirRevenue[booking.ticketType] = {
    //   ticketsSold: ticketTypesAndTheirRevenue[booking.ticketType]
    //     ? ticketTypesAndTheirRevenue[booking.ticketType] + booking.ticketsCount
    //     : booking.ticketsCount,
    //   revenue: ticketTypesAndTheirRevenue[booking.ticketType]
    //     ? ticketTypesAndTheirRevenue[booking.ticketType] + booking.totalAmount
    //     : booking.totalAmount,
    // };
    // 버그가 있는 쌤의 코드 }
  });

  const totalRevenue = Object.keys(ticketTypesAndTheirRevenue).reduce(
    (total, ticketType) => {
      return total + ticketTypesAndTheirRevenue[ticketType].revenue;
    },
    0
  );

  return (
    <div>
      <div className="bg-gray-700 p-5 text-white flex flex-col gap-3">
        <h1 className="text-xl md:text-3xl font-semibold">
          {event.name} - Reports
        </h1>
        <div className="text-sm flex flex-col md:flex-row gap-2 md:gap-10 text-gray-200">
          <h1>
            <i className="ri-map-pin-line pr-2"></i> {event.location}
          </h1>
          <h1>
            <i className="ri-calendar-line pr-2"></i> {event.date} at{" "}
            {event.time}
          </h1>
        </div>
      </div>
      <h1 className="text-2xl font-semibold mt-5">
        Ticket Types and Their Revenues
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 mt-5 gap-1 md:gap-5">
        {Object.keys(ticketTypesAndTheirRevenue).map((ticketType) => (
          <div
            key={ticketType}
            className="p-3 bg-white rounded-sm shadow border"
          >
            <h1 className="font-semibold text-lg">{ticketType}</h1>
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-sm text-gray-600 flex justify-between items-center">
                Tickets Sold
                <b>{ticketTypesAndTheirRevenue[ticketType].ticketsSold}</b>
              </span>
              <span className="text-sm text-gray-600 flex justify-between items-center">
                Revenue
                <b>
                  {ticketTypesAndTheirRevenue[
                    ticketType
                  ].revenue.toLocaleString("ko-KR")}
                  원
                </b>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-white rounded p-5 flex justify-between">
        <h1 className="text-3xl font-semibold">Total Revenue</h1>
        <h1 className="text-3xl font-semibold">
          {totalRevenue.toLocaleString("ko-KR")} 원
        </h1>
      </div>
    </div>
  );
}
export default EventReportPage;
