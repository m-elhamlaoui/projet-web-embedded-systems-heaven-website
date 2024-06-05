//add article page

document.addEventListener("DOMContentLoaded", () => {
  const articleForm = document.getElementById("articleForm");
  const articlesContainer = document.getElementById("articlesContainer");

  articleForm.addEventListener("submit", async function(event) {
      event.preventDefault();

      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;

      try {
          const response = await fetch('http://localhost:5000/api/articles', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ title, content })
          });

          if (response.ok) {
              const newArticle = await response.json();

              const article = document.createElement("div");
              article.classList.add("article");

              const articleTitle = document.createElement("h3");
              articleTitle.textContent = newArticle.title;

              const articleContent = document.createElement("p");
              articleContent.textContent = newArticle.content;

              const readMoreLink = document.createElement("a");
              readMoreLink.textContent = "Read More";
              readMoreLink.href = `full-article.html?title=${encodeURIComponent(newArticle.title)}&content=${encodeURIComponent(newArticle.content)}`;
              readMoreLink.classList.add("read-more");

              article.appendChild(articleTitle);
              article.appendChild(articleContent);
              article.appendChild(readMoreLink);

              articlesContainer.appendChild(article);

              articleForm.reset();
          } else {
              console.error("Failed to add article");
          }
      } catch (err) {
          console.error(err);
      }
  });
// fetch articles
  async function fetchArticles() {
      try {
          const response = await fetch('http://localhost:5000/api/articles');
          const articles = await response.json();

          articles.forEach(article => {
              const articleElement = document.createElement("div");
              articleElement.classList.add("article");

              const articleTitle = document.createElement("h3");
              articleTitle.textContent = article.title;

              const articleContent = document.createElement("p");
              articleContent.textContent = article.content;

              const readMoreLink = document.createElement("a");
              readMoreLink.textContent = "Read More";
              readMoreLink.href = `full-article.html?title=${encodeURIComponent(article.title)}&content=${encodeURIComponent(article.content)}`;
              readMoreLink.classList.add("read-more");

              articleElement.appendChild(articleTitle);
              articleElement.appendChild(articleContent);
              articleElement.appendChild(readMoreLink);

              articlesContainer.appendChild(articleElement);
          });
      } catch (err) {
          console.error(err);
      }
  }

  fetchArticles();
});

// sliders

let slideIndex = 0;

function showSlides() {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  for (let i = 0; i < totalSlides; i++) {
    slides[i].style.display = 'none';
  }

  slideIndex++;

  if (slideIndex > totalSlides) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = 'block';
}

function nextSlide() {
  showSlides();
}

function prevSlide() {
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  slideIndex--;

  if (slideIndex < 1) {
    slideIndex = totalSlides;
  }

  for (let i = 0; i < totalSlides; i++) {
    slides[i].style.display = 'none';
  }

  slides[slideIndex - 1].style.display = 'block';
}
showSlides();


//adjust layout

function adjustLayout() {

    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  

    if (viewportWidth < 768) {

      document.getElementById('main-content').style.width = '100%';
      document.getElementById('sidebar').style.display = 'none';
    } else {

      document.getElementById('main-content').style.width = '70%';
      document.getElementById('sidebar').style.display = 'block';
    }
  }

  window.onload = adjustLayout;
  
  window.onresize = adjustLayout;



// smooth scrolling
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {

      link.addEventListener('click', function(event) {
   
        event.preventDefault();
        

        const targetId = this.getAttribute('href').slice(1);
        

        const targetSection = document.getElementById(targetId);
        
        targetSection.scrollIntoView({ behavior: 'smooth' });
      });
    });
  });
// dark mode    

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved user preference and apply it
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Save user preference to localStorage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});


//light box

// Get lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

// Add click event to images to open lightbox
document.querySelectorAll('.lightbox-trigger').forEach(image => {
    image.addEventListener('click', function() {
        lightbox.style.display = 'block';
        lightboxImage.src = this.src;
        lightboxCaption.textContent = this.alt;
    });
});

// Close the lightbox when the close button is clicked
lightboxClose.addEventListener('click', function() {
    lightbox.style.display = 'none';
});

// Close the lightbox when clicking outside of the image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});


//sidebar
document.getElementById('hover-button').addEventListener('mouseover', function() {
    document.getElementById('sidebar').style.left = '0';
  });
  
  document.getElementById('sidebar').addEventListener('mouseleave', function() {
    document.getElementById('sidebar').style.left = '-250px';
  });
  
  document.getElementById('sidebar').addEventListener('mouseover', function() {
    document.getElementById('sidebar').style.left = '0';
  });

// tools
function convertDecimalToBinary() {
    const decimal = document.getElementById('decimalInput').value;
    const binary = parseInt(decimal, 10).toString(2);
    document.getElementById('binaryOutput').textContent = binary;
}

function convertBinaryToDecimal() {
    const binary = document.getElementById('binaryInput').value;
    const decimal = parseInt(binary, 2);
    document.getElementById('decimalOutput').textContent = decimal;
}

function convertHexToDecimal() {
    const hex = document.getElementById('hexInput').value;
    const decimal = parseInt(hex, 16);
    document.getElementById('hexDecimalOutput').textContent = decimal;
}

function convertDecimalToHex() {
    const decimal = document.getElementById('decimalHexInput').value;
    const hex = parseInt(decimal, 10).toString(16).toUpperCase();
    document.getElementById('decimalHexOutput').textContent = hex;
}

function convertCharToAscii() {
    const char = document.getElementById('asciiCharInput').value;
    const ascii = char.charCodeAt(0);
    document.getElementById('asciiOutput').textContent = ascii;
}

function convertAsciiToChar() {
    const ascii = document.getElementById('asciiNumInput').value;
    const char = String.fromCharCode(ascii);
    document.getElementById('charOutput').textContent = char;
}

function calculateBitwise(operation) {
    const input1 = document.getElementById('bitwiseInput1').value;
    const input2 = document.getElementById('bitwiseInput2').value;
    const num1 = parseInt(input1, 2);
    const num2 = parseInt(input2, 2);
    let result;
    switch (operation) {
        case 'AND':
            result = (num1 & num2).toString(2);
            break;
        case 'OR':
            result = (num1 | num2).toString(2);
            break;
        case 'XOR':
            result = (num1 ^ num2).toString(2);
            break;
        case 'NOT':
            result = (~num1).toString(2).slice(-input1.length);
            break;
    }
    document.getElementById('bitwiseOutput').textContent = result;
}

function calculateCRC() {
    const data = document.getElementById('crcInput').value;
    const crc = data.split('').reduce((acc, char) => acc ^ char.charCodeAt(0), 0);
    document.getElementById('crcOutput').textContent = crc.toString(16).toUpperCase();
}

function generateParity() {
    const binary = document.getElementById('parityInput').value;
    const count = binary.split('1').length - 1;
    const parity = count % 2 === 0 ? '0' : '1';
    document.getElementById('parityOutput').textContent = binary + parity;
}

function convertFrequencyToPeriod() {
    const frequency = document.getElementById('frequencyInput').value;
    const period = 1 / frequency;
    document.getElementById('periodOutput').textContent = period;
}

function calculatePWMDutyCycle() {
    const highTime = document.getElementById('highTimeInput').value;
    const periodTime = document.getElementById('periodTimeInput').value;
    const dutyCycle = (highTime / periodTime) * 100;
    document.getElementById('dutyCycleOutput').textContent = dutyCycle.toFixed(2);
}

function calculateOhmsLaw() {
    const voltage = document.getElementById('voltageInput').value;
    const current = document.getElementById('currentInput').value;
    const resistance = document.getElementById('resistanceInput').value;
    let result;
    if (voltage && current) {
        result = `Resistance (R) = ${(voltage / current).toFixed(2)} Ω`;
    } else if (voltage && resistance) {
        result = `Current (I) = ${(voltage / resistance).toFixed(2)} A`;
    } else if (current && resistance) {
        result = `Voltage (V) = ${(current * resistance).toFixed(2)} V`;
    } else {
        result = "Please enter at least two values.";
    }
    document.getElementById('ohmsLawOutput').textContent = result;
}

function calculateResistorValue() {
    const colors = document.getElementById('colorBandsInput').value.split(',');
    const colorCodes = {
        'black': 0, 'brown': 1, 'red': 2, 'orange': 3,
        'yellow': 4, 'green': 5, 'blue': 6, 'violet': 7,
        'gray': 8, 'white': 9
    };
    let value = 0;
    for (let i = 0; i < colors.length - 1; i++) {
        value = value * 10 + colorCodes[colors[i]];
    }
    value *= Math.pow(10, colorCodes[colors[colors.length - 1]]);
    document.getElementById('resistorValueOutput').textContent = value;
}
