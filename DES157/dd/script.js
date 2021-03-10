(function() {
alert("Hello! Welcome! First find the picture you want in this loop. Then put the mouse on the picture you have decided." );

$('.first').hover(function () {
    
    $('.first').css('animationPlayState', 'paused');
},

function () {
    $('.first').css('animationPlayState', 'paused');
});
}());