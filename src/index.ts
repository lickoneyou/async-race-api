import './index.css'
import { App } from './components/app'
import { addCar, updateCar } from './components/cars/createCars'
import { garageArray, removeCar } from './components/garage/garage'
import { generateRandomCars } from './components/cars/generateCars'

export const app = new App()
export const body = document.querySelector('body') as HTMLBodyElement

if (!body) {
  throw new Error('The main is undefined!')
}

body.innerHTML = app.render()

window.addEventListener('hashchange', () => {
  if (location.hash == '#garage') {
    body.innerHTML = app.render()
  } else {
    body.innerHTML = app.renderWinners()
  }
})

const createButton = document.querySelector(
  '.createButton',
) as HTMLButtonElement

createButton.addEventListener('click', addCar)

const carRemove = document.querySelectorAll('.carRemove') as NodeListOf<Element>

carRemove.forEach((carRemove) =>
  carRemove.addEventListener('click', (e) => {
    let removeCarElement: string[] = []
    garageArray.forEach((el) =>
      removeCarElement.push(el.match(carRemove.id)?.input || ''),
    )
    removeCar(removeCarElement)
  }),
)

const generateCars = document.querySelector(
  '.generateCars',
) as HTMLButtonElement
generateCars.addEventListener('click', generateRandomCars)


const carSelect = document.querySelectorAll('.carSelect') as NodeListOf<Element>
let carNumber: number = 0
carSelect.forEach((carSelect) => {
  carSelect.addEventListener('click', (e) => {
    let carIndex:string[] = [].filter(el => el != '')
    garageArray.forEach((el) => carIndex.push(el.match(carSelect.id)?.input || ''))
    carNumber = garageArray.indexOf(carIndex.join(''))
    console.log(carNumber)
  })
  })

  const updateButton = document.querySelector('.updateButton') as HTMLButtonElement

  updateButton.addEventListener('click', () =>{
    garageArray[carNumber] = updateCar()
    localStorage.setItem('garageArray',JSON.stringify(garageArray));
location.reload()
  })