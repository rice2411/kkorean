import React, { useState, useEffect } from "react";
import { Button } from "@/components/Atoms";

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-5 w-14 h-14 right-5 p-3 !rounded-full shadow-lg"
        >
          ↑
        </Button>
      )}
    </>
  );
};

export default BackToTopButton;
