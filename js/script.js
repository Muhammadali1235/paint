const canvas = document.querySelector('canvas'),
    toolBtns = document.querySelectorAll('.tool'),
    fillcolor = document.querySelector('#fill-color '),
    sizeSlider = document.querySelector('#size-slider'),
    colorBtns = document.querySelectorAll('.colors .option'),
    colorPicker = document.querySelector('#color-pcker'),
    crearCanvasBtn = document.querySelector('.crear-canvas'),
    saveImgBtn = document.querySelector('.save-img')

let ctx = canvas.getContext('2d'),
    isDrawing = false,
    brushWidth = 5,
    selectedTool = "brush",
    selectedColor = '#000',
    prevMouseX,
    prevMouseY,
    snapshot

const setCannvasBackground = () => {
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = selectedColor
}

window.addEventListener('load', () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    canvas.height = canvas.offsetHeight
    setCannvasBackground()
})
const startDraw = e => {
    isDrawing = true
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = brushWidth
    ctx.strokeStyle = selectedColor
    ctx.fillStyle = selectedColor
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
    console.log(snapshot)
}

const drawCircle = e => {
    ctx.beginPath()
    const radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2)) + Math.pow(prevMouseY - e.offsetY, 2)
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI)
    fillcolor.checked ? ctx.fill() : ctx.stroke()
}

const drawTriangle = e => {
    ctx.beginPath()
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY)
    ctx.closePath()
    fillcolor.checked ? ctx.fill() : ctx.stroke()
}
const drawHifen = e => {
    ctx.beginPath()
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
}

const drawRectangle = e => {
    fillcolor.checked
        ? ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
        : ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}

const drawing = e => {
    if (!isDrawing) return
    ctx.putImageData(snapshot, 0, 0)
    switch (selectedTool) {
        case 'brush':
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            break;
        case "rectangle":
            drawRectangle(e)
            break
        case "circle":
            drawCircle(e)
            break
        case 'triangle':
            drawTriangle(e)
            break
        case 'chiziq':
            drawHifen(e)
            break
        case 'ereser':
            ctx.strokeStyle = '#fff'
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            break
        default:
            break;
    }
}

toolBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.options .active').classList.remove('active')
        btn.classList.add('active')
        selectedTool = btn.id
        console.log(`Selected tool ${selectedTool}`)
    })
})

sizeSlider.addEventListener('change', () => (brushWidth = sizeSlider.value))

colorBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        document.querySelector('.options1 .selected').classList.remove('selected')
        btn.classList.add('selected')
        const bgcolor = window.getComputedStyle(btn).getPropertyValue('background-color')
        selectedColor = bgcolor
        console.log(bgcolor)
    })
})

colorPicker.addEventListener('change', () => {
    colorPicker.parentElement.style.background = colorPicker.value
    colorPicker.parentElement.click()
})

crearCanvasBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setCannvasBackground()
})

saveImgBtn.addEventListener('click', () => {
    const link = document.createElement('a')
    link.download = `Rakhimov-paint ${Date.now()}.jpg`
    link.href = canvas.toDataURL()
    link.click()
})

const stopDraw = () => {
    isDrawing = false
}

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mousemove', drawing)
canvas.addEventListener('mouseup', stopDraw)