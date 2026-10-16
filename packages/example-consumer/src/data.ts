export type ShipClass =
  | "scout"
  | "frigate"
  | "cruiser"
  | "carrier"
  | "freighter";

export type ShipStatus = "docked" | "patrol" | "mission" | "repair";

export type Ship = {
  id: string;
  name: string;
  registry: string;
  shipClass: ShipClass;
  status: ShipStatus;
  location: string;
  crew: number;
  hull: number;
  fuel: number;
};

export const shipClasses: Record<ShipClass, string> = {
  scout: "Scout",
  frigate: "Frigate",
  cruiser: "Cruiser",
  carrier: "Carrier",
  freighter: "Freighter",
};

export const shipStatuses: Record<ShipStatus, string> = {
  docked: "Docked",
  patrol: "On patrol",
  mission: "On mission",
  repair: "Under repair",
};

export const initialShips: Ship[] = [
  {
    id: "aurora",
    name: "Aurora",
    registry: "NX-4201",
    shipClass: "cruiser",
    status: "patrol",
    location: "Kepler Belt",
    crew: 412,
    hull: 92,
    fuel: 68,
  },
  {
    id: "kestrel",
    name: "Kestrel",
    registry: "SC-0117",
    shipClass: "scout",
    status: "mission",
    location: "Outer Rim, Sector 7G",
    crew: 12,
    hull: 74,
    fuel: 31,
  },
  {
    id: "leviathan",
    name: "Leviathan",
    registry: "CV-0009",
    shipClass: "carrier",
    status: "docked",
    location: "Titan Shipyards",
    crew: 2380,
    hull: 100,
    fuel: 97,
  },
  {
    id: "marigold",
    name: "Marigold",
    registry: "FR-3380",
    shipClass: "freighter",
    status: "repair",
    location: "Ceres Drydock",
    crew: 36,
    hull: 41,
    fuel: 55,
  },
  {
    id: "vanguard",
    name: "Vanguard",
    registry: "FG-1442",
    shipClass: "frigate",
    status: "patrol",
    location: "Mars Orbit",
    crew: 188,
    hull: 86,
    fuel: 72,
  },
  {
    id: "zephyr",
    name: "Zephyr",
    registry: "SC-0204",
    shipClass: "scout",
    status: "docked",
    location: "Luna Station",
    crew: 9,
    hull: 98,
    fuel: 100,
  },
];

export const destinations = [
  { value: "europa", label: "Europa Research Outpost" },
  { value: "kepler", label: "Kepler Belt Mining Colony" },
  { value: "proxima", label: "Proxima Centauri b" },
  { value: "trappist", label: "TRAPPIST-1 Relay" },
  { value: "void", label: "The Uncharted Void" },
];

export const crewRoles = [
  { value: "pilots", label: "Pilots" },
  { value: "engineers", label: "Engineers" },
  { value: "medics", label: "Medics" },
  { value: "marines", label: "Marines" },
  { value: "science", label: "Science officers" },
];
