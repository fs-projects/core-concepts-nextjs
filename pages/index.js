import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";
import { Fragment } from "react";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>List of our featured events</title>
        <meta
          name="description"
          content="Some featured events that are popular and trending"
        />
      </Head>
      <div>
        <EventList items={props.events} />
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
      revalidate: 30,
    },
  };
}

export default HomePage;
