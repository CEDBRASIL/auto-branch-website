import { createVehicleService, editVehicleService, getAllVehiclesByBranchIdService, getAllVehiclesService, getVehicleByIdService, removeVehicleService } from "../services/vehicleService.js";

export const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await getAllVehiclesService();
        res.status(200).json({
            data: vehicles,
            message: "Veículos listados com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const getVehicleById = async (req, res) => {
    const { id } = req.params

    try {
        const vehicle = await getVehicleByIdService(id);
        res.status(200).json({
            data: vehicle,
            message: "Veículo listado com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const getAllVehiclesByBranchId = async (req, res) => {
    const { id } = req.params

    try {
        const vehicles = await getAllVehiclesByBranchIdService(id);
        res.status(200).json({
            data: vehicles,
            message: "Veículos por concessionária listados com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};


export const createVehicle = async (req, res) => {
    try {
        const result = await createVehicleService(req.body);
        res.status(201).json({
            message: result.message
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const editVehicle = async (req, res) => {
    try {
        await editVehicleService(req.body);
        res.status(200).json({
            message: "Veículo editado com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};

export const removeVehicle = async (req, res) => {
    const { id } = req.params;

    try {
        await removeVehicleService(id);
        res.status(200).json({
            message: "Veículo removido com sucesso!"
        });
    } catch (err) {
        const status = err.statusCode || 500;
        res.status(status).json({ message: err.message });
    }
};
