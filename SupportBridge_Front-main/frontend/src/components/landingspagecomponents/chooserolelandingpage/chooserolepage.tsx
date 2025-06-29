import React, { useEffect, useRef, useState } from "react";
import "./ChooseRolePage.css";
import { FaUser, FaBuilding, FaUsers } from "react-icons/fa";

const roles = [
  { label: "Klant", icon: <FaUser />, href: "/klant" },
  { label: "Bedrijf", icon: <FaBuilding />, href: "/bedrijf" },
  { label: "Organisatie", icon: <FaUsers />, href: "/organisatie" },
];

const ChooseRolePage: React.FC = () => {
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          let index = -1;
          const interval = setInterval(() => {
            index++;
            setVisibleIndex(index);
            if (index >= roles.length - 1) clearInterval(interval);
          }, 500);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="choose-role-container" ref={containerRef}>
      <h1 className="choose-title">Maak een keuze</h1>
      <p className="choose-subtitle">Selecteer jouw rol om verder te gaan</p>

      <div className="role-cards">
        {roles.map((role, index) => (
          <a
            href={role.href}
            className={`role-card ${index <= visibleIndex ? "visible" : ""}`}
            key={role.label}
          >
            <h2>{role.label}</h2>
            <div className="role-icon">{role.icon}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ChooseRolePage;
