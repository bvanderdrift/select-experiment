import React from "react";

export const Thanks = ({ identifier }: { identifier: string }) => (
  <div>
    <h2>Thanks</h2>
    <p>
      Please submit the following survey code: <b>{identifier}</b>
    </p>
    <p>After copying the code, you can close this window.</p>
  </div>
);
