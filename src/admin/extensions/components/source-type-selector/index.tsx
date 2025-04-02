// src/admin/extensions/components/source-type-selector/index.tsx
import React from 'react';
import { Box, Flex, Typography, Radio } from '@strapi/design-system';
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin';

// Define types for the form and context
interface FormValues {
  sourceType?: string;
  muxAsset?: any;
  embeddedVideo?: any;
}

const SourceTypeSelector = () => {
  // Use type assertion for the context
  const context = useContentManagerContext();

  // Safely get the modifiedData and onChange function
  const modifiedData = (context as any)?.form?.modifiedData as FormValues || {};
  const onChange = (context as any)?.form?.onChange || ((params: any) => {});

  const sourceType = modifiedData.sourceType || 'Mux';

  const handleSourceTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Update the source type
    onChange({ target: { name: 'sourceType', value } });

    // Clear the relationship that's not being used
    if (value === 'Mux') {
      onChange({ target: { name: 'embeddedVideo', value: null } });
    } else if (value === 'Embedded') {
      onChange({ target: { name: 'muxAsset', value: null } });
    }
  };

  return (
    <Box padding={4} background="neutral100" hasRadius>
      <Typography variant="delta" fontWeight="bold" paddingBottom={4}>
        Video Source
      </Typography>

      <Radio.Group
        name="sourceType"
        onChange={handleSourceTypeChange}
      >
        <Flex gap={4}>
          <Box padding={4} background="neutral0" hasRadius flex="1">
            <Radio.Item value="Mux">
              <Box paddingLeft={2}>
                <Typography fontWeight="bold">Mux Video</Typography>
                <Typography variant="pi">Professional hosting with adaptive streaming</Typography>
              </Box>
            </Radio.Item>
          </Box>

          <Box padding={4} background="neutral0" hasRadius flex="1">
            <Radio.Item value="Embedded">
              <Box paddingLeft={2}>
                <Typography fontWeight="bold">Embedded Video</Typography>
                <Typography variant="pi">Use external HLS streams from any source</Typography>
              </Box>
            </Radio.Item>
          </Box>
        </Flex>
      </Radio.Group>

      {sourceType === 'Mux' && !modifiedData.muxAsset && (
        <Box
          marginTop={4}
          paddingTop={4}
          paddingBottom={2}
          style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#ddd' }}
        >
          <Typography variant="pi">
            No Mux asset connected. Upload a video in the Mux Video panel below.
          </Typography>
        </Box>
      )}

      {sourceType === 'Embedded' && !modifiedData.embeddedVideo && (
        <Box
          marginTop={4}
          paddingTop={4}
          paddingBottom={2}
          style={{ borderTopWidth: '1px', borderTopStyle: 'solid', borderTopColor: '#ddd' }}
        >
          <Typography variant="pi">
            No embedded video connected. Select an embedded video in the panel below.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SourceTypeSelector;