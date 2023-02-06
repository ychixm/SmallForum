export const checkLogin = async () => {
  console.log("start to check log");
  var isLogged = false;
  const userLogContainer = document.getElementById('login-form');
  try {
    // read cookie and check if log on serv
    const token = JSON.parse(getCookie("user"))["token"];
    console.log("try to check log");
    var response = await fetch('http://localhost:3000/api/auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    console.log(response);
    if (response.ok) {
      console.log("serv log response ok");
      setUserInfo(userLogContainer);
      setMessagePost();
      isLogged = true;
    }
    else {
      setLogin(userLogContainer);
    }


  }
  catch (error) {
    console.log(error);
    setLogin(userLogContainer);
    return isLogged;
  }
  return isLogged;
}

function setLogin(parentDiv) {
  const login = document.createElement('div');
  login.innerHTML = `
  <form>
  <h3>Login</h3>
  <div>
    <label for="username">Username:</label>
    <input type="text" id="logusername" name="username">
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" id="logpassword" name="password">
  </div>
  <div>
    <button id="login-button">Login</button>
  </div>
  </form>
  <form>
  <h3>Sign in</h3>
  <div>
    <label for="username">Username:</label>
    <input type="text" id="signusername" name="username">
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" id="signpassword" name="password">
  </div>
  <div>
    <button id="signin-button">Sign in</button>
  </div>
  </form>
        `;
  parentDiv.appendChild(login);
}

function setUserInfo(parentDiv, userData) {
  const userInfo = document.createElement('div');
  userInfo.innerHTML = `
  <p>${JSON.parse(getCookie("user"))["name"]}</p>
  <p> id : ${JSON.parse(getCookie("user"))["userId"]}</p>
  <button type="submit", id="logout">log out</button>`;
  parentDiv.appendChild(userInfo);
}

function setMessagePost() {

  const messagePost = document.getElementById("messagePost");
  const postForm = document.createElement('div');
  postForm.innerHTML = `      
    <form id="form">
      <h2>Envoyer un message : </h2>
        <div>
          <p>${JSON.parse(getCookie("user"))["name"]}</p>
        </div>
        <div>
          <label for="text">Text:</label>
          <input type="text" id="text" name="text">
        </div>
        <button type="submit">Envoyer</button>
      </form>
      `;
  messagePost.appendChild(postForm);
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

