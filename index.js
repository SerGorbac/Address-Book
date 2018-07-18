var contacts = [];

function draw() {
  console.log(contacts);
  const output = document.getElementById("output");
  if (!output) {
    var result = document.createElement("div");
    result.id = "output";
    document.body.appendChild(result);
  } else {
    output.innerHTML = "";
  }
  contacts.forEach((contact, i) => {
    var container = document.createElement("div");
    container.classList.add(`favorite-${contact.favorite}`)
    var sname = contact.n;
    var semail = contact.em;
    var snumber = contact.nmb;
    const button = document.createElement("button");
    const buttontext = document.createTextNode("DELETE");
    button.appendChild(buttontext);
    button.addEventListener("click", () => {
      contacts.splice(i, 1);
      persistData();
      draw();
    })
    const editbutton = document.createElement("button");
    const editbuttontext = document.createTextNode("EDIT");
    editbutton.appendChild(editbuttontext);
    editbutton.addEventListener("click", () => {
      console.log("edit")
      contacts[i].editing = true;
      persistData();
      draw();
    })
    const savebutton = document.createElement("button");
    const savebuttontext = document.createTextNode("SAVE");
    savebutton.appendChild(savebuttontext);
    savebutton.addEventListener("click", () => {
      const savecondition = document.querySelectorAll("#output .contact")[i];
      contacts[i].n = savecondition.querySelector(".sname").value;
      contacts[i].em = savecondition.querySelector(".semail").value;
      contacts[i].nmb = savecondition.querySelector(".snumber").value;
      contacts[i].editing = false;
      persistData();
      draw();
    })
    const favoritebutton = document.createElement("button");
    const favoritebuttontext = document.createTextNode("MARK AS FAVORITE");
    favoritebutton.appendChild(favoritebuttontext);
    favoritebutton.addEventListener("click", () => {
      document.querySelectorAll("#output .contact")[i].style.backgroundColor = "yellow";
      contacts[i].favorite = true;
      persistData();
      draw();
    });
    if (sname) {
      var rn = document.createElement(contact.editing ? "input" : "span");
      rn.classList.add("sname");
      if (contact.editing) {
        rn.value = sname
      } else {
        rn.innerHTML = sname;
      }
      container.appendChild(rn);
    };
    if (semail) {
      var er = document.createElement(contact.editing ? "input" : "span");
      er.classList.add("semail");
      if (contact.editing) {
        er.value = semail
      } else {
        er.innerHTML = semail;
      }
      container.appendChild(er);
    };
    if (snumber) {
      var nmr = document.createElement(contact.editing ? "input" : "span");
      nmr.classList.add("snumber");
      if (contact.editing) {
        nmr.value = snumber
      } else {
        nmr.innerHTML = snumber;
      }
      container.appendChild(nmr);
    };
    container.appendChild(button);
    container.appendChild(contact.editing ? savebutton : editbutton);
    container.appendChild(favoritebutton);
    container.classList.add("contact");
    document.getElementById("output").appendChild(container);
  });
};

function persistData() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts));
}

window.addEventListener("load", function () {
  contacts = JSON.parse(window.localStorage.getItem("contacts")) || [];
  draw();
});

document.getElementById("sbmt").addEventListener("click", function () {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var number = document.getElementById("number").value;
  var contactvalue = {
    n: name,
    em: email,
    nmb: number,
    editing: false,
    favorite: false
  };
  contacts.push(contactvalue);
  persistData();
  draw();
});