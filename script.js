// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let reqs = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let massStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then(function(json) {
            const missionTarget = document.getElementById("missionTarget");
            let randomTarget = Math.floor((Math.random()*json.length))
               missionTarget.innerHTML = `
                  <h2>Mission Destination</h2>
                     <ol>
                        <li>Name: ${json[randomTarget].name}</li>
                        <li>Diameter: ${json[randomTarget].diameter}</li>
                        <li>Star: ${json[randomTarget].star}</li>
                        <li>Distance from Earth: ${json[randomTarget].distance}</li>
                        <li>Number of Moons: ${json[randomTarget].moons}</li>
                     </ol>
                  <img src="${json[randomTarget].image}">`;
         })
      });
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelInput = document.querySelector("input[name=fuelLevel]");
      let massInput = document.querySelector("input[name=cargoMass]");
      let pilotValue = pilotInput.value;
      let copilotValue = copilotInput.value;
      let fuelValue = fuelInput.value;
      let massValue = massInput.value;
      
      if (pilotInput.value === "" || copilotInput.value === "" || fuelInput.value === "" || massInput.value === "") {
         alert("All fields are required!");
      } else if (!isNaN(pilotInput.value) || !isNaN(copilotInput.value)){
         alert("Make sure to enter valid information for each field!");  
      } else if (isNaN(fuelInput.value) || isNaN(massInput.value)) {
         alert("Make sure to enter valid information for each field!");
      } else {
         pilotStatus.innerHTML = `${pilotValue} is ready for launch!`;
         copilotStatus.innerHTML = `${copilotValue} is ready for launch!`;
         if (fuelValue<10000 && massValue<=10000) {
            reqs.style.visibility = "visible";
            launchStatus.innerHTML = `Shuttle not ready for launch.`;
            launchStatus.style.color = 'red';
            fuelStatus.innerHTML = "Fuel level too low for launch.";
         } else if (fuelValue>=10000 && massValue>10000) {
            reqs.style.visibility = "visible";
            launchStatus.innerHTML = `Shuttle not ready for launch.`;
            launchStatus.style.color = 'red';
            massStatus.innerHTML = "Cargo mass too high for launch.";
         } else if (fuelValue<10000 && massValue>10000) {
            reqs.style.visibility = "visible";
            launchStatus.innerHTML = `Shuttle not ready for launch.`;
            launchStatus.style.color = 'red';
            fuelStatus.innerHTML = "Fuel level too low for launch.";
            massStatus.innerHTML = "Cargo mass too high for launch.";
         } else {
            launchStatus.innerHTML = "Shuttle is ready for launch.";
            launchStatus.style.color = "green";
         }
      }
   });
});


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
