import SkeletonCard from "./SkeletonCard";

const SkeletonHome = () => {
  return (
    <div className="flex flex-wrap gap-10">
      {Array(8).fill().map((_, index) => <SkeletonCard key={index} />)}
    </div>
  );
};

export default SkeletonHome;