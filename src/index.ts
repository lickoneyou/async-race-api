import './index.css'
import { App } from "./components/app";

const app = new App();

const body = document.querySelector('body') as HTMLBodyElement

body.innerHTML = app.render()
