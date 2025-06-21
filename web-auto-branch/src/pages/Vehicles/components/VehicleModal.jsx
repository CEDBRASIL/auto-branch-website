import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./VehicleModal.module.css";
import { useVehicleContext } from "../../../context/vehicleContext";
import { useBranchContext } from "../../../context/branchContext";
import { useAuthContext } from "../../../context/authContext";

function VehicleModal({ open, onOpenChange, vehicle, refreshVehicle }) {
    const { user } = useAuthContext();
    const { createVehicle, editVehicle, error } = useVehicleContext();
    const { branches, getAllBranches } = useBranchContext();

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [version, setVersion] = useState('');
    const [year, setYear] = useState('');
    const [gearbox, setGearbox] = useState('');
    const [color, setColor] = useState('');
    const [motorization, setMotorization] = useState('');
    const [plate, setPlate] = useState('');
    const [km, setKm] = useState('');
    const [value, setValue] = useState('');
    const [branchId, setBranchId] = useState(0);

    useEffect(() => {
        if(user.roleId == 1) {
            getAllBranches();
        }
        if (vehicle) {
            setBrand(vehicle.brand);
            setModel(vehicle.model);
            setVersion(vehicle.version);
            setYear(vehicle.year);
            setGearbox(vehicle.gearbox);
            setColor(vehicle.color);
            setMotorization(vehicle.motorization);
            setPlate(vehicle.plate);
            setKm(vehicle.km);
            setValue(vehicle.value);
            setBranchId(parseInt(vehicle.branchId));
        }
    }, [vehicle]);

    function clearForm() {
        setBrand('');
        setModel('');
        setVersion('');
        setYear('');
        setGearbox('');
        setColor('');
        setMotorization('');
        setPlate('');
        setKm('');
        setValue('');
        setBranchId(0);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const sanitizedPlate = plate.trim().toUpperCase();
            let req;
            if (!vehicle) {
                req = await createVehicle(
                    brand,
                    model,
                    version,
                    year,
                    gearbox,
                    color,
                    motorization,
                    sanitizedPlate,
                    km,
                    value,
                    user.branchId ? user.branchId : branchId,
                );
            } else {
                req = await editVehicle(
                    parseInt(vehicle.id),
                    brand,
                    model,
                    version,
                    year,
                    gearbox,
                    color,
                    motorization,
                    sanitizedPlate,
                    parseFloat(km),
                    parseFloat(value),
                    branchId,
                );
                refreshVehicle();
            }

            if (req) {
                onOpenChange(false);
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
                    <AlertDialog.Title>{vehicle ? "Editar" : "Cadastrar"} Veículo!</AlertDialog.Title>
                    <AlertDialog.Cancel>
                        <X style={{ cursor: 'pointer' }} width={16} height={16} />
                    </AlertDialog.Cancel>
                </Flex>
                <form
                    id="vehicle-form"
                    onSubmit={handleSubmit}
                    className={styles.loginForm}
                >
                    <label className="inputLabel">Marca</label>
                    <input
                        id="vehicle-brand"
                        className="input"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        type="text"
                        placeholder="Digite a marca..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Modelo</label>
                    <input
                        id="vehicle-model"
                        className="input"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        type="text"
                        placeholder="Digite o modelo..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Versão</label>
                    <input
                        id="vehicle-version"
                        className="input"
                        value={version}
                        onChange={(e) => setVersion(e.target.value)}
                        type="text"
                        placeholder="Digite a versão..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Ano</label>
                    <input
                        id="vehicle-year"
                        className="input"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        type="text"
                        placeholder="Digite o ano..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Câmbio</label>
                    <select
                        id="vehicle-gearbox"
                        className="input"
                        value={gearbox}
                        onChange={(e) => setGearbox(e.target.value)}
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    >
                        <option value="">Selecione o câmbio...</option>
                        <option value="Manual">Manual</option>
                        <option value="Automático">Automático</option>
                    </select>

                    <label className="inputLabel">Cor</label>
                    <input
                        id="vehicle-color"
                        className="input"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        type="text"
                        placeholder="Digite a cor..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Motorização</label>
                    <input
                        id="vehicle-motorization"
                        className="input"
                        value={motorization}
                        onChange={(e) => setMotorization(e.target.value)}
                        type="text"
                        placeholder="Digite a motorização..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Placa</label>
                    <input
                        id="vehicle-plate"
                        className="input"
                        value={plate}
                        onChange={(e) => setPlate(e.target.value)}
                        type="text"
                        placeholder="Digite a placa..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Quilômetragem</label>
                    <input
                        id="vehicle-km"
                        className="input"
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                        type="text"
                        placeholder="Digite o Km..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    <label className="inputLabel">Valor</label>
                    <input
                        id="vehicle-value"
                        className="input"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        placeholder="Digite o valor..."
                        style={{
                            border: "1px solid #ccc",
                            // error ? "1px solid red" : 
                        }}
                    />

                    {user.roleId === 1 && (
                        <>
                            <label className="inputLabel">Concessionária</label>
                            <select
                                id="vehicle-branch"
                                className="input"
                                value={branchId}
                                onChange={(e) => setBranchId(parseInt(e.target.value))}
                                style={{
                                    border: "1px solid #ccc",
                                    // error ? "1px solid red" :
                                }}
                            >
                                <option value={0}>Selecione a concessionária...</option>
                                {branches && branches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>{branch.name}</option>
                                ))}
                            </select>
                        </>
                    )}

                    {error && <span className="errorMessage">{error}</span>}
                    <Flex justify="end">
                        <Button id="vehicle-submit" type="submit" className={styles.saveButton}>Salvar</Button>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}

export default VehicleModal;