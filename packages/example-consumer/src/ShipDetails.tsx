import {
  Button,
  ButtonA,
  Checkbox,
  classButtonGroup,
  classCard,
  FormFieldSet,
  Label,
  LabeledControl,
  MenuButton,
  MenuButtonItem,
  Radio,
  RadioGroup,
  RadioGroupItem,
  Stack,
} from "@sys42/ui";
import { useState } from "react";

import type { Alert } from "./App";
import { Ship, shipClasses, ShipStatus, shipStatuses } from "./data";
import { SignalIcon } from "./icons";
import { StatusBadge } from "./StatusBadge";

type ShipDetailsProps = {
  ship: Ship;
  onStatusChange: (id: string, status: ShipStatus) => void;
  onDecommission: (id: string) => void;
  onAlert: (alert: Omit<Alert, "id">) => void;
};

const alertConditions = ["green", "yellow", "red"] as const;

type AlertCondition = (typeof alertConditions)[number];

export function ShipDetails({
  ship,
  onStatusChange,
  onDecommission,
  onAlert,
}: ShipDetailsProps) {
  const [driveMode, setDriveMode] = useState("impulse");
  const [condition, setCondition] = useState<AlertCondition>("green");
  const [shieldsRaised, setShieldsRaised] = useState(true);
  const [cloakEngaged, setCloakEngaged] = useState(false);

  const canCloak = ship.shipClass === "scout" || ship.shipClass === "frigate";

  function handleHail() {
    onAlert({
      icon: "📞",
      text: `Hailing ${ship.name}… Captain on screen in 3, 2, 1.`,
    });
  }

  function handleConditionChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as AlertCondition;
    setCondition(value);
    if (value === "red") {
      onAlert({
        variant: "danger",
        icon: "🚨",
        text: `Red alert on ${ship.name}! All hands to battle stations.`,
      });
    }
  }

  return (
    <div className={classCard}>
      <Stack spacing="lg">
        <div className="details-header">
          <div>
            <h2>{ship.name}</h2>
            <div className="muted">
              {ship.registry} · {shipClasses[ship.shipClass]} · Crew of{" "}
              {ship.crew.toLocaleString()}
            </div>
          </div>
          <StatusBadge status={ship.status} />
        </div>

        <div className="gauges">
          <div className="gauge">
            <Label htmlFor={`hull-${ship.id}`}>Hull integrity</Label>
            <meter
              id={`hull-${ship.id}`}
              min={0}
              max={100}
              low={50}
              high={80}
              optimum={100}
              value={ship.hull}
            />
            <span className="muted">{ship.hull}%</span>
          </div>
          <div className="gauge">
            <Label htmlFor={`fuel-${ship.id}`}>Fuel reserves</Label>
            <meter
              id={`fuel-${ship.id}`}
              min={0}
              max={100}
              low={35}
              high={70}
              optimum={100}
              value={ship.fuel}
            />
            <span className="muted">{ship.fuel}%</span>
          </div>
        </div>

        <div className="details-systems">
          <FormFieldSet label="Drive mode">
            <RadioGroup
              name={`drive-${ship.id}`}
              value={driveMode}
              onValueChange={setDriveMode}
            >
              <RadioGroupItem value="station">Station keeping</RadioGroupItem>
              <RadioGroupItem value="impulse">Impulse</RadioGroupItem>
              <RadioGroupItem value="warp">Warp</RadioGroupItem>
              <RadioGroupItem value="jump" disabled={ship.fuel < 50}>
                Hyperjump (needs 50% fuel)
              </RadioGroupItem>
            </RadioGroup>
          </FormFieldSet>

          <FormFieldSet label="Alert condition">
            {alertConditions.map((value) => (
              <LabeledControl
                key={value}
                control={
                  <Radio
                    name={`condition-${ship.id}`}
                    value={value}
                    checked={condition === value}
                    onChange={handleConditionChange}
                  />
                }
              >
                {`Condition ${value}`}
              </LabeledControl>
            ))}
          </FormFieldSet>

          <FormFieldSet label="Defenses">
            <LabeledControl
              control={
                <Checkbox
                  checked={shieldsRaised}
                  onChange={(event) => setShieldsRaised(event.target.checked)}
                />
              }
            >
              Shields raised
            </LabeledControl>
            <LabeledControl
              control={
                <Checkbox
                  checked={canCloak && cloakEngaged}
                  disabled={!canCloak}
                  onChange={(event) => setCloakEngaged(event.target.checked)}
                />
              }
            >
              {canCloak ? "Cloaking device" : "Cloaking device (not fitted)"}
            </LabeledControl>
          </FormFieldSet>
        </div>

        <div className={classButtonGroup}>
          <Button type="button" onClick={handleHail}>
            <SignalIcon /> Hail
          </Button>
          <ButtonA href="#log">Open logbook</ButtonA>
          <MenuButton label="Reassign">
            {Object.entries(shipStatuses).map(([value, label]) => (
              <MenuButtonItem
                key={value}
                disabled={value === ship.status}
                onClick={() => onStatusChange(ship.id, value as ShipStatus)}
              >
                {label}
              </MenuButtonItem>
            ))}
          </MenuButton>
        </div>

        <div className="dangerZone">
          <div>
            <strong>Danger zone</strong>
            <div className="muted">
              Decommissioning removes the ship from the active fleet.
            </div>
          </div>
          <Button
            type="button"
            variant="danger"
            size="lg"
            onClick={() => onDecommission(ship.id)}
          >
            Decommission
          </Button>
        </div>
      </Stack>
    </div>
  );
}
