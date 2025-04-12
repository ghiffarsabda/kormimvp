import { LucideProps } from "lucide-react";

// This file contains custom icons that aren't available in lucide-react
export const Bicycle = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
  </svg>
);

export const Running = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M13 4v6l3.5 3.5M14 15l-4-4" />
    <path d="M7 17l3.5-3.5" />
    <path d="M7 3h.382c1.05 0 2.02.584 2.504 1.517l1.33 2.571" />
    <path d="M17.736 20.713l-2.322-2.323a1.687 1.687 0 0 1-.474-1.177v-3.199c0-.207.041-.412.121-.603A3.28 3.28 0 0 1 16 12m2.5 6.5L15 22c-1 0-2-.8-2-2l-1.9-4c-.978-.542-2.1-1.1-2.1-1.1" />
    <path d="M6.4 19.9c0-1-.8-2-2-2h-.5" />
    <circle cx="17.5" cy="6.5" r="2.5" />
  </svg>
);

export const Hiking = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 4-2 6 2 6-2 6" />
    <path d="m16 4-.36 9" />
    <path d="M16 13h-2.5" />
    <path d="M4 12a3.5 3.5 0 0 0 7 0 3.5 3.5 0 0 0-7 0z" />
  </svg>
);

export const SpaIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22c6-3 10-8 10-13C22 5 18 2 12 2S2 5 2 9c0 5 4 10 10 13z" />
    <path d="M12 6c-1.5 2-2 3.1-2 5 0 2 1 3 2 4 1-1 2-2 2-4 0-1.9-.5-3-2-5z" />
    <path d="M5.1 14.5c3.7-1 6.2-.7 7.9.5 1.8-1.2 4.3-1.5 7.9-.5C18.2 17.8 13 19.9 12 22c-1-2.1-6.2-4.2-6.9-7.5z" />
  </svg>
);

export const TableTennisIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 7c-.2-2.4-2.2-4.4-4.6-4.8C5.2 1.8 3.1 3.2 2.5 5.3c-1.5 5.5 1.2 10.8 6.5 12.9 5.2 2.2 11.2.4 14-4.1h0" />
    <path d="M18 19.9c-1.1.5-2.3.9-3.6 1-2.2.2-4.5-.4-6.3-1.5h0" />
    <circle cx="16" cy="6" r="2" />
    <path d="M13.9 8.8l-2.3 2.3c-.5.5-1.2.5-1.7 0l-.5-.5c-.5-.5-.5-1.2 0-1.7l2.3-2.3" />
  </svg>
);

export const SwimmerIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="17" cy="5" r="2" />
    <path d="M21 15.5c-1-1-4-2.5-6.5-2.5-2 0-3 .5-4 1-1.5.8-4 3-6.5 3s-4-1-5-2" />
    <path d="M7 16.5c1-1 4-2.5 6.5-2.5 2 0 3 .5 4 1 1.5.8 4 3 6.5 3" />
    <path d="M7 13c1.1-1 3.4-2 5.5-2 1.5 0 2.5.5 3.5 1 1.5.8 4 3 6 3" />
    <path d="M19 5c-.3 4-.2 7.7 0 9.5" />
  </svg>
);
