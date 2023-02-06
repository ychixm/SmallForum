export const login = () => {
    document.getElementById('login-button').addEventListener('click', event => {
        event.preventDefault();
        const name = document.getElementById('logusername').value;
        const password = document.getElementById('logpassword').value;
        console.log("sdjfgoirtgjiosret");
        fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        })
            .then(response => {
                if (response.ok) {
                    response.json().then((json) => {
                        console.log(json);
                        document.cookie = "user=" + JSON.stringify(json) + ";";
                        location.reload();
                    })
                }
            })
            .catch(error => {
            });
    });
}