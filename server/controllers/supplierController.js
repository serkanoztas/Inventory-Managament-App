import Supplier from "../models/Supplier.js";

const addSupplier = async (req, res) => {
    try {
        const { name, email, number, address } = req.body;
        const existingSupplier = await Supplier.findOne({ name });
        if (existingSupplier) {
            return res.status(400).json({ success: false, message: "Supplier already exits" });
        }

        const newSupplier = new Supplier({
            name,
            email,
            number,
            address
        });

        await newSupplier.save();
        return res.status(201).json({
            success: true,
            message: "New Supplier Added",
            supplier: newSupplier
        });

    } catch (error) {
        console.log("Error adding supplier", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

const getSupplier = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        return res.status(200).json({ success: true, suppliers: suppliers || [] });


    } catch (error) {
        console.log("GET SUPPLIER ERROR:");
        console.log(error);
        return res.status(500).json({ success: true, message: "Server Error in gettind suppliers" });
    }
}

const updateSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, supplier });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Supplier.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Supplier not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Supplier deleted successfully"
        });


    } catch (error) {
        console.log("DELETE SUPPLIER ERROR:", error);
        return res.status(500).json({ success: true, message: "Server Error in deleting supplier" });
    }
}

export default {
    addSupplier,
    getSupplier,
    updateSupplier,
    deleteSupplier
}