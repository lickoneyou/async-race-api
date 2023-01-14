import { garage, garageArray } from "./garage/garage";
import { header } from "./header/header";
import { headerButtons } from "./header/headerButtons";
import { winnersTable } from "./winners/winners";

export class App {
  render(){
    return `
    ${header}
    <div>${garage}</div>
    <div class='carsRender'>${garageArray.join('')}</div>
    `
  }
  renderWinners(){
  return `
  ${headerButtons}
  ${winnersTable}`
}

}

