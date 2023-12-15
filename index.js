document.addEventListener("DOMContentLoaded", async function () {
  const API_URL =
    "https://7373-172-188-41-15.ngrok-free.app/api/collections/shoes/records";
  let itemList = [];

  const response = await fetch(API_URL);
  const result = await response.json();
  console.log(result);

  for (let i = 0; i < result.items.length; i++) {
    itemList.push(result.items[i]);
  }
  console.log(itemList);
  function makeItem(title, price, imgUrl) {
    return {
      title,
      price,
      imgUrl,
    };
  }

  const display = document.querySelector(".flex-container");

  for (let i = 0; i < itemList.length; i++) {
    display.innerHTML += `
        <div class="item">
                <div class="item-img">
                    <img src="${itemList[i].url}" alt="item picture">
                </div>
                <div class="rating"> &#9733; &#9733; &#9733; &#9733; &#9733; </div>
                <div class="item-title"> ${itemList[i].title} </div>
                <div class="item-price"> <strong> $${itemList[i].price} </strong></div>

        </div>
    `;
  }

  ////

  const input = document.querySelectorAll("input");
  const itemName = document.querySelector(".item-name");
  const itemPrice = document.querySelector(".price");
  const itemImg = document.querySelector(".img");
  const addItem = document.querySelector(".add");

  addItem.addEventListener("click", async function () {
    if (!itemName.value || !itemPrice.value || !itemImg.value) {
      return;
    }
    const newItem = {
      title: itemName.value,
      url: itemImg.value,
      price: itemPrice.value,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    };

    fetch(
      "https://7373-172-188-41-15.ngrok-free.app/api/collections/shoes/records",
      options
    );

    for (let i = 0; i < itemList.length; i++) {
      display.innerHTML += `
          <div class="item">
                  <div class="img">
                      <img src="${itemList[i].url}" alt="item picture">
                  </div>
                  <div class="item-name"> ${itemList[i].title} </div>
                  <div class="price"> <strong> $${itemList[i].price} </strong></div>
  
          </div>
      `;
      input.values = "";
    }
  });
});
