import {
  Button,
  Checkbox,
  CheckboxGroup,
  CheckboxGroupItem,
  classButtonGroupReverse,
  classCard,
  FormField,
  FormFieldSet,
  LabeledControl,
  Listbox,
  ListboxItem,
  Option,
  RadioGroup,
  RadioGroupItem,
  Select,
  SplitButton,
  SplitButtonItem,
  Stack,
  TextArea,
  TextInput,
} from "@sys42/ui";
import { useState } from "react";

import type { Alert } from "./App";
import { crewRoles, destinations, Ship } from "./data";
import { RocketIcon } from "./icons";
import { StatusBadge } from "./StatusBadge";

type MissionPlannerProps = {
  ships: Ship[];
  onAlert: (alert: Omit<Alert, "id">) => void;
};

export function MissionPlanner({ ships, onAlert }: MissionPlannerProps) {
  const [name, setName] = useState("");
  const [shipId, setShipId] = useState<string | null>(null);
  const [destination, setDestination] = useState(destinations[0].value);
  const [formation, setFormation] = useState("solo");
  const [roles, setRoles] = useState<string[]>(["pilots", "engineers"]);
  const [briefing, setBriefing] = useState("");
  const [notifyAdmiralty, setNotifyAdmiralty] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const nameError = name.trim() === "" ? "Give the mission a name." : undefined;
  const shipErrors = [
    !shipId && "Assign a ship to the mission.",
    roles.length === 0 && "A ship can't fly without a crew.",
  ].filter((error): error is string => Boolean(error));

  function reset() {
    setName("");
    setShipId(null);
    setDestination(destinations[0].value);
    setFormation("solo");
    setRoles(["pilots", "engineers"]);
    setBriefing("");
    setNotifyAdmiralty(true);
    setIsSubmitted(false);
  }

  function launch(mode: "now" | "scheduled" | "draft") {
    setIsSubmitted(true);
    if (nameError || shipErrors.length > 0) {
      return;
    }
    const ship = ships.find((ship) => ship.id === shipId);
    const destinationLabel = destinations.find(
      (item) => item.value === destination,
    )?.label;
    if (mode === "draft") {
      onAlert({ icon: "📝", text: `Mission “${name}” saved as draft.` });
      return;
    }
    onAlert({
      variant: "success",
      icon: "🚀",
      text:
        mode === "now"
          ? `Mission “${name}” launched: ${ship?.name} is en route to ${destinationLabel}.`
          : `Mission “${name}” scheduled for 0600: ${ship?.name} to ${destinationLabel}.`,
    });
    reset();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    launch("now");
  }

  return (
    <form className={classCard} onSubmit={handleSubmit} noValidate>
      <Stack spacing="md">
        <h2>Plan a mission</h2>

        <FormField
          label="Mission name"
          errorMessage={isSubmitted ? nameError : undefined}
        >
          {({ htmlFor }) => (
            <TextInput
              id={htmlFor}
              value={name}
              placeholder="Operation Stardust"
              onValueChange={setName}
            />
          )}
        </FormField>

        <div className="formRow">
          <FormField
            label="Assigned ship"
            errorMessage={isSubmitted ? shipErrors : undefined}
          >
            {({ htmlFor }) => (
              <Listbox
                id={htmlFor}
                name="ship"
                value={shipId}
                onValueChange={setShipId}
                placeholder="Choose a ship"
              >
                {ships.map((ship) => (
                  <ListboxItem
                    key={ship.id}
                    value={ship.id}
                    textValue={ship.name}
                    disabled={ship.status === "repair"}
                  >
                    <span className="listboxShip">
                      <span>
                        <strong>{ship.name}</strong>{" "}
                        <span className="muted">{ship.registry}</span>
                      </span>
                      <StatusBadge status={ship.status} />
                    </span>
                  </ListboxItem>
                ))}
              </Listbox>
            )}
          </FormField>

          <FormField label="Destination">
            {({ htmlFor }) => (
              <Select
                id={htmlFor}
                name="destination"
                value={destination}
                onValueChange={setDestination}
              >
                {destinations.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            )}
          </FormField>
        </div>

        <div className="formRow">
          <FormFieldSet label="Formation">
            <RadioGroup
              name="formation"
              value={formation}
              onValueChange={setFormation}
            >
              <RadioGroupItem value="solo">Solo flight</RadioGroupItem>
              <RadioGroupItem value="escort">With escort</RadioGroupItem>
              <RadioGroupItem value="convoy">Convoy</RadioGroupItem>
            </RadioGroup>
          </FormFieldSet>

          <FormFieldSet label="Crew roles">
            <CheckboxGroup name="roles" value={roles} onValueChange={setRoles}>
              {crewRoles.map((role) => (
                <CheckboxGroupItem key={role.value} value={role.value}>
                  {role.label}
                </CheckboxGroupItem>
              ))}
            </CheckboxGroup>
          </FormFieldSet>
        </div>

        <FormField label="Briefing">
          {({ htmlFor }) => (
            <TextArea
              id={htmlFor}
              name="briefing"
              rows={4}
              value={briefing}
              placeholder="Objectives, known hazards, snack inventory…"
              onValueChange={setBriefing}
            />
          )}
        </FormField>

        <LabeledControl
          control={
            <Checkbox
              name="notifyAdmiralty"
              checked={notifyAdmiralty}
              onChange={(event) => setNotifyAdmiralty(event.target.checked)}
            />
          }
        >
          Notify the Admiralty
        </LabeledControl>

        <div className={classButtonGroupReverse}>
          <SplitButton
            variant="accent"
            label={
              <>
                <RocketIcon /> Launch mission
              </>
            }
            toggleLabel="More launch options"
            onClick={() => launch("now")}
          >
            <SplitButtonItem onClick={() => launch("scheduled")}>
              Launch at 0600
            </SplitButtonItem>
            <SplitButtonItem onClick={() => launch("draft")}>
              Save as draft
            </SplitButtonItem>
            <SplitButtonItem disabled>Launch into the past</SplitButtonItem>
          </SplitButton>
          <Button type="button" onClick={reset}>
            Reset
          </Button>
        </div>
      </Stack>
    </form>
  );
}
