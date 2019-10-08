'use strict';

import { Member } from './Member.js';

export class Members {
  constructor() {
    this.members = localStorage.getItem('members');
    if(this.members === null) {
      this.members = [];
      // localStorage.setItem('members', []);
    }
  }
  
  getAllMembers() {
    return this.members;
    // return [
    //   new Member("Yosuef Rayyan", "yousefrayyan02@gmail.com", "Computer Systems Engineering", "Fron-End Developer", "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."),
    //   new Member("Ibrahim Abusamra", "yousefrayyan02@gmail.com", "Computer Systems Engineering", "Fron-End Developer", "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."),
    //   new Member("Rana Amter", "yousefrayyan02@gmail.com", "Computer Systems Engineering", "Fron-End Developer", "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.")
    // ];
  }

  addMember(index, member) {
    members.insert(index, member);
    localStorage.setItem('members', JSON.stringify(members));
  }

  getNumberOfMembers() {
    return members.length;
  }
}