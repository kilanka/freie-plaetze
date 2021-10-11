import { Box } from "@chakra-ui/layout";
import React from "react";

import { Institution } from "../../api/generated";

export type InstitutionListItemProps = {
  institution: Pick<Institution, "id" | "name" | "city" | "gender" | "ageFrom" | "ageTo">;
};

export const InstitutionListItem: React.FC<InstitutionListItemProps> = ({ institution }) => {
  return <Box width="100%" bgColor="orange.100" borderRadius="lg" shadow="sm" height="48"></Box>;
};
