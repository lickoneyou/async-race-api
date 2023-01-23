import './index.css'
import { App } from './components/app'
import { addCar, updateCar } from './components/cars/createCars'
import { garageArray, removeCar } from './components/garage/garage'
import { generateRandomCars } from './components/cars/generateCars'
import { isConstructorDeclaration, JsxEmit } from 'typescript'
import { node } from 'webpack'

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
    let carIndex: string[] = [].filter((el) => el != '')
    garageArray.forEach((el) =>
      carIndex.push(el.match(carSelect.id)?.input || ''),
    )
    carNumber = garageArray.indexOf(carIndex.join(''))
    console.log(carNumber)
  })
})

const updateButton = document.querySelector(
  '.updateButton',
) as HTMLButtonElement

updateButton.addEventListener('click', () => {
  garageArray[carNumber] = updateCar()
  localStorage.setItem('garageArray', JSON.stringify(garageArray))
  location.reload()
})

const server = 'http://localhost:3000/'

type CarsEngine = {
  velocity: number
  distance: number
}

async function carsEngine() {
  const carSpeedPromise = (
    await fetch(`http://localhost:3000/engine?id=2&status=started`, {
      method: 'PATCH',
    })
  )
  const data: CarsEngine = await carSpeedPromise.json()
   console.log(data)
  return +(data.distance / data.velocity / 1000).toFixed(2)
}

async function driveMode() {
  const drive = (await fetch(`http://localhost:3000/engine?id=2&status=drive`, {method: 'PATCH'})).json()
  return drive
}
driveMode()

const carImg = document.querySelectorAll('.carImg') as NodeListOf<Element>
const start = document.querySelectorAll('.start') as NodeListOf<Element>





async function draw(el: HTMLElement) {
  let speed = 0
await carsEngine().then(data => speed = data)
  el.style.transform = `translate(${window.innerWidth - 230}px)`
  el.style.transition=`${speed}s` 
}


start.forEach(el => {
  el.addEventListener('click', ()=>{
    let a = el.id.replace(/[^0-9]/g,'')
    carImg.forEach(el => {
      if(el.id == `Capa_${a}`){
        draw(el.parentElement?.querySelector('.carImg')!)
      }
    })

  })
})