"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="page-content">
      <h1 className="heading">Home</h1>
      <motion.div initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center">
        <p>Welcome to Game Reviews.</p>
        <p>Use the nav bar to browse our list of games and reviews.</p>
      </motion.div>
    </div>
  );
}
