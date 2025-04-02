// src/admin/extensions/components/video-selector/index.tsx
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Flex,
  Grid, Card, CardBody, CardHeader,
  Loader, EmptyStateLayout
} from '@strapi/design-system'; // Root imports following Design System v2
import { useFetchClient, useNotification } from '@strapi/strapi/admin'; // Updated imports
import { useNavigate } from 'react-router-dom';
import { Plus } from '@strapi/icons';

const VideoSelector = () => {
  const navigate = useNavigate();
  const { get } = useFetchClient();
  const { toggleNotification } = useNotification(); // Updated usage
  interface Video {
    id: string;
    attributes: {
      title: string;
      sourceType: string;
      createdAt: string;
    };
  }

  const [recentVideos, setRecentVideos] = useState<Video[]>([]);
  const [videoStats, setVideoStats] = useState({ total: 0, mux: 0, embedded: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent videos
        const videosResponse = await get('/api/videos?sort=createdAt:desc&pagination[limit]=6&populate=*');
        setRecentVideos(videosResponse.data?.data || []);

        // Get video statistics
        const statsResponse = await get('/api/videos/count');
        const muxResponse = await get('/api/videos/count?filters[sourceType][$eq]=Mux');
        const embeddedResponse = await get('/api/videos/count?filters[sourceType][$eq]=Embedded');

        setVideoStats({
          total: statsResponse.data || 0,
          mux: muxResponse.data || 0,
          embedded: embeddedResponse.data || 0
        });
      } catch (error) {
        toggleNotification({
          type: 'danger', // Changed from 'warning' to 'danger' as per migration guide
          message: 'Failed to load video dashboard data'
        });
        console.error('Error fetching video data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box padding={8}>
      <Box paddingBottom={4}>
        <Flex justifyContent="space-between" alignItems="center">
          <Typography variant="alpha">Video Management Dashboard</Typography>
          <Flex gap={2}>
            <Button
              startIcon={<Plus />}
              onClick={() => navigate('/content-manager/collectionType/api::video.video/create')}
            >
              New Video
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/plugins/custom-strapi-plugin-mux')}
            >
              Upload to Mux
            </Button>
          </Flex>
        </Flex>
      </Box>

      {isLoading ? (
        <Flex justifyContent="center" paddingTop={6} paddingBottom={6}>
          <Loader>Loading video data...</Loader>
        </Flex>
      ) : (
        <>
          {/* Stats Cards */}
          <Grid.Root gap={4}>
            <Grid.Item col={4}>
              <Card>
                <CardBody>
                  <Typography variant="beta">{videoStats.total}</Typography>
                  <Typography variant="pi">Total Videos</Typography>
                </CardBody>
              </Card>
            </Grid.Item>
            <Grid.Item col={4}>
              <Card>
                <CardBody>
                  <Typography variant="beta">{videoStats.mux}</Typography>
                  <Typography variant="pi">Mux Videos</Typography>
                </CardBody>
              </Card>
            </Grid.Item>
            <Grid.Item col={4}>
              <Card>
                <CardBody>
                  <Typography variant="beta">{videoStats.embedded}</Typography>
                  <Typography variant="pi">Embedded Videos</Typography>
                </CardBody>
              </Card>
            </Grid.Item>
          </Grid.Root>

          {/* Quick Actions */}
          <Box paddingTop={6}>
            <Typography variant="delta">Quick Actions</Typography>
            <Grid.Root gap={4} paddingTop={4}>
              <Grid.Item col={3}>
                <Card>
                  <CardBody>
                    <Box paddingBottom={2}>
                      <Typography fontWeight="bold">All Videos</Typography>
                    </Box>
                    <Button fullWidth onClick={() => navigate('/content-manager/collectionType/api::video.video')}>
                      Manage Videos
                    </Button>
                  </CardBody>
                </Card>
              </Grid.Item>
              {/* Additional action cards */}
            </Grid.Root>
          </Box>

          {/* Recent Videos */}
          <Box paddingTop={6}>
            <Typography variant="delta">Recent Videos</Typography>

            {recentVideos.length > 0 ? (
              <Grid.Root gap={4} paddingTop={4}>
                {recentVideos.map((video) => (
                  <Grid.Item col={4} key={video.id}>
                    <Card>
                      <CardHeader>
                        <Typography ellipsis>{video.attributes.title}</Typography>
                      </CardHeader>
                      <CardBody>
                        <Box paddingBottom={2}>
                          <Typography variant="pi" textColor="neutral600">
                            {video.attributes.sourceType} • {new Date(video.attributes.createdAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Button
                          onClick={() => navigate(`/content-manager/collectionType/api::video.video/${video.id}`)}
                        >
                          Edit Video
                        </Button>
                      </CardBody>
                    </Card>
                  </Grid.Item>
                ))}
              </Grid.Root>
            ) : (
              <EmptyStateLayout
                content="No videos found. Start by creating a new video or uploading to Mux."
                action={
                  <Button
                    onClick={() => navigate('/content-manager/collectionType/api::video.video/create')}
                    startIcon={<Plus />}
                  >
                    Create First Video
                  </Button>
                }
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default VideoSelector;