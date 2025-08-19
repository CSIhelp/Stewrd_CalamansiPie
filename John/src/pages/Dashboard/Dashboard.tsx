import React from 'react'
import Header from '../../components/Header/Header'
import { Card, Text, Group, Button, Divider, ActionIcon, Container} from '@mantine/core';
import { SideNavBar } from '../../components/SideNav/SideNavBar'
import './Dashboard.css'; 
import NewItemCard from '../../components/NewItemCard/NewItemCard';
import ReportItemCard from '../../components/ReportItemCard/ReportItemCard';
function Dashboard() {


  return (
    <>
      <div>
      <Header title="Dashboard" />
      <div className='DashboardContainer'>
     <SideNavBar />
<Container className='DashboardCardContainer'>
{/* Favorite / Bookmarked Container */}
 <Card withBorder radius="md" p="lg" className= "DashboardCard">
<Group  className='DashboardTitleCard'>
    <h1>Favorites/Bookmarked</h1>
    </Group>

{/* Favorite Item card 1 Reusable */}
<NewItemCard 
    title="Invoices Upload"
    description="Upload your invoices to the system for processing."
    buttonText="View Portal"
    buttonLink="https://example.com/invoices-upload"
/>
      
         {/* Favorite Item card 2 */}
         <ReportItemCard 
         title='Collection Receipts Google Sheets '
            description='View and manage your collection receipts in Google Sheets.'
            buttonText='View Report'
            buttonLink='https://example.com/collection-receipts'
            />
          
</Card>  
</Container>
     </div>
     </div>
    </>
  )
}


export default Dashboard