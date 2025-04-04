// File: src/admin/extensions/components/test-mode-cell/index.tsx
import React from 'react';
import { Typography, Badge } from '@strapi/design-system';

const TestModeCell = ({ value }: { value: boolean }) => {
  return value ? (
    <Badge backgroundColor="danger100" textColor="danger700">Test Mode</Badge>
  ) : (
    <Typography variant="pi" textColor="neutral600">—</Typography>
  );
};

export default TestModeCell;
