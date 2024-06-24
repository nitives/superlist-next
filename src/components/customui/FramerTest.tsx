import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function FramerTest() {
  const [isHover, setHover] = useState(false);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#60f",
          display: "flex",
          placeItems: "center",
          placeContent: "center",
        }}
        animate={{ backgroundColor: isHover ? "#60f" : "#20a5f6" }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          style={{
            width: 150,
            height: 150,
            borderRadius: 30,
            backgroundColor: "#fff",
          }}
          animate={{ scale: isHover ? 0.8 : 1, rotate: isHover ? 90 : 0 }}
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
        />
      </motion.div>
    </AnimatePresence>
  );
}
