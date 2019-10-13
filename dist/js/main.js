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
      // localStorage.setItem('members', []);
    }
  }
  
  getAllMembers() {
    return this.members;
  }

  storeMembers() {
    localStorage.setItem('members', JSON.stringify(this.members));
  }

  addMember(index, member) {
    this.members.splice(index, 0, member);
    this.storeMembers();
  }

  deleteMember(index) {
    this.members.splice(index, 1);
    this.storeMembers();
  }

  getNumberOfMembers() {
    return this.members.length;
  }

  filter(filterId, value) {
    
  }
}

const members = new Members();

function HTMLMember(index, name, email, major, role, biography) {
  return `<div class="member">
            <div class="delete-btn" onclick="deleteMember(${index})"></div>
            <div class="content">
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

const allMembers = members.getAllMembers();

// Display Members in the html page.
function displayMembers() {
  document.getElementById("members").innerHTML = "";
  allMembers.forEach((member, index) => {
    const memberDiv = HTMLMember(index, member.name, member.email, member.major, member.role, member.biography);
    document.getElementById("members").innerHTML += memberDiv;     
  });
  membersNumber = members.getNumberOfMembers();
  if(membersNumber == 0 || membersNumber == 1)
    document.getElementById("membersNumber").innerHTML = membersNumber + " item";
  else
    document.getElementById("membersNumber").innerHTML = membersNumber + " items";
}

displayMembers();

let fields = {
  major: "",
  role: "",
  name: "",
  email: "",
  biography: "",
  atBottom: false,
  atIndex: ""
};

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
}

// Validate input fields before adding a member
function validateFields() {
  getFieldsValues();

  let message = document.getElementById("message");

  if(fields["name"].value == "" || fields["email"] == "" || fields["major"] == "" || fields["role"] == "" || fields["biography"] == "") {
    message.innerText = "All fields required";
    return false;
  }

  console.log(fields["biography"]);
  if(fields["biography"].length > 1500 || fields["biography"].length < 500) {
    message.innerText = "Biography must be between 500 and 1500 words";
    return false;
  }

  return true;

}

// Create a member object from input values, Then add the member to the local storage.
function addMember() {
  if(validateFields()) {
    fields["name"] = document.getElementById("name").value;
    fields["email"] = document.getElementById("email").value;
    fields["biography"] = document.getElementById("biography").value;
    fields["atBottom"] = document.getElementById("addToBottom").checked;
    fields["atIndex"] = document.getElementById("atIndex").value;
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

// Delete member by index
function deleteMember(index) {
  members.deleteMember(index);
  displayMembers();
}

// Filter functions
function filter(filterId) {
  let value = document.getElementById(filterId).value;
  members.filter(filterId, value);
}