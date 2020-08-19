import React from "react";
import { Button } from "react-bootstrap";

export const Thanks = () => (
  <div>
    <h2>Thanks</h2>
    <Button variant="primary" className="mt-4" onClick={() => window.close()}>
      Close
    </Button>
  </div>
);
