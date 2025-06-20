import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./CreateBranchModal.module.css";
import { useBranchContext } from "../../../context/branchContext";
import { formatCep } from "../../../utils/formatCep";
import { unformatCep } from "../../../utils/unformatCep";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { unformatPhoneNumber } from "../../../utils/unformatPhoneNumber";
import { useAuthContext } from "../../../context/authContext";

function CreateBranchModal({ open, onOpenChange }) {
    const { createBranch } = useBranchContext();

    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [cep, setCep] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const states = [
        { acronym: "AC", name: "Acre" },
        { acronym: "AL", name: "Alagoas" },
        { acronym: "AP", name: "Amapá" },
        { acronym: "AM", name: "Amazonas" },
        { acronym: "BA", name: "Bahia" },
        { acronym: "CE", name: "Ceará" },
        { acronym: "DF", name: "Distrito Federal" },
        { acronym: "ES", name: "Espírito Santo" },
        { acronym: "GO", name: "Goiás" },
        { acronym: "MA", name: "Maranhão" },
        { acronym: "MT", name: "Mato Grosso" },
        { acronym: "MS", name: "Mato Grosso do Sul" },
        { acronym: "MG", name: "Minas Gerais" },
        { acronym: "PA", name: "Pará" },
        { acronym: "PB", name: "Paraíba" },
        { acronym: "PR", name: "Paraná" },
        { acronym: "PE", name: "Pernambuco" },
        { acronym: "PI", name: "Piauí" },
        { acronym: "RJ", name: "Rio de Janeiro" },
        { acronym: "RN", name: "Rio Grande do Norte" },
        { acronym: "RS", name: "Rio Grande do Sul" },
        { acronym: "RO", name: "Rondônia" },
        { acronym: "RR", name: "Roraima" },
        { acronym: "SC", name: "Santa Catarina" },
        { acronym: "SP", name: "São Paulo" },
        { acronym: "SE", name: "Sergipe" },
        { acronym: "TO", name: "Tocantins" }
    ];


    function clearForm() {
        setName('');
        setState('');
        setCity('');
        setCep('');
        setPhoneNumber('');
        setManager(0);
    }

    function handleCepChange(e) {
        const input = e.target.value;
        const numbers = formatCep(input);

        setCep(numbers);
    }

    function handlePhoneChange(e) {
        const input = e.target.value;
        const numbers = formatPhoneNumber(input);

        setPhoneNumber(numbers);
    }

    async function handleCreateBranch(e) {
        e.preventDefault();
        try {
            const req = await createBranch(name, city, state, unformatCep(cep), unformatPhoneNumber(phoneNumber));
            if (req) {
                clearForm();
                onOpenChange(false);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>Cadastrar Concessionária!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form
                    onSubmit={handleCreateBranch}
                    className={styles.loginForm}
                >
                    <label className="inputLabel">Nome</label>
                    <input
                        id="nome-branch-input"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        name="text"
                        placeholder="Digite o nome da concessionária..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />
                    <label className="inputLabel">Estado</label>
                    <select
                        id="estado-select"
                        className="input"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    >
                        <option value="">Selecione o estado da concessionária...</option>
                        {states && states.map((state) => (
                            <option key={`${state.acronym}-${state.name}`} value={state.acronym}>{state.name}</option>
                        ))}
                    </select>
                    <label className="inputLabel">Cidade</label>
                    <input
                        id="cidade-input"
                        className="input"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        name="text"
                        placeholder="Digite a cidade da concessionária..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />
                    <label className="inputLabel">CEP</label>
                    <input
                        id="cep-input"
                        className="input"
                        value={cep}
                        onChange={(e) => handleCepChange(e)}
                        type="text"
                        name="text"
                        placeholder="Digite o CEP da concessionária..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />
                    
                    <label className="inputLabel">Número de Contato</label>
                    <input
                        id="contato-input"
                        className="input"
                        value={phoneNumber}
                        onChange={(e) => handlePhoneChange(e)}
                        type="text"
                        name="text"
                        placeholder="Digite o número de contato da concessionária..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />
                    <Flex justify="end">
                        <AlertDialog.Action>
                            <Button id="salvar-branch-button" type="submit" className={styles.saveButton}>Salvar</Button>
                        </AlertDialog.Action>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root >
    );
}

export default CreateBranchModal;