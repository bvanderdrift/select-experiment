import React from "react";

export const Thanks = ({ identifier }: { identifier: string }) => (
  <div>
    <h2>Thanks</h2>
    <p>
      Please submit the following survey code: <b>{identifier}</b>
    </p>
  </div>
);
