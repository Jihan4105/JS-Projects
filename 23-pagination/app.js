import displayFollowers from "./displayFollowers.js";
import fetchFollowers from "./fetchFollowers.js";


const setupUi = (followers) => {
  displayFollowers(followers)
}

const init = async () => {
  const followers = await fetchFollowers();
  setupUi(followers)
}

window.addEventListener("load",init);