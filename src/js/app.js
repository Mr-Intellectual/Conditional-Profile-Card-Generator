import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the url of the image that will used as background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "left", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastname: null,
        role: null,
        country: null,
        city: null
    }
 */

function render(variables = {}) {
  console.log("These are the current variables: ", variables); //print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;

  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  function getFullName(variables) {
    if (variables.firstname !== null || variables.lastname !== null) {
      if (variables.lastname === null) {
        return "Now Enter Lastname...";
      } else if (variables.firstname === null) {
        return "Now Enter Firstname...";
      } else {
        return variables.firstname + " " + variables.lastname;
      }
    } else {
      return "Enter Full Name Above...";
    }
  }

  function inputOption(field) {
    if (field === "role") {
      if (variables.role === null) {
        return "Select Role Above";
      } else if (variables.role === "Type Role") {
        console.log("r");

        showInput("role", "Typing Your Role");
        return "Type your role";
      } else {
        return variables.role;
      }
    } else if (field === "city") {
      if (variables.city === null) {
        return "Select City Above";
      } else if (variables.city === "Type City") {
        console.log("c");
        showInput("city", "Typing Your City");
        return "Type your city";
      } else {
        return variables.city;
      }
    } else if (field === "country") {
      if (variables.country === null) {
        return "Select Country Above";
      } else if (variables.country === "Type Country") {
        showInput("country", "Typing Your Country");
        return "Type your country";
      } else {
        return variables.country;
      }
    }
  }

  function showInput(inputId, placeholder) {
    const input = document.getElementById("inPut");
    input.style.display = "block";
    input.firstElementChild.setAttribute("for", inputId);
    input.firstElementChild.setAttribute("placeholder", placeholder);
    input.firstElementChild.value = "";
    input.firstElementChild.focus();
    let resetSelection = document.getElementById(inputId);
    resetSelection.value = "";
  }

  document.querySelector("#inPut input").addEventListener("change", e => {
    const inputId = e.target.getAttribute("for");
    const value = e.target.value.trim();
    if (value) {
      hideInput();
      render(Object.assign(window.variables, { [inputId]: value }));
    } else {
      hideInput();
    }
  });

  function hideInput() {
    document.getElementById("inPut").style.display = "none";
  }

  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1 id="name">${getFullName(variables)}</h1>
          <h2 id="Role">${inputOption("role")}</h2>
          <h3 id="City">${inputOption("city")}, ${inputOption("country")}</h3>
          <ul class="${variables.socialMediaPosition}" target="_blank">
          <li><a href="https://twitter.com/ ${
            variables.twitter
          }" target="_blank"><i class="fab fa-twitter fa-2x"></i></a></li>
          <li><a href="https://github.com/${
            variables.github
          }" target="_blank"><i class="fab fa-github fa-2x"></i></a></li>
          
          <li><a href="https://linkedin.com/${
            variables.linkedin
          }" target="_blank"><i class="fab fa-linkedin fa-2x"></i></a></li>
          <li><a href="https://instagram.com/${
            variables.instagram
          }" target="_blank"><i class="fab fa-instagram fa-2x"></i></a></li>
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should
    includeCover: true,
    // this is the url of the image that will used as background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: "alesanchezr",
    linkedin: null,
    instagram: null,
    firstname: null,
    lastname: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); //render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new valus
    });
  });
};
