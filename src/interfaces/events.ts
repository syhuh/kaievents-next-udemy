export interface EventType {
  name: string;
  organizer: string;
  description: string;
  guests: string[];
  location: string;
  date: string;
  time: string;
  images: string[];
  ticketTypes: {
    name: string;
    price: number;
    limit: number;
  }[];
  createdAt: string;
  updatedAt: string;
  user: any;
  _id: string;
}

export interface BookingType {
  event: EventType;
  ticketType: string;
  ticketsCount: number;
  totalAmount: number;
  paymentId: string;
  user: any;
  _id: string;
  createdAt: string;
  status: string;
}
