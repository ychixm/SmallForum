export const signin = () => {

    document.getElementById('signin-button').addEventListener('click', event => {
        event.preventDefault();
        const name = document.getElementById('signusername').value;
        const password = document.getElementById('signpassword').value;
        fetch('http://localhost:3000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        })
            .then(response => {
                if (response.ok) {
                    location.reload();
                }
            })
            .catch(error => {
                console.error(error);
            });
    });
}