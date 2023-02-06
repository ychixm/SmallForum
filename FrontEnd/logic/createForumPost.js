
export const createForumPost = () => {

  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    const text = document.querySelector('input[name="text"]').value;
    const time = new Date().toISOString();
    const cookie = JSON.parse(getCookie("user"));
    const userId = cookie["userId"];
    const name = cookie["name"];

    const data = { text, time, userId, name };
    fetch("http://localhost:3000/api/ForumPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${cookie["token"]}`
      },
      body: JSON.stringify(data)
    })
      .then(response => { if (response.ok) { location.reload() } })
      .catch(error => console.error(error));
  });
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

