import { useState, useEffect } from "react";

interface SvgProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  viewBox?: string;
}

const Svg: React.FC<SvgProps> = ({
  src,
  className = "",
  width = 0,
  height = 0,
  fill = "currentColor",
  viewBox = "0 0 20 20",
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => setSvgContent(data))
      .catch((error) => console.error("Error fetching SVG:", error));
  }, [src]); // Chỉ cập nhật khi src thay đổi

  return (
    <svg
      viewBox={viewBox}
      className={className}
      width={width}
      height={height}
      dangerouslySetInnerHTML={{ __html: svgContent || "" }} // Tránh lỗi nếu svgContent là null
      fill={fill}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    />
  );
};

export default Svg;
