(function($) {

    $.fn.coffeeTable = function(options) {

      // Establish our default settings
      var settings = $.extend({
        text: 'Hello, World!',
        color: null,
      }, options);

      acceptedStatus = ['main', 'default', 'active'];

      /* EU */
      gr = 4;
      dl = 2.365882365;
      l = 0.2365882365;


      var drinks = [{
        name: "main",
        beans: "0",
        water: "1",
        milk: "0",
        foam: 0,
        description: "Main",
        addition: {
          unit: 0,
          amount: 0,
          type: 0
        },
        status: "main"
      }, {
        name: "coffee",
        beans: 3.25,
        water: 1,
        milk: 0,
        foam: 0,
        description: "Regular Coffee",
        addition: {
          unit: 0,
          amount: 0,
          type: 0
        },
        status: "default"
      }, {
        name: "cappuccino",
        beans: 1.5,
        water: 1 / 2,
        milk: 1 / 4,
        foam: 1 / 4,
        description: "Cappuccino",
        addition: {
          unit: 0,
          amount: 0,
          type: 0
        },
        status: "active"
      }, {
        name: "latte",
        beans: 1,
        water: 2 / 3,
        milk: 1 / 3,
        foam: 0,
        description: "Caffè Latte",
        addition: {
          unit: 0,
          amount: 0,
          type: 0
        },
        status: "active"
      }, {
        name: "cortado",
        beans: 1,
        water: 2 / 3,
        milk: 0,
        foam: 1 / 3,
        description: "Cortado",
        addition: {
          unit: 0,
          amount: 0,
          type: 0
        },
        status: "active"
      }, {
        name: "galao",
        beans: 0.75,
        water: 1 / 4,
        milk: 3 / 4,
        foam: 0,
        description: "Caffè Galão",
        addition: {
          unit: 0,
          amount: 0,
          type: 0
        },
        status: "active"
      }, {
        name: "americano",
        beans: 1.5,
        water: 1 / 3,
        milk: 0,
        foam: 0,
        description: "Americano",
        addition: {
          unit: "cup",
          amount: 2 / 3,
          type: "Hot Water"
        },
        status: "active"
      }, {
        name: "mocha",
        beans: 1,
        water: 1 / 4,
        milk: 1 / 4,
        foam: 1 / 4,
        description: "Caffè Mocha",
        addition: {
          unit: "tbsp",
          amount: 1 / 4,
          type: "Chocolate"
        },
        status: "active"
      }, {
        name: "affogato",
        beans: 1,
        water: 1 / 3,
        milk: 0,
        foam: 0,
        description: "Affogato",
        addition: {
          unit: "cup",
          amount: 2 / 3,
          type: "Ice Creme"
        },
        status: "active"
      }];

      $('.count').prop('disabled', true);

      drawTable();

      //alert (drinks[2].additional.type);

      addDrinks();

      callCup(); // start values

      $(document).on('click', '.plus', function() {
        $('.count').val(parseInt($('.count').val()) + 1);
        for (var plusskey in drinks) {
          var name = drinks[plusskey].name;
          //var cup = Number($('.cup-'+name).text()) +1;
          //$('.cup-'+name).text( cup );        
        }

        callCup();

      });

      $(document).on('click', '.minus', function() {
        $('.count').val(parseInt($('.count').val()) - 1);

        // Stop at 1 Cup
        if ($('.count').val() == 0) {
          $('.count').val(1);
        }
        // If count not 1 call Cup function
        else {
          callCup();
        }

      });

      function drawTable() {
        alert(settings.text)
        $('#coffeTable').append("<table class='coffeCalc'><thead></thead><tbody></tbody><tfoot></tfoot></table><br>" );
        $('#coffeTable').append("<div class='qty mt-5'><span class='minus bg-dark'>-</span><input type='number' class='count' name='qty' value='1'><span class='plus bg-dark'>+</span></div>" );        
        }

        // Add Drinks
        function addDrinks() {

          for (var key in drinks) {

            if (drinks[key].status == "main") {

              mainRow = "<tr><th><span class='cup-main-cup-water'></span> (<span class='cup-main-num-water'></span><span class='cup-main-unit-water'></span>)</th><th>Coffee Beans</th><th>Water for Coffee</th><th>Hot Milk</th><th>Milk Foam</th><th>Addition</th></tr>";
              $("table thead").append(mainRow);

            } else if (drinks[key].status == "active" || drinks[key].status == "default") {
              drink = drinks[key].name;
              //capitalizeFirstLetter  = drink.substr(0,1).toUpperCase()+drink.substr(1); 
              description = drinks[key].description;
              row = "<tr><td class='addcup' data-cup='1 Cup '><span class='liquid' data-liquid=' (2.37 dl)'>" + description + "</span></td><td data-label='Coffee'><span class='cup-" + drink + "-beans'></span><span class='cup-" + drink + "-cup-beans'></span> (<span class='cup-" + drink + "-num-beans'></span><span class='cup-" + drink + "-unit-beans'></span>)</td><td data-label='Water for Coffee'><span class='cup-" + drink + "-water'></span><span class='cup-" + drink + "-cup-water'></span> (<span class='cup-" + drink + "-num-water'></span><span class='cup-" + drink + "-unit-water'></span>)</td><td data-label='Hot Milk'><span class='cup-" + drink + "-milk'></span><span class='cup-" + drink + "-cup-milk'></span> (<span class='cup-" + drink + "-num-milk'></span><span class='cup-" + drink + "-unit-milk'></span>)</td><td data-label='Milk Foam'><span class='cup-" + drink + "-foam'></span><span class='cup-" + drink + "-cup-foam'></span> (<span class='cup-" + drink + "-num-foam'></span><span class='cup-" + drink + "-unit-foam'></span>)</td><td data-label='Addition'><span class='cup-" + drink + "-addition'></span><span class='cup-" + drink + "-cup-addition'></span> (<span class='cup-" + drink + "-num-addition'></span><span class='cup-" + drink + "-unit-addition'> - </span>)<br><span class='addition-" + drink + "-type'></span></td></tr>";
              $("table tbody").append(row);

            }

          }
        }


        // CUP
        function callCup() {

          for (var key in drinks) {

            if ($.inArray(drinks[key].status, acceptedStatus) > -1) {
              array = [Object.keys(drinks[key])];
              //alert (array[0][2]);

              Cup(drinks[key].name, drinks[key].water, array[0][2], 0);
              Cup(drinks[key].name, drinks[key].milk, array[0][3], 0);
              Cup(drinks[key].name, drinks[key].foam, array[0][4], 0);
              Tbsp(drinks[key].name, drinks[key].beans, array[0][1], 0);

              if (drinks[key].addition.unit == "cup") {
                Cup(drinks[key].name, drinks[key].addition.amount, array[0][6], drinks[key].addition.type);
              } else if (drinks[key].addition.unit == "tbsp") {
                Tbsp(drinks[key].name, drinks[key].addition.amount, array[0][6], drinks[key].addition.type);
              }
            }
          }
        }




        function Tbsp(name, amount, amount_name, type) {
          subcup = $('.count').val();

          qty_gr = Number(amount) * gr;
          qty_tbsp = Number(amount);
          amount_gr = (Number(subcup) * qty_gr);

          countAmount = (Number(subcup) * qty_tbsp);

          var cuptofraction = new Fraction(countAmount);
          var tbsp = cuptofraction.toFraction(true);

          //alert(gr);

          $('.cup-' + name + '-' + amount_name).text(tbsp + " tbsp");
          $('.cup-' + name + '-num-' + amount_name).text(amount_gr.toFixed(0));
          $('.cup-' + name + '-unit-' + amount_name).text(" gr");


          if (type != 0) {
            //alert(type);
            $('.addition-' + name + '-type').text(" " + type);
          }


        }


        function Cup(name, liquid, liquid_name, type) {
          subcup = $('.count').val();

          qty_dl = Number(liquid) * dl;
          qty_cup = Number(liquid); //?
          liquid_dl = (Number(subcup) * qty_dl);

          liquid_cup = (Number(subcup) * qty_cup);

          var cuptofraction = new Fraction(liquid_cup);
          var cup = cuptofraction.toFraction(true);

          var cText = cupText(liquid_dl);

          $('.cup-' + name + '-cup-' + liquid_name).text(cup + cText);

          if (cup != 0) {
            $('.cup-' + name + '-cup-' + liquid_name).text(cup + cText);
          } else {
            $('.cup-' + name + '-cup-' + liquid_name).text("  ");
          }

          if (liquid_name == "water" && name == "main") {
            // Data-cup
            $('.addcup').attr('data-cup', cup + cText + " ");
          }

          if (liquid_name == "milk" && Number(qty_dl) == 0) {
            $('.cup-' + name + '-num-' + liquid_name).text(" - ");
            $('.cup-' + name + '-unit-' + liquid_name).text("");
          } else if (liquid_name == "foam" && Number(qty_dl) == 0) {
            $('.cup-' + name + '-num-' + liquid_name).text(" - ");
            $('.cup-' + name + '-unit-' + liquid_name).text("");
          } else {
            liquidMetric(liquid_dl, name, liquid_name);
          }


          if (type != 0) {
            $('.addition-' + name + '-type').text(" " + type);
          }


        }

        function liquidMetric(liquid, name, liquid_name) {

          if (liquid < 10) {
            $('.cup-' + name + '-num-' + liquid_name).text(liquid.toFixed(2));
            $('.cup-' + name + '-unit-' + liquid_name).text(" dl");
            // Data-cup
            if (liquid_name == "water" && name == "main") {
              $('.liquid').attr('data-liquid', "(" + liquid.toFixed(2) + " dl)");
            }

          } else {
            liquid_liter = (liquid * 0.1).toFixed(2);
            $('.cup-' + name + '-num-' + liquid_name).text(liquid_liter);
            $('.cup-' + name + '-unit-' + liquid_name).text(" l");
            // Data-cup
            if (liquid_name == "water" && name == "main") {
              $('.liquid').attr('data-liquid', "(" + liquid_liter + " l)");
            }

          }

        }

        function cupText(cup) {
          if (cup <= dl) {
            return " Cup ";
          } else {
            return " Cups ";
          }
        }

      }

    }(jQuery));
