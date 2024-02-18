import React from "react";
import { Input, Textarea, Button, Chip } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export interface EventFormStepProps {
  event: any;
  setEvent: React.Dispatch<React.SetStateAction<any>>;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  newlySelectedImages: any[];
  setNewlySelectedImages: React.Dispatch<React.SetStateAction<any[]>>;
  alreadyUploadedImages: string[];
  setAlreadyUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
}

function General({
  event,
  setEvent,
  activeStep,
  setActiveStep,
}: EventFormStepProps) {
  const router = useRouter();
  const [guests, setGuests] = React.useState<string>("");
  const getCommonProps = (name: string) => {
    return {
      labelPlacement: "outside",
      value: event?.[name],
      onChange: (e: any) => setEvent({ ...event, [name]: e.target.value }),
      isRequired: true,
    } as any;
  };
  const onGuestsAdd = () => {
    const newGuests = [];
    const commaSeparatedGuests = guests.split(",");

    // if there are more than one guests in the input, use them
    if (commaSeparatedGuests.length > 0) {
      newGuests.push(...commaSeparatedGuests);
    } else {
      newGuests.push(guests);
    }

    // chekc if there are already guests in the event
    if (event?.guests) {
      newGuests.push(...event.guests);
    }

    console.log("newGuests:", newGuests);

    setEvent({ ...event, guests: newGuests });
    setGuests("");
  };

  const onRemoveGuest = (guestToRemove: number) => {
    const newGuests = event?.guests?.filter(
      (_: any, index: number) => index !== guestToRemove
    );
    setEvent({ ...event, guests: newGuests });
  };

  return (
    <div className="flex flex-col gap-5">
      <Input
        label="Event Name"
        placeholder="Enter event Name"
        {...getCommonProps("name")}
      />
      <Input
        label="Organizer"
        placeholder="Enter Organizer"
        {...getCommonProps("organizer")}
      />
      <Textarea
        label="Description"
        placeholder="Enter Description"
        {...getCommonProps("description")}
      />
      <div className="flex gap-5 items-end">
        <Input
          label="Guests"
          placeholder="Enter your guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          labelPlacement="outside"
        />
        <Button onClick={onGuestsAdd}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-5">
        {event?.guests?.map((guest: string, index: number) => {
          console.log("guest:", guest);
          return <Chip onClose={() => onRemoveGuest(index)}>{guest}</Chip>;
        })}
      </div>
      <div className="flex justify-center gap-5">
        <Button onClick={() => router.push("/")}>Back</Button>
        <Button
          onClick={() => setActiveStep(activeStep + 1)}
          color="primary"
          isDisabled={!event?.name || !event?.organizer || !event?.description}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
export default General;
