import { Product } from "../models/Product.js"; // Asegúrate de importar tu modelo Product

// Obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll(); // Encuentra todos los productos
        res.json(products);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id); // Busca el producto por ID
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    const { name, price, quanty, img } = req.body;

    if (!name || !price || !img) {
        return res.status(400).json({ error: 'El nombre, precio e imagen son obligatorios' });
    }

    try {
        const newProduct = await Product.create({ // Crea un nuevo producto
            product_name: name,
            product_price: price,
            quanty: quanty,
            img: img,
        });
        res.status(201).json({ message: 'Producto creado con éxito', productId: newProduct.id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// Actualizar un producto existente
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, quanty, img } = req.body;

    if (!name || !price || !quanty) {
        return res.status(400).json({ error: 'El nombre, precio y cantidad son obligatorios' });
    }

    try {
        const product = await Product.findByPk(id); // Busca el producto por ID
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await product.update({ // Actualiza el producto
            product_name: name,
            product_price: price,
            quanty: quanty,
            img: img,
        });
        res.json({ message: 'Producto actualizado con éxito' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id); // Busca el producto por ID
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await product.destroy(); // Elimina el producto
        res.json({ message: 'Producto eliminado con éxito' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};
