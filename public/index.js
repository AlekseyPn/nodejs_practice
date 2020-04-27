const toCurrency = price => new Intl.NumberFormat("ru-RU", {
  currency: "rub",
  style: "currency"
}).format(price);

const toDate = date => {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(date));
}

document.querySelectorAll(".price").forEach(node => {
  node.textContent = toCurrency(node.textContent);
});

document.querySelectorAll(".date").forEach(node => {
  node.textContent = toDate(node.textContent);
})

const $cart = document.querySelector("#cart");
if ($cart) {
  $cart.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-remove")) {
      const id = e.target.dataset.id;
      const csrf = e.target.dataset.csrf;

      fetch("/cart/remove/" + id, {
        method: "delete",
        headers: {
          "X-XSRF-TOKEN": csrf,
        },
      })
        .then(res => res.json())
        .then(card => {
          if (card.courses.length) {
            const cartHtml = card.courses.map(c =>
              `<tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btn-small js-remove" data-id="${c.id}" data-csrf="${csrf}">Delete</button>
                </td>
              </tr>`
            ).join("");
            console.log(cartHtml);
            $cart.querySelector("tbody").innerHTML = cartHtml;
            $cart.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $cart.innerHTML = "<p>Cart is empty</p>"
          }
        })
    }
  })
}

M.Tabs.init(document.querySelectorAll(".tabs"));
