import { RiBookletLine } from "react-icons/ri";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

const links = [
  { id: 1, text: "bookings", path: "/", icon: <RiBookletLine /> },
  {
    id: 2,
    text: "add booking",
    path: "add-booking",
    icon: <IoAddCircleOutline />,
  },
  { id: 3, text: "settings", path: "settings", icon: <FiSettings /> },
];

export default links;
