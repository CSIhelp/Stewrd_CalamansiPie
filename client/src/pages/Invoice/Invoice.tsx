import React, { useEffect, useState } from "react";
import { Card, Group, Container } from "@mantine/core";
import "./Invoice.css";

// Import components
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import { NewCardsData } from "../../data/AutomationCardData";

//hooks
import useBookmarks from "../../hooks/useBookmark";

type Bookmark = {
  cardId: number;
};

function Invoice() {
  const { bookmarks, addBookmark, removeBookmark, loading } = useBookmarks();
  const [error, setError] = React.useState<string | null>(null);

  const invoiceCards = NewCardsData.filter(
    (card) => card.category === "Invoice"
  );
  const isBookmarked = (cardId: number): boolean =>
    bookmarks.some((bm) => bm.cardId === cardId);

  return (
    <>
      <div>
        <Header title="Invoices" />
        <div className="InvoiceContainer">
          <SideNavBar />
          <Container className="InvoiceCardContainer">
            <Card withBorder radius="md" p="lg" className="InvoiceCard">
              <Group className="InvoiceTitleCard">
                <h1>New</h1>
              </Group>

              {/* Invoice Item card 1 Reusable uses data.ts */}
              {invoiceCards.map((card) => (
                <NewItemCard
                  key={card.id}
                  cardId={card.id}
                  title={card.title}
                  description={card.description}
                  buttonText={card.buttonText}
                  buttonLink={card.buttonLink}
                  category={card.category}
                />
              ))}
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
}
export default Invoice;
