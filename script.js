document.getElementById('contact-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    try {
      const response = await fetch('http://localhost:4000/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
  
      if (response.ok) {
        alert('Data submitted successfully');
      } else {
        const errorText = await response.text();
        alert('Error submitting data: ' + errorText);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  });
  