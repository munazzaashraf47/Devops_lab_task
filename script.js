// ======================================
// FRESHCART JAVASCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    // -------------------------------
    // CART
    // -------------------------------

    let cart = [];

    const cartCount = document.getElementById("cartCount");
    const cartButton = document.getElementById("cartButton");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");

    const cartItems = document.getElementById("cartItems");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartTotal = document.getElementById("cartTotal");

    const checkoutButton =
        document.getElementById("checkoutButton");


    // -------------------------------
    // ADD TO CART BUTTONS
    // -------------------------------

    const addButtons =
        document.querySelectorAll(".add-button");

    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Sold out button ko ignore karo
            if (button.disabled) {
                return;
            }

            const productCard =
                button.closest(".product-card");

            const name =
                productCard.getAttribute("data-name");

            const price =
                Number(productCard.getAttribute("data-price"));

            const image =
                productCard.querySelector(".product-image").innerText;


            // Check product already cart mein hai?
            let existingProduct = null;

            for (let i = 0; i < cart.length; i++) {

                if (cart[i].name === name) {
                    existingProduct = cart[i];
                    break;
                }

            }


            // Agar already hai
            if (existingProduct) {

                existingProduct.quantity++;

            }

            // Agar new product hai
            else {

                cart.push({
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });

            }


            // Cart update
            updateCart();


            // Button text
            button.innerText = "✓ Added!";


            setTimeout(function () {

                button.innerText = "🛒 Add to Cart";

            }, 1000);

        });

    });


    // -------------------------------
    // UPDATE CART
    // -------------------------------

    function updateCart() {

        cartItems.innerHTML = "";

        let totalItems = 0;
        let totalPrice = 0;


        // Cart products
        cart.forEach(function (product, index) {

            totalItems =
                totalItems + product.quantity;

            totalPrice =
                totalPrice +
                (product.price * product.quantity);


            const item =
                document.createElement("div");

            item.className = "cart-item";


            item.innerHTML = `
                
                <div class="cart-item-image">
                    ${product.image}
                </div>

                <div class="cart-item-info">

                    <h4>
                        ${product.name}
                    </h4>

                    <p>
                        Rs. ${product.price}
                    </p>

                </div>

                <div class="quantity-controls">

                    <button class="minus-button">
                        −
                    </button>

                    <span>
                        ${product.quantity}
                    </span>

                    <button class="plus-button">
                        +
                    </button>

                </div>

                <button class="remove-item">
                    🗑️
                </button>

            `;


            // MINUS
            item.querySelector(".minus-button")
                .addEventListener("click", function () {

                    if (product.quantity > 1) {

                        product.quantity--;

                    } else {

                        cart.splice(index, 1);

                    }

                    updateCart();

                });


            // PLUS
            item.querySelector(".plus-button")
                .addEventListener("click", function () {

                    product.quantity++;

                    updateCart();

                });


            // REMOVE
            item.querySelector(".remove-item")
                .addEventListener("click", function () {

                    cart.splice(index, 1);

                    updateCart();

                });


            cartItems.appendChild(item);

        });


        // Cart number
        cartCount.innerText = totalItems;


        // Total price
        cartTotal.innerText =
            "Rs. " + totalPrice;


        // Empty cart
        if (cart.length === 0) {

            cartEmpty.style.display = "block";

            cartItems.style.display = "none";

        } else {

            cartEmpty.style.display = "none";

            cartItems.style.display = "block";

        }

    }


    // -------------------------------
    // OPEN CART
    // -------------------------------

    cartButton.addEventListener("click", function () {

        cartOverlay.classList.add("show");

    });


    // -------------------------------
    // CLOSE CART
    // -------------------------------

    closeCart.addEventListener("click", function () {

        cartOverlay.classList.remove("show");

    });


    // -------------------------------
    // CLOSE CART OUTSIDE
    // -------------------------------

    cartOverlay.addEventListener("click", function (event) {

        if (event.target === cartOverlay) {

            cartOverlay.classList.remove("show");

        }

    });


    // -------------------------------
    // SEARCH
    // -------------------------------

    const searchInput =
        document.getElementById("searchInput");

    const searchButton =
        document.getElementById("searchButton");


    function searchProducts() {

        const text =
            searchInput.value.toLowerCase().trim();


        const products =
            document.querySelectorAll(".product-card");


        products.forEach(function (product) {

            const name =
                product
                    .getAttribute("data-name")
                    .toLowerCase();


            if (name.includes(text)) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    }


    // Search while typing
    searchInput.addEventListener("input", function () {

        searchProducts();

    });


    // Search button
    searchButton.addEventListener("click", function () {

        searchProducts();

    });


    // -------------------------------
    // CHECKOUT
    // -------------------------------

    checkoutButton.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty! 🛒");

            return;

        }


        alert(
            "Thank you for shopping with FreshCart! ❤️\n\n" +
            "Your order has been placed successfully."
        );


        cart = [];

        updateCart();

        cartOverlay.classList.remove("show");

    });


    // -------------------------------
    // START CART
    // -------------------------------

    updateCart();

});