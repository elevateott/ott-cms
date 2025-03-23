import React from 'react';
import { Box, Flex, Typography, Button } from '@strapi/design-system';
import { useNavigate } from 'react-router-dom';

const VideoSelector = () => {
  const navigate = useNavigate();

  return (
    <Box padding={8}>
      <Typography variant="alpha">Video Management</Typography>
      <Box paddingTop={4}>
        <Typography variant="epsilon">Select a video type to manage:</Typography>
      </Box>
      <Flex paddingTop={6} gap={4}>
        <Button
          size="L"
          onClick={() => navigate('/content-manager/collection-types/plugin::custom-strapi-plugin-mux.mux-assets')}
        >
          Mux Videos
        </Button>
        <Button
          size="L"
          variant="secondary"
          onClick={() => navigate('/content-manager/collection-types/api::embedded-video.embedded_videos')}
        >
          Embedded Videos
        </Button>
      </Flex>
    </Box>
  );
};

export default VideoSelector;