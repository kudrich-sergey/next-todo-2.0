import styles from "./skeleton.module.scss";

interface SkeletonProps {
  width: string;
  height: string;
}

export const Skeleton = ({ width, height }: SkeletonProps) => {
  return (
    <div
      className={styles.skeleton}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  );
};
