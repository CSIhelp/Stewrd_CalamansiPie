import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Table,
  Button,
  Badge,
  Menu,
  MenuTarget,
  MenuItem,
} from "@mantine/core";
import {
  IconUserPlus,
  IconKey,
  IconUserOff,
  IconUserX,
} from "@tabler/icons-react";

import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import AddAccountModal from "../../components/AddAccountModal/AddAccount";
import DeleteUserModal from "../../components/AccountActionsModal/DeleteAccountModal";

const API_BASE = "https://johnbackend-4rssxo1vu-csis-projects-620122e0.vercel.app/api/auth";

type User = {
  ClientId: string;
  Role: string;
  Company: string;
};

type DisplayUser = {
  clientId: string;
  role: string;
};

const UserManagement = () => {
  const [users, setUsers] = useState<DisplayUser[]>([]);
  const [adminCompany, setAdminCompany] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DisplayUser | null>(null);

  // Get admin company from JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API_BASE}/Dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user.company) {
          setAdminCompany(data.user.company);
        }
      });
  }, []);

  // Fetch users for the same company from backend
  const fetchUsers = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API_BASE}/userManagement`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
          console.log("User list response:", data);
        if (data.success && Array.isArray(data.users)) {
          const filteredUsers: DisplayUser[] = data.users
            .filter((u: User) => u.Company === adminCompany)
            .map((u: User) => ({
              clientId: u.ClientId,
              role: u.Role,
            }));
          setUsers(filteredUsers);
        }
      });
  };

  useEffect(() => {
    if (adminCompany) {
      fetchUsers();
    }
  }, [adminCompany]);

  // Add user
  const handleCreateAccount = async (data: { clientId: string; password: string; role?: string }) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (users.length >= 3) {
      alert("You can only have a maximum of 3 accounts (including Admin).");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/userManagement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ClientId: data.clientId,
          Company: adminCompany,
          Password: data.password,
          Role: data.role || "User",
        }),
      });
      const result = await res.json();
      if (result.success) {
        alert(`User ${data.clientId} added successfully!`);
        fetchUsers();
        setAddModalOpen(false);
      } else {
        alert(result.error || "Failed to add user");
      }
    } catch (err) {
      alert("Network error, failed to add user");
    }
  };

  // Delete user
  const handleDeleteUser = async (clientId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/userManagement/${clientId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (res.ok) {
        alert(`User ${clientId} deleted.`);
        fetchUsers();
        setDeleteModalOpen(false);
      } else {
        alert(result.message || "Failed to delete user");
      }
    } catch (err) {
      alert("Network error. Could not delete user.");
    }
  };

  const handleOpenDelete = (user: DisplayUser) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  return (
    <>
      <Header title="User Management" />
      <div className="UserManagementContainer">
        <SideNavBar />
        <Container className="UserManagementCardContainer">
          <Button
            className="AddUserButton"
            variant="filled"
            color="blue"
            onClick={() => setAddModalOpen(true)}
            disabled={users.length >= 3}
            leftSection={<IconUserPlus size={16} />}
          >
            Add User
          </Button>
          <AddAccountModal
            opened={addModalOpen}
            onClose={() => setAddModalOpen(false)}
            onCreate={handleCreateAccount}
            adminCompany={adminCompany}
          />

          <Card withBorder radius="md" p="lg" className="UserManagementCard">
            <Table highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Client ID</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {users.map((user, index) => (
                  <Table.Tr key={index}>
                    <td>{user.clientId}</td>
                    <td>
                      {user.role === "Admin" ? (
                        <Badge color="red" variant="light">
                          Admin
                        </Badge>
                      ) : (
                        <Badge color="blue" variant="light">
                          User
                        </Badge>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="subtle"
                        color="red"
                        onClick={() => handleOpenDelete(user)}
                        leftSection={<IconUserX size={16} />}
                      >
                        Delete
                      </Button>
                    </td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Card>
          <DeleteUserModal
            opened={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            clientId={selectedUser?.clientId ?? ""}
            onDeleted={fetchUsers}
          />
        </Container>
      </div>
    </>
  );
};

export default UserManagement;