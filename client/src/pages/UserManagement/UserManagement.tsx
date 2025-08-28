import React, { useState, useEffect } from "react";
import { Card, Group, Container, Table, Checkbox, Button, Badge, Modal} from "@mantine/core";
import "./UserManagement.css";
import { IconUserPlus, IconKey, IconUserOff  } from '@tabler/icons-react';
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import {useDisclosure} from "@mantine/hooks"
import AddAccountModal from "../../components/AddAccountModal/AddAccount";


const UserManagement = () => {

// Sample users data ( save to local storage only)
  const [users, setUsers] = useState<{ clientId: string; role: string }[]>([]);


// Modal 

const [addModalOpen, setAddModalOpen] =useState (false);
 //  Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      
      const defaultUsers = [{ clientId: "AV84320", role: "Admin" }];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
      setUsers(defaultUsers);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  //  Add user (max 3 including Admin)
  const handleCreateAccount = (data: { clientId: string; password: string }) => {
    if (users.length >= 3) {
      alert("You can only have a maximum of 3 accounts (including Admin).");
      return;
    }

    const newUser = { clientId: data.clientId, role: "User" };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    alert(`User ${data.clientId} added successfully!`);
  };

//  Prepare for Database/ Backend connection
//  const handleCreateAccount = async (data: { clientId: string; password: string }) => {
//     console.log('Data ready to send to backend:', data);

//     try {
//       const response = await fetch('/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create account');
//       }

//       alert('Account created successfully!');
//     } catch (error) {
//       console.error(error);
//       alert('Error creating account');
//     }
//   };

    return (
        <>
        <Header title="User Management" />
        <div className="UserManagementContainer">
            <SideNavBar />
            <Container className="UserManagementCardContainer">
                <Button className="AddUserButton" variant="Filled" color="blue" onClick={() => setAddModalOpen(true) }   disabled={users.length >= 3} leftSection={<IconUserPlus size={16}/>}   >
                Add User
                </Button>
                  <AddAccountModal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onCreate={handleCreateAccount}
      />
                
            <Card withBorder radius="md" p="lg" className="UserManagementCard">
            <Table className="UserInformation" highlightOnHover withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Client ID</Table.Th>
                        <Table.Th>Role</Table.Th>
                      
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {users.map((user, index) => (
                        <Table.Tr key={index} >
                            <td style={{ padding: ' 16px' }}>{user.clientId}</td>
                            <td>
                                {user.role === 'Admin' ? (
                                    <Badge color="red" variant="light">Admin</Badge>
                                ) : (
                                    <Badge color="blue" variant="light">User</Badge>
                                )}
                            </td>
                           
                            <td>
                                <Button variant="subtle" color="blue" className="ResetBtn" leftSection={<IconKey size={16} />} >
                                    Reset Password
                                </Button>
                                <Button variant="subtle" color="red" className="AccountSettingsBtn">
                                    {<IconUserOff size={16} />}
                                </Button>
                            </td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
                
                </Table>  


            </Card>
            </Container>
        </div>
        </>
    );
    }
    export default UserManagement;