import { getForumData } from './retrieveData.js';
import { createForumPost } from './createForumPost.js';
import { login } from './login.js';
import { signin } from './signin.js';
import { checkLogin } from './checkLogin.js';
import { logout } from './logout.js';


if (await checkLogin()) {
    logout();
    createForumPost();
}
else {
    login();
    signin();
}
getForumData();
