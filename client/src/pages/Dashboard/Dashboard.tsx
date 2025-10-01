import React, { useState, useEffect } from "react";
import { Card, Group, Container, Loader, Alert, Center } from "@mantine/core";

// hooks
import useBookmarks from "../../hooks/useBookmark";
import PresenceManager from "../../hooks/PresenceManager";

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

  const { bookmarks, removeBookmark, loading } = useBookmarks();

  // Optimistic local state update for bookmarks
  const [localBookmarks, setLocalBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setLocalBookmarks(bookmarks);
  }, [bookmarks]);

  // Check first login
  useEffect(() => {
    if (localStorage.getItem("firstLogin") === "true") {
      setShowFirstLoginModal(true);
    }
  }, []);

  const handleRemove = async (id: number) => {
    try {
      // Optimistically remove from local state
      setLocalBookmarks(prev => prev.filter(b => b.cardId !== id));
      await removeBookmark(id);
    } catch (err) {
      setError("Failed to remove bookmark");
    }
  };

  return (
    <>
      <PresenceManager />
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
              <h1>Favorites / Bookmarked</h1>
            </Group>

            {/* Loading State */}
            {loading && (
              <Center my="md">
                <Loader variant="dots" />
              </Center>
            )}

            {/* Error State */}
            {error && (
              <Alert color="red" mt="md">
                {error}
              </Alert>
            )}

            {/* Favorite Item Cards */}
            {localBookmarks.map(bookmark => (
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

            {/* Empty State */}
            {!loading && localBookmarks.length === 0 && (
              <Center my="md">
                <p>No bookmarks yet.</p>
              </Center>
            )}
          </Card>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
