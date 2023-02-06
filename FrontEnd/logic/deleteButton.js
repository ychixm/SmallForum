export const deleteButtonSetup = () => {
    const deleteButtons = document.querySelectorAll(".deleteButton");
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", event => {
            const id = event.target.getAttribute("postid");
            const token = JSON.parse(getCookie("user"))["token"];
            return fetch(`http://localhost:3000/api/ForumPost/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(response => { if (response.ok) { location.reload() } })
                .catch(error => console.error(error));
        });
    });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
}
