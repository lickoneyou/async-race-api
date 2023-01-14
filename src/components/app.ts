import { header } from "./header/header";
import { headerButtons } from "./header/headerButtons";
import { winnersTable } from "./winners/winners";

export class App {
  render(){
    return `${header}`
  }
  renderWinners(){
  return `
  ${headerButtons}
  ${winnersTable}`
}
}