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
const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  
  const BACKEND_URL = "https://johnbackend-ppm2l7jvf-csis-projects-620122e0.vercel.app";

  // Fetch bookmarks 
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const jwtToken = localStorage.getItem('token');
        
        if (!jwtToken) {
          console.log(" No token found in localStorage");
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        console.log(" Fetching bookmarks for PettyCash page...");
        
        const response = await fetch(`${BACKEND_URL}/api/bookmarks/bookmarks`, {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Bookmarks fetched:", data.bookmarks?.length || 0);
        
        setBookmarks(data.bookmarks || []);
        setError(null);
      } catch (err) {
        console.error(" Error fetching bookmarks:", err);
        setError("Failed to load bookmarks");
      } finally {
        setLoading(false);
      }
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
