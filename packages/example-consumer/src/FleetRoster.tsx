import {
  CheckboxGroup,
  CheckboxGroupItem,
  classCard,
  FormField,
  FormFieldSet,
  Option,
  OverflowMenu,
  OverflowMenuItem,
  Select,
  Stack,
  TextInput,
  TextLinkButton,
} from "@sys42/ui";
import { cn, usePersistentState } from "@sys42/utils";
import { useState } from "react";

import { Ship, ShipClass, shipClasses, ShipStatus, shipStatuses } from "./data";
import { StatusBadge } from "./StatusBadge";

type FleetRosterProps = {
  ships: Ship[];
  selectedShipId: string | null;
  onSelect: (id: string) => void;
  onStatusChange: (id: string, status: ShipStatus) => void;
  onDecommission: (id: string) => void;
};

export function FleetRoster({
  ships,
  selectedShipId,
  onSelect,
  onStatusChange,
  onDecommission,
}: FleetRosterProps) {
  const [search, setSearch] = useState("");
  const [shipClass, setShipClass] = usePersistentState<ShipClass | "all">(
    "fleet-class-filter",
    "all",
  );
  const [statuses, setStatuses] = usePersistentState<string[]>(
    "fleet-status-filter",
    Object.keys(shipStatuses),
  );

  const visibleShips = ships.filter(
    (ship) =>
      (shipClass === "all" || ship.shipClass === shipClass) &&
      statuses.includes(ship.status) &&
      `${ship.name} ${ship.registry}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );

  return (
    <Stack spacing="md">
      <h2>Fleet roster</h2>

      <div className="filters">
        <FormField label="Search">
          {({ htmlFor }) => (
            <TextInput
              id={htmlFor}
              value={search}
              placeholder="Name or registry"
              onValueChange={setSearch}
            />
          )}
        </FormField>
        <FormField label="Ship class">
          {({ htmlFor }) => (
            <Select
              id={htmlFor}
              value={shipClass}
              onValueChange={(value) => setShipClass(value as ShipClass)}
            >
              <Option value="all">All classes</Option>
              {Object.entries(shipClasses).map(([value, label]) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          )}
        </FormField>
      </div>

      <FormFieldSet label="Status">
        <CheckboxGroup
          className="filters-statuses"
          value={statuses}
          onValueChange={setStatuses}
        >
          {Object.entries(shipStatuses).map(([value, label]) => (
            <CheckboxGroupItem key={value} value={value}>
              {label}
            </CheckboxGroupItem>
          ))}
        </CheckboxGroup>
      </FormFieldSet>

      {visibleShips.length === 0 ? (
        <p className="muted">No ships match the current filters.</p>
      ) : (
        <ul className="shipList">
          {visibleShips.map((ship) => (
            <li
              key={ship.id}
              className={cn(
                classCard,
                "shipCard",
                ship.id === selectedShipId && "shipCard_selected",
              )}
            >
              <div className="shipCard-header">
                <TextLinkButton
                  type="button"
                  className="shipCard-name"
                  aria-current={ship.id === selectedShipId || undefined}
                  onClick={() => onSelect(ship.id)}
                >
                  {ship.name}
                </TextLinkButton>
                <OverflowMenu label={`Actions for ${ship.name}`}>
                  <OverflowMenuItem onClick={() => onSelect(ship.id)}>
                    Show details
                  </OverflowMenuItem>
                  <OverflowMenuItem
                    disabled={ship.status === "patrol"}
                    onClick={() => onStatusChange(ship.id, "patrol")}
                  >
                    Send on patrol
                  </OverflowMenuItem>
                  <OverflowMenuItem
                    disabled={ship.status === "docked"}
                    onClick={() => onStatusChange(ship.id, "docked")}
                  >
                    Recall to dock
                  </OverflowMenuItem>
                  <OverflowMenuItem
                    disabled={ship.status === "repair"}
                    onClick={() => onStatusChange(ship.id, "repair")}
                  >
                    Schedule repair
                  </OverflowMenuItem>
                  <OverflowMenuItem onClick={() => onDecommission(ship.id)}>
                    Decommission
                  </OverflowMenuItem>
                </OverflowMenu>
              </div>
              <div className="muted">
                {ship.registry} · {shipClasses[ship.shipClass]} ·{" "}
                {ship.location}
              </div>
              <StatusBadge status={ship.status} />
            </li>
          ))}
        </ul>
      )}
    </Stack>
  );
}
