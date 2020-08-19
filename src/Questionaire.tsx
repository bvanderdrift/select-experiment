import React, { useState, useCallback, useMemo } from "react";
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

  const entriesCollection = useMemo(
    () => firestoreDatabase.collection("entry"),
    []
  );

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

      const newDoc = entriesCollection.doc(uuid());

      await newDoc.set(submission);

      setCurrentStage(Stages.Thanks);
    },
    [entriesCollection, submittedAge]
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
      return <Thanks />;
  }
};
