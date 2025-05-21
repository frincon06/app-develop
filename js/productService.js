function getProducts(page = 1) {
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de productos</h4>';
    fetch("https://reqres.in/api/unknown?page=" + page, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
        .then((result) => {
            return result.json().then(
                data => ({
                    status: result.status,
                    body: data
                })
            )
        })
        .then((response) => {
            if (response.status === 200) {
                let listProducts = `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Año</th>
                            <th scope="col">Color</th>
                            <th scope="col">Pantone</th>
                            <th scope="col">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                `;

                response.body.data.forEach(product => {
                    listProducts += `
                        <tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.year}</td>
                            <td><span class="badge" style="background-color:${product.color}">${product.color}</span></td>
                            <td>${product.pantone_value}</td>
                            <td><button type="button" class="btn btn-outline-info btn-sm" onclick="showProductInfo(${product.id})">Ver</button></td>
                        </tr>
                    `;
                });

                listProducts += `
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item"><a class="page-link" href="#" onclick="getProducts(1)">1</a></li>
                        <li class="page-item"><a class="page-link" href="#" onclick="getProducts(2)">2</a></li>
                    </ul>
                </nav>
                `;

                document.getElementById('info').innerHTML = listProducts;
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontraron productos</h3>';
            }
        });
}

function showProductInfo(productId) {
    fetch("https://reqres.in/api/unknown/" + productId, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
        .then((result) => {
            return result.json().then(
                data => ({
                    status: result.status,
                    body: data
                })
            )
        })
        .then((response) => {
            if (response.status === 200) {
                showModalProduct(response.body.data);
            } else {
                document.getElementById('info').innerHTML = '<h3>No se encontró el producto</h3>';
            }
        });
}

function showModalProduct(product) {
    const modalContent = `
    <div class="modal fade" id="modalProduct" tabindex="-1" aria-labelledby="modalProductLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalProductLabel">Producto</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text"><strong>ID:</strong> ${product.id}</p>
                            <p class="card-text"><strong>Año:</strong> ${product.year}</p>
                            <p class="card-text"><strong>Color:</strong> <span class="badge" style="background-color:${product.color}">${product.color}</span></p>
                            <p class="card-text"><strong>Pantone:</strong> ${product.pantone_value}</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById('showModal').innerHTML = modalContent;
    const modal = new bootstrap.Modal(document.getElementById('modalProduct'));
    modal.show();
}


function createProduct(productData) {
    fetch("https://reqres.in/api/unknown/", {
    method: "POST",
    headers: {
    "Content-type": "application/json",
    'x-api-key': 'reqres-free-v1'
    },
    body: JSON.stringify(productData)
    })
    .then((result) => {
            return result.json().then(
                data => ({
                    status: result.status,
                    body: data
                })
            )
        })
    .then(response => {
        if (response.status === 201) {
            alert("Producto creado exitosamente!");
      // Actualizar lista para mostrar el nuevo producto
            getProducts();
        } else {
            alert("Error al crear el producto.");
        }
    })
        .catch(error => {
        alert("Error de conexión: " + error.message);
    });
}
