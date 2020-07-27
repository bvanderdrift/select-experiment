import React from "react";
import { Button } from "react-bootstrap";
import { IContinuableProps } from "./IContinuableProps";

export const Welcome = ({ onContinue }: IContinuableProps) => (
  <div className="d-flex flex-column align-items-start">
    <h2>Hi there!</h2>
    <p>Please help me by answering some questions!</p>
    <Button variant="primary mt-4" onClick={onContinue}>
      Let's go!
    </Button>
  </div>
);
