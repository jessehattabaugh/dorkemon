window.is3DS = navigator.userAgent.indexOf( "3DS" ) >= 0

scroll3DS = () ->
    window.scrollTo(39, 218)
    setTimeout(scroll3DS, 30)
    false
    
if(window.is3DS) 
    #alert("You're on a 3DS!")
    scroll3DS()
    
window.addEventListener("keydown",  (e) ->
    alert(e.which)
    e.preventDefault()
)

socket = io.connect('http://localhost')
socket.on('news', (data)-> 
    console.log(data)
    socket.emit('my other event', { my: 'data' })
)
