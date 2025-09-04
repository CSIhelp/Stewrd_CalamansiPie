import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Card, Group, Container } from "@mantine/core";
import "./Bills.css";

import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData }  from "../../data/AutomationCardData";


type Bookmark = {
  cardId: number;
};

function Bills() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  // Fetch bookmarks 
  useEffect(() => {
    const fetchBookmarks = async () => {
      const jwtToken = localStorage.getItem('token');
      const clientId = localStorage.getItem('clientId');
      const response = await fetch(`https://johnbackend-h8jirnwr3-csis-projects-620122e0.vercel.app/api/bookmarks/bookmarks?user=${clientId}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });
      const data = await response.json();
      setBookmarks(data.bookmarks || []);
    };
    fetchBookmarks();
  }, []);

  // Filter cards for Bills category
  const billsCards = NewCardsData.filter(card => card.category === 'Bills');

  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some(bm => bm.cardId === cardId);

  return(
    <>
      <Header title="Bills"/>
      <div className="BillsContainer">
        <SideNavBar />
        <Container className="BillsCardContainer">
          <Card withBorder radius="md" p="lg" className="BillsCard">
            <Group className="BillsTitleCard">
              <h1>New</h1>
            </Group>
            {billsCards.map(card => (
              <NewItemCard
                key={card.id}
                cardId={card.id}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                buttonLink={card.buttonLink}
                category={card.category}
                isBookmarked={isBookmarked(card.id)} 
              />
            ))}
          </Card>
        </Container> 
      </div>  
    </>
  );
}
export default Bills;