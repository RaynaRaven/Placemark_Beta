import { Category } from "./category.js";
import { locationMongoStore } from "./location-mongo-store.js";

export const categoryMongoStore = {
    async getAllCategories() {
        const categories = await Category.find().lean();
        return categories;
    },

    async getCategoryById(id) {
        if (id) {
            const category = await Category.findOne({ _id: id }).lean();
            if (category) {
                category.locations = await locationMongoStore.getLocationsByCategoryId(category._id);
            }
            return category;
        }
        return null;
    },

    async addCategory(name, userid) {
        const newCategory = new Category({name, userid});
        const categoryObj = await newCategory.save();
        return this.getCategoryById(categoryObj._id);
    },

    async getUserCategories(id) {
        const category = await Category.find({ userid: id }).lean();
        return category;
    },

    async deleteCategoryById(id) {
        try {
            await Category.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllCategories() {
        await Category.deleteMany({});
    }
};