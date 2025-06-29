import './MenupopUp.css';
import React, { useRef, useEffect, useCallback } from 'react';

interface PopupMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  // targetRef is used to position the popup relative to the element that triggered it
  targetRef: React.RefObject<HTMLElement>;
  // Optional prop for custom positioning adjustments (e.g., 'top-left', 'bottom-right')
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const PopupMenu: React.FC<PopupMenuProps> = ({ isOpen, onClose, children, targetRef, position = 'bottom-right' }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Function to calculate and apply popup position
  const setPopupPosition = useCallback(() => {
    if (!isOpen || !popupRef.current || !targetRef.current) {
      return;
    }

    const targetRect = targetRef.current.getBoundingClientRect();
    const popupEl = popupRef.current;

    // Reset inline styles to allow CSS to take over if not specifically overridden
    popupEl.style.top = '';
    popupEl.style.left = '';
    popupEl.style.right = '';
    popupEl.style.bottom = '';
    popupEl.style.transform = '';

    // Determine positioning based on the 'position' prop
    switch (position) {
      case 'bottom-right':
        popupEl.style.top = `${targetRect.bottom + 12}px`; // 8px below the target
        popupEl.style.right = `${window.innerWidth - targetRect.right}px`; // Align right edge with target's right edge
        popupEl.style.left = 'auto'; // Ensure left is not set
        popupEl.style.transform = 'translateX(0)'; // No horizontal translation
        break;
      case 'bottom-left':
        popupEl.style.top = `${targetRect.bottom + 8}px`;
        popupEl.style.left = `${targetRect.left}px`;
        popupEl.style.right = 'auto';
        popupEl.style.transform = 'translateX(0)';
        break;
      case 'top-right':
        popupEl.style.bottom = `${window.innerHeight - targetRect.top + 12}px`; // 8px above the target
        popupEl.style.right = `${window.innerWidth - targetRect.right}px`;
        popupEl.style.left = 'auto';
        popupEl.style.top = 'auto';
        popupEl.style.transform = 'translateX(0)';
        break;
      case 'top-left':
        popupEl.style.bottom = `${window.innerHeight - targetRect.top + 12}px`;
        popupEl.style.left = `${targetRect.left}px`;
        popupEl.style.right = 'auto';
        popupEl.style.top = 'auto';
        popupEl.style.transform = 'translateX(0)';
        break;
      default:
        // Fallback or default behavior if position is not recognized
        popupEl.style.top = `${targetRect.bottom + 12}px`;
        popupEl.style.right = `${window.innerWidth - targetRect.right}px`;
        break;
    }

    // Adjust if popup goes off screen (simple horizontal check for now)
    const popupRect = popupEl.getBoundingClientRect();
    if (popupRect.right > window.innerWidth) {
      // If it goes off the right, align to the right of the screen
      popupEl.style.right = '8px'; // Small margin from right edge
      popupEl.style.left = 'auto';
    }
    if (popupRect.left < 0) {
      // If it goes off the left, align to the left of the screen
      popupEl.style.left = '8px'; // Small margin from left edge
      popupEl.style.right = 'auto';
    }

  }, [isOpen, position, targetRef]);

  // Effect to handle click outside and keyboard events
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close if clicked outside the popup and not on the target element
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      // Recalculate position on window resize and scroll
      window.addEventListener('resize', setPopupPosition);
      window.addEventListener('scroll', setPopupPosition, true); // Use capture phase for scroll
      setPopupPosition(); // Initial position calculation
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', setPopupPosition);
      window.removeEventListener('scroll', setPopupPosition, true);
    };
  }, [isOpen, onClose, targetRef, setPopupPosition]);

  // Re-position on scroll or resize if already open
  useEffect(() => {
    if (isOpen) {
      setPopupPosition();
    }
  }, [isOpen, setPopupPosition]);


  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      className="popup-menu-container"
      // Prevent clicks inside the popup from closing it immediately via handleClickOutside
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default PopupMenu;
