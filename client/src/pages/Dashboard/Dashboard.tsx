import React from 'react'
import {useState, useEffect, useCallback} from 'react'
import { Card, Group, Container, Loader, Alert } from '@mantine/core';


import './Dashboard.css'; 
import Header from '../../components/Header/Header'
import { SideNavBar } from '../../components/SideNav/SideNavBar'
import NewItemCard from '../../components/NewItemCard/NewItemCard';



type Bookmark = {
  _id?: string;
  cardId: number;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  category?: string;
};

function Dashboard() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Use useCallback to avoid unnecessary re-creations
  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const jwtToken = localStorage.getItem('token');
      const clientId = localStorage.getItem('clientId'); 
      const response = await fetch(`https://johnbackend-h8jirnwr3-csis-projects-620122e0.vercel.app/api/bookmarks/bookmarks?user=${clientId}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setBookmarks(data.bookmarks || []);
      } else {
        setError(data.error || "Failed to load bookmarks");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return (
    <>
      <div>
      <Header title="Dashboard" />
      <div className='DashboardContainer'>
     <SideNavBar />
<Container className='DashboardCardContainer'>
 <Card withBorder radius="md" p="lg" className= "DashboardCard">
<Group  className='DashboardTitleCard'>
    <h1>Favorites/Bookmarked</h1>
    </Group>

{/* Favorite Item card */}

          
              {error && <Alert color="red">{error}</Alert>}
              {/* Favorite Item cards */}
{bookmarks.map(bookmark => (
  <NewItemCard
  key={bookmark._id ?? bookmark.cardId}
                  cardId={bookmark.cardId}
                  title={bookmark.title}
                  description={bookmark.description ?? ''}
                  buttonText={bookmark.buttonText ?? ''}
                  buttonLink={bookmark.buttonLink ?? ''}
                  category={bookmark.category ?? ''}
                  isBookmarked={true} 
                  onToggleBookmark={fetchBookmarks}
  />
))}
</Card>  
</Container>
     </div>
     </div>
    </>
  )
}


export default Dashboard