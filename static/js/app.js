import $ from 'jquery';
import jQuery from 'jquery';
// export for others scripts to use
window.$ = $;
window.jQuery = jQuery; // Doesn't seem to work?


import '../../node_modules/materialize-css/dist/css/materialize.min.css';
// import '../../node_modules/materialize-css/dist/js/materialize.js';
// BUG: https://github.com/InfomediaLtd/angular2-materialize/issues/20

import '../css/styles.css';


console.log("App.js loaded");




(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space


// if (window.$) {  
//         // jQuery is loaded
//         alert("Yeah!");
// }

// $( document ).ready(function() {
//     console.log( "ready!" );
//     $('h4').addClass("blue");
//         $('.button-collapse').sideNav();

// });

// setTimeout(function(){ 
// $('h4').addClass("blue");
// }, 200);

