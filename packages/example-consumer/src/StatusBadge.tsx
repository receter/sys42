import { ShipStatus, shipStatuses } from "./data";

type StatusBadgeProps = {
  status: ShipStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`statusBadge statusBadge_${status}`}>
      {shipStatuses[status]}
    </span>
  );
}
