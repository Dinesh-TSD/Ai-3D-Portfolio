import { useState, useEffect } from 'react';

export function useTypewriter(roles: string[], speed: number = 80, loop: boolean = true) {
  const [displayed, setDisplayed] = useState('');
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    
    if (!isDeleting && currentCharIndex < currentRole.length) {
      // Typing phase
      const timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentCharIndex === currentRole.length) {
      // Pause before deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentCharIndex > 0) {
      // Deleting phase
      const timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, currentCharIndex - 1));
        setCurrentCharIndex(currentCharIndex - 1);
      }, speed / 2);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentCharIndex === 0) {
      // Move to next role
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentRoleIndex, isDeleting, roles, speed]);

  return displayed;
}