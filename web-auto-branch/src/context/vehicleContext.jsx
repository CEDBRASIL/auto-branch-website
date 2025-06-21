import { createContext, useContext, useState } from "react";
import { useAuthContext } from "./authContext";

export const VehicleContext = createContext(null);

export function VehicleProvider({ children }) {
    const { user } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState("");
    const [vehicles, setVehicles] = useState([]);

    async function getAllVehicles() {
        try {
            setLoading(true);
            setError(false);
            const response = await fetch("http://localhost:3000/api/vehicles/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const responseData = await response.json();

            if (!response.ok) {
                setError(responseData.message);
                return false;
            }

            setError(false);
            setVehicles(responseData.data)
        } catch (error) {
            setError("Erro ao listar veículos");
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function getVehicleById(vehicleId) {
        try {
            setLoading(false);
            setError(false);
            const response = await fetch(`http://localhost:3000/api/vehicles/${vehicleId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const responseData = await response.json();

            if (!response.ok) {
                setError(responseData.message);
                return false;
            }

            setError(false);
            return responseData.data;
        } catch (error) {
            setError("Erro ao listar veículo");
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function getAllVehiclesByBranchId(branchId) {
        try {
            setLoading(true);
            setError(false);

            const response = await fetch(`http://localhost:3000/api/vehicles/branch/${branchId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const responseData = await response.json();

            if (!response.ok) {
                setError(responseData.message);
                return false;
            }

            setVehicles(responseData.data);
            setError(null);
            return true;
        } catch (error) {
            setError("Erro ao listar veiculos");
            return false;
        } finally {
            setLoading(false);
        }
    };

    async function createVehicle(brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId) {
        try {
            setLoading(true);
            setError(false);
            setSuccess("");
            const response = await fetch("http://localhost:3000/api/vehicles/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId })
            });
            const responseData = await response.json();
            if (!response.ok) {
                setError(responseData.message);
                return false
            }

            setError(false);
            setSuccess(responseData.message);
            if (user.roleId == 1) {
                await getAllVehicles();
            } else {
                await getAllVehiclesByBranchId(user.branchId)
            }

            return true;
        } catch (error) {
            setError("Erro ao criar veículo");
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function deleteVehicle(vehicleId) {
        try {
            setLoading(true);
            setError(false);
            const response = await fetch(`http://localhost:3000/api/vehicles/${vehicleId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const responseData = await response.json();
            if (!response.ok) {
                setError(responseData.message);
                return false
            }

            setError(false);

            return true;
        } catch (error) {
            setError("Erro ao deletar veículo");
            return false;
        } finally {
            setLoading(false);
        }
    }

    async function editVehicle(id, brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId) {
        try {
            setLoading(true);
            setError(false);
            const response = await fetch(`http://localhost:3000/api/vehicles/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId })
            });
            const responseData = await response.json();
            if (!response.ok) {
                setError(responseData.message);
                return false
            }

            setError(false);

            return true;
        } catch (error) {
            setError("Erro ao editar veículo");
            return false;
        } finally {
            setLoading(false);
        }
    }

    return (
        <VehicleContext.Provider value={{ loading, error, success, vehicles, getAllVehicles, getVehicleById, getAllVehiclesByBranchId, createVehicle, deleteVehicle, editVehicle }}>
            {children}
        </VehicleContext.Provider>
    )
};

export function useVehicleContext() {
    const context = useContext(VehicleContext);
    if (!context) {
        throw new Error("useVehicleContext must be used within an VehicleProvider");
    };
    return context;
};