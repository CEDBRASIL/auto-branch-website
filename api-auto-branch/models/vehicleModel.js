import db from "../db/conn.js";

export const sellVehicleModel = async (vehicleId, branchId, userId, sellPrice, discountPercent, totalPrice) => {
    try {
        const insertQuery = `INSERT INTO sellHistory (vehicleId, branchId, userId, sellPrice, discountPercent, totalPrice) VALUES (?, ?, ?, ?, ?, ?)`;
        await db.promise().query(insertQuery, [vehicleId, branchId, userId, sellPrice, discountPercent, totalPrice]);

        const updateQuery = `UPDATE vehicles SET status = 2 WHERE id = ?`;
        await db.promise().query(updateQuery, [vehicleId]);

        return { message: "Veículo vendido com sucesso!" };
    } catch (err) {
        console.log(err);
        throw new Error("Erro ao vender veiculo no banco de dados");
    }
}

export const selectAllVehicles = async () => {
    try {
        const query = `SELECT 
                        v.id,
                        v.brand,
                        v.model,
                        v.version,
                        v.year,
                        v.gearbox,
                        v.color,
                        v.motorization,
                        v.plate,
                        v.km,
                        v.value,
                        v.status,
                        v.branchId,
                        b.id AS branch_id,
                        b.name AS branch_name,
                        b.city AS branch_city,
                        b.state AS branch_state,
                        b.cep AS branch_cep,
                        b.phoneNumber AS branch_phone
                       FROM vehicles v
                       JOIN branches b ON v.branchId = b.id;`;
        const [results] = await db.promise().query(query);
        const formatted = results.map(row => ({
            id: row.id,
            brand: row.brand,
            model: row.model,
            version: row.version,
            year: row.year,
            gearbox: row.gearbox,
            color: row.color,
            motorization: row.motorization,
            plate: row.plate,
            km: row.km,
            value: row.value,
            status: row.status,
            branchId: row.branchId,
            branch: {
                id: row.branch_id,
                name: row.branch_name,
                city: row.branch_city,
                state: row.branch_state,
                cep: row.branch_cep,
                phoneNumber: row.branch_phone
            }
        }));

        return formatted;
    } catch (err) {
        throw new Error("Erro ao listar no banco de dados");
    }
};

export const selectVehicleById = async (id) => {
    try {
        const query = `SELECT 
                        v.id,
                        v.brand,
                        v.model,
                        v.version,
                        v.year,
                        v.gearbox,
                        v.color,
                        v.motorization,
                        v.plate,
                        v.km,
                        v.value,
                        v.status,
                        v.branchId,
                        b.id AS branch_id,
                        b.name AS branch_name,
                        b.city AS branch_city,
                        b.state AS branch_state,
                        b.cep AS branch_cep,
                        b.phoneNumber AS branch_phone
                       FROM vehicles v
                       JOIN branches b ON v.branchId = b.id
                       WHERE v.id = ?`;
        const [results] = await db.promise().query(query, [id]);
        const formatted = results.map(row => ({
            id: row.id,
            brand: row.brand,
            model: row.model,
            version: row.version,
            year: row.year,
            gearbox: row.gearbox,
            color: row.color,
            motorization: row.motorization,
            plate: row.plate,
            km: row.km,
            value: row.value,
            status: row.status,
            branchId: row.branchId,
            branch: {
                id: row.branch_id,
                name: row.branch_name,
                city: row.branch_city,
                state: row.branch_state,
                cep: row.branch_cep,
                phoneNumber: row.branch_phone
            }
        }));

        return formatted.length > 0 ? formatted[0] : null;
    } catch (err) {
        throw new Error("Erro ao listar no banco de dados");
    }
};

export const selectAllVehiclesByBranchId = async (branchId) => {
    try {
        const query = `SELECT
                        v.id,
                        v.brand,
                        v.model,
                        v.version,
                        v.year,
                        v.gearbox,
                        v.color,
                        v.motorization,
                        v.plate,
                        v.km,
                        v.value,
                        v.status,
                        v.branchId,
                        b.id AS branch_id,
                        b.name AS branch_name,
                        b.city AS branch_city,
                        b.state AS branch_state,
                        b.cep AS branch_cep,
                        b.phoneNumber AS branch_phone
                       FROM vehicles v
                       JOIN branches b ON v.branchId = b.id
                       WHERE v.branchId = ?;`;
        const [results] = await db.promise().query(query, [branchId]);
        const formatted = results.map(row => ({
            id: row.id,
            brand: row.brand,
            model: row.model,
            version: row.version,
            year: row.year,
            gearbox: row.gearbox,
            color: row.color,
            motorization: row.motorization,
            plate: row.plate,
            km: row.km,
            value: row.value,
            status: row.status,
            branchId: row.branchId,
            branch: {
                id: row.branch_id,
                name: row.branch_name,
                city: row.branch_city,
                state: row.branch_state,
                cep: row.branch_cep,
                phoneNumber: row.branch_phone
            }
        }));

        return formatted.length > 0 ? formatted : null;
    } catch (error) {
        throw new Error("Erro ao selecionar veículos por concessionaria no banco de dados");
    }
}

export const insertVehicle = async (brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId) => {
    try {
        const query = `INSERT INTO vehicles (brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const [results] = await db.promise().query(query, [brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId]);

        return results;
    } catch (err) {
        throw new Error("Erro ao inserir no banco de dados");
    }
};

export const updateVehicle = async (id, brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId) => {
    try {
        const query = `UPDATE vehicles SET brand = ?, model = ?, version = ?, year = ?, gearbox = ?, color = ?, motorization = ?, plate = ?, km = ?, value = ?, branchId = ? WHERE id = ?`;
        const [results] = await db.promise().query(query, [brand, model, version, year, gearbox, color, motorization, plate, km, value, branchId, id]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao editar no banco de dados");
    }
};

export const deleteVehicle = async (id) => {
    try {
        const query = `DELETE FROM vehicles WHERE id = ?`
        const [results] = await db.promise().query(query, [id]);

        return results.length > 0 ? results[0] : null;
    } catch (err) {
        throw new Error("Erro ao deletar no banco de dados");
    }
};