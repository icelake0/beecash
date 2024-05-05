import { Skeleton } from "moti/skeleton";

type SkeletonLoaderProps = {
  colors?: string[];
} & React.ComponentProps<typeof Skeleton>;

const SkeletonLoader: React.FC<SkeletonLoaderProps> = (props) => {
  const colors = [
    "#DDDDDD",
    "#F9F9F9",
    "#F5F5F5",
    "#CCCCCC",
    "#EEEEEE",
    "#DDDDDD",
  ];

  return <Skeleton colors={colors} {...props} />;
};

export default SkeletonLoader;
