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


    // $('input[type="checkbox"]').click(function(){
    //     if($(this).prop("checked") == true){
    //         console.log("Checkbox is checked.");
    //         $('#submit-form').removeAttr('disabled');
            
    //     }
    //     else if($(this).prop("checked") == false){
    //         console.log("Checkbox is unchecked.");
            
    //         $('#submit-form').attr('disabled', 'disabled');
    //     }
    // });

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
    url = 'https://script.google.com/macros/s/AKfycbx_6zACj4BsRiH4a7wzi3jYC_yj8abzmWPFYVaFOgJ8Zxdl_e_A/exec';

$('#clear-signature').on('click', function(e) {
    e.preventDefault();
    // Clears the canvas
    signaturePad.clear();
})


    
$('#submit-form').on('click', function(e) {
  e.preventDefault();

    var signatureData = signaturePad.toDataURL();
  	$('#signature').val(signatureData);

  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: form.serializeObject()
  }).success(function() {
    $("#form-container").css("top", "40%");
    $("#form-container").html( "<h3>¡Gracias por tu envío!</h3>" );
    

  }).error(function() {
    $("#form-container").css("top", "40%");
    $("#form-container").html( "<h3>Set up backend to receive submissions. </h3>" );
  });
})
    





   

}); 

