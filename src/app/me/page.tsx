import ReadingList from "./ReadingList";
import ApiToken from "./ApiToken";
import MyProfile from "./MyProfile";

export default function Me() {
  return (
    <section className="max-w-3xl mx-auto my-8 border border-gray-400 px-6 py-3 rounded-lg bg-white">
      <MyProfile />
      <ReadingList />
      <ApiToken />
    </section>
  );
}
