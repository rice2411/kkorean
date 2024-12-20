import { Paragraph } from "@/components/Atoms";

interface Props {
  color:
    | "blue"
    | "red"
    | "gray"
    | "green"
    | "primary"
    | "indigo"
    | "purple"
    | "pink"
    | "cyan";
  text: string;
  className?: string;
}

const colorClasses: { [key in Props["color"]]: string } = {
  blue: "bg-blue-100 text-blue-800",
  red: "bg-red-100 text-red-800",
  gray: "bg-gray-100 text-gray-800",
  green: "bg-green-100 text-green-800",
  primary: "bg-primary-100 text-primary-800",
  indigo: "bg-indigo-100 text-indigo-800",
  purple: "bg-purple-100 text-purple-800",
  pink: "bg-pink-100 text-pink-800",
  cyan: "bg-cyan-100 text-cyan-800",
};

const Badge: React.FC<Props> = ({ color, text, className }) => {
  return (
    <Paragraph
      className={`${colorClasses[color]} text-xs font-medium px-2 py-0.5 rounded w-max ${className}`}
    >
      {text}
    </Paragraph>
  );
};

export default Badge;
