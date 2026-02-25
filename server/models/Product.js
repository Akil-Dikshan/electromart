import mongoose from "mongoose";

//creating the blueprint of db what a product looks like in the db
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name required'],
        //automatically removes extra spaces from the beginning
        trim: true,
        maxlength: [200, 'Name cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        maxlength: [2000, 'Description cannot exceed 2000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    originalPrice: {
        type: Number,
        min: [0, 'Original price cannot be negative']
    },

    category: {
        type: String,
        required: [true, 'Category is required'],
        //enum means this field can only accept one of these exact values
        enum: [
            'smartphones',
            'laptops',
            'tablets',
            'audio',
            'cameras',
            'gaming',
            'accessories',
            'televisions']
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true
    },
    images: [
        {
            url: { type: String, required: true },
            alt: { type: String, default: '' }
        }
    ],
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        // if stock is not provided when creating a product it automatically starts at 0.
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    ratings: {
        //the average rating out of 5. `max: 5` means it can never go above 5. Starts at 0 because new products have no ratings yet.
        average: { type: Number, default: 0, min: 0, max: 5 },
        // /how many people have rated this product. Starts at 0 for the same reason.
        count: { type: Number, default: 0 }
    },
    specifications: {
        //MAP means this field holds flexible key-value pairs.
        type: Map,
        //of: String means all the values must be strings.
        of: String
    },
    //marks products to show on the homepage featured section
    isFeatured: {
        type: Boolean,
        default: false
    },
    //this is a very important professional pattern called soft delete. Instead of permanently deleting a product from the database we just set isActive to false and hide it.
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
//this creates a text index that lets us search products by words in the name and description. Like a search bar.
productSchema.index({ name: 'text', description: 'text' });
//speeds up filtering by category. The 1 means ascending order.
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;