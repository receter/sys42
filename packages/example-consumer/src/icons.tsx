import { classInlineIcon } from "@sys42/ui";

type IconProps = {
  children: React.ReactNode;
};

function Icon({ children }: IconProps) {
  return (
    <svg
      className={classInlineIcon}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function RocketIcon() {
  return (
    <Icon>
      <path d="M12 2c3 2 5 6 5 10l-2 5H9l-2-5c0-4 2-8 5-10z" />
      <circle cx="12" cy="10" r="2" />
      <path d="M9 17l-3 4M15 17l3 4M12 17v5" />
    </Icon>
  );
}

export function PlusIcon() {
  return (
    <Icon>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  );
}

export function SignalIcon() {
  return (
    <Icon>
      <path d="M5 12a7 7 0 0 1 14 0M8.5 12a3.5 3.5 0 0 1 7 0" />
      <circle cx="12" cy="12" r="1" />
      <path d="M12 13v8" />
    </Icon>
  );
}

export function UserIcon() {
  return (
    <Icon>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </Icon>
  );
}
