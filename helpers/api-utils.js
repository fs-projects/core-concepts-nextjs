export function getFeaturedEvents() {
  const data = await fetch(
    "https://nextjs-core-concepts-default-rtdb.firebaseio.com/events.json"
  );
  const events = await data.json();
  return events.filter((event) => event.isFeatured);
}
