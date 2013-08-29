// Dependencies
if(io === 'undefined') var io;
if(ko === 'undefined') var ko;

var chatModel, loadButton, scroll3DS;

window.is3DS = navigator.userAgent.indexOf("3DS") >= 0;

scroll3DS = function() {
  window.scrollTo(39, 218);
  setTimeout(scroll3DS, 30);
};

if (window.is3DS) {
  alert("You're on a 3DS!");
  scroll3DS();
}

window.addEventListener("keydown", function(e) {
  var _ref;
  if (((_ref = e.which) === 37 || _ref === 38 || _ref === 39 || _ref === 40 || _ref === 13)) {
    //alert(e.which);
    e.preventDefault();
  }
});

loadButton = document.getElementById("loadImage");

loadButton.addEventListener("click", function() {
  var ctx, img;
  loadButton.value = "Loading...";
  loadButton.disabled = "disabled";
  ctx = document.getElementById("topScreen").getContext("2d");
  img = new Image();
  img.onload = function() {
    loadButton.value = "Load Image";
    loadButton.disabled = "";
    ctx.drawImage(img, 0, 0);
  };
  img.src = document.getElementById("imageUrl").value;
});

/*
socket = io.connect()

pingButton = document.getElementById("pingButton")

socket.on('connect', () ->
    #alert("connected to socket");
    pingButton.disabled = ''
    false
    alert("thefuck")
)

socket.on('pong', (data) -> 
    alert('server says pong!')
)

pingButton.addEventListener('click', () ->
    console.log('pingging the server')
    socket.emit('ping', { my: 'data' })
)
*/

// a custom binding to allow for nested Views
ko.bindingHandlers.skipBinding = {
    init: function() {
        return { controlsDescendantBindings: true };
    }
};

function BottomScreenModel(){
    this.tab = ko.observable('home');
}
ko.applyBindings(new BottomScreenModel(), document.getElementById('bottomScreen'));

function ChatModel() {
    var chatModel = this;
    
    this.nameField = ko.observable('');
    
    this.setName = function(data, event) {
        this.name(this.nameField());
        this.socket.emit('join', {name: this.name()});
    };
    
    this.name = ko.observable('');
    
    this.socket = io.connect();
    
    this.connected = ko.observable(false);
    
    this.socket.on('connect', function () {
        //alert("connected to socket");
        chatModel.connected(true);
    });
    
    this.people = ko.observableArray();
    
    this.socket.on('joined', function (data) {
        //alert('someone joined chat');
        chatModel.people.push(data.name);
    });
    
    this.socket.on('left', function (data) {
        //alert('someone left chat');
        chatModel.people.remove(data.name);
    });
    
    this.log = ko.observableArray();
    
    this.socket.on('hear', function (data) {
        //alert('someone says');
        chatModel.log.push(data);
    });
    
    this.msg = ko.observable('');
    
    this.say = function(data, event){
        this.socket.emit('say', {
            name: this.name(),
            msg: this.msg()
        });
        this.msg('');
    };
}
ko.applyBindings(new ChatModel(), document.getElementById('chatView'));
