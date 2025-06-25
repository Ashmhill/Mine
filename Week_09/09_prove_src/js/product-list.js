async function loadProducts() {
    let response = await fetch("js/dental.json");
    let products = await response.json();
    console.log(products);
    let productsSection = document.getElementById("products");
    products.forEach(product => {
        let link = document.createElement("a");
        link.textContent = product.name;
        link.href = "product-details.html?id=" + product.id;
        let br = document.createElement("br");
        productsSection.appendChild(link);
        productsSection.appendChild(br);
    })
}
    loadProducts();
