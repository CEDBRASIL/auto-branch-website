import { Box, Button, Flex, Spinner, Table, Text } from "@radix-ui/themes";
import Navbar from "../../components/Navbar";
import styles from "./Employee.module.css";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { formatCpf } from "../../utils/formatCpf";
import DeleteModal from "../../components/DeleteModal";
import UserModal from "../auth/Register/components/UserModal";
import ProfileModal from "./components/ProfileModal";

function Employee() {
    const { loading, users, getAllUsers, getAllUsersByBranchId, deleteUser, user } = useAuthContext();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(false);

    useEffect(() => {
        async function getUsers() {
            if (user.roleId == 1) {
                await getAllUsers();
            } else {
                await getAllUsersByBranchId(user.branchId);
            }
        }
        getUsers();
    }, []);


    function openEditModal(userToEdit) {
        setSelectedEmployee(userToEdit);
        if (userToEdit.id === user.id) {
            setIsProfileModalOpen(true);
        } else {
            setIsEditModalOpen(true);
        }
    }

    function openDeleteModal(user) {
        setSelectedEmployee(user);
        setIsDeleteModalOpen(true);
    }

    async function handleDeleteUser() {
        await deleteUser(parseInt(selectedEmployee.id));
        setIsDeleteModalOpen(false);
    };

    return (
        <>
            <Navbar />
            <Box className={styles.mainBox}>
                <Flex justify="between">
                    <h1 className={styles.title}>Lista de Funcionários</h1>
                    {user.roleId !== 3 && (<Button onClick={() => setIsAddModalOpen(true)} ><Plus color="#FFF" height={14} width={14} /> Novo Funcionário</Button>)}
                </Flex>

                {loading ? (
                    <Flex justify="center" align="center">
                        <Spinner />
                    </Flex>

                ) : users && users.length > 0 && (
                    <Table.Root className={styles.tableContainer}>
                        <Table.Header className={styles.tableHeader}>
                            <Table.Row>
                                <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>CPF</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Cargo</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Array.isArray(users) && users.map((u) => (
                                <Table.Row key={u.id} className={styles.tableRow}>
                                    <Table.Cell className={styles.tableCell}>{u.name}</Table.Cell>
                                    <Table.Cell className={styles.tableCell}>{u.email}</Table.Cell>
                                    <Table.Cell className={styles.tableCell}>{formatCpf(u.cpf)}</Table.Cell>
                                    <Table.Cell className={styles.tableCell}>{u.roleId == 1 ? "Diretor" : u.roleId == 2 ? "Gerente" : "Vendedor"}</Table.Cell>
                                    <Table.Cell className={styles.tableCell}>
                                        <Flex gap="1" justify="end">
                                            {user.roleId !== 3 && user.id !== u.id && (
                                                <button id={`delete-user-${u.id}`} className={styles.actionButton} onClick={() => openDeleteModal(u)}>
                                                    <Trash width={15} height={15} color="#F3123C" />
                                                </button>
                                            )}

                                            {(user.roleId !== 3 || user.id === u.id) && (
                                                <button id={`edit-user-${u.id}`} className={styles.actionButton} onClick={() => openEditModal(u)}>
                                                    <Edit width={15} height={15} color="#2563EB" />
                                                </button>
                                            )}
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                )}
            </Box>
            <UserModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} employee={selectedEmployee} />
            <ProfileModal open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen} />
            {user.roleId !== 3 && (
                <>
                    <UserModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
                    <DeleteModal open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} handleSubmit={handleDeleteUser} message="Tem certeza de que deseja excluir este funcionário?" title="Funcionário" />
                </>
            )}
        </>
    )
};

export default Employee;