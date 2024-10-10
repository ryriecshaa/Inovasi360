import { FilterType } from "@internal/common/type";
import styles from "./FilterDetail.module.scss";
import cn from "classnames";

const FilterDetail = (props: FilterType) => {
  const { label, value } = props;
  const isActive = true; // Tetapkan status isActive ke true agar tombol selalu aktif

  return (
    <div
      data-after={label}
      className={cn(styles.filter, { [styles.filter__active]: isActive })}
    >
      <span>{label}</span>
    </div>
  );
};

export default FilterDetail;
