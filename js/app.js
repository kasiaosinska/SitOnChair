document.addEventListener('DOMContentLoaded', function () {

    var menu = document.querySelector('.hasChildren');
    var subMenu = document.querySelector('.subMenu');
    var pic = document.querySelectorAll('.pic');
    var prevButton = document.querySelector('.prev');
    var nextButton = document.querySelector('.next');
    var sliderPic = document.querySelectorAll('.sliderPic');
    var counter = 0;
    var lists = document.querySelectorAll('.drop_down_list');
    var transportCheckbox = document.querySelector('#transport');


    menu.addEventListener('mouseover', function () {
        subMenu.style.display = 'initial';
    });

    menu.addEventListener('mouseout', function () {
        subMenu.style.display = 'none';
    });

    for (var i = 0; i < pic.length; i++) {
        pic[i].addEventListener('mouseover', function (event) {
           this.children[0].classList.add("hiddenSpan");

        });
        pic[i].addEventListener('mouseout', function (event) {
            this.children[0].classList.remove("hiddenSpan");

        });
    }

    sliderPic[counter].style.display = 'block';

    nextButton.addEventListener('click', nextClick);
    prevButton.addEventListener('click', prevClick);

    function nextClick() {
        sliderPic[counter].style.display = 'none';
        if (counter < sliderPic.length - 1) {
            counter++;
        }
        else {
            counter = 0;
        }
        sliderPic[counter].style.display = 'block';
    }

    function prevClick() {
        sliderPic[counter].style.display = 'none';
        if (counter > 0) {
            counter--;
        }
        else {
            counter = sliderPic.length - 1;
        }
        sliderPic[counter].style.display = 'block';
    }

    window.setInterval(nextClick, 3000);


    function calculateOrderSum() {
        var priceValues = document.querySelector('#summary-right').children;
        var sumElement = document.querySelector('#sum');
        var sum = 0;

        for (var i = 0; i < priceValues.length; i++) {
            if(priceValues[i].innerText !== '') {
                sum += parseInt(priceValues[i].innerText);
            }
        }
        sumElement.innerText = sum;
    }


    for (var i = 0; i < lists.length; i++) {
        var arrow = lists[i].querySelector('.list_arrow');

        arrow.addEventListener('click', function () {
            var dropdown = this.parentNode;
            var label = dropdown.querySelector('.list_label');
            var select = dropdown.querySelector('.list_panel');
            var options = select.querySelectorAll('li');

            select.classList.toggle('show');

            for (var j = 0; j < options.length; j++) {
                options[j].addEventListener('click', function () {

                    var summaryDesc = document.querySelector('#summary-' + dropdown.id);
                    var summaryPrice = document.querySelector('#summary-' + dropdown.id + '-value');

                    label.innerText = this.innerText;
                    summaryDesc.innerText = this.innerText;
                    summaryPrice.innerText = this.dataset.price;

                    select.classList.remove('show');
                    calculateOrderSum();
                });
            }
        });
    }

    transportCheckbox.addEventListener('change', function () {
        var transportDesc = document.querySelector('#summary-transport');
        var transportPrice = document.querySelector('#summary-transport-value');

        transportDesc.innerText = this.checked ? 'Transport' : '';
        transportPrice.innerText = this.checked ? this.dataset.price : '';

        calculateOrderSum();
    });


});

