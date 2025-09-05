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

import "./UserManagement.css";

const API_BASE =
  "https://johnbackend-h8jirnwr3-csis-projects-620122e0.vercel.app/api/auth";

type User = {
  ClientId: string;
  Role: string;
  Company: string;
  Active: boolean;
};

type DisplayUser = {
  clientId: string;
  role: string;
  isActive: boolean;
};

const UserManagement = () => {
  const [users, setUsers] = useState<DisplayUser[]>([]);
  const [adminCompany, setAdminCompany] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DisplayUser | null>(null);
  const [resetModalOpen, setResetModalOpen] = useState(false);

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
              isActive: u.Active,
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
  const handleCreateAccount = async (data: {
    clientId: string;
    password: string;
    role?: string;
  }) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const activeUsers = users.filter((user) => user.isActive === true);

    if (activeUsers.length >= 3) {
      alert(
        "You can only have a maximum of 3 active accounts (including Admin)."
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
        fetchUsers();
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
    const token = localStorage.getItem("token");
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
        fetchUsers();
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
            label="Maximum of 3 active accounts allowed"
            withArrow
            disabled={users.filter((u) => u.isActive).length < 3} // Show tooltip only when disabled>
          >
            <Button
              className="AddUserButton"
              variant="filled"
              color="blue"
              onClick={() => setAddModalOpen(true)}
              disabled={
                users.filter((user) => user.isActive === true).length >= 3
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
                {users.map((user, index) => (
                  <Table.Tr key={index}>
                    <td>{user.clientId}</td>
                    <td>
                      {user.role === "admin" ? (
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
                      {user.isActive ? (
                        <Badge color="green" variant="light">
                          Active
                        </Badge>
                      ) : (
                        <Badge color="gray" variant="light">
                          Inactive
                        </Badge>
                      )}
                    </td>
                    <td>
                      {/* Change Password of Users */}
                      <Button
                        variant="subtle"
                        color="blue"
                        className="ResetBtn"
                        leftSection={<IconKey size={16} />}
                        onClick={() => handleResetPassword(user)}
                      >
                        Reset Password
                      </Button>

                      {/*  Reset user password */}
                      <ResetPasswordModal
                        opened={resetModalOpen}
                        onClose={() => setResetModalOpen(false)}
                        clientId={selectedUser?.clientId ?? ""}
                        onReset={fetchUsers}
                      />
                      {/* Account User Menu ( Deactivate / Delete) */}
                      <Menu>
                        <MenuTarget>
                          <Button
                            variant="subtle"
                            color="red"
                            className="AccountSettingsBtn"
                          >
                            {<IconUserOff size={16} />}
                          </Button>
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
                              label="Maximum of 3 active accounts allowed"
                              withArrow
                              disabled={
                                users.filter((u) => u.isActive).length < 3
                              } // Show tooltip only when disabled>
                            >
                              <Menu.Item
                                className="ActivateBtn"
                                color="green"
                                leftSection={<IconUserPlus size={16} />}
                                onClick={() => handleReactivateUser(user)}
                                disabled={
                                  users.filter((user) => user.isActive === true)
                                    .length >= 3
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
          <DeactivateAccountModal
            opened={deactivateModalOpen}
            onClose={() => setDeactivateModalOpen(false)}
            clientId={selectedUser?.clientId ?? ""}
            onDeactivated={fetchUsers}
          />
        </Container>
      </div>
    </>
  );
};

export default UserManagement;
