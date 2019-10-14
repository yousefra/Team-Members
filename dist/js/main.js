class Member {
  constructor(name, email, major, role, biography, time) {
    this.name = name;
    this.email = email;
    this.major = major;
    this.role = role;
    this.biography = biography;
    this.time = time;
  }
}

class Members {
  constructor() {
    this.members = JSON.parse(localStorage.getItem('members'));
    if(this.members === null) {
      this.members = [];
    }
  }
  
  getAllMembers() {
    return this.members;
  }

  getMember(email) {
    return this.members.filter(member => member.email === email)[0];
  }

  storeMembers() {
    localStorage.setItem('members', JSON.stringify(this.members));
  }

  addMember(index, member) {
    this.members.splice(index, 0, member);
    this.storeMembers();
  }

  deleteMember(email) {
    this.members = this.members.filter(member => member.email !== email);
    this.storeMembers();
  }

  updateMember(oldEmail, newMember) {
    let index = this.members.findIndex(member => member.email === oldEmail);
    this.members[index] = newMember;
    this.storeMembers();
  }

  filterMembers(sortByName, filterMajor, filterRole, search) {
    let result = this.members;
    if(filterMajor !== "")
      result.filter(member => member.major === filterMajor);

    if(filterRole !== "")
      result.filter(member => member.role === filterRole);

    if(search !== "")
      result.filter(member.name.toLowerCase().includes(search.toLowerCase()));

    if(sortByName !== "") {
      switch(sortByName) {
        case "A-Z":
          result.sort((a, b) => (a.name < b.name) ? 1: -1);
          break;
        case "Z-A":
          result.sort((a, b) => (a.name > b.name) ? 1: -1);
          break;
        case "Newest":
          result.sort((a, b) => (a.time < b.time) ? 1: -1);
          break;
        case "Oldest":
          result.sort((a, b) => (a.time > b.time) ? 1: -1);
          break;
      }
    }
    return result;
  }

  sortAtoZ() {
    return this.members.sort((a, b) => (a.name < b.name) ? 1: -1);
  }

  sortZtoA() {
    return this.members.sort((a, b) => (a.name > b.name) ? 1: -1);
  }

  sortNewest() {
    return this.members.sort((a, b) => (a.time < b.time) ? 1: -1);
  }

  sortOldest() {
    return this.members.sort((a, b) => (a.time > b.time) ? 1: -1);
  }

  sortByMajor(value) 
  {
    return this.members.filter(member => member.major === value);
  }

  sortByRole(value) {
    return this.members.filter(member => member.role === value);
  }

  search(value) {
    return this.members.filter(member.name.toLowerCase().includes(value.toLowerCase()));
  }

  getNumberOfMembers() {
    return this.members.length;
  }

  isEmailExist(email) {
    return this.members.some(element => element.email === email);
  }

}

const members = new Members();

let fields = {
  major: "",
  role: "",
  name: "",
  email: "",
  biography: "",
  atBottom: false,
  atIndex: ""
};

let modalFields = {
  name: "",
  email: "",
  major: "",
  role: "",
  biography: "",
  time: ""
}

let modal = document.getElementById("myModal");
let currentEmail = "";

displayMembers();

function getFieldsValues() {
  fields["name"] = document.getElementById("name").value;
  fields["email"] = document.getElementById("email").value;
  fields["major"] = document.getElementById("major").value;
  fields["role"] = document.getElementById("role").value;
  fields["biography"] = document.getElementById("biography").value;
  fields["atBottom"] = document.getElementById("addToBottom").checked;
  fields["atIndex"] = document.getElementById("atIndex").value;
}

function clearFieldsValues() {
  fields["name"] = document.getElementById("name").value = "";
  fields["email"] = document.getElementById("email").value = "";
  fields["major"] = document.getElementById("major").value = "";
  fields["role"] = document.getElementById("role").value = "";
  fields["biography"] = document.getElementById("biography").value = "";
  fields["atBottom"] = document.getElementById("addToBottom").checked = false;
  fields["atIndex"] = document.getElementById("atIndex").value = "";
  document.getElementById("message").innerHTML = "";
  document.getElementById("atIndex").innerHTML = "";
}

function getModalFields() {
  modalFields["name"] = document.getElementById("modal-name").value;
  modalFields["email"] = document.getElementById("modal-email").value;
  modalFields["major"] = document.getElementById("modal-major").value;
  modalFields["role"] = document.getElementById("modal-role").value;
  modalFields["biography"] = document.getElementById("modal-biography").innerHTML;
}

function setModalFields(member) {
  document.getElementById("modal-name").value = member.name;
  document.getElementById("modal-email").value = member.email;
  document.getElementById("modal-major").value = member.major;
  document.getElementById("modal-role").value = member.role;
  document.getElementById("modal-biography").innerHTML = member.biography;
  modalFields["time"] = member.time;
  currentEmail = member.email;
}

// Create an HTML block for member
function HTMLMember(index, name, email, major, role, biography) {
  return `<div class="member">
            <div class="delete-btn" onclick="deleteMember('${email}')"></div>
            <div class="content" onclick="memberClicked('${email}')">
                <div class="name">
                    <h1>${name}</h1>
                </div>
                <div class="info">
                    <p>${email} / ${major} / ${role}</p>
                </div>
                <div class="biography">
                    <p>
                      ${biography}
                    </p>
                </div>
            </div>
          </div>`;
}

// Display Members in the html page.
function displayMembers() {
  // Get members to display
  let sortByName = document.getElementById("sortByName").value;
  let filterMajor = document.getElementById("filterMajor").value;
  let filterRole = document.getElementById("filterRole").value;
  let search = document.getElementById("search").value;
  let displyedMembers = members.filterMembers(sortByName, filterMajor, filterRole, search);

  // Edit the html based on gotten members
  document.getElementById("members").innerHTML = "";
  displyedMembers.forEach((member, index) => {
    const memberDiv = HTMLMember(index, member.name, member.email, member.major, member.role, member.biography);
    document.getElementById("members").innerHTML += memberDiv;     
  });
  membersNumber = members.getNumberOfMembers();
  if(membersNumber == 0 || membersNumber == 1)
    document.getElementById("membersNumber").innerHTML = membersNumber + " item";
  else
    document.getElementById("membersNumber").innerHTML = membersNumber + " items";
  document.getElementById("atIndex").max = membersNumber;
}

// Validate input fields before adding a member
function validateFields() {
  getFieldsValues();

  let message = document.getElementById("message");

  if(fields["name"] == "" || fields["email"] == "" || fields["major"] == "" || fields["role"] == "" || fields["biography"] == "") {
    message.innerText = "All fields required";
    return false;
  }

  console.log(members.isEmailExist(fields["email"]));
  if(members.isEmailExist(fields["email"])) {
    message.innerText = "Email already exists";
    return false;
  }

  if(fields["biography"].length > 1500 || fields["biography"].length < 500) {
    message.innerText = "Biography must be between 500 and 1500 words";
    return false;
  }

  return true;

}

// Create a member object from input values, Then add the member to the local storage.
function addMember() {
  if(validateFields()) {
    let index = 0;
    if(fields["atBottom"]) index = members.getNumberOfMembers();
    else if(fields["atIndex"] != "") {
      index = Number(fields["atIndex"]) - 1;
    }
    member = new Member(fields["name"], fields["email"], fields["major"], fields["role"], fields["biography"], Math.floor(Date.now() / 1000));
    members.addMember(index, member)
    displayMembers();
    clearFieldsValues();
  }
}

// Delete member by email
function deleteMember(email = currentEmail) {
  members.deleteMember(email);
  displayMembers();
}

// Update modal member by email
function updateMember() {
  getModalFields();
  if(members.isEmailExist(modalFields["name"])) {
    
    return false;
  }
  let newMember = new Member(modalFields["name"], modalFields["email"], modalFields["major"], modalFields["role"], modalFields["biography"], modalFields["time"]);
  members.updateMember(currentEmail, newMember);
  displayMembers();
}

// Filter functions
function sortByName() {
  let value = document.getElementById("sortByName").value;
  switch(value) {
    case "A-Z":
      displayMembers(members.sortAtoZ());
      break;
    case "Z-A":
      displayMembers(members.sortZtoA());
      break;
    case "Newest":
      displayMembers(members.sortNewest());
      break;
    case "Oldest":
      displayMembers(members.sortOldest());
      break;
  }
}

function sortByMajor() {
  let value = document.getElementById("filterMajor").value;
  displayMembers(members.sortByMajor(value));
}

function sortByRole() {
  let value = document.getElementById("filterRole").value;
  displayMembers(members.sortByRole(value));
}

function search() {
  let value = document.getElementById("search").value;
  displayMembers(members.search(value));
}
// End filter functions

function addToBottomClicked() {
  let atIndex = document.getElementById("atIndex");
  if(document.getElementById("addToBottom").checked) {
    atIndex.disabled = true;
    atIndex.value = "";
  }
  else 
    document.getElementById("atIndex").disabled = false;
}

// When the user clicks the button, open the modal 
function memberClicked(email) {
  modal.style.display = "flex";
  setModalFields(members.getMember(email));
}

// When the user clicks on (x), close the modal
function closeModal() {
  modal.style.display = "none";
  currentEmail = "";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}