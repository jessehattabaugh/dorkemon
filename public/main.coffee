window.is3DS = navigator.userAgent.indexOf( "3DS" ) >= 0

scroll3DS = () ->
    window.scrollTo(39, 218)
    setTimeout(scroll3DS, 30)
    
if(window.is3DS)
    alert("You're on a 3DS!")
    scroll3DS()