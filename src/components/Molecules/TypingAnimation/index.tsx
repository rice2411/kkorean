import { Paragraph } from "@/components/Atoms";
import { useEffect, useState } from "react";

const TypingAnimation = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const getGreeting = () => {
    return [`안녕하세요`, `~ Xin Chào ~`];
  };

  const texts = getGreeting();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isDeleting) {
        if (text.length === 0) {
          setIsDeleting(false);
          setIndex((index + 1) % texts.length);
        } else {
          setText(text.slice(0, -1));
        }
      } else {
        if (text.length < texts[index].length) {
          setText(texts[index].substring(0, text.length + 1));
        } else {
          setIsDeleting(true);
        }
      }
    }, 200);
    return () => clearInterval(intervalId);
  }, [index, text, isDeleting]);

  return (
    <Paragraph className="text-lg font-medium text-gray-700">{text}</Paragraph>
  );
};

export default TypingAnimation;
