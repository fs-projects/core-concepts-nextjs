import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-utils";
import Loader from "../../components/ui/loader/loader";

function AllEventsPage(props) {
  const router = useRouter();
  const events = props.events;
  if (!events) {
    return <Loader />;
  }
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All available events</title>
        <meta
          name="description"
          content="All events in your area are listed in this page"
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events,
    },
  };
}

export default AllEventsPage;
