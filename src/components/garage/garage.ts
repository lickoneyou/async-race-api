import './garage.css'

export let garageArray: String[] = []
 let localGarageArray: String[] = JSON.parse(localStorage.getItem('garageArray')!)
garageArray = localGarageArray !== null ? localGarageArray : []


export const garage = `
<p class='garageCounter'>Garage (${garageArray.length})</p>
`

export function removeCar(carElement: String[]){
  garageArray = garageArray.filter(el => el != (carElement.filter(el => el != '').join('')))
  localStorage.setItem('garageArray',JSON.stringify(garageArray));
  location.reload()
}