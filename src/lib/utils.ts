import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeDelta(seconds: number){
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const formatted = [];
  if (hours > 0) {
    formatted.push(`${hours}h`);
  }
  if (minutes > 0) {
    formatted.push(`${minutes}m`);
  } 
  if (secs > 0) {
    formatted.push(`${secs}s`);
  }
  return formatted.join(" ");
}