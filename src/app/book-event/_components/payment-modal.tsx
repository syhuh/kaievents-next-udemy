import React from "react";
import { Button, Modal, ModalContent } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EventType } from "@/interfaces/events";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface PaymentModalProps {
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  event: EventType;
  ticketType: string;
  ticketsCount: number;
  totalAmount: number;
}

function PaymentModal({
  showPaymentModal,
  setShowPaymentModal,
  event,
  ticketType,
  ticketsCount,
  totalAmount,
}: PaymentModalProps) {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);

      const reqBody = {
        event: event._id,
        ticketType,
        ticketsCount,
        totalAmount,
        paymentId: uuidv4(),
      };

      await axios.post("/api/bookings", reqBody);
      toast.success("Event booked successfully");
      router.push("/bookings");
    } catch (error: any) {
      toast.error(
        "Something went wrong, if you have been charged, please contact us"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={showPaymentModal}
      onClose={() => setShowPaymentModal(false)}
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <form className="p-5" onSubmit={handleSubmit}>
            <h1 className="text-xl">Will you book as it is?</h1>
            <div className="mt-5">
              <p>Ticket Type: {ticketType}</p>
              <p>Tickets Count: {ticketsCount}</p>
              <p>Total Amount: {totalAmount.toLocaleString("ko-KR")}원</p>
            </div>
            <div className="flex justify-end gap-5 mt-5">
              <Button type="button" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit" isLoading={loading}>
                Pay
              </Button>
            </div>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
export default PaymentModal;
