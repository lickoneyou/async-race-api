import './winners.css'

export let winnersArray: string[] = []
 let localwinnersArray: string[] = JSON.parse(localStorage.getItem('winnersArray')!)
winnersArray = localwinnersArray !== null ? localwinnersArray: []

export const winnersTable = `
<div class='tableTittle'>
<p class='number'>Number</p>
<p class='car'>Car</p>
<p class='name'>Name</p>
<p class='wins'>Wins</p>
<p class='bestTime'>Best time</p>
</div>
`

export function winnersFilter(arr: string[]) {
  arr = winnersArray.filter((el,ind) => el.slice(0,120) !==winnersArray[ind+1].slice(0,120))
}