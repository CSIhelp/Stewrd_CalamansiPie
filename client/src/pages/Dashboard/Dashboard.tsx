import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Card, Group, Container, Loader, Alert } from "@mantine/core";

// hooks
import useBookmarks from "../../hooks/useBookmark";

import "./Dashboard.css";
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import NewItemCard from "../../components/NewItemCard/NewItemCard";

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

  const token = localStorage.getItem("token") || "";
  const { bookmarks, setBookmarks, loading } = useBookmarks(token);

  return (
    <>
      <div>
        <Header title="Dashboard" />
        <div className="DashboardContainer">
          <SideNavBar />
          <Container className="DashboardCardContainer">
            <Card withBorder radius="md" p="lg" className="DashboardCard">
              <Group className="DashboardTitleCard">
                <h1>Favorites/Bookmarked</h1>
              </Group>

              {/* Favorite Item card */}

              {error && <Alert color="red">{error}</Alert>}
              {loading && <p>Loading bookmarks...</p>}
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
                  isBookmarked={true}
                  onToggleBookmark={() => {}}
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
