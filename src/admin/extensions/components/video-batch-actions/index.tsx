// src/admin/extensions/components/video-batch-actions/index.tsx

import React, { useState } from 'react';
import { Box, Button, Loader } from '@strapi/design-system';
import { useNotification } from '@strapi/strapi/admin';
import { Combobox } from '@strapi/ui-primitives';
import { Check } from '@strapi/icons';

// Define the expected shape of each entry
interface Entry {
  id: number | string;
  __isSelected?: boolean;
  [key: string]: any;
}

interface Props {
  entries?: Entry[];
}

const VideoBatchActions = ({ entries = [] }: Props) => {
  const { toggleNotification } = useNotification();

  const [action, setAction] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedEntries = entries.filter((entry) => entry.__isSelected);

  const handleSubmit = async () => {
    const ids = selectedEntries.map((entry) => entry.id);
    if (!ids.length) return;

    try {
      setLoading(true);

      if (action === 'publish' || action === 'unpublish') {
        await fetch('/api/videos/bulk-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids, status: action === 'publish' ? 'published' : 'draft' }),
        });
      } else if (action === 'category') {
        await fetch('/api/videos/bulk-category', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids, category }),
        });
      }

      toggleNotification({
        type: 'success',
        message: 'Bulk update successful!',
      });

      window.location.reload();
    } catch (err) {
      toggleNotification({
        type: 'danger',
        message: 'Bulk action failed.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box padding={4} background="neutral100">
      {loading && <Loader>Processing...</Loader>}

      <Combobox.Root value={action} onValueChange={setAction}>
        <Combobox.Trigger>
          <Combobox.TextInput placeholder="Choose Action" />
          <Combobox.Icon />
        </Combobox.Trigger>
        <Combobox.Portal>
          <Combobox.Content>
            <Combobox.Viewport>
              <Combobox.Item value="publish">
                <Combobox.ItemText>Publish</Combobox.ItemText>
                <Combobox.ItemIndicator><Check /></Combobox.ItemIndicator>
              </Combobox.Item>
              <Combobox.Item value="unpublish">
                <Combobox.ItemText>Unpublish</Combobox.ItemText>
                <Combobox.ItemIndicator><Check /></Combobox.ItemIndicator>
              </Combobox.Item>
              <Combobox.Item value="category">
                <Combobox.ItemText>Assign Category</Combobox.ItemText>
                <Combobox.ItemIndicator><Check /></Combobox.ItemIndicator>
              </Combobox.Item>
              <Combobox.NoValueFound>No value found</Combobox.NoValueFound>
            </Combobox.Viewport>
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox.Root>

      {action === 'category' && (
        <Combobox.Root value={category} onValueChange={setCategory}>
          <Combobox.Trigger>
            <Combobox.TextInput placeholder="Choose Category" />
            <Combobox.Icon />
          </Combobox.Trigger>
          <Combobox.Portal>
            <Combobox.Content>
              <Combobox.Viewport>
                <Combobox.Item value="1">
                  <Combobox.ItemText>Movies</Combobox.ItemText>
                  <Combobox.ItemIndicator><Check /></Combobox.ItemIndicator>
                </Combobox.Item>
                <Combobox.Item value="2">
                  <Combobox.ItemText>Episodes</Combobox.ItemText>
                  <Combobox.ItemIndicator><Check /></Combobox.ItemIndicator>
                </Combobox.Item>
              </Combobox.Viewport>
            </Combobox.Content>
          </Combobox.Portal>
        </Combobox.Root>
      )}

      <Button
        onClick={handleSubmit}
        disabled={selectedEntries.length === 0 || !action}
        variant="default"
        style={{ marginTop: '1rem' }}
      >
        Apply to Selected
      </Button>
    </Box>
  );
};

export default VideoBatchActions;
