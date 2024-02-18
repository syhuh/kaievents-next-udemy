import { Input, Button, user } from "@nextui-org/react";
import { EventFormStepProps } from "./General";
import { useRouter } from "next/navigation";

function LocationAndDate({
  event,
  setEvent,
  activeStep,
  setActiveStep,
}: EventFormStepProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <Input
        label="Location"
        placeholder="Location"
        value={event?.location}
        onChange={(e) => setEvent({ ...event, location: e.target.value })}
        isRequired={true}
        labelPlacement="outside"
      />
      <div className="flex gap-5">
        <Input
          label="Date"
          placeholder="Date"
          value={event?.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          isRequired={true}
          labelPlacement="outside"
          type="date"
        />
        <Input
          label="Time"
          placeholder="Time"
          value={event?.time}
          onChange={(e) => setEvent({ ...event, time: e.target.value })}
          isRequired={true}
          labelPlacement="outside"
          type="time"
        />
      </div>
      <div className="flex justify-center gap-5">
        <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
        <Button
          onClick={() => setActiveStep(activeStep + 1)}
          color="primary"
          isDisabled={!event?.location || !event?.date || !event?.time}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
export default LocationAndDate;
