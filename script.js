
// Assume the URL has query parameters like ?item=Item%201&item=Item%202&item=Item%203

// Get the query parameters from the URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Get the values of the 'item' parameter
const itemValues = urlParams.getAll('item');

// Create the HTML list
const ulElement = document.createElement('ul');
ulElement.setAttribute('id', 'sortable-list');
ulElement.setAttribute('class', 'js-sortable sortablejs-custom list-group');
ulElement.setAttribute('data-hs-sortable-options', `{
  "animation": 150,
  "group": "listGroup"
}`);

// Loop through the item values and create list items
itemValues.forEach(value => {
  const liElement = document.createElement('li');
  liElement.setAttribute('class', 'list-group-item');
  liElement.textContent = value;
  ulElement.appendChild(liElement);
});

// Append the list to a container element in the HTML
const container = document.getElementById('sortable-form');
container.appendChild(ulElement);

window.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('sortable-form');
    const sortableList = document.getElementById('sortable-list');
    
    Sortable.create(sortableList);
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const inputs = sortableList.getElementsByTagName('input');
      const values = Array.from(inputs).map(input => input.value);
      
      // Create the payload object with the values
      const payload = { values };
      
      // Send the payload to the webhook URL
      fetch('https://hook.us1.make.com/8cbqihl1ag1d4fl957asaf2khxt3ogtq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (response.ok) {
          console.log('Values sent successfully!');
        } else {
          console.error('Error sending values:', response.status);
        }
      })
      .catch(error => {
        console.error('Error sending values:', error);
      });
    });
  });