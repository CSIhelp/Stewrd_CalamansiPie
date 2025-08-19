import { Card, Text, Group, Button, Divider, ActionIcon } from '@mantine/core';
import { IconArrowRight, IconBookmark } from '@tabler/icons-react';
import type { FC } from 'react';
import './ReportItemCard.css';

interface ReportItemCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const ReportItemCard: FC<ReportItemCardProps> = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink 
}) => {
  return (
    <Card withBorder radius="md" p="lg" className="ReportItemCard">
      <Group justify="space-between" mb="xs">
        <Text fw={600}>{title}</Text>
        <ActionIcon variant="subtle" color="gray">
          <IconBookmark size={18} />
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
        color="#073041"
        rightSection={<IconArrowRight size={16} />}
        radius="xl"
      >
        {buttonText}
      </Button>
    </Card>
  );
};

export default ReportItemCard;
