"use client"; // Add this directive

import Image from "next/image";
import styles from "./page.module.css";
import Card1 from "./cards-2.js";
import Card2 from "./cards-1.js";
import Card3 from "./cards-3.js";
import Card4 from "./cards-4.js";
import { useEffect, useState } from "react"; // Import useEffect and useState
import Cr1 from "./cr1.js";
import Cr2 from "./cr2.js";
import SmoothScroll from "./smoothscroll.jsx";

export default function Home(){
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      <header className={styles.head}>
        <div style={{width: "100%", height: "250px", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "40px", overflow: "hidden", position: "fixed",zIndex: "100", backgroundColor: "#191919", opacity:"98%", borderRadius:"70%", boxShadow: "0 20px 30px 0 #000"}}>
          <div style={{width: "100%", marginTop: "60px", height: "200px", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Image
            src="/XNUlogo.png"
            alt="Your logo"
            width={200}
            height={200}
            />
          </div>
        </div>
      </header>
        <div className={styles.cardcontainer2}>
        <SmoothScroll components={[Cr1, Cr2]} />
        </div>
      <main>
      </main>
      <footer>
      </footer>
    </div>
  );
}