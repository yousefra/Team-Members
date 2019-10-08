class Member {
  constructor(name, email, major, role, biography) {
    this.name = name;
    this.email = email;
    this.major = major;
    this.role = role;
    this.biography = biography;
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

  addMember(index, member) {
    this.members.splice(index, 0, member);
    console.log(this.members);
    localStorage.setItem('members', JSON.stringify(this.members));
  }

  getNumberOfMembers() {
    return this.members.length;
  }
}




const members = new Members();

const allMembers = members.getAllMembers();
console.log(allMembers);
// Display Members in the html page.
allMembers.forEach(member => {
  const HTMLMember = `<div class="member">
                        <div class="delete-btn"></div>
                        <div class="content">
                            <div class="name">
                                <h1>${member.name}</h1>
                            </div>
                            <div class="info">
                                <p>${member.email} / ${member.major} / ${member.role}</p>
                            </div>
                            <div class="biography">
                                <p>
                                  ${member.biography}
                                </p>
                            </div>
                        </div>
                    </div>`;

  document.getElementById("members").innerHTML += HTMLMember;
                    
});

let major = "";
let role = "";

function setMajorValue(sel) {
  major = sel.options[sel.selectedIndex].text;
}

function setRoleValue(sel) {
  role = sel.options[sel.selectedIndex].text;
}

// Create a member object from input values, Then add the member to the local storage.
function addMember() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const biography = document.getElementById("biography").value;
  const atBottom = document.getElementById("addToBottom").checked;
  const atIndex = document.getElementById("atIndex").value;
  let index = 0;
  if(atBottom) index = members.getNumberOfMembers();
  else if(atIndex != "") {
    index = Number(atIndex) - 1;
  }
  member = new Member(name, email, major, role, biography);
  members.addMember(index, member);
}
