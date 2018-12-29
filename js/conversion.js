function convert() {

    var stringToConvert = $('#amount').val(); //Get the value to convert
    
    $('#amount-entered').html("&pound;" + stringToConvert); //Display the value to convert in #amount-entered
    $('#desc-p').fadeIn(); //Display #desc-p
    
    $.getJSON( // Load exchange rates data via AJAX:
        'https://openexchangerates.org/api/latest.json?app_id=49d329385faf437b9f7f75fbd5c5083d', //openexchangerates API
        function(data) {
            // Check money.js has finished loading:
            if ( typeof fx !== "undefined" && fx.rates ) {
                fx.rates = data.rates;
                fx.base = data.base;
            } else {
                // If not, apply to fxSetup global:
                var fxSetup = {
                    rates : data.rates,
                    base : data.base
                };
            }
            
            //find all characters except £
            var numb = stringToConvert.match(/[^£]/g);
            //join the numbers together
            numb = numb.join("");
                        
            //convert the string numbers into actual data type numbers
            numb = Number(numb);
            
            //do the conversions
            var conversionUS = fx.convert(numb, {from: 'GBP', to: 'USD'});
            var conversionEU = fx.convert(numb, {from: 'GBP', to: 'EUR'});
            //round them to two decimal places
            var roundedConversionUS = parseFloat(Math.round(conversionUS * 100) / 100).toFixed(2);
            var roundedConversionEU = parseFloat(Math.round(conversionEU * 100) / 100).toFixed(2);
                        
            //print the conversion onto the page
            document.getElementById('USFX').innerHTML = '$' + roundedConversionUS;
            document.getElementById('EUFX').innerHTML = '&euro;' + roundedConversionEU;
            
            //Display the conversion with animation
            $('#usd').fadeIn(800);
            $('#eur').fadeIn(800);
        }
    );
}