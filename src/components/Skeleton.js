import SkeletonCard from "./SkeletonCard";
const Skeleton = () => {
  const cards = [];
  for (let i = 0; i < 10; i++) {
    cards.push(i);
  }

  return (
    <div className="flex flex-wrap gap-3 w-full">
      {cards.map((card) => (
        <SkeletonCard key={card} />
      ))}
    </div>
  );
};

export default Skeleton;
