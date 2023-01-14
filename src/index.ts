import './index.css'
import { App } from "./components/app";

const app = new App();
const body = document.querySelector('body') as HTMLBodyElement

if (!body) {
  throw new Error("The main is undefined!");
}

body.innerHTML = app.render()

window.addEventListener("hashchange", () => {
  if(location.hash == '#garage'){
  body.innerHTML = app.render();
  } else{
   body.innerHTML = app.renderWinners() 
  }
})
