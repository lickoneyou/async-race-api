import './index.css'
import { App } from './components/app'
import { addCar, updateCar } from './components/cars/createCars'
import { garageArray, removeCar } from './components/garage/garage'
import { generateRandomCars } from './components/cars/generateCars'
import { isConstructorDeclaration, JsxEmit } from 'typescript'
import { node } from 'webpack'
import { winnersArray } from './components/winners/winners'

export const app = new App()
export const body = document.querySelector('body') as HTMLBodyElement

if (!body) {
  throw new Error('The main is undefined!')
}

body.innerHTML = app.render()

window.addEventListener('hashchange', () => {
  if (location.hash == '#garage') {
    body.innerHTML = app.render()
    location.reload()
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
  return +(data.distance / data.velocity / 1000).toFixed(2)
}

// async function driveMode() {
//   const drive = (await fetch(`http://localhost:3000/engine?id=2&status=drive`, {method: 'PATCH'})).json()
//   return drive
// }
// driveMode()

const carImg = document.querySelectorAll('.carImg') as NodeListOf<Element>
const start = document.querySelectorAll('.start') as NodeListOf<Element>
const stop = document.querySelectorAll('.stop') as NodeListOf<Element>
const race = document.querySelector('.race') as HTMLButtonElement
const reset = document.querySelector('.reset') as HTMLButtonElement


let bestTime: number[] = []

async function draw(el: HTMLElement) {
  let time = 0
  bestTime = []
await carsEngine().then(data => time = data)
bestTime.push(time)
  el.style.transform = `translate(${window.innerWidth - 230}px)`
  el.style.transition=`${time}s` 

  winnetPopUpView(bestTime)
}

function drawStop(el: HTMLElement) {
  el.style.transform = `translate(0px)`
  el.style.transition=`0s` 
}


start.forEach(el => {
  el.addEventListener('click', ()=>{
    let id = el.id.replace(/[^0-9]/g,'')
    carImg.forEach(el => {
      if(el.id == `Capa_${id}`){
        draw(el.parentElement?.querySelector('.carImg')!)
      }
    })

  })
})

stop.forEach(el => {
  el.addEventListener('click', ()=>{
    let id = el.id.replace(/[^0-9]/g,'')
    carImg.forEach(el => {
      if(el.id == `Capa_${id}`){
        drawStop(el.parentElement?.querySelector('.carImg')!)
      }
    })

  })
})

race.addEventListener('click', ()=>{
    carImg.forEach(el => {
        draw(el.parentElement?.querySelector('.carImg')!)
      
    })

  })

  reset.addEventListener('click', ()=>{
    carImg.forEach(el => {
        drawStop(el.parentElement?.querySelector('.carImg')!)
      
    })

  })

  const winPopUp = document.querySelector('.winPopUp') as HTMLElement
const winnerCarName = document.querySelector('.winnerCarName') as HTMLElement
  const winnerTime = document.querySelector('.winnerTime') as HTMLElement

  function winnetPopUpView(time:Array<number>) {
    let bestTime = time.sort((a,b) => a - b)[0]*1000
    setTimeout(() => {
      let carName = ''
      let fill = ''
      carImg.forEach(el =>  {
        if(el.getAttribute('style') == `transform: translate(1133px); transition: all ${time.sort((a,b) => a - b)[0]}s ease 0s;`){
         carName = el.parentElement?.parentElement?.parentElement?.querySelector('.carName')?.innerHTML!
         fill = el.parentElement?.parentElement?.parentElement?.querySelector('.carImg')?.getAttribute('fill')!
        }
      })
      winPopUp.style.display = 'flex'
      winnerTime.innerHTML = `Time: ${time.sort((a,b) => a - b)[0]}s`
      winnerCarName.innerHTML = `${carName}`

      let winner = `<div class='tableTittle'>
      <div class='number'>${winnersArray.length+1}</div>
      <svg class='carImg' fill="${fill}" height="34px" width="34px" version="1.1" id="2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511 511" xml:space="preserve" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.022"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M119.5,384c-4.142,0-7.5,3.358-7.5,7.5c0,9.098-7.402,16.5-16.5,16.5S79,400.598,79,391.5S86.402,375,95.5,375 c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5C78.131,360,64,374.131,64,391.5S78.131,423,95.5,423s31.5-14.131,31.5-31.5 C127,387.358,123.642,384,119.5,384z"></path> <path d="M439.5,384c-4.142,0-7.5,3.358-7.5,7.5c0,9.098-7.402,16.5-16.5,16.5s-16.5-7.402-16.5-16.5s7.402-16.5,16.5-16.5 c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5c-17.369,0-31.5,14.131-31.5,31.5s14.131,31.5,31.5,31.5s31.5-14.131,31.5-31.5 C447,387.358,443.642,384,439.5,384z"></path> <path d="M447.5,256h-16c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h16c4.142,0,7.5-3.358,7.5-7.5S451.642,256,447.5,256z"></path> <path d="M327.5,320h-144c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h144c4.142,0,7.5-3.358,7.5-7.5S331.642,320,327.5,320z"></path> <path d="M471.513,224H371.038l-68.199-82.764c-0.077-0.094-0.157-0.186-0.239-0.275c-6.198-6.817-14.583-11.219-23.6-12.537V95.5 c0-17.369-14.131-31.5-31.5-31.5H215v-0.5c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5V64h-41v-0.5c0-4.142-3.358-7.5-7.5-7.5 s-7.5,3.358-7.5,7.5V64h-32.5C94.131,64,80,78.131,80,95.5v32.537c-13.185,0.383-25.202,7.168-32.316,18.347 c-0.068,0.107-0.134,0.217-0.197,0.328L6.061,219.793C2.095,226.095,0,233.356,0,240.805V327.5 c0,15.285,9.017,29.334,22.972,35.791c2.002,0.927,4.312,0.925,6.311-0.006c1.829-0.85,3.221-2.4,3.894-4.285h7.798 C35.282,368.514,32,379.629,32,391.5c0,35.014,28.486,63.5,63.5,63.5s63.5-28.486,63.5-63.5c0-11.871-3.282-22.986-8.975-32.5 h7.775c0.19,0.718,0.375,1.437,0.54,2.162c0.776,3.415,3.812,5.838,7.313,5.838h179.691c3.502,0,6.538-2.423,7.313-5.838 c0.165-0.725,0.35-1.444,0.54-2.162h7.775c-5.693,9.514-8.975,20.629-8.975,32.5c0,35.014,28.486,63.5,63.5,63.5 s63.5-28.486,63.5-63.5c0-11.871-3.282-22.986-8.975-32.5h7.775c0.19,0.718,0.375,1.437,0.54,2.162 c0.776,3.415,3.812,5.838,7.313,5.838h1.823C500.448,367,511,356.447,511,343.477v-79.99C511,241.714,493.286,224,471.513,224z M496,288h-8.5c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5,8.5-8.5h8.5V288z M304.563,166.916L351.602,224H116.042l24.522-45.65 C145.1,171.238,152.822,167,161.27,167H303.5C303.862,167,304.215,166.966,304.563,166.916z M247.5,79 c9.098,0,16.5,7.402,16.5,16.5V128h-49V79H247.5z M200,79v49h-41V79H200z M111.5,79H144v49H95V95.5C95,86.402,102.402,79,111.5,79z M53.401,166.696c0.667,0.194,1.37,0.304,2.099,0.304h35.457l-24.535,45.671C61.896,219.769,54.187,224,45.754,224H20.918 L53.401,166.696z M95.5,440C68.757,440,47,418.243,47,391.5S68.757,343,95.5,343s48.5,21.757,48.5,48.5S122.243,440,95.5,440z M137.579,344c-11.213-9.944-25.948-16-42.079-16s-30.866,6.056-42.079,16H39.29c11.21-19.986,32.578-33,56.21-33 c14.913,0,28.908,4.948,40.474,14.31c6.412,5.19,11.746,11.568,15.741,18.69H137.579z M415.5,440c-26.743,0-48.5-21.757-48.5-48.5 s21.757-48.5,48.5-48.5s48.5,21.757,48.5,48.5S442.243,440,415.5,440z M457.579,344c-11.213-9.944-25.948-16-42.079-16 s-30.866,6.056-42.079,16h-14.136c3.995-7.123,9.329-13.5,15.741-18.69C386.592,315.948,400.587,311,415.5,311 s28.908,4.948,40.474,14.31c6.412,5.19,11.746,11.568,15.741,18.69H457.579z M491.139,351.172 c-4.717-14.635-13.689-27.777-25.728-37.521C451.35,302.269,433.624,296,415.5,296s-35.85,6.269-49.911,17.651 c-12.266,9.928-21.347,23.382-25.99,38.349H171.401c-4.643-14.967-13.724-28.421-25.99-38.349C131.35,302.269,113.624,296,95.5,296 c-32.221,0-61.034,19.614-73.261,48.782C17.694,340.261,15,334.063,15,327.5V271h384.5c4.142,0,7.5-3.358,7.5-7.5 s-3.358-7.5-7.5-7.5H15v-15.195c0-0.611,0.026-1.22,0.071-1.826C15.214,238.986,15.355,239,15.5,239h30.254 c13.715,0,26.243-6.943,33.512-18.574c0.087-0.139,0.169-0.281,0.247-0.425l30.595-56.951c1.249-2.324,1.184-5.134-0.17-7.398 S106.139,152,103.5,152H62.113c4.661-5.68,11.587-9,19.062-9h192.127c6.858,0,13.44,2.887,18.086,7.926l0.885,1.074H161.27 c-13.729,0-26.271,6.951-33.547,18.594c-0.087,0.139-0.169,0.281-0.247,0.426l-30.582,56.931c-1.249,2.325-1.184,5.134,0.17,7.398 S100.861,239,103.5,239h264h104.013c10.891,0,20.141,7.149,23.312,17H487.5c-12.958,0-23.5,10.542-23.5,23.5s10.542,23.5,23.5,23.5 h8.5v40.477C496,346.866,494.011,349.8,491.139,351.172z"></path> </g> </g></svg>
      <div class='name'>${carName}</div>
      <div class='wins'>1</div>
      <div class='bestTime'>${time.sort((a,b) => a - b)[0]}s</div>
      </div>
      `
      if(winnersArray.includes(winner) == false){
      winnersArray.push(winner)
      }
      console.log(winnersArray[0].slice(0,120))
localStorage.setItem('winnersArray',JSON.stringify(winnersArray));
    }, bestTime);
  }

  const OkButton = document.querySelector('.OkButton') as HTMLElement

  OkButton.addEventListener('click', () => {
    winPopUp.style.display = 'none'
  })
