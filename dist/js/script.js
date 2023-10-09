/* Background effekt med bolde */
const colors = ["#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff"];

const numBalls = 200;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 300)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});

const toggleBtn = document.getElementsByClassName('toggle-button')[0]
const navBarLinks = document.getElementsByClassName('navbar-links')[0]

toggleBtn.addEventListener('click', () => {
  navBarLinks.classList.toggle('active')
})


//Kontakt formular

if (document.readyState !== 'loading') {
  console.log("DOM LOADED")
  const form = document.getElementById("kontakt-form");
  const beskedContainer = document.getElementById("besked-container");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Send formdata til action_form.php via AJAX
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "action_page.php", true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.onload = function () {
      const respons = JSON.parse(xhr.responseText);
      if (respons.success) {
        // Vis succesbesked
        beskedContainer.style.backgroundColor = "#4CAF50CC";
        beskedContainer.innerHTML = respons.besked;
      } else {
        // Vis fejlbesked
        beskedContainer.style.backgroundColor = "#FF0000CC";
        let fejlListe = "<ul>";
        respons.fejl.forEach(function (fejl) {
          fejlListe += "<li>" + fejl + "</li>";
        });
        fejlListe += "</ul>";
        beskedContainer.innerHTML = fejlListe;
      }
      beskedContainer.style.display = "block";
    };

    xhr.send(formData);
  });
};