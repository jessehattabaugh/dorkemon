window.is3DS = navigator.userAgent.indexOf( "3DS" ) >= 0

scroll3DS = () ->
    window.scrollTo(39, 218)
    setTimeout(scroll3DS, 30)
    false
    
if(window.is3DS) 
    alert("You're on a 3DS!")
    scroll3DS()
    
window.addEventListener("keydown",  (e) ->
    alert(e.which)
    e.preventDefault()
)

loadButton = document.getElementById("loadImage")

loadButton.addEventListener("click", () ->
    #alert("Loading Image")
    loadButton.value = "Loading..."
    loadButton.disabled = "disabled"
    ctx = document.getElementById("topScreen").getContext("2d")
    img = new Image # First create the image...
    img.onload = () ->
        #alert("loaded image (w: #{img.width}, h:#{img.height})")
        loadButton.value = "Load Image"
        loadButton.disabled = ""
        ctx.drawImage(img, 0, 0)
    img.src = document.getElementById("imageUrl").value
)


socket = io.connect()

pingButton = document.getElementById("pingButton")

socket.on('connect', () ->
    #alert("connected to socket");
    pingButton.disabled = ''
)

socket.on('pong', (data) -> 
    alert('server says pong!')
)

pingButton.addEventListener('click', () ->
    console.log('pingging the server')
    socket.emit('ping', { my: 'data' })
)
