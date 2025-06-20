import Navbar from "../../../components/Navbar";
import { Flex, Box, Text } from "@radix-ui/themes";
import styles from "./VehicleDetails.module.css";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { formatCep } from "../../../utils/formatCep";
import { useVehicleContext } from "../../../context/vehicleContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import DeleteModal from "../../../components/DeleteModal";
import VehicleModal from "./VehicleModal";
import SellModal from "./SellModal";

function VehicleDetails() {
    const { vehicleId } = useParams();
    const navigate = useNavigate();
    const { getVehicleById, deleteVehicle, loading } = useVehicleContext();
    const [vehicle, setVehicle] = useState();
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (!loading && vehicleId) {
            async function fetchVehicle() {
                const response = await getVehicleById(vehicleId);
                setVehicle(response);
            };

            fetchVehicle();
        }
    }, [vehicleId]);

    async function handleDeleteVehicle() {
        if (vehicleId) {
            await deleteVehicle(vehicleId);
            setIsDeleteModalOpen(false);
            navigate('/vehicles');
        }
    };

    async function refreshVehicle() {
        if (vehicleId) {
            const response = await getVehicleById(vehicleId);
            setVehicle(response);
        }
    }

    return (
        <>
            <Navbar />
            <Box className={styles.mainBox}>
                <Flex justify="between">
                    <h1 className={styles.title}>Detalhes do Veículo</h1>
                </Flex>
                {loading && !vehicle && (
                    <Flex justify="center" align="center">
                        <Spinner />
                    </Flex>
                )}
                {!loading && vehicle && (
                    <Flex direction="column" gap="6">
                        <Box className={styles.card}>
                            <Flex direction="column" gap="6">
                                <Flex justify="between">
                                    <Flex direction="column">
                                        <Text className={styles.name}>{(vehicle.brand).toUpperCase()} <span>{(vehicle.model).toUpperCase()}</span></Text>
                                        <Text className={styles.vehicleEspecification}>{`${(vehicle.version).toUpperCase()} ${(vehicle.motorization).toUpperCase()} ${(vehicle.gearbox).toUpperCase()}`}</Text>
                                    </Flex>
                                    <Flex gap="1">
                                        <Text className={styles.vehiclePrice}>R${Number(vehicle.value).toFixed(0)}</Text>
                                        <button id="delete-vehicle-button" className={styles.actionButton} onClick={() => setIsDeleteModalOpen(true)}>
                                            <Trash width={15} height={15} color="#F3123C" />
                                        </button>
                                        <button id="edit-vehicle-button" className={styles.actionButton} onClick={() => setIsEditModalOpen(true)}>
                                            <Edit width={15} height={15} color="#2563EB" />
                                        </button>
                                    </Flex>
                                </Flex>
                                <Flex justify="between" align="end">
                                    <div className={styles.infos}>
                                        <Box>
                                            <Flex direction="column">
                                                <span className={styles.spanInfo}>Ano</span>
                                                <Text className={styles.textInfo}>{vehicle.year}</Text>
                                            </Flex>
                                        </Box>
                                        <Box>
                                            <Flex direction="column">
                                                <span className={styles.spanInfo}>Quilômetragem</span>
                                                <Text className={styles.textInfo}>{Number(vehicle.km).toFixed(0)}</Text>
                                            </Flex>
                                        </Box>
                                        <Box>
                                            <Flex direction="column">
                                                <span className={styles.spanInfo}>Câmbio</span>
                                                <Text className={styles.textInfo}>{vehicle.gearbox}</Text>
                                            </Flex>
                                        </Box>
                                        <Box>
                                            <Flex direction="column">
                                                <span className={styles.spanInfo}>Placa</span>
                                                <Text className={styles.textInfo}>{vehicle.plate}</Text>
                                            </Flex>
                                        </Box>
                                        <Box>
                                            <Flex direction="column">
                                                <span className={styles.spanInfo}>Cor</span>
                                                <Text className={styles.textInfo}>{vehicle.color}</Text>
                                            </Flex>
                                        </Box>
                                        <Box>
                                            <Flex direction="column">
                                                <span className={styles.spanInfo}>Estado</span>
                                                <Text className={styles.textInfo}>{vehicle.branch.state}</Text>
                                            </Flex>
                                        </Box>
                                    </div>
                                    <button id="sell-vehicle-button" className={styles.sellButton} onClick={() => setIsSellModalOpen(true)}>
                                        <Text className={styles.buttonText}>VENDER</Text>
                                    </button>
                                </Flex>
                            </Flex>
                        </Box>
                        <Box>
                            <h1 className={styles.title}>Concessionária</h1>
                            <Box className={styles.card}>
                                <Flex direction="column" gap="6">
                                    <Text className={styles.name}>{vehicle.branch.name}</Text>
                                    <Flex justify="between" align="end">
                                        <div className={styles.infos}>
                                            <Box>
                                                <Flex direction="column">
                                                    <span className={styles.spanInfo}>Telefone</span>
                                                    <Text className={styles.textInfo}>{formatPhoneNumber(vehicle.branch.phoneNumber)}</Text>
                                                </Flex>
                                            </Box>
                                            <Box>
                                                <Flex direction="column">
                                                    <span className={styles.spanInfo}>Estoque</span>
                                                    <Text className={styles.textInfo}>42 veículos</Text>
                                                </Flex>
                                            </Box>
                                            <Box>
                                                <Flex direction="column">
                                                    <span className={styles.spanInfo}>Funcionários</span>
                                                    <Text className={styles.textInfo}>12 Funcionários</Text>
                                                </Flex>
                                            </Box>
                                            <Box>
                                                <Flex direction="column">
                                                    <span className={styles.spanInfo}>CEP</span>
                                                    <Text className={styles.textInfo}>{formatCep(vehicle.branch.cep)}</Text>
                                                </Flex>
                                            </Box>
                                            <Box>
                                                <Flex direction="column">
                                                    <span className={styles.spanInfo}>Estado</span>
                                                    <Text className={styles.textInfo}>{vehicle.branch.state}</Text>
                                                </Flex>
                                            </Box>
                                            <Box>
                                                <Flex direction="column">
                                                    <span className={styles.spanInfo}>Cidade</span>
                                                    <Text className={styles.textInfo}>{vehicle.branch.city}</Text>
                                                </Flex>
                                            </Box>
                                        </div>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Box>
                    </Flex>
                )}
            </Box>
            <SellModal open={isSellModalOpen} onOpenChange={setIsSellModalOpen} vehicle={vehicle} />
            <VehicleModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} vehicle={vehicle} refreshVehicle={refreshVehicle} />
            <DeleteModal open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen} handleSubmit={handleDeleteVehicle} message="Tem certeza de que deseja excluir o veículo?" title="Veículo" />
        </>
    );
}

export default VehicleDetails;