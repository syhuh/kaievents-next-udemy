import PageTitle from "@/components/PageTitle";
import EventForm from "../../_components/eventform";
import EventModel from "@/models/event-model";
import { connectDB } from "@/config/dbConfig";

connectDB();

interface Props {
  params: {
    eventid: string;
  };
}

async function EditEventPage({ params }: Props) {
  const eventid = params.eventid;
  const event = await EventModel.findById(eventid);

  return (
    <div>
      <PageTitle title="Edit Event" />
      <div className="bg-white p-5 mt-5">
        <EventForm
          initialData={JSON.parse(JSON.stringify(event))}
          type="edit"
        />
      </div>
    </div>
  );
}
export default EditEventPage;
