import ReviewElement from "./reviewElement";

const reviews = [
  {
    name: "Ahmed",
    rating: "3.5",
    review:
      "The laptop performs decently for everyday tasks, but it heats up a bit under heavy load. Build quality is fine for the price.",
  },
  {
    name: "Sara",
    rating: "5.0",
    review:
      "Absolutely love it! Fast boot times, bright screen, and the battery lasts all day. Definitely worth the money.",
  },
  {
    name: "Ali",
    rating: "4.0",
    review:
      "Solid performance and nice keyboard feel. The fan can get noisy when gaming, but overall a great machine.",
  },
  {
    name: "Lina",
    rating: "2.0",
    review:
      "Looks great on paper, but the screen started flickering after a few weeks. Customer support wasn’t very helpful.",
  },
  {
    name: "Hassan",
    rating: "4.5",
    review:
      "Very lightweight and smooth multitasking. Perfect for students and office work. Could use a bit more storage space.",
  },
  {
    name: "Noor",
    rating: "3.0",
    review:
      "Good laptop if you’re not pushing it too hard. It struggles with heavy video editing, but works fine for browsing and streaming.",
  },
];

export default function Reviews() {
  return (
    <div>
      <h1 className="text-center font-bold text-text-heading mb-4">Reviews</h1>
      {reviews.map((review, index) => (
        <ReviewElement
          key={index}
          name={review.name}
          rating={review.rating}
          review={review.review}
          className={
            index % 2 === 0
              ? "bg-background-shade-light"
              : "bg-background-shade-dark/60"
          }
        />
      ))}
    </div>
  );
}
