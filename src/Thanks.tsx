import React from "react";
import { Button } from "react-bootstrap";
import { IContinuableProps } from "./IContinuableProps";

export const Thanks = ({ onContinue }: IContinuableProps) => (
  <div>
    <h2>Thanks</h2>
    <Button variant="primary" className="mt-4" onClick={onContinue}>
      Reset
    </Button>
  </div>
);
