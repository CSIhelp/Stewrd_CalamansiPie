import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Card, Group, Container, Loader, Alert } from "@mantine/core";

// hooks
import useBookmarks from "../../hooks/useBookmark";

import "./Dashboard.css";
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";
import AdminPassword from "../../components/AdminPassword/AdminPassword";

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
  const [error, setError] = useState<string | null>(null);
  const [showFirstLoginModal, setShowFirstLoginModal] = useState(false);

  const firebaseIdToken = localStorage.getItem("firebaseIdToken");
  const token = localStorage.getItem("token") || "";
  const { bookmarks, removeBookmark, loading, fetchBookmarks } = useBookmarks();

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin") === "true";
    if (firstLogin) setShowFirstLoginModal(true);
 
  }, []);

  const handleRemove = async (id: number) => {
    await removeBookmark(id);
    fetchBookmarks();
  };


  return (
    <>
      <div>

        <AdminPassword
        opened={showFirstLoginModal}
        onClose={() => {
          setShowFirstLoginModal(false);
          localStorage.removeItem("firstLogin"); 
        }}
        clientId={localStorage.getItem("clientId") || ""}
        firebaseIdToken={localStorage.getItem("firebaseIdToken") || ""}
      />
        <Header title="Dashboard" />
        <div className="DashboardContainer">
          <SideNavBar />
          <Container className="DashboardCardContainer">
            <Card withBorder radius="md" p="lg" className="DashboardCard">
              <Group className="DashboardTitleCard">
                <h1>Favorites/Bookmarked</h1>
              </Group>
 {loading && <p>Loading bookmarks...</p>}

              {/* Favorite Item card */}

              {error && <Alert color="red">{error}</Alert>}
          
              {/* Favorite Item cards */}
              {bookmarks.map((bookmark) => (
                <NewItemCard
                  key={bookmark._id ?? bookmark.cardId}
                  cardId={bookmark.cardId}
                  title={bookmark.title}
                  description={bookmark.description ?? ""}
                  buttonText={bookmark.buttonText ?? ""}
                  buttonLink={bookmark.buttonLink ?? ""}
                  category={bookmark.category ?? ""}
                  isBookmarked
                  onRemove={() => handleRemove(bookmark.cardId)}
                />
              ))}
             
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
