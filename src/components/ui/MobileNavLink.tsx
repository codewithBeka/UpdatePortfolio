import Link from "next/link";
import { motion } from "framer-motion";

interface MobileNavLinkProps {
  title: string;
  href: string;
  closeMenu: () => void; // Add closeMenu prop
}

const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  title,
  href,
  closeMenu,
}) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-5xl uppercase text-black"
      onClick={closeMenu} // Call closeMenu on click
    >
      <Link href={href}>{title}</Link>
    </motion.div>
  );
};

export default MobileNavLink;
