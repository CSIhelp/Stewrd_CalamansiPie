import React, { useEffect, useState } from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Invoice.css";


// Import components
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData }  from "../../data/AutomationCardData";

type Bookmark = {
  cardId: number;
};


function Invoice () {
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



 const invoiceCards = NewCardsData.filter(card => card.category === 'Invoice');
   const isBookmarked = (cardId: number): boolean =>
    bookmarks.some(bm => bm.cardId === cardId);
    return(
        <> 
<div>
<Header title="Invoices"/>
<div className="InvoiceContainer">
<SideNavBar />
<Container className="InvoiceCardContainer">
<Card withBorder radius="md" p="lg" className="InvoiceCard">
<Group className="InvoiceTitleCard">
<h1>New</h1>
</Group>

{/* Invoice Item card 1 Reusable uses data.ts */}
 {invoiceCards.map(card => (
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
</div>
  
    </>
    )
}
export default Invoice;
