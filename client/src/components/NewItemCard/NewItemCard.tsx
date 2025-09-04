import { Card, Text, Group, Button, Divider, ActionIcon } from '@mantine/core';
import { IconArrowRight, IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import type { FC } from 'react';
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
  // Call API to add bookmark
  const handleBookmark = async () => {
    const jwtToken = localStorage.getItem('token'); 
    if (!jwtToken) {
      alert("Please log in first.");
      return;
    }
    try {
      const response = await fetch('https://johnbackend-h8jirnwr3-csis-projects-620122e0.vercel.app/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          cardId,
          title,
          description,
          buttonText,
          buttonLink,
          category,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Bookmarked!");
      } else {
        alert(result.error || "Bookmark failed");
      }
    } catch (error) {
      alert("Network error, try again.");
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
      // Assuming your backend expects DELETE with cardId as param
      const response = await fetch(`https://johnbackend-h8jirnwr3-csis-projects-620122e0.vercel.app/api/bookmarks/bookmarks/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        alert("Removed from bookmarks!");
        if (onToggleBookmark) onToggleBookmark();
      } else {
        alert(result.error || "Remove failed");
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