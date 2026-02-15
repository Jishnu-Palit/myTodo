// Load items from localStorage or start with empty array
const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : []; 

// Add new item when button is clicked
document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  if (item.value.trim() !== "") {
    createItem(item);
  }
});

// Save item and update list
function createItem(item) {
  itemsArray.push({ text: item.value, done: false }); // store as object
  localStorage.setItem("items", JSON.stringify(itemsArray));
  item.value = ""; // clear input
  displayItems(); // update list without reload
}

// Show current date
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3];
}

// Render all items from itemsArray
function displayItems() {
  const list = document.querySelector(".to-do-list");
  list.innerHTML = ""; // clear old list

  itemsArray.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "item";
    if (task.done) div.classList.add("done");

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';
    delBtn.className = "delete-btn";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent triggering toggle
      itemsArray.splice(index, 1);
      localStorage.setItem("items", JSON.stringify(itemsArray));
      displayItems();
    });

    // Toggle done when clicking anywhere on the item (except delete button)
    div.addEventListener("click", () => {
      itemsArray[index].done = !itemsArray[index].done;
      localStorage.setItem("items", JSON.stringify(itemsArray));
      displayItems();
    });

    div.appendChild(span);
    div.appendChild(delBtn);
    list.appendChild(div);
  });
}

// Run on page load
window.onload = function () {
  displayDate();
  displayItems();
};
