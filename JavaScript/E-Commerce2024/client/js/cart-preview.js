const modalContainer = document.getElementById("modal-container");
const modalOverlay = document.getElementById("modal-overlay");
const productPreview = document.getElementById("shopContent"); // Definición de productPreview
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productImageInput = document.getElementById("productImage");
const addProductBtn = document.getElementById("add-product");

// Función para actualizar la vista previa
const updatePreview = () => {

    productPreview.innerHTML = "";

    const content = document.createElement("div");
    content.innerHTML = `
        <img src="${productImageInput.value}">
        <h3>${productNameInput.value}</h3> <!-- Asegúrate de que el nombre de la propiedad sea correcto -->
        <p>${productPriceInput.value} $</p> <!-- Asegúrate de que el nombre de la propiedad sea correcto -->
    `;
    shopContent.append(content);

    const buyButton = document.createElement("button");
    buyButton.innerText = "Comprar";

    content.append(buyButton);

};

// Escuchar cambios en los campos de entrada para actualizar la vista previa en tiempo real
productNameInput.addEventListener("input", updatePreview);
productPriceInput.addEventListener("input", updatePreview);
productImageInput.addEventListener("input", updatePreview);
