import './garage.css'

export let garageArray: String[] = []
let localGarageArray: String[] = JSON.parse(localStorage.getItem('garageArray')!)
garageArray = localGarageArray !== null ? localGarageArray : []



export const garage = `
<p class='garageCounter'>Garage (${garageArray.length})</p>
`