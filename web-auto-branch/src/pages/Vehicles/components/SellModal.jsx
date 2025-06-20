import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { X } from "lucide-react";
import styles from "./SellModal.module.css";
import { useVehicleContext } from "../../../context/vehicleContext";
import { useBranchContext } from "../../../context/branchContext";
import { useAuthContext } from "../../../context/authContext";
import { useEffect, useState } from "react";

function SellModal({ open, onOpenChange, vehicle }) {
    const { user } = useAuthContext();
    // const { sellVehicle } = useVehicleContext();

    const [originalValue, setOriginalValue] = useState(0);
    const [discountInput, setDiscountInput] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        if (open) {
            const value = Number(vehicle.value) || 0;
            setOriginalValue(value);
            setDiscountInput("");
            setDiscountPercent(0);
            setTotalValue(value);
        }
    }, [open]);

    function handleDiscountChange(e) {
        const rawValue = e.target.value.replace(",", ".");
        setDiscountInput(rawValue);

        const parsedPercent = parseFloat(rawValue);

        if (!isNaN(parsedPercent) && parsedPercent >= 0 && parsedPercent <= 100) {
            setDiscountPercent(parsedPercent);
            const discountValue = (originalValue * parsedPercent) / 100;
            setTotalValue(originalValue - discountValue);
        } else {
            setDiscountPercent(0);
            setTotalValue(originalValue);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log({
            branchId: user.branchId,
            vehicleId: vehicle.id,
            userId: user.id,
            originalValue,
            discountPercent,
            totalValue,
        });
    }

    return (
        <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
            <AlertDialog.Content aria-describedby="form" align="start">
                <Flex justify="between" align="start" style={{ paddingBottom: "20px" }}>
                    <AlertDialog.Title>Vender Veículo!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: "pointer" }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form id="form" onSubmit={handleSubmit} className={styles.loginForm}>
                    <label className="inputLabel">Valor Inicial</label>
                    <input
                        id="valor-inicial-input"
                        className="input"
                        value={originalValue.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                        disabled
                        type="text"
                        style={{ border: "1px solid #ccc" }}
                    />

                    <label className="inputLabel">Desconto (%)</label>
                    <input
                        id="desconto-input"
                        className="input"
                        value={discountInput}
                        onChange={handleDiscountChange}
                        type="text"
                        placeholder="Digite o desconto em %"
                        style={{ border: "1px solid #ccc" }}
                    />

                    <label className="inputLabel">Valor Final com Desconto</label>
                    <input
                        id="valor-final-input"
                        className="input"
                        value={totalValue.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                        disabled
                        type="text"
                        style={{ border: "1px solid #ccc" }}
                    />

                    <Flex justify="end">
                        <AlertDialog.Action>
                            <Button id="salvar-venda-button" type="submit" className={styles.saveButton}>
                                Salvar
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}

export default SellModal