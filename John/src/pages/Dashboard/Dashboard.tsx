import React from 'react'
import Header from '../../components/Header/Header'
import { Card, Text, Group, Button, Divider, ActionIcon } from '@mantine/core';
import { IconArrowRight, IconBookmark } from '@tabler/icons-react';
import { SideNavBar } from '../../components/SideNav/SideNavBar'
import './Dashboard.css'; 
function Dashboard() {


  return (
    <>
      <div>
      <Header title="Dashboard" />
      <div className='DashboardContainer'>
     <SideNavBar />

{/* Favorite / Bookmarked Container */}
 <Card withBorder radius="md" p="lg" className= "DashboardCard">
<Group  className='DashboardTitleCard'>
    <h1>Favorites/Bookmarked</h1>
    </Group>
{/* Favorite Item card 1 */}
<Card withBorder radius="md" p="lg" className= "FavoriteCard">
      <Group justify="space-between" mb="xs" >
        <Text fw={600}>Collection Receipts Upload</Text>
        <ActionIcon variant="subtle" color="gray">
          <IconBookmark size={18} />
        </ActionIcon>
      </Group>

      <Divider mb="sm" />

      <Text size="sm" c="dimmed" mb="md">
        Upload collection for analysis through our secure portal.
      </Text>

      <Button
        variant="filled"
        color="blue"
        rightSection={<IconArrowRight size={16} />}
        radius="xl"
      >
        View Portal
      </Button>
      </Card> 
      
         {/* Favorite Item card 2 */}
      <Card withBorder radius="md" p="lg" className= "FavoriteCard1">
      <Group justify="space-between" mb="xs" >
        <Text fw={600}>Collection Receipts Google Sheets </Text>
        <ActionIcon variant="subtle" color="gray">
          <IconBookmark size={18} />
        </ActionIcon>
      </Group>

      <Divider mb="sm" />

      <Text size="sm" c="dimmed" mb="md">
     Access the google sheets for Collection Receipt.
      </Text>

      <Button
        variant="filled"
        color="#073041"
        rightSection={<IconArrowRight size={16} />}
        radius="xl"
      >
        View Report
      </Button>
      </Card>
      
    </Card>
     </div>
     </div>
    </>
  )
}


export default Dashboard