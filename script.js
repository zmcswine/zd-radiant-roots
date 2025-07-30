
fetch('tea_products.json')
  .then(response => response.json())
  .then(teas => {
    const teaList = document.getElementById('teaList');
    teas.forEach((tea, index) => {
      const row = document.createElement('div');
      row.innerHTML = `
        <strong>${tea['Tea Name']}</strong><br>
        <em>${tea['Description']}</em><br>
        Price: $${tea['Price']} (${tea['Size']})<br>
        <label>Order Quantity (oz): 
          <input type="number" name="tea${index}" min="0" value="0" data-price="${tea['Price']}" data-size="${tea['Size']}">
        </label><br><br>
      `;
      teaList.appendChild(row);
    });

    document.getElementById('orderForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const inputs = teaList.querySelectorAll('input[type=number]');
      let totalOunces = 0;
      let totalPrice = 0;
      inputs.forEach(input => {
        const qty = parseFloat(input.value) || 0;
        const unitPrice = parseFloat(input.dataset.price);
        totalOunces += qty;
        totalPrice += qty * unitPrice;
      });

      const summary = `
        <h3>Order Summary</h3>
        <p>Total Tea Weight: ${totalOunces} oz</p>
        <p>Total Cost (excluding shipping): $${totalPrice.toFixed(2)}</p>
        <p><strong>Reminder:</strong> Send payment via Cash App $zeemac404 or <a href="https://paypal.me/zmcswine" target="_blank">PayPal</a></p>
      `;
      document.getElementById('summary').innerHTML = summary;
    });
  });
