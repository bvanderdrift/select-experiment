// This is a hacky app, we just ignore these eslint rules
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useMemo, useCallback, useState } from "react";
import { Country, nonDutchCountries } from "./countries";
import { Dropdown, ListGroup, Card, Spinner } from "react-bootstrap";
import Fuse from "fuse.js";
import "./CountryPicker.css";
import Autocomplete from "react-autocomplete";

// Fibbonacci sequence
const countryCountOptions = [3, 5, 8, 13, 21, 34, 55];

export enum SelectionType {
  Autocomplete = "Autocomplete",
  Dropdown = "Dropdown",
  TextualCard = "TextualCard",
  VisualCard = "VisualCard",
}

const pickRandomFromArray = function <T>(theArray: T[]): T {
  const pickedIndex = Math.floor(Math.random() * theArray.length);

  return theArray[pickedIndex];
};

export const CountryInput = ({
  selectionType,
  selectableCountries,
  onSubmit,
}: {
  selectionType: SelectionType;
  selectableCountries: Country[];
  onSubmit: (code: string) => void;
}) => {
  const [typedCountry, setTypedCountry] = useState("");
  const countrySearcher = useMemo(
    () => new Fuse(selectableCountries, { keys: ["name"], threshold: 0.5 }),
    [selectableCountries]
  );
  const filteredCountries = useMemo(
    () =>
      typedCountry !== ""
        ? countrySearcher.search(typedCountry).map(({ item }) => item)
        : selectableCountries,
    [countrySearcher, selectableCountries, typedCountry]
  );

  switch (selectionType) {
    case SelectionType.Autocomplete: {
      return (
        <Autocomplete
          items={filteredCountries}
          getItemValue={(country: Country) => country.name}
          renderItem={(country: Country) => (
            <ListGroup.Item action key={country.code + "option"}>
              {country.name}
            </ListGroup.Item>
          )}
          value={typedCountry}
          onChange={({ target: { value } }) => setTypedCountry(value)}
          onSelect={(value: string, country: Country) => onSubmit(country.code)}
          inputProps={{ placeholder: "e.g. France" }}
        />
      );
    }
    case SelectionType.Dropdown:
      return (
        <Dropdown>
          <Dropdown.Toggle variant="primary">Please Select</Dropdown.Toggle>

          <Dropdown.Menu>
            {selectableCountries.map(({ name, code }) => (
              <Dropdown.Item
                key={code + "option"}
                onClick={() => onSubmit(code)}
              >
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      );
    case SelectionType.TextualCard:
      return (
        <ListGroup>
          {selectableCountries.map(({ name, code }) => (
            <ListGroup.Item
              key={code + "option"}
              onClick={() => onSubmit(code)}
              action
            >
              {name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    case SelectionType.VisualCard:
      return (
        <div className="d-flex flex-wrap text-center">
          {selectableCountries.map(({ name, code }) => (
            <Card
              className="ml-4 mt-4"
              key={code + "option"}
              onClick={() => onSubmit(code)}
              style={{ width: "160px" }}
            >
              <a href="#" className="stretched-link" />
              <Card.Img
                variant="top"
                src={`https://www.countryflags.io/${code.toLowerCase()}/flat/64.png`}
              />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      );
  }
};

export const CountryPicker = ({
  onSubmit,
}: {
  onSubmit: (
    countryCode: string,
    optionCount: number,
    selectionType: SelectionType,
    selectionTime: number
  ) => void;
}) => {
  const startTime = useMemo(() => Date.now(), []);
  const optionCount = useMemo(
    () => pickRandomFromArray(countryCountOptions),
    []
  );
  const selectionType = useMemo(
    () => pickRandomFromArray(Object.values(SelectionType)),
    []
  );
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);

  const selectableCountries = useMemo(() => {
    const tempCountries: Country[] = [{ name: "The Netherlands", code: "NL" }];

    for (
      let index = 0;
      index < optionCount - 1 /*B/c we always take Netherlands*/;
      index++
    ) {
      let extraCountry: Country;

      // Hacky; but to prevent duplicates
      do {
        extraCountry = pickRandomFromArray(nonDutchCountries);
      } while (tempCountries.includes(extraCountry));

      tempCountries.push(extraCountry);
    }

    return tempCountries.sort((a, b) => a.name.localeCompare(b.name));
  }, [optionCount]);

  const handleSubmit = useCallback(
    (countryCode: string) => {
      const selectionTime = Date.now() - startTime;

      // Parent handles what to do with submit; so we just dumbly show spinner and wait to be removed
      setIsShowingSpinner(true);
      onSubmit(countryCode, optionCount, selectionType, selectionTime);
    },
    [onSubmit, optionCount, selectionType, startTime]
  );

  return (
    <div>
      <h2>What country do you live in?</h2>
      <CountryInput
        onSubmit={handleSubmit}
        selectableCountries={selectableCountries}
        selectionType={selectionType}
      />
      {isShowingSpinner && (
        <div>
          <Spinner className="mt-4" animation="border" />
        </div>
      )}
    </div>
  );
};
