const toCurrency = price => new Intl.NumberFormat("ru-RU", {
  currency: "rub",
  style: "currency"
}).format(price);

document.querySelectorAll(".price").forEach(node => {
  node.textContent = toCurrency(node.textContent);
});

const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-remove")) {
      const id = e.target.dataset.id;

      fetch("/card/remove/" + id, {
        method: "delete"
      })
        .then(res => res.json())
        .then(card => {
          if (card.courses.length) {
            const cardHtml = card.courses.map(c =>
              `<tr>
                <td>${c.title}</td>
                <td>${c.count}</td>
                <td>
                  <button class="btn btn-small js-remove" data-id="${c.id}">Удалить</button>
                </td>
              </tr>`
            ).join("");
            console.log(cardHtml);
            $card.querySelector("tbody").innerHTML = cardHtml;
            $card.querySelector(".price").textContent = toCurrency(card.price);
          } else {
            $card.innerHTML = "<p>Корзина пуста</p>"
          }
        })
    }
  })
}
