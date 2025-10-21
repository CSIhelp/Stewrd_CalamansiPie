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
  Tooltip,
  Group
} from "@mantine/core";
import {
  IconUserPlus,
  IconKey,
  IconUserOff,
  IconUserX,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import AddAccountModal from "../../components/AddAccountModal/AddAccount";
import DeleteUserModal from "../../components/AccountActionsModal/DeleteAccountModal";
import DeactivateAccountModal from "../../components/AccountActionsModal/DeactivateAccountModal";
import ResetPasswordModal from "../../components/ResetPasswordModal/ResetPasswordModal";

// Optimize User Display 
import useUserManagement from "../../hooks/useUserManagement";
import { useSession } from "../../hooks/useSession";

import "./UserManagement.css";

const API_BASE = "https://johnbackend.vercel.app/api/auth";


type User = {
  ClientId: string;
  Role: string;
  Company: string;
  Active: boolean;
  isOnline: boolean;
};

type DisplayUser = {
  clientId: string;
  role: string;
  isActive: boolean;
  isOnline: boolean;
};

const UserManagement = () => {
  const [adminCompany, setAdminCompany] = useState("");
  const { users, setUsers, loading, refreshUsers } = useUserManagement(adminCompany);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DisplayUser | null>(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const currentUser = localStorage.getItem("userRole");
    const { user: currentSessionUser } = useSession();
  // Get admin company from JWT
  useEffect(() => {
    const token = localStorage.getItem("token");
    const firebaseIdToken = localStorage.getItem("firebaseIdToken");
    if (!token) return;

    fetch(`${API_BASE}/Dashboard`, {
      headers: { Authorization: `Bearer ${firebaseIdToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user.company) {
          setAdminCompany(data.user.company);
        }
      });
  }, []);

  // Add user
  const handleCreateAccount = async (data: {
    clientId: string;
    password: string;
    role?: string;
  }) => {
    const token = localStorage.getItem("firebaseIdToken");
    if (!token) return;
    const activeUsers = users.filter((user) => user.isActive === true);

    if (activeUsers.length >= 5) {
      alert(
        "You can only have a maximum of 5 active accounts (including Admin)."
      );
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
          Role: data.role || "user",
        }),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          title: " User Created ",
          message: `User ${data.clientId} added successfully!`,
          color: "teal",
          icon: <IconCheck size={20} />,
        });
        refreshUsers();
        setAddModalOpen(false);
      } else {

        notifications.show({
          title: " Duplicate ClientID ",
          message: ` ${result.error} `  ,
          color: "red",
          icon: <IconX size={20} />,
        });
      }
    } catch (err) {
      alert("Network error, failed to add user");
    }
  };

  // API call for reactivation
  const handleReactivateUser = async (user: DisplayUser) => {
    const token = localStorage.getItem("firebaseIdToken");
    try {
      const res = await fetch(
        `${API_BASE}/userManagement/reactivate/${user.clientId}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const result = await res.json();
      if (result.success) {

          notifications.show({
          title: " User Reactivation ",
          message: `User ${user.clientId} reactivated successfully!`,
          color: "teal",
          icon: <IconCheck size={20} />,
        });
        refreshUsers();
      } else {
          notifications.show({
          title: " User Reactivation Failed ",
          message: `User ${user.clientId} , ${result.error}`,
          color: "teal",
          icon: <IconCheck size={20} />,
        });
      }
    } catch (err) {
      alert("Network error, failed to reactivate user");
    }
  };

  // Delete user modal
  const handleOpenDelete = (user: DisplayUser) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  // Deactivate user modal
  const handleOpenDeactivate = (user: DisplayUser) => {
    setSelectedUser(user);
    setDeactivateModalOpen(true);
  };

  const handleResetPassword = (user: DisplayUser) => {
    setSelectedUser(user);
    setResetModalOpen(true);
  };

  return (
  <>
   <Header title="User Management" />
      <div className="UserManagementContainer">
        <SideNavBar />
        <Container className="UserManagementCardContainer">
          {/* Disabled Buttons message */}
          <Tooltip
            label="Maximum of 5 active accounts allowed"
            withArrow
            disabled={users.filter((u) => u.isActive).length < 5} // Show tooltip only when disabled
          >
            <Button
              className="AddUserButton"
              variant="filled"
              color="#8F87F1"
              onClick={() => setAddModalOpen(true)}
              disabled={
                users.filter((user) => user.isActive === true).length >= 5
              }
              leftSection={<IconUserPlus size={16} />}
            >
              Add User
            </Button>
          </Tooltip>
          <AddAccountModal
            opened={addModalOpen}
            onClose={() => setAddModalOpen(false)}
            onCreate={handleCreateAccount}
            adminCompany={adminCompany}
          />

          <Card withBorder radius="md" p="lg" className="UserManagementCard">
            <Table className="UserInformation" highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Client ID</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {users
                
                  .map((user, index) => (
                    <Table.Tr key={index}>
                      <td data-label="Client Id">{user.clientId}</td>
                      <td data-label="Role">
                        {user.role === "admin" ? (
                          <Badge color="red" variant="light">
                            Admin
                          </Badge>
                        ) : user.role === "accountant" ? (
                          <Badge color="teal" variant="light">
                            Accountant
                          </Badge>
                        ) : (
                          <Badge color="violet" variant="light">
                            User
                          </Badge>
                        )}
                      </td>
                      <td data-label="Status">
                        {user.isActive ? (
                          <Badge color="green" variant="light">
                            Activated
                          </Badge>
                        ) : (
                          <Badge color="gray" variant="light">
                            Deactivated
                          </Badge>
                        )}
                        {user.isOnline ? (
                          <Badge color="green" variant="light">
                            Online
                          </Badge>
                        ) : (
                          <Badge color="gray" variant="light">
                            Offline
                          </Badge>
                        )}
                      </td>

                      <td data-label="Actions">
 {/* Change Password of Users */}{" "}
                        <Group className="UserActions">
                          <Button
                            variant="subtle"
                            color="#8F87F1"
                            className="ResetBtn"
                            leftSection={<IconKey size={16} />}
                            onClick={() => handleResetPassword(user)}
                            disabled={
                              (user.role === "admin" &&
                                currentUser !== "admin") ||
                              (user.role === "accountant" &&
                                currentUser !== "accountant")
                            }
                          >
                            Reset Password
                          </Button>

                          {/*  Reset user password */}
                          <ResetPasswordModal
                            opened={resetModalOpen}
                            onClose={() => setResetModalOpen(false)}
                          
                             
                           clientId={selectedUser?.clientId ?? ""}
                            
                            onReset={refreshUsers}
                            currentUserRole={currentUser ?? ""}
                            currentUserId={currentSessionUser?.id ?? ""}
                          />

                          {/* Account User Menu ( Deactivate / Delete) */}

                          <Menu>
                            <MenuTarget>
                              <Tooltip
                                label={
                                  user.role === "admin" || user.role === "accountant"
                                    ? "Account cannot be deactivated or deleted"
                                    : "Account Settings"
                                }
                                withArrow
                              >
                                <Button
                                  variant="subtle"
                                  color="red"
                                  className="AccountSettingsBtn"
                                  disabled={
                                    user.role === "admin" ||
                                    user.role === "accountant"
                                  }
                                >
                                  {<IconUserOff size={16} />}
                                </Button>
                              </Tooltip>
                            </MenuTarget>

                            <Menu.Dropdown className="AccountActionMenu">
                              {user.isActive ? (
                                <Menu.Item
                                  className="DeactivateBtn"
                                  color="yellow"
                                  leftSection={<IconUserOff size={16} />}
                                  onClick={() => handleOpenDeactivate(user)}
                                >
                                  Deactivate Account?
                                </Menu.Item>
                              ) : (
                                <Tooltip
                                  label="Maximum of 5 active accounts allowed"
                                  withArrow
                                  disabled={
                                    users.filter((u) => u.isActive).length < 5
                                  } // Show tooltip only when disabled>
                                >
                                  <Menu.Item
                                    className="ActivateBtn"
                                    color="green"
                                    leftSection={<IconUserPlus size={16} />}
                                    onClick={() => handleReactivateUser(user)}
                                    disabled={
                                      users.filter(
                                        (user) => user.isActive === true
                                      ).length >= 5
                                    }
                                  >
                                    Activate Account?
                                  </Menu.Item>
                                </Tooltip>
                              )}

                              <Menu.Item
                                className="DeleteBtn"
                                color="red"
                                leftSection={<IconUserX size={16} />}
                                onClick={() => handleOpenDelete(user)}
                              >
                                Delete Account
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        </Group>
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
            onDeleted={refreshUsers}
          />
          <DeactivateAccountModal
            opened={deactivateModalOpen}
            onClose={() => setDeactivateModalOpen(false)}
            clientId={selectedUser?.clientId ?? ""}
            onDeactivated={refreshUsers}
          />
        </Container>
      </div>
    </>
  );
};

export default UserManagement;
