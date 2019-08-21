$(document).ready(function() {

  
    //Amount Slider
    var numberInputAmt = $(".calc-input-amt");
    var minValueAmt = 3000;
    var maxValueAmt = 500000;
    $('.calc-slider-amt').slider({
      range: "min",
      value: 25000,
      min: minValueAmt,
      max: maxValueAmt,
      step: 1000,
      slide: function(event, ui) {
        precision: 0;
        numberInputAmt.val(ThousandSeparate(ui.value));
        $(function() {
          update();
        });
       }
    });
    
    numberInputAmt.on('change', function() {
      var valueAmt = numberInputAmt.val();
      numberInputAmt.val(numberInputAmt.val().match(/\d*\.?\d+/));
      if(valueAmt < minValueAmt) {
          numberInputAmt.val(ThousandSeparate(minValueAmt));
      } else if(valueAmt > maxValueAmt) {
          numberInputAmt.val(ThousandSeparate(maxValueAmt));
      } else{
          numberInputAmt.val(ThousandSeparate(valueAmt));
      }
      $(".calc-slider-amt").slider("value",valueAmt);
      update();
    });
    
      
    //Rate Slider  
    var numberInputRate = $(".calc-input-rate");
    var minValueRate = 1.25;
    var maxValueRate = 1.50;
    $('.calc-slider-rate').slider({
      range: "min",
      value: 1.25,
      min: minValueRate,
      max: maxValueRate,
      step: .01,
      slide: function(event, ui) {
        numberInputRate.val(ui.value.toFixed(2));
        $(function() {
          update();
        });
       }
    });
      
    numberInputRate.on('change', function() {
      var valueRate = numberInputRate.val();
      numberInputRate.val(numberInputRate.val().match(/\d*\.?\d+/));
      if(valueRate < minValueRate) {
        numberInputRate.val(minValueRate.toFixed(2));
      } else if(valueRate > maxValueRate) {
        numberInputRate.val(maxValueRate.toFixed(2));
      }
      $(".calc-slider-rate").slider("value",valueRate);
       update();
    });
    
      
    //Month Slider  
    var numberInputMo = $(".calc-input-mo");
    var minValueMo = 3;
    var maxValueMo = 15;
    $('.calc-slider-mo').slider({
      range: "min",
      value: 8,
      min: minValueMo,
      max: maxValueMo,
      step: 1,
      slide: function(event, ui) {
        numberInputMo.val(ui.value);
        $(function() {
          update();
        });
       },
    });
      
      numberInputMo.on('change', function() {
      var valueMo = numberInputMo.val();
      numberInputMo.val(numberInputMo.val().match(/\d*\.?\d+/));
      if(valueMo < minValueMo) {
        numberInputMo.val(minValueMo);
      } else if(valueMo > maxValueMo) {
        numberInputMo.val(maxValueMo);
      }
      $(".calc-slider-mo").slider("value",valueMo);
      update();
    });
      
      $("#daily").click(function(){
        update();
      });
    
      $("#weekly").click(function(){
        update();
      });
    
      
     //Calculations
     function update() {
        var amount = parseFloat($('.calc-input-amt').val().replace(/,/g, ''));
        var rate = $('.calc-input-rate').val();
        var mo = $('.calc-input-mo').val();
        var payback = (amount * rate);
        var paybacktemp = ThousandSeparate(payback.toFixed(0));
        var payback_string = "$" + paybacktemp;
        if(document.getElementById('daily').checked) {
           var numpayments = (mo * 21);
           var type = "/day"
        }else if(document.getElementById('weekly').checked){
            var numpayments = (mo * 4);
            var type = "/Week"
        };
        var payment = (amount * rate) / (numpayments);
        var paymenttemp = ThousandSeparate(payment.toFixed(2));
        var payment_string = "$" + paymenttemp + type;
        $("#final-total").text(payment_string);
        $("#payback").text(payback_string);
        $("#numpayment").text(numpayments.toFixed(0));
    }
      
      
    //Currency Format
    function ThousandSeparate(val) {
        while (/(\d+)(\d{3})/.test(val.toString())){
          val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
        }
        return val;
    }
    });