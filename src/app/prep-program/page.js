import Footer from "../components/footer";
import ClientPage from "./ClientPage";

export const metadata = {
  title: "Prep Program | LuxDevHQ",
  description:
    "Short preparatory classes in Power BI, Python, and SQL for learners building foundations before advanced LuxDevHQ data programs.",
};

export default function Page() {
  return (
    <div>
      <ClientPage />
      <Footer />
    </div>
  );
}
