import React from 'react';
import './buildingwidget.css';

interface WidgetBoxProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const WidgetBox: React.FC<WidgetBoxProps> = ({ children, style, className }) => {
  return (
    <div className={`widget-box ${className || ''}`} style={style}>
      {children}
    </div>
  );
};

export default WidgetBox;
