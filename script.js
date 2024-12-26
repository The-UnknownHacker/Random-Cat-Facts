const colors = [
    "#FFCDD2", "#F8BBD0", "#E1BEE7", "#D1C4E9", 
    "#C5CAE9", "#BBDEFB", "#B3E5FC", "#B2EBF2", 
    "#B2DFDB", "#C8E6C9", "#DCEDC8", "#F0F4C3"
  ];
  const cats = ["🐱", "😸", "😺", "😻", "😽", "😼"];
  let score = 0;
  
  // Change background color
  function changeBackgroundColor() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
  }
  
  // Fetch and display cat facts
  async function getCatFact() {
    try {
      const response = await fetch('https://meowfacts.herokuapp.com/');
      const data = await response.json();
      const fact = data.data[0];
  
      const factElement = document.getElementById('fact');
      factElement.textContent = ""; // Clear previous content
      let i = 0;
  
      function typeWriter() {
        if (i < fact.length) {
          factElement.textContent += fact.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      }
      typeWriter();
      changeBackgroundColor();
    } catch (error) {
      console.error("Error fetching fact:", error);
      document.getElementById('fact').textContent = "Oops! Something went wrong.";
    }
  }
  
  // Add spinning cats randomly
  function createRandomCat() {
    const cat = document.createElement('div');
    cat.className = 'spinning-cat';
    cat.textContent = cats[Math.floor(Math.random() * cats.length)];
    cat.style.top = `${Math.random() * 80}vh`;
    cat.style.left = '-100px';
    cat.style.fontSize = `${Math.random() * 2 + 2}rem`;
    cat.style.animationDuration = `${Math.random() * 3 + 4}s`;
  
    document.body.appendChild(cat);
  
    cat.addEventListener('click', () => {
      score++;
      document.getElementById('scoreCount').textContent = score;
      cat.remove();
    });
  
    cat.addEventListener('animationend', () => {
      cat.remove();
    });
  }
  
  // Continuously add random cats
  function continuouslyAddCats() {
    setInterval(() => {
      createRandomCat();
    }, Math.random() * 3000 + 2000);
  }
  
  // Initialize
  window.onload = () => {
    getCatFact();
    continuouslyAddCats();
  };
  