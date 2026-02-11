// Select elements
const container = document.querySelector('.container');
const input = container.querySelector('input'); // selects your input
const btn = container.querySelector('.button button'); // button inside div.button
const list = container.querySelector('.styled-list'); // the ul

btn.addEventListener('click', () => {
    const value = input.value.trim(); // get current input and remove extra spaces

    if (value === "") return; // don't add empty items

    // Create new li
    const newLi = document.createElement('li');

    // Add inner HTML (left/right layout)
    newLi.innerHTML = `
        <div>${value}</div>
        <div>Delete</div>
    `;

    // Optional: add class for styling
    newLi.classList.add('styled-list-item');

    // Append to the list
    list.appendChild(newLi);

    // Clear input
    input.value = "";
});

// Optional: make the Delete div functional
list.addEventListener('click', (e) => {
    if (e.target.textContent === "Delete") {
        e.target.parentElement.remove(); // remove the li
    }
});
