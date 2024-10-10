import styles from "./Button.module.scss";
import { Button } from "antd";
import cn from "classnames";
import Link from "next/link";
import {ButtonHTMLType} from "antd/lib/button/button"

type ButtonType = {
  title: string;
  className?: string;
  typeButton: "default" | "outline" | "outline-light";
  href?: string;
  onClick?: () => void;
};

const index = ({ title, typeButton, className, href, onClick }: ButtonType) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <Button
            className={cn(className, {
              [styles.Button]: typeButton === "default",
              [styles.buttonOutlineLight]: typeButton === "outline-light",
              [styles.buttonOutline]: typeButton === "outline",
            })}
            data-back={title}
            data-front={title}
          >
            {title}
          </Button>
        </Link>
      ) : (
        <Button
          className={cn(className, {
            [styles.Button]: typeButton === "default",
            [styles.buttonOutlineLight]: typeButton === "outline-light",
            [styles.buttonOutline]: typeButton === "outline",
          })}
          data-back={title}
          data-front={title}
          onClick={onClick}
        >
          {title}
        </Button>
      )}
    </>
  );
};

export default index;
