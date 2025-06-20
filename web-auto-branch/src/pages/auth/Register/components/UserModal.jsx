import React, { useEffect, useState } from "react";
import { AlertDialog, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import styles from "./UserModal.module.css";
import { formatCpf } from "../../../../utils/formatCpf";
import { unformatCpf } from "../../../../utils/unformatCpf";
import { useAuthContext } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useBranchContext } from "../../../../context/branchContext";

function UserModal({ open, onOpenChange, employee }) {
    const { register, registerError, editUser, loading, user } = useAuthContext();
    const { getAllBranches, branches } = useBranchContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(0);
    const [branch, setBranch] = useState(0);

    useEffect(() => {
        if (user.roleId == 1) {
            getAllBranches();
        }
        if (employee) {
            setName(employee.name);
            setEmail(employee.email);
            setCpf(employee.cpf);
            setRole(employee.roleId);
            setBranch(employee.branchId);
        }
    }, [employee])

    function clearForm() {
        setName('');
        setEmail('');
        setCpf('');
        setPassword('');
        setRole(0);
        setBranch(0);
    }

    function handleCpfChange(e) {
        const input = e.target.value;
        const numbers = formatCpf(input);
        let formatted = numbers;

        setCpf(formatted);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (branch == 0 || role == 1) {
                setBranch(null);
            }

            let req

            if (!employee) {
                req = await register(name, email, unformatCpf(cpf), password, role, user.branchId ? user.branchId : branch);
            }
            else if (employee) {
                req = await editUser(parseInt(employee.id), name, email, cpf, role, branch);
            }

            if (req) {
                clearForm();
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content aria-describedby="form" align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>{employee ? "Editar" : "Cadastrar"} Funcionário!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className={styles.registerForm}
                >
                    <label className="inputLabel">Email</label>
                    <input
                        id="email-funcionario-input"
                        className="input"
                        value={email}
                        style={{
                            border: registerError ? "1px solid red" : "1px solid #ccc",
                        }}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Digite o email do funcionário..."
                    />
                    <label className="inputLabel">Nome</label>
                    <input
                        id="nome-funcionario-input"
                        className="input"
                        value={name}
                        style={{
                            border: registerError ? "1px solid red" : "1px solid #ccc",
                        }}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Digite o nome do funcionário..."
                    />
                    <label className="inputLabel">CPF</label>
                    <input
                        id="cpf-funcionario-input"
                        className="input"
                        value={cpf}
                        style={{
                            border: registerError ? "1px solid red" : "1px solid #ccc",
                        }}
                        onChange={(e) => handleCpfChange(e)}
                        type="text"
                        placeholder="Digite o CPF do funcionário..."
                    />
                    {!employee && (
                        <>
                            <label className="inputLabel">Senha</label>
                            <input
                                id="senha-funcionario-input"
                                className="input"
                                value={password}
                                style={{
                                    border: registerError ? "1px solid red" : "1px solid #ccc",
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Crie uma senha para o usuário..."
                            />
                        </>
                    )}

                    <label className="inputLabel">Cargo</label>
                    <select
                        id="cargo-select"
                        className="input"
                        value={role}
                        onChange={(e) => setRole(parseInt(e.target.value))}
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    >
                        <option value={0}>Selecione o cargo...</option>
                        {user.roleId === 1 && (
                            <>
                                <option value={1}>Diretor</option>
                                <option value={2}>Gerente</option>
                            </>)}
                        <option value={3}>Vendedor</option>
                    </select>

                    {user.roleId === 1 && role != 1 && (
                        <>
                            <label className="inputLabel">Concessionária</label>
                            <select
                                id="branch-select"
                                className="input"
                                value={branch}
                                onChange={(e) => setBranch(parseInt(e.target.value))}
                                style={{
                                    border: "1px solid #ccc",
                                    // error ? "1px solid red" : 
                                }}
                            >
                                <option value={0}>Selecione a concessionária...</option>
                                {Array.isArray(branches) && branches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                                ))}
                            </select>
                        </>
                    )}

                    {registerError && <span className="errorMessage">{registerError}</span>}

                    <Flex justify="end">
                        <AlertDialog.Action>
                            <Button id="salvar-funcionario-button" type="submit" className={styles.saveButton}>Salvar</Button>
                        </AlertDialog.Action>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root >
    );
}

export default UserModal;
