import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    body: "Python",
    img: "/python.svg",
  },{
    body: "Data analytics",
    img: "/da.svg",
  },{
    body: "Data science",
    img: "/ds.png",
  },{
    body: "Artificial intelligence",
    img: "/ai.png",
  },{
    body: "Data engineering",
    img: "/de.svg",
  },{
    body: "Apache airflow",
    img: "aa.svg",
  },{
    body: "AWS",
    img: "AWS.svg",
  },{
    body: "Microsoft fabric",
    img: "mf.svg",
  },
  
];


const ReviewCard = ({img,
  body,
}) => {
  return (
    <figure
      className={cn(
        "relative h-full cursor-pointer overflow-hidden px-2 flex justify-center items-center flex-row space-x-1",
      )}
    >
        <img width="24" height="24" alt="" src={img} />
        <blockquote className="text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
