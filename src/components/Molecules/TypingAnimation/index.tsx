import { Paragraph } from "@/components/Atoms";
import { isAfter, isBefore } from "date-fns";
import { useEffect, useState } from "react";

const TypingAnimation = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (isAfter(currentHour, 5) && isBefore(currentHour, 10)) {
      return ["Chào buổi sáng", "안녕하세요 아침"];
    } else if (isAfter(currentHour, 10) && isBefore(currentHour, 13)) {
      return ["Chào buổi trưa", "좋은 오후에요"];
    } else if (isAfter(currentHour, 13) && isBefore(currentHour, 17)) {
      return ["Chào buổi chiều", "좋은 오후에요"];
    } else {
      return ["Chào buổi tối", "좋은 저녁이에요"];
    }
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
