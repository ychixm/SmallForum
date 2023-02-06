export const logout = () => {
    document.getElementById('logout').addEventListener('click', event => {
        event.preventDefault();
        deleteCookie("user");
        location.reload();
    });
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  