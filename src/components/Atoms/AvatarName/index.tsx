import React, { useMemo } from "react";

interface AvatarProps {
  name: string;
  size?: number;
}

const AvatarName: React.FC<AvatarProps> = ({ name, size = 10 }) => {
  // Lấy chữ cái đầu tiên từ tên
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  // Hàm để tạo màu ngẫu nhiên
  const randomBgColor = (): string => {
    const colors = [
      "bg-red-500",
      "bg-green-500",
      "bg-blue-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Sử dụng useMemo để chỉ tạo màu ngẫu nhiên khi component được render lần đầu
  const bgColor = useMemo(randomBgColor, []);

  return (
    <div
      className={`flex items-center justify-center rounded-full ${bgColor} text-white font-bold`}
      style={{
        width: `${size * 4}px`, // Điều chỉnh kích thước avatar
        height: `${size * 4}px`, // Điều chỉnh kích thước avatar
        fontSize: `${size * 2}px`, // Điều chỉnh kích thước chữ dựa trên kích thước avatar
      }}
    >
      {initial}
    </div>
  );
};

export default AvatarName;
