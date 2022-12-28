// document.onload = function(){
//   console.log("started up");
//   document.querySelectorAll('[data-audio="tap"]').addEventListener("click", function(){ new Audio('/assets/sounds/tap-smallest.mp3').play();
// });
// }
//
// function tap() {
//   new Audio('/assets/sounds/tap-smallest.mp3').play();
// }


// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelectorAll('[data-audio="tap"]').addEventListener("click", function(){ new Audio('/assets/sounds/tap-smallest.mp3').play();
// });
// }, false);

// window.onload = function() {
//   var arr = document.querySelectorAll('[data-audio="tap"]');
//   var f = function() {
//     new Audio('/assets/sounds/tap-smallest.mp3').play();
//   };
//   for (var i = 0; i < arr.length; i++) {
//   arr[i].onclick = f;
//   }
//   console.log("sound played");
// };

function tapSound() {
    new Audio('/assets/sounds/tap-smallest.mp3').play();
}

function imgHover(obj){
  console.log("testing");
  var imgs = document.getElementsByClassName("hoverScale");



  for(var i=0; i<imgs.length; i++){
    if(obj != imgs[i]){
      imgs[i].style.opacity = "0.5";
    }
  }
}

function imgHoverOut(){
  console.log("testing");
  var imgsOut = document.getElementsByClassName("hoverScale");

  for(var i=0; i<imgsOut.length; i++){
    imgsOut[i].style.opacity = "1";
    console.log("in here");
  }
}


$('.email-collect').on("keyup", action);
function action() {
   if($('.email-input').val().length > 0) {
      $('#submit-button').prop("disabled", false);
   }else {
      $('#submit-button').prop("disabled", true);
   }
}



document.addEventListener("DOMContentLoaded", function() {

  try {

    MicroModal.init({
      awaitCloseAnimation: true,// set to false, to remove close animation
      onShow: function(modal) {
        console.log("micromodal open");
      },
      onClose: function(modal) {
        console.log("micromodal close");
      }
    });

  } catch (e) {
    console.log("micromodal error: ", e);
  }

});

// var imgCounter = 0;
//
// function nextImage(){
//
//   var photoArray = document.getElementsByClassName('photo-grid-image');
//
//   if(imgCounter === photoArray.length - 1){
//     $(photoArray[imgCounter]).hide();
//     imgCounter = 0;
//     $(photoArray[imgCounter]).css("display", "flex");
//   }
//
//   else{
//     $(photoArray[imgCounter]).hide();
//     $(photoArray[imgCounter + 1]).css("display", "flex");
//     imgCounter++;
//   }
//   console.log(imgCounter);
// };
//
//
// function prevImage(){
//
//   var photoArray = document.getElementsByClassName('photo-grid-image');
//
//   if(imgCounter === 0){
//     $(photoArray[imgCounter]).hide();
//     imgCounter = photoArray.length - 1;
//     $(photoArray[imgCounter]).css("display", "flex");
//   }
//
//   else{
//     $(photoArray[imgCounter]).hide();
//     $(photoArray[imgCounter - 1]).css("display", "flex");
//     imgCounter--;
//   }
// };

//ARROW KEY FUNCTIONS

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
       prevImage();
    }
    else if (e.keyCode == '39') {
       nextImage();
    }
}



//ANIMATED HEADER
if (document.querySelector('.animated-header') !== null ) {

  // Wrap every letter in a span
  var textWrapper = document.querySelector('.animated-header');
  textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime.timeline({loop: false})
    .add({
      targets: '.animated-header .letter',
      translateY: [120,0],
      easing: "easeOutExpo",
      duration: 900,
      delay: (el, i) => 10 * i
    });

    $(window).scroll(function(){
        $(".fade-scroll").css("opacity", 1 - $(window).scrollTop() / 500);
      });

      $(window).scroll(function(){
          $(".fadein-scroll").css("opacity", 0 + $(window).scrollTop() / 100);
        });
}

//----INTERNAL NAV----//

//Changing internal nav based on hash links
var anchors = document.querySelectorAll('[id^="page-anchor"]');

//Get anchors into a usable state
var anchor_elements = $.map(anchors, function(el){
  return $(el).get();
});


var sectionTitle = document.querySelector('#section-title');

//Fired by the IntersectionObserver
function handler(entries, observer) {
  for (entry of entries) {
    if (entry.isIntersecting){
      //Get the text content of the hash link
      var hashContent =  entry.target.innerHTML;
      sectionTitle.innerHTML = hashContent;
    }
  }
}

/* By default, invokes the handler whenever:
   1. Any part of the target enters the viewport
   2. The last part of the target leaves the viewport */


var navList = document.getElementById("internal-nav-select");


for(i=0; i < anchor_elements.length; i++){
  let observer = new IntersectionObserver(handler);
  observer.observe(anchor_elements[i]);

  //Creating li for all nav sections and appending
  var section = document.createElement("li");
  var link = document.createElement("a");
  var sectionText = section.text = anchor_elements[i].innerHTML;
  var hashLink = anchor_elements[i].id;

  link.setAttribute('href', '#' + hashLink);

  section.appendChild(document.createTextNode(sectionText));
  link.appendChild(section);
  navList.appendChild(link);

}

//Handling toggles
$(document).ready(function(){
    $('.internal-nav-toggle').click(function(event){
        event.stopPropagation();
         $(".custom-select").slideToggle("fast");
    });
    $(".custom-select").on("click", function (event) {
        event.stopPropagation();
    });
});

$(document).on("click", function () {
    $(".custom-select").slideUp("fast");
});

//----END INTERNAL NAV----//


//Fadescroll
$(window).scroll(function(){
    $(".fade-scroll").css("opacity", 1 - $(window).scrollTop() / 550);
  });



//----ANIMATE ON SCROLL----//

//Get all elements with AOS class
var animateOnScroll = document.querySelectorAll('.animate-on-scroll');

//Get into a usable state
var aosElements = $.map(animateOnScroll, function(el){
  return $(el).get();
});
console.log(aosElements.length);

//Iterate over and add data elements
for(var i=0; i<aosElements.length; i++){
  aosElements[i].setAttribute('data-aos', 'fade-up');
  aosElements[i].setAttribute('data-aos-delay', '250');
}

//----END ANIMATE ON SCROLL----//


//----FILTERING----------------//

filterSelection("all")
function filterSelection(c) {
  console.log("filtered");
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

let toggleButton = Array.from(document.querySelectorAll('.btn'));

const handleClick = (e) => {
  e.preventDefault();
  toggleButton.forEach(node => {
    node.classList.remove('active');
  });
  e.currentTarget.classList.add('active');

}

toggleButton.forEach(node => {
  node.addEventListener('click', handleClick)
});


function hover(element) {
  document.getElementById("memoji-hover").setAttribute('src', '/assets/img/icons/thumbsup.png');
}

function unhover(element) {
  document.getElementById("memoji-hover").setAttribute('src', '/assets/img/icons/ponder.png');
}
