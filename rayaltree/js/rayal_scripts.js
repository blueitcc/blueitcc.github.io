var mr_firstSectionHeight,
    mr_nav,
    mr_fixedAt,
    mr_navOuterHeight,
    mr_navScrolled = false,
    mr_navFixed = false,
    mr_outOfSight = false,
    mr_floatingProjectSections,
    mr_scrollTop = 0;

$(document).ready(function() { 
    "use strict";


    var canvas = document.querySelector("canvas");


    var signaturePad = new SignaturePad(canvas, {
        // It's Necessary to use an opaque color when saving image as JPEG;
        // this option can be omitted if only saving as PNG or SVG
        backgroundColor: 'rgb(255, 255, 255)'
      });
    


function resizeCanvas() {
    var ratio =  Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    signaturePad.clear(); // otherwise isEmpty() might return incorrect value
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

    var form = $('form#submission-form'),
    url = 'https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbx_6zACj4BsRiH4a7wzi3jYC_yj8abzmWPFYVaFOgJ8Zxdl_e_A/exec';

$('#clear-signature').on('click', function(e) {
    e.preventDefault();
    // Clears the canvas
    signaturePad.clear();
})


    
$('#submit-form').on('click', function(e) {
  e.preventDefault();

    var signatureData = signaturePad.toDataURL();
    $('#signature').val(signatureData);
    $("#submit-form").removeClass("btn-success").addClass("btn-secondary"); 
    $('#submit-form').attr("disabled",true);
    $('#submit-form').html("Submitting...");
  var jqxhr = $.ajax({
    url: url,
    method: "POST",
    dataType: "application/x-www-form-urlencoded",
    data: form.serializeObject()
  }).success(function(e) {
    console.log(e);
    if(e.status === 200){
      $("#submission-form").html( '<h3 class="text-center">Your Submission has been recorded. Refresh the page to start a new form.</h3>' );

    } else {
          $("#submission-form").html( '<h3 class="text-center">Error took place.</h3>' );
    }
    
    

  }).error(function(e) {
    console.log(e);
    if(e.status === 200){
      $("#submission-form").html( '<h3 class="text-center">Your Submission has been recorded. Refresh the page to start a new form.</h3>' );

    } else {
          $("#submission-form").html( '<h3 class="text-center">Error took place.</h3>' );
    }

  });
})
    





   

}); 

