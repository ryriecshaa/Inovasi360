import { useEffect, useRef, useState } from "react";
import styles from "./AnimasiBanner.module.scss";

const AnimasiBanner = () => {
  const words = ["business.", "life.", "routines."];
  //   const [currentWord, setCurrentWord] = useState(words[0]);
  const [isJudulBanner, setJudulBanner] = useState("");

  //   useEffect(() => {
  //     const animationInterval = setInterval(() => {
  //       setCurrentWord((prevWord) => {
  //         const currentIndex = words.indexOf(prevWord);
  //         const nextIndex = (currentIndex + 1) % words.length;
  //         return words[nextIndex];
  //       });
  //     }, 6000);

  //     return () => clearInterval(animationInterval);
  //   }, []);

  // const getLastWord = (sentence: string) => {
  //   const wordsArray = sentence.split(" ");
  //   return wordsArray[wordsArray.length - 1];
  // };

  // const animatedLastWord = getLastWord(isJudulBanner);
  return (
    <span>
      {/* {isJudulBanner.replace(animatedLastWord, "")}{" "} */}
      <span className={styles.animasi__animatedWord}>
        <span className={styles.animasi__animatedChangeWord}>
          {/* <span>{animatedLastWord}</span> */}
          <span>{words[0]}</span>
          <span className={styles.animasi__text3}>{words[1]}</span>
          <span className={styles.animasi__text3}>{words[2]}</span>
        </span>
      </span>{" "}
    </span>
  );
};

export default AnimasiBanner;
