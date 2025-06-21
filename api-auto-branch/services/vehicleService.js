import { updateVehicleCount } from "../models/branchModel.js";
import { deleteVehicle, insertVehicle, selectAllVehicles, selectAllVehiclesByBranchId, selectVehicleById, selectVehicleByPlate, updateVehicle } from "../models/vehicleModel.js";
import { AppError } from "../utils/appError.js";

export const getAllVehiclesService = async () => {
    return await selectAllVehicles();
};

export const getVehicleByIdService = async (id) => {
    const vehicle = await selectVehicleById(id);

    if (!vehicle)
        throw new AppError("Veículo não encontrado", 400);

    return vehicle;
};

export const getAllVehiclesByBranchIdService = async (branchId) => {
    const vehicles = await selectAllVehiclesByBranchId(branchId);
    const vehiclesList = Array.isArray(vehicles) ? vehicles : [vehicles];
    
    return vehiclesList;
};

export const createVehicleService = async ({ brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId }) => {
    if (!brand || !model || !version || !year || !gearbox || !color || !motorization || !plate || !km || !value || !branchId)
        throw new AppError("Preencha os campos corretamente", 400);

    const existingVehicle = await selectVehicleByPlate(plate);
    if (existingVehicle)
        throw new AppError("Veículo já cadastrado", 400);

    await insertVehicle(brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId);
    if (branchId) {
        await updateVehicleCount(branchId);
    }
    return { message: "Veículo cadastrado com sucesso!" }
};

export const editVehicleService = async ({ id, brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId }) => {
    const existingVehicle = await selectVehicleById(id);

    if (!existingVehicle)
        throw new AppError("Veículo não encontrado", 400);

    if (!brand || !model || !version || !year || !gearbox || !color || !motorization || !plate || !km || !value || !branchId)
        throw new AppError("Preencha os campos corretamente", 400);

    return await updateVehicle(id, brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId);
};

export const removeVehicleService = async (id) => {
    const existingVehicle = await selectVehicleById(id);

    if (!existingVehicle)
        throw new AppError("Veículo não encontrado", 400);

    return await deleteVehicle(id);
};