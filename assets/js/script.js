const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const emailAddress = document.querySelector("#emailAddress");
const phoneNumber = document.querySelector("#phoneNumber");
const message = document.querySelector("#message");
const contactHandler = document.querySelector('#contact_handler');
const alert = document.querySelector("#alert");
const responseTag = document.createElement('p');
let responseText;

AOS.init();

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  // function closeChat() {
  //   document.getElementById("chatWrapper").style.display = "none";
  // }

  $(document).ready(function(){
    $('.customer-logos').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      arrows: false,
      dots: false,
        pauseOnHover: false,
        responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 520,
        settings: {
          slidesToShow: 2
        }
      }]
    });

    $('#comment').on('click', function(){
      $('.chat').toggleClass('chatShow');
      $('#MSG').focus();
      $(this).toggleClass('toggleIcon');
    });

    $('#closeChat').on('click', function(){
      $('.chat').removeClass('chatShow');
      $('#comment').removeClass('toggleIcon');
    })
  });


  (function ($) {
    $.fn.countTo = function (options) {
      options = options || {};
      return $(this).each(function () {
        var settings = $.extend({}, $.fn.countTo.defaults, {
          from:            $(this).data('from'),
          to:              $(this).data('to'),
          speed:           $(this).data('speed'),
          refreshInterval: $(this).data('refresh-interval'),
          decimals:        $(this).data('decimals')
        }, options);
        
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;
        
        var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data('countTo') || {};
        
        $self.data('countTo', data);
        
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);
        
        render(value);
        
        function updateTimer() {
          value += increment;
          loopCount++;
          
          render(value);
          
          if (typeof(settings.onUpdate) == 'function') {
            settings.onUpdate.call(self, value);
          }
          
          if (loopCount >= loops) {
            // remove the interval
            $self.removeData('countTo');
            clearInterval(data.interval);
            value = settings.to;
            
            if (typeof(settings.onComplete) == 'function') {
              settings.onComplete.call(self, value);
            }
          }
        }
        
        function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };
    
    $.fn.countTo.defaults = {
      from: 0,               
      to: 0,                 
      speed: 1000,           
      refreshInterval: 100,  
      decimals: 0,           
      formatter: formatter,  
      onUpdate: null,        
      onComplete: null       
    };
    
    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }
  }(jQuery));
  
  jQuery(function ($) {
    // custom formatting example
    $('.count-number').data('countToOptions', {
    formatter: function (value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
    });
    
    // start all the timers
    $('.timer').each(count);  
    
    function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
    }
  });

  
  const isInputNumber = (evt) => {
    let char = String.fromCharCode(evt.which);
    if (!(/[0-9]/.test(char))) {
      evt.preventDefault();
    }
  }

  const errorHandler = () => {
    if (firstname.value){
      alert.style.display = 'none';
      responseText.textContent = '';
    }
    if (lastname.value){
      alert.style.display = 'none';
      responseText.textContent = '';
    }
    if (emailAddress.value){
      alert.style.display = 'none';
      responseText.textContent = '';
    }
    if (phoneNumber.value){
      alert.style.display = 'none';
      responseText.textContent = '';
    }
    if (message.value){
      alert.style.display = 'none';
      responseText.textContent = '';
    }
  }

  const sendData =  async () => {

    await fetch('https:girlscoding-api.herokuapp.com/contact', {
      credential: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname.value,
        lastname: lastname.value,
        emailAddress: emailAddress.value,
        phoneNumber: phoneNumber.value,
        message: message.value
      }),
    })
    .then(res => res.json())
    .then(data => {
      const { status, response } = data;
      responseText = document.createTextNode(response);
      
      if (status === 400){
        alert.style.display = 'block';
        alert.setAttribute('class', 'alert alert-danger');
        responseTag.appendChild(responseText);
        alert.appendChild(responseTag);
      }else if (status === 201){
        alert.style.display = 'block';
        alert.setAttribute('class', 'alert alert-success');
        responseTag.appendChild(responseText);
        alert.appendChild(responseTag);
        firstname.value = '';
        lastname.value = '';
        phoneNumber.value = '';
        emailAddress.value = '';
        message.value = '';
      }
    })
  }
  
  contactHandler.addEventListener('submit', (e) => {
    e.preventDefault();
    sendData();
  });