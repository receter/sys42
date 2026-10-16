import "./App.css";

import {
  Button,
  classButtonGroup,
  classCard,
  classContent,
  classTest,
  MenuButton,
  MenuButtonItem,
  Message,
  MessageProps,
  Stack,
  TextLink,
  TextLinkButton,
} from "@sys42/ui";
import { cn } from "@sys42/utils";
import { useState } from "react";

import { initialShips, Ship, ShipStatus, shipStatuses } from "./data";
import { FleetRoster } from "./FleetRoster";
import { PlusIcon, RocketIcon, UserIcon } from "./icons";
import { MissionPlanner } from "./MissionPlanner";
import { ShipDetails } from "./ShipDetails";

export type Alert = {
  id: number;
  variant?: MessageProps["variant"];
  icon: string;
  text: string;
};

let nextAlertId = 3;
let nextShipNumber = 1;

const initialAlerts: Alert[] = [
  {
    id: 1,
    variant: "warning",
    icon: "⚠️",
    text: "Ion storm detected in Sector 7G. Kestrel's sensors may be unreliable.",
  },
  {
    id: 2,
    icon: "📡",
    text: "Routine maintenance window for the Titan Shipyards starts at 0400.",
  },
];

function App() {
  const [ships, setShips] = useState<Ship[]>(initialShips);
  const [selectedShipId, setSelectedShipId] = useState<string | null>(
    initialShips[0].id,
  );
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);

  const selectedShip = ships.find((ship) => ship.id === selectedShipId);

  function addAlert(alert: Omit<Alert, "id">) {
    setAlerts((alerts) => [{ ...alert, id: nextAlertId++ }, ...alerts]);
  }

  function dismissAlert(id: number) {
    setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
  }

  function handleStatusChange(id: string, status: ShipStatus) {
    setShips((ships) =>
      ships.map((ship) => (ship.id === id ? { ...ship, status } : ship)),
    );
    const ship = ships.find((ship) => ship.id === id);
    addAlert({
      icon: "🛰️",
      text: `${ship?.name} is now ${shipStatuses[status].toLowerCase()}.`,
    });
  }

  function handleDecommission(id: string) {
    const ship = ships.find((ship) => ship.id === id);
    setShips((ships) => ships.filter((ship) => ship.id !== id));
    if (selectedShipId === id) {
      setSelectedShipId(null);
    }
    addAlert({
      variant: "danger",
      icon: "🪦",
      text: `${ship?.name} (${ship?.registry}) has been decommissioned.`,
    });
  }

  function handleCommission() {
    const number = nextShipNumber++;
    const ship: Ship = {
      id: `prototype-${number}`,
      name: `Prototype ${number}`,
      registry: `XP-${String(number).padStart(4, "0")}`,
      shipClass: "frigate",
      status: "docked",
      location: "Titan Shipyards",
      crew: 120,
      hull: 100,
      fuel: 100,
    };
    setShips((ships) => [...ships, ship]);
    setSelectedShipId(ship.id);
    addAlert({
      variant: "success",
      icon: "🚀",
      text: `${ship.name} has been commissioned and is ready for duty.`,
    });
  }

  function handleRecallAll() {
    setShips((ships) =>
      ships.map((ship) =>
        ship.status === "repair" ? ship : { ...ship, status: "docked" },
      ),
    );
    addAlert({
      variant: "warning",
      icon: "📣",
      text: "All operational ships have been recalled to their home docks.",
    });
  }

  function handleExport(format: string) {
    addAlert({
      variant: "success",
      icon: "📦",
      text: `Fleet manifest exported as ${format}.`,
    });
  }

  return (
    <div className="app">
      <header className="appHeader">
        <a className="appHeader-brand" href="#">
          <RocketIcon /> Fleet Command
        </a>
        <nav className="appHeader-nav" aria-label="Main">
          <TextLink href="#fleet">Fleet</TextLink>
          <TextLink href="#missions">Missions</TextLink>
          <TextLink href="#log">Captain's log</TextLink>
        </nav>
        <MenuButton label="Cmdr. Vega" icon={<UserIcon />}>
          <MenuButtonItem>Profile</MenuButtonItem>
          <MenuButtonItem>Preferences</MenuButtonItem>
          <MenuButtonItem disabled>Request shore leave</MenuButtonItem>
          <MenuButtonItem>Sign out</MenuButtonItem>
        </MenuButton>
      </header>

      <main className="appMain">
        <Stack spacing="lg">
          {alerts.length > 0 && (
            <Stack spacing="sm" role="log" aria-label="Fleet alerts">
              {alerts.map((alert) => (
                <Message
                  key={alert.id}
                  variant={alert.variant}
                  icon={alert.icon}
                >
                  <span className="alert-text">{alert.text}</span>
                  <TextLinkButton
                    type="button"
                    onClick={() => dismissAlert(alert.id)}
                  >
                    Dismiss
                  </TextLinkButton>
                </Message>
              ))}
            </Stack>
          )}

          <div className="toolbar">
            <h1>Fleet overview</h1>
            <div className={classButtonGroup}>
              <MenuButton label="Export manifest">
                <MenuButtonItem onClick={() => handleExport("CSV")}>
                  CSV
                </MenuButtonItem>
                <MenuButtonItem onClick={() => handleExport("JSON")}>
                  JSON
                </MenuButtonItem>
                <MenuButtonItem onClick={() => handleExport("a holo-scroll")}>
                  Holo-scroll
                </MenuButtonItem>
              </MenuButton>
              <Button
                type="button"
                variant="highlight"
                onClick={handleRecallAll}
              >
                Recall all
              </Button>
              <Button type="button" variant="accent" onClick={handleCommission}>
                <PlusIcon /> Commission ship
              </Button>
            </div>
          </div>

          <div className="layout">
            <section id="fleet" className="layout-roster">
              <FleetRoster
                ships={ships}
                selectedShipId={selectedShipId}
                onSelect={setSelectedShipId}
                onStatusChange={handleStatusChange}
                onDecommission={handleDecommission}
              />
            </section>

            <section className="layout-details" aria-label="Ship details">
              {selectedShip ? (
                <ShipDetails
                  key={selectedShip.id}
                  ship={selectedShip}
                  onStatusChange={handleStatusChange}
                  onDecommission={handleDecommission}
                  onAlert={addAlert}
                />
              ) : (
                <div className={cn(classCard, "emptyState")}>
                  <p>Select a ship from the roster to see its details.</p>
                </div>
              )}
            </section>
          </div>

          <div className="layout">
            <section id="missions" className="layout-roster">
              <MissionPlanner ships={ships} onAlert={addAlert} />
            </section>

            <section
              id="log"
              className={cn(classCard, classContent, "layout-details")}
            >
              <h2>Captain's log</h2>
              <p>
                <strong>Stardate 4521.7.</strong> The fleet holds position near
                the Kepler Belt while the ion storm passes. Morale is high,
                coffee reserves are not.
              </p>
              <h3>Standing orders</h3>
              <ul>
                <li>Keep shields raised when entering Sector 7G.</li>
                <li>Scouts report to Aurora every six hours.</li>
                <li>No unscheduled jumps into the Uncharted Void.</li>
              </ul>
              <p>
                Full archives are available in the{" "}
                <TextLink href="#log">fleet records</TextLink>.
              </p>
            </section>
          </div>
        </Stack>
      </main>

      <footer className="appFooter">
        <span>Fleet Command v0.42 · All systems nominal</span>
        <span className="calibration">
          Display calibration{" "}
          <span className={cn(classTest, "calibration-swatch")} />
        </span>
      </footer>
    </div>
  );
}

export default App;
