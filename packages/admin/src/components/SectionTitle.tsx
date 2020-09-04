import * as React from "react";
import { Typography } from "@material-ui/core";

export const SectionTitle = ({ label }: { label: string }) => {
  return (
     <Typography variant="h6" gutterBottom>
        {label}
     </Typography>
  );
};