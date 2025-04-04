// File: src/admin/extensions/components/auto-created-cell/index.tsx
import React from 'react';
import { Typography } from '@strapi/design-system';
import { Badge } from '@strapi/design-system';

const AutoCreatedCell = ({ value }: { value: boolean }) => {
  return value ? (
    <Badge backgroundColor="secondary100" textColor="secondary600">Auto</Badge>
  ) : (
    <Typography variant="pi" textColor="neutral600">—</Typography>
  );
};

export default AutoCreatedCell;