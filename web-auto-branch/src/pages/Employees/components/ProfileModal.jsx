import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../context/authContext";
import styles from "./ProfileModal.module.css";

function ProfileModal({ open, onOpenChange }) {
    const { user, editProfile, error, loading } = useAuthContext();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    async function handleSubmit(e) {
        e.preventDefault();
        setSuccess("");
        const req = await editProfile(name, password ? password : null);
        if (req) {
            setPassword("");
            setSuccess("Dados atualizados com sucesso!");
        }
    }

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content aria-describedby="form" align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>Editar Perfil</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form
                    id="profile-form"
                    onSubmit={handleSubmit}
                    className={styles.profileForm}
                >
                    <label className="inputLabel" htmlFor="profile-name">Nome</label>
                    <input
                        id="profile-name"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Digite seu nome..."
                        style={{ border: error ? "1px solid red" : "1px solid #ccc" }}
                    />
                    <label className="inputLabel" htmlFor="profile-password">Nova Senha</label>
                    <input
                        id="profile-password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Digite sua nova senha..."
                        style={{ border: error ? "1px solid red" : "1px solid #ccc" }}
                    />
                    {error && <span className="errorMessage">{error}</span>}
                    {success && <span className="successMessage">{success}</span>}
                    <Flex justify="end">
                        <Button id="profile-submit" type="submit" className="authButton">
                            {loading ? <Spinner /> : "Salvar"}
                        </Button>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}

export default ProfileModal;
