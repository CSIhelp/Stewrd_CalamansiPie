import { Card, Text, Group, Button, Divider, ActionIcon } from "@mantine/core";
import {
  IconArrowRight,
  IconBookmark,
  IconBookmarkFilled,
  IconX,
  IconCheck,
} from "@tabler/icons-react";
import { useState, type FC } from "react";
import { notifications } from "@mantine/notifications";
import useBookmarks  from "../../hooks/useBookmark"; 
import "./NewItemCard.css";
import { useNavigate } from "react-router-dom";


interface NewItemCardProps {
  cardId: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  category: string;
  isBookmarked?: boolean;
  onRemove?: () => void; 
  
}

const NewItemCard: FC<NewItemCardProps> = ({
  cardId,
  title,
  description,
  buttonText,
  buttonLink,
  category,

}) => {
    const navigate = useNavigate();
  const { bookmarks, addBookmark, removeBookmark,fetchBookmarks,loading } = useBookmarks();

  const isBookmarked = bookmarks.some((bm) => bm.cardId === cardId);

  const handleBookmark = async () => {
    try {
      await addBookmark({
        cardId,
        title,
        description,
        buttonText,
        buttonLink,
        category,
      });
       fetchBookmarks();

      notifications.show({
        title: "Bookmark added",
        message: `${title} has been added to favorites.`,
        color: "teal",
        icon: <IconCheck size={20} />,
      });
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to bookmark.",
        color: "red",
        icon: <IconX size={20} />,
      });
    }
  };

  const handleRemoveBookmark = async () => {

 
    try {
      await removeBookmark(cardId);
    fetchBookmarks();
      notifications.show({
        title: "Bookmark removed",
        message: `${title} was removed from favorites.`,
        color: "red",
        icon: <IconCheck size={20} />,
      });
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to remove bookmark.",
        color: "red",
        icon: <IconX size={20} />,
      });
    }
  };




  const handleToggleBookmark = () => {
    if (isBookmarked) {
      handleRemoveBookmark();
         fetchBookmarks();

    } else {
      handleBookmark();
         fetchBookmarks();

    }
  };
  const handleGoToForm = () => {
    navigate(buttonLink);
  };
  return (
    <Card withBorder radius="md" p="lg" className="NewItemCard">
      <Group justify="space-between" mb="xs" className="NewCardGroup">
        <Text fw={600} className="NewCardtTitle">
          {title}
        </Text>
        <ActionIcon
          variant="subtle"
          color="#009444"
          onClick={handleToggleBookmark}
        >
          {isBookmarked ? (
            <IconBookmarkFilled size={16} />
          ) : (
            <IconBookmark size={16} />
          )}
        </ActionIcon>
      </Group>

      <Divider mb="sm" />

      <Text size="sm" c="dimmed" mb="md">
        {description}
      </Text>

      <Button
        component="a"
        onClick={handleGoToForm}
        target="_blank"
        rel="noopener noreferrer"
        variant="filled"
        color="#009444"
        rightSection={<IconArrowRight size={16} />}
        radius="xl"
        className="NewCardtBtn"
      >
        {buttonText}
      </Button>
    </Card>
  );
};

export default NewItemCard;
