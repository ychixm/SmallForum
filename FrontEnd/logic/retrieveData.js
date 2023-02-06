import { deleteButtonSetup } from './deleteButton.js';

export const getForumData = async function getForumData() {
  try {
    console.log("edpfrgjspmdrfg");
    fetch('http://localhost:3000/api/ForumPost', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }
    ).then(res => {
      if (res.ok) {
        res.json()
          .then(data => {
            data.sort(function (a, b) {
              return a.time - b.time;
            });

            const forumContainer = document.getElementById('forum-container');
            for (const discussion of data) {
              console.log(discussion)
              const discussionEl = document.createElement('div');
              discussionEl.style = "border: 1px solid black; padding: 10px"
              discussionEl.innerHTML = `
          <h3>${discussion.name}</h3>
          <h4>${new Date(Date.parse(discussion.time)).toString()}</h4>
          <p>${discussion.text}</p>`;
              if ( (getCookie("user") != undefined) && discussion.userId == JSON.parse(getCookie("user"))["userId"]){
                discussionEl.innerHTML += `<button class="deleteButton" postId=${discussion._id}>Supprimer</button>`;
              }
              forumContainer.appendChild(discussionEl);
            }
            deleteButtonSetup();
          })
      }
    });
  } catch (err) {
    console.error(err);
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

const sessionToken = getCookie('token');