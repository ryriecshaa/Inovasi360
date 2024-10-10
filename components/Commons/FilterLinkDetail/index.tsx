import { FilterType } from "@internal/common/type";
import styles from "./FilterLinkDetail.module.scss";
import cn from "classnames";
import { useState } from "react";

const FilterLinkDetail = (props: FilterType) => {
  const { label, value } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      data-after={label}
      onClick={() => setIsActive(!isActive)}
      className={cn(styles.filter, { [styles.filter__active]: isActive })}
    >
      <span>{label}</span>
    </div>
  );
};

export default FilterLinkDetail;
