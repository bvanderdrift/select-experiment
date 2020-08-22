import React, { useState, useCallback, useMemo, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Welcome } from "./Welcome";
import { AgePicker } from "./AgePicker";
import { CountryPicker, SelectionType } from "./CountryPicker";
import { Thanks } from "./Thanks";
import { firestoreDatabase } from "./firebase";

enum Stages {
  Welcome,
  Age,
  Country,
  Thanks,
}

export const Questionaire = () => {
  const [currentStage, setCurrentStage] = useState<Stages>(Stages.Welcome);
  const [submittedAge, setSubmittedAge] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const identifier = useMemo(() => uuid(), []);

  const entriesCollection = useMemo(
    () => firestoreDatabase.collection("entry"),
    []
  );

  useEffect(() => {
    if (hasSubmitted && currentStage !== Stages.Thanks) {
      setCurrentStage(Stages.Thanks);
    }
  }, [currentStage, hasSubmitted]);

  const submitResults = useCallback(
    async (
      countryCode: string,
      optionCount: number,
      selectionType: SelectionType,
      selectionTime: number
    ) => {
      const submission = {
        age: submittedAge,
        countryCode,
        selectionType,
        selectionTime,
        optionCount,
      };

      const newDoc = entriesCollection.doc(identifier);

      await newDoc.set(submission);

      setHasSubmitted(true);
      setCurrentStage(Stages.Thanks);
    },
    [entriesCollection, identifier, submittedAge]
  );

  const handleAgeSubmit = useCallback((age: number) => {
    setSubmittedAge(age);
    setCurrentStage(Stages.Country);
  }, []);

  switch (currentStage) {
    case Stages.Welcome:
      return <Welcome onContinue={() => setCurrentStage(Stages.Age)} />;
    case Stages.Age:
      return <AgePicker onSubmit={handleAgeSubmit} />;
    case Stages.Country:
      return <CountryPicker onSubmit={submitResults} />;
    case Stages.Thanks:
      return (
        <Thanks
          identifier={identifier.slice(0, 8)}
        />
      );
  }
};
