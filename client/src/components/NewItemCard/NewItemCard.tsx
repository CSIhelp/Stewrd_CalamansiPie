import { Card, Text, Group, Button, Divider, ActionIcon } from '@mantine/core';
import { IconArrowRight, IconBookmark, IconBookmarkFilled, IconX, IconCheck  } from '@tabler/icons-react';
import type { FC } from 'react';
import { notifications } from '@mantine/notifications';
import './NewItemCard.css';

interface NewItemCardProps {
  cardId: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  category: string; 
  isBookmarked?: boolean; 
  onToggleBookmark?: () => void; 
}

const NewItemCard: FC<NewItemCardProps> = ({ 
  cardId, 
  title, 
  description, 
  buttonText, 
  buttonLink,
  category,
  isBookmarked,
  onToggleBookmark
}) => {

  // Add bookmark
  const handleBookmark = async () => {
    const jwtToken = localStorage.getItem('token');
    if (!jwtToken) {
      notifications.show({
        title: 'Not logged in',
        message: 'Please log in to use bookmarks.',
        color: 'red',
        icon: <IconX size={20} />,
      });
      return;
    }

    try {
      const response = await fetch(
        'https://johnbackend-h8jirnwr3-csis-projects-620122e0.vercel.app/api/bookmarks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify({
            cardId,
            title,
            description,
            buttonText,
            buttonLink,
            category,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        notifications.show({
          title: 'Bookmark added',
          message: `${title} has been added to favorites.`,
          color: 'teal',
          icon: <IconCheck size={20} />,
        });
        onToggleBookmark?.();
      } else if (result.error?.toLowerCase().includes('already')) {
        notifications.show({
          title: 'Already bookmarked',
          message: `${title} is already in your favorites.`,
          color: 'yellow',
          icon: <IconX size={20} />,
        });
      } else {
        throw new Error(result.error || 'Bookmark failed');
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.message || 'Network error, try again.',
        color: 'red',
        icon: <IconX size={20} />,
      });
    }
  };


   // Remove bookmark
  const handleRemoveBookmark = async () => {
    const jwtToken = localStorage.getItem('token'); 
    if (!jwtToken) {
      alert("Please log in first.");
      return;
    }
    try {
      const response = await fetch(`https://johnbackend-h8jirnwr3-csis-projects-620122e0.vercel.app/api/bookmarks/bookmarks/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
       notifications.show({
        title: 'Bookmark Removed',
        message:  `${title} was removed in your favorites.` ,
        color: 'red',
        icon: <IconCheck  size={20} />,
      });
        if (onToggleBookmark) onToggleBookmark();
      } else {
        alert(result.error || "Remove failed");
       notifications.show({
        title: 'Bookmark Removed Failed',
        message:  `${result.error}` ,
        color: 'red',
        icon: <IconCheck  size={20} />,
      });        
      }
    } catch (error) {
      alert("Network error, try again.");
    }
  };

  // Toggle handler
  const handleToggleBookmark = () => {
    if (isBookmarked) {
      handleRemoveBookmark();
    } else {
      handleBookmark();
    }
  };


  return (
    <Card withBorder radius="md" p="lg" className="NewItemCard">
      <Group justify="space-between" mb="xs">
        <Text fw={600}>{title}</Text>
        <ActionIcon variant="subtle" color="blue" onClick={handleToggleBookmark}>
           {isBookmarked ? <IconBookmarkFilled size={18} /> : <IconBookmark size={18} />}
        </ActionIcon>
      </Group>

      <Divider mb="sm" />

      <Text size="sm" c="dimmed" mb="md">
        {description}
      </Text>

      <Button
        component="a"
        href={buttonLink}
        target="_blank"
        rel="noopener noreferrer"
        variant="filled"
        color="#29AAE1"
        rightSection={<IconArrowRight size={16} />}
        radius="xl"
      >
        {buttonText}
      </Button>
    </Card>
  );
};

export default NewItemCard;