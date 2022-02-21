

//Global Variables

let timer;
let setTimeSubtract = 75;
let targets = 0;
let finalKatys = 0;
let katyBucks = 1000;
let setTime = 0;
let setTimeToggle = 0;
let moreBucks = 1;


let audio = new Audio("images/click_sound.ogg");

function onPageLoad() {

      console.log(localStorage.getItem("beFreeToggle"));

      while (sessionStorage.getItem("storedSetTime") <= 0) {
            setTime = 3100;
            sessionStorage.setItem("storedSetTime",  setTime);
            setTimeToggle += 1;
      }

      let toggle = Number(localStorage.getItem("beFreeToggle"));

      if (toggle >= 1) {
            window.location="youMadeYourDecision.html";
      }

      console.log(localStorage.getItem("beFreeToggle"));
}

function onShopLoad() {
      if (Number(sessionStorage.getItem("totalKatyBucks")) >= 1000) {
            let almightyKaty = document.createElement("button");
            almightyKaty.innerHTML = "Do it, coward.";
            almightyKaty.className = "shopItems";
            almightyKaty.id = "almightyKaty";
            almightyKaty.setAttribute('onclick', 'endGame()');

            document.getElementById("printAlmightyKaty").appendChild(almightyKaty);
      }

      // More Bucks Price
      let bucksPrice = document.createTextNode((50 * Number(sessionStorage.getItem("storedMoreBucks"))) + 50);
      sessionStorage.setItem("moreBucksPrice", bucksPrice);
      document.getElementById("moreBucksPrice").innerHTML = "";
      document.getElementById("moreBucksPrice").appendChild(bucksPrice);

      // More Time Price
      let timePrice = document.createTextNode(Number(sessionStorage.getItem("moreTimeMultiplier")) + 10);
      sessionStorage.setItem("moreTimePrice", timePrice);
      document.getElementById("moreTimePrice").innerHTML = "";
      document.getElementById("moreTimePrice").appendChild(timePrice);
}

function maybe() {

      document.getElementById("start").innerHTML = "";
      document.getElementById("timeout").innerHTML = "";

      setTime = Number(sessionStorage.getItem("storedSetTime"));

      let newImage = document.createElement("input");
      newImage.setAttribute('type', 'image');
      newImage.setAttribute('src', 'images/Click Me.png');
      newImage.setAttribute('onclick', 'clickCountdown()');
      newImage.setAttribute('id', 'movingbutton');
      document.getElementById("start").appendChild(newImage);

      targets = 0;


      //IMAGE MOVER, div id = ctr
      var b = document.querySelector("#movingbutton");
      b.addEventListener("click",change);

      function change() {
            let i =Math.abs(Math.floor(Math.random()*window.innerWidth-170))
            let j = Math.abs(Math.floor(Math.random()*window.innerHeight-200));
            console.log('here' , i ,j , b.style.left , b.style.top);
            b.style.left = i + "px";
            b.style.top = j + "px";
      }

      let cursorToggle = Number(sessionStorage.getItem("cursorToggle"));
      if (cursorToggle == 0) {
            return;
      } else if (cursorToggle == 1) {
            var head = document.getElementsByTagName('*')[0]; 

            // Create new link Element
            var link = document.createElement('link');
      
            // set the attributes for link element 
            link.rel = 'stylesheet'; 
            
            link.type = 'text/css';
            
            link.href = 'cursorOne.css'; 
      
            // Append link element to HTML head
            head.appendChild(link);
      } else if (cursorToggle == 2) {
            var head = document.getElementsByTagName('*')[0]; 

            // Create new link Element
            var link = document.createElement('link');
      
            // set the attributes for link element 
            link.rel = 'stylesheet'; 
            
            link.type = 'text/css';
            
            link.href = 'cursorTwo.css'; 
      
            // Append link element to HTML head
            head.appendChild(link);
      }
}



function clickCountdown() {
      
      audio.load();
      audio.play();

      clearTimeout(timer);
      setTime = setTime - setTimeSubtract;
      targets = targets + 1;
      timer = setTimeout(function(){ timeOut(); }, setTime);
}


function timeOut() {

      setTime = Number(sessionStorage.getItem("storedSetTime"));
      console.log(setTime);

      let myobj2 = document.getElementById("movingbutton");
      myobj2.remove();

      setTimeout(function(){ gameEndButtons(); }, 1500);

      katyTotal();

}

function gameEndButtons() {
      let shopButton = document.createElement("button");
      shopButton.innerHTML = "Shop";
      shopButton.id = "shopButton";
      shopButton.setAttribute('onclick', 'shopPage()');

      let restartButton = document.createElement("button");
      restartButton.innerHTML = "Try Again";
      restartButton.id = "restartButton";
      restartButton.setAttribute('onclick', 'maybe()');

      document.getElementById("timeout").appendChild(shopButton);
      document.getElementById("timeout").appendChild(restartButton);

}

function katyTotal() {

      finalKatys = Number(sessionStorage.getItem("totalKatysStored")) + targets;
      sessionStorage.setItem("totalKatysStored", finalKatys);

      katyBucks = Number(sessionStorage.getItem("totalKatyBucks"));
      katyBucks += targets * (1 + Number(sessionStorage.getItem("storedMoreBucks")));
      sessionStorage.setItem("totalKatyBucks", katyBucks);

      let newOutput = document.createTextNode("Times up! You clicked " + targets + " targets!\n" + "Your total Katys is " + sessionStorage.getItem("totalKatysStored"));

      console.log(sessionStorage.getItem("totalKatysStored"));

      document.getElementById("timeout").appendChild(newOutput);
}

function shopPage() {
      window.location="shop.html";
}


//SHOP JAVASCRIPT


function timeoutKatyBucks() {
      let varTimeoutKatyBucks = document.createTextNode("Your Katy Bucks available to spend is " + sessionStorage.getItem("totalKatyBucks"));

      document.getElementById("katyBucks").innerHTML = "";
      document.getElementById("katyBucks").appendChild(varTimeoutKatyBucks);
}

function moreTime() {

      katyBucks = Number(sessionStorage.getItem("totalKatyBucks"));

      if (katyBucks - Number(sessionStorage.getItem("moreTimeMultiplier")) < 10) {
            let output = document.createTextNode("Not enough Katy Bucks!");

            document.getElementById("katyBucks").innerHTML = "";
            document.getElementById("katyBucks").appendChild(output);

            let timePrice = document.createTextNode(Number(sessionStorage.getItem("moreTimeMultiplier")) + 10);
            sessionStorage.setItem("moreTimePrice", timePrice);
            document.getElementById("moreTimePrice").innerHTML = "";
            document.getElementById("moreTimePrice").appendChild(timePrice);

            setTimeout(() => {timeoutKatyBucks()}, 2000);
      } else {
            let moreTimeMultiplier = Number(sessionStorage.getItem("moreTimeMultiplier")) + 10;
            sessionStorage.setItem("moreTimeMultiplier", moreTimeMultiplier);
            moreTimeMultiplier = sessionStorage.getItem("moreTimeMultiplier");


            katyBucks = katyBucks - Number(sessionStorage.getItem("moreTimeMultiplier"));
            sessionStorage.setItem("totalKatyBucks", katyBucks);

            console.log(moreTimeMultiplier);
            console.log(sessionStorage.getItem("moreTimeMultiplier"));

            setTime = Number(sessionStorage.getItem("storedSetTime")) + 100;
            sessionStorage.setItem("storedSetTime", setTime);

            let output = document.createTextNode("Your Katy Bucks available to spend is " + sessionStorage.getItem("totalKatyBucks"));

            let timePrice = document.createTextNode(Number(sessionStorage.getItem("moreTimeMultiplier")) + 10);
            sessionStorage.setItem("moreTimePrice", timePrice);
            document.getElementById("moreTimePrice").innerHTML = "";
            document.getElementById("moreTimePrice").appendChild(timePrice);

            document.getElementById("katyBucks").innerHTML = "";
            document.getElementById("katyBucks").appendChild(output);
      }
}

function shopMoreBucks() {
      katyBucks = Number(sessionStorage.getItem("totalKatyBucks"));

      let price = document.createTextNode((50 * Number(sessionStorage.getItem("storedMoreBucks"))) + 50);
      sessionStorage.setItem("moreBucksPrice", price);
      document.getElementById("moreBucksPrice").innerHTML = "";
      document.getElementById("moreBucksPrice").appendChild(price);

      if ((katyBucks - (50 + (50 * Number(sessionStorage.getItem("storedMoreBucks"))))) < 0) {
            let output = document.createTextNode("Not enough Katy Bucks!");

            document.getElementById("katyBucks").innerHTML = "";
            document.getElementById("katyBucks").appendChild(output);

            setTimeout(() => {timeoutKatyBucks()}, 2000);

      } else {
            moreBucks = Number(sessionStorage.getItem("storedMoreBucks"));
            moreBucks = moreBucks + 1;
            sessionStorage.setItem("storedMoreBucks", moreBucks);

            katyBucks = katyBucks - (50 * Number(sessionStorage.getItem("storedMoreBucks")));

            sessionStorage.setItem("totalKatyBucks", katyBucks);

            let output = document.createTextNode("Your Katy Bucks available to spend is " + sessionStorage.getItem("totalKatyBucks"));

            let price = document.createTextNode((50 * Number(sessionStorage.getItem("storedMoreBucks"))) + 50);
            sessionStorage.setItem("moreBucksPrice", price);
            document.getElementById("moreBucksPrice").innerHTML = "";
            document.getElementById("moreBucksPrice").appendChild(price);

            document.getElementById("katyBucks").innerHTML = "";
            document.getElementById("katyBucks").appendChild(output);
      }
}

function dontClickPlease() {
      katyBucks = 0;
      sessionStorage.setItem("totalKatyBucks", katyBucks);

      let output = document.createTextNode("I warned you.");
      let bruh = document.createTextNode("Bruh.");

      document.getElementById("katyBucks").innerHTML = "";
      document.getElementById("katyBucks").appendChild(output);

      document.getElementById("redacted").innerHTML = "";
      document.getElementById("redacted").appendChild(bruh);


      setTimeout(() => {timeoutKatyBucks()}, 2000);
}

function cursorOne() {
      sessionStorage.setItem("cursorToggle", 1);
}

function cursorTwo() {
      sessionStorage.setItem("cursorToggle", 2);
}

function cursorInitial() {
      sessionStorage.setItem("cursorToggle", 0)
}


// END GAME ((((SPOILERS))))

function endGame() {
      window.location="endGame.html";
}

function beFree() {
      window.location="beFree.html";
}

function beFreeDecision() {
      sessionStorage.clear();
      localStorage.setItem("beFreeToggle", 1);
}

function wrongChoice() {
      sessionStorage.clear();
      localStorage.clear();

      window.location="index.html";
}


//Batman dies in infinity war, obama is there, lightning mcqueen kisses tony stark