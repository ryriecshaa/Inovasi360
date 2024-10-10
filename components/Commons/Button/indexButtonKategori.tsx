import styles from "./Button.module.scss";
import { Button } from "antd";
import cn from "classnames";
import Link from "next/link";
import { useState } from "react";

type ButtonType = {
  title: string;
  className?: string;
  typeButton: "default" | "outline" | "outline-light";
  href?: string;
  statusActive: boolean;
  onClick?: () => void;
};

const Index = ({ title, typeButton, className, href, statusActive, onClick }: ButtonType) => {
  const [clicked, setClicked] = useState(false); 


  const handleClick = () => {
    setClicked(true);
    if(clicked){
      handleClick
    }
  }

  return (
    <>
      {href ? (
        <Link href={href}>
          <Button
            className={cn(className, {
              [styles.Button]: typeButton === "default",
              [styles.buttonOutlineLight]: typeButton === "outline-light",
              [styles.buttonOutlineKategori]: typeButton === "outline",
              [styles.buttonOutlineKategori__active]: statusActive,
            })}
            data-back={title}
            data-front={title}
          
            onClick={() => {
              if (onClick) {
                onClick();
                }
                setClicked(!clicked)
              }}
          >
            {title}
          </Button>
        </Link>
      ) : (
        <Button
          className={cn(className, {
            [styles.Button]: typeButton === "default",
            [styles.buttonOutlineLight]: typeButton === "outline-light",
            [styles.buttonOutlineKategori]: typeButton === "outline",
            [styles.buttonOutlineKategori__active]: statusActive,
          })}
          data-back={title}
          data-front={title}
          onClick={() => {
            if (onClick) {
              onClick();
              }
              setClicked(!clicked)
            }}
        >
          {title}
        </Button>
      )}
    </>
  );
};

export default Index;
