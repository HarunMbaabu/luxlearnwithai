import LuxDevHQCard from "./card";
import { MarqueeDemo } from "./marquee";

const hero = () => {
  return (
    <div>
      <section className="pt-32 px-4 pb-10">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Build Your Future with LuxDev Academy
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Master Analytics, Data Science, Artificial Intelligence, and Data
            Engineering 10X faster with our hands-on training, AI enabled coach,
            industry experts, and our elite educators.
          </p>

          <div className="max-w-2xl mx-auto mb-10">
            <LuxDevHQCard />
          </div>
        </div>
      </section>
      <section className="px-4 pb-20">
        <div className="container mx-auto max-w-4xl px-4 pb-12">
          <MarqueeDemo />
          <p className="text-muted-foreground text-center mt-5">
            Trusted by fast-growing companies worldwide
          </p>
        </div>
      </section>
    </div>
  );
};

export default hero;
