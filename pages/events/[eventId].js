import { Fragment } from "react";
import Head from "next/head";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "../../helpers/api-utils";

function SingleEventDetailsPage(props) {
  const { event } = props;
  if (!event) {
    return (
      <Fragment>
        <Head>
          <title>Single event page</title>
          <meta name="description" content={`Single event details page`} />
        </Head>
        <ErrorAlert>
          <p>Loading...</p>
        </ErrorAlert>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>Single event page</title>
        <meta
          name="description"
          content={`Details of the event ${event.title}`}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const eventData = await getEventById(eventId);
  return {
    props: {
      event: eventData,
      revalidate: 30,
    },
  };
}

export async function getStaticPaths() {
  // commenting all events to load only featured events to reduce SSG load. setting fallback to true also because if we
  // don't do it then NextJs will throw 404 error if new path come
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    // fallback: false,
    fallback: true,
  };
}

export default SingleEventDetailsPage;
