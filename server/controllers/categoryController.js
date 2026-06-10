import Category from "../models/Category.js";

const addCategory = async (req, res) => {
    try {
        const { categoryName, categoryDescription } = req.body;

        //check if category already exits
        const existingCategory = await Category.findOne({ categoryName });
        if (existingCategory) {
            return res.status(400).json({ success: false, message: "Category already exits" });
        }

        //create new category
        const newCategory = new Category({
            categoryName,
            categoryDescription
        });

        await newCategory.save();
        return res.status(201).json({
            success: true,
            message: "New Category Added",
            category: newCategory
        });

    } catch (error) {
        console.log("Error adding category", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({ success: true, categories: categories || [] });


    } catch (error) {
        console.log("GET CATEGORY ERROR:");
        console.log(error);
        return res.status(500).json({ success: true, message: "Server Error in gettind categories" });
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Category.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });


    } catch (error) {
        console.log("DELETE CATEGORY ERROR:", error);
        return res.status(500).json({ success: true, message: "Server Error in deleting categories" });
    }
}

export default {
    addCategory,
    getCategory,
    deleteCategory
};


