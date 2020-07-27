import React, { useState, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useKeyPress } from "./useKeyPress";

export const AgePicker = ({
  onSubmit,
}: {
  onSubmit: (selectedAge: number) => void;
}) => {
  const [selectedAge, setSelectedAge] = useState<number>();
  const submit = useCallback(() => {
    onSubmit(selectedAge || 0 /*Hacky, but quick fix for sake of prototype*/);
  }, [selectedAge, onSubmit]);
  const isEnterPressed = useKeyPress("Enter");
  useEffect(() => {
    if (isEnterPressed) {
      submit();
    }
  }, [isEnterPressed, submit]);

  return (
    <div className="d-flex flex-column align-items-start">
      <h2>What's your age?</h2>
      <input
        type="number"
        placeholder="e.g. 56"
        onChange={({ target: { value } }) => setSelectedAge(parseInt(value))}
      />
      <Button
        className="mt-4"
        variant="primary"
        disabled={selectedAge === undefined}
        onClick={submit}
      >
        Next
      </Button>
    </div>
  );
};
