//inport getUser
import { getUser, getRepos } from "./request.js";

const itemLocal = localStorage.getItem("item");

getUser(itemLocal);
