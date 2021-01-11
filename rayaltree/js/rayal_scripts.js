// function screenshot() {
  
//   html2canvas(document.body).then(function(canvas) {
//     canvas.toBlob(function(blob) {

//       // Generate file download
//       var clientName = $('#client_name').val();
//       var clientDate = $('#date').val();
//       saveAs(blob, clientName + "_" + clientDate);
 
//   });
// });
// }

var mr_firstSectionHeight,
    mr_nav,
    mr_fixedAt,
    logoImg,
    mr_navOuterHeight,
    mr_navScrolled = false,
    mr_navFixed = false,
    mr_outOfSight = false,
    mr_floatingProjectSections,
    mr_scrollTop = 0;


$(document).ready(function() { 
    "use strict";
    var form = $('form#submission-form'),
    url = 'https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbx_6zACj4BsRiH4a7wzi3jYC_yj8abzmWPFYVaFOgJ8Zxdl_e_A/exec',
    emailUrl = 'https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbw-lyICnqLrXeSuCIA-cMBeRfQ09MO8GSlbSqIhiymTSP8kHA/exec';
    var canvas = document.querySelector("#sig");

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

function sendEmail() {

  console.log(" generating screenshot ");
  $('#screenshot-id').attr("disabled",true);
  $('#submit-form').attr("disabled",true);
  $('#screenshot-id').html("Sending...");
  $('#submit-form').html("Wait...");

 html2canvas(document.body).then(function(canvas) {
  $('#pdf').val(canvas.toDataURL());

    var jqxhr = $.ajax({
      url: emailUrl,
      method: "POST",
      dataType: "application/x-www-form-urlencoded",
      data: form.serializeObject()
    }).success(function(e) {
      console.log(e);
      if(e.status === 200){
        $('#screenshot-id').html("Email Sent!");
        $('#submit-form').attr("disabled",false);
        $('#submit-form').html("Submit");
      } else {
        $('#screenshot-id').html("An error took place");
        $('#submit-form').attr("disabled",false);
        $('#submit-form').html("Submit");
      }
    }).error(function(e) {
      console.log(e);
      if(e.status === 200){
        $('#screenshot-id').html("Email Sent!");
        $('#submit-form').attr("disabled",false);
        $('#submit-form').html("Submit");
      } else {
        $('#screenshot-id').html("An error took place");
        $('#submit-form').attr("disabled",false);
        $('#submit-form').html("Submit");
      }

    });
});
}



window.addEventListener("resize", resizeCanvas);
resizeCanvas(); 



$('#screenshot-id').on('click', function(e) {
  e.preventDefault();
  sendEmail();
})

$('#clear-signature').on('click', function(e) {
    e.preventDefault();
    // Clears the canvas
    signaturePad.clear();
})

    
$('#submit-form').on('click', function(e) {
  e.preventDefault();
    console.log(" generating screenshot ");
    $("#submit-form").removeClass("btn-success").addClass("btn-secondary"); 
    $('#submit-form').attr("disabled",true);
    $('#submit-form').html("Submitting...");

   html2canvas(document.body).then(function(canvas) {
    $('#pdf').val(canvas.toDataURL());

    var signatureData = signaturePad.toDataURL();
    $('#signature').val(signatureData);


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

  


}); 

