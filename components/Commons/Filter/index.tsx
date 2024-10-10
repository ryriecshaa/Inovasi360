import { FilterType } from "@internal/common/type";
import styles from "./Filter.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import Link from "next/link";

const Filter = (props: FilterType) => {
  const { label, isActive, onClick } = props;
  const [internalActive, setInternalActive] = useState(isActive || false);

  useEffect(() => {
    setInternalActive(isActive || false);
  }, [isActive]);

  const handleClick = () =>{
    setInternalActive(!internalActive);
    if(onClick){
      onClick();
    }
  }

  return (
    <div
      data-after={label}
      onClick={handleClick}
      className={cn(styles.filter, { [styles.filter__active]: internalActive })}
    >
      <span>{label}</span>
    </div>
  );
};

export default Filter;