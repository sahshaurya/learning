
import {Element as PolymerElement} from '../node_modules/@polymer/polymer/polymer-element.js';
import QuestionList from './question-list.js';
import '../node_modules/@polymer/paper-button/paper-button.js';

export default class HelloWorld extends PolymerElement {

  static get template() {
   return `<style>
            .title {
              font-size: 40px;
              background-color: #515151;
              color: #fff;
            }
           .button {
             background-color: #515151;
             color: #fff;
             text-transform: lowercase;
             display: block-inline;
           }
           </style>
           <div>
           <center>
           <div class="title">UNJUMBLE</div> <br>
           <div id="verdict"></div>
            <template is="dom-repeat" items="[[getWords()]]">
              <paper-button class="button" on-click="setPosition">[[item]]</paper-button>
           </template>
           <br><br>
           <div id="answer" on-click="getId"></div>
           </center>
           </div>`;
 }

 constructor() {
   super();
   var questionList = new QuestionList();
   this.questions = questionList.getQuestions();
   this.answers = questionList.getAnswers();
}

 static get properties() {
   return {
     answers: Array,
     questions: Array,
     questionNumber: {type: Number, value: 0},
     wordNumber: {type: Number, value: 0},
     answer: {type: String, value: ''}
   }
 }

 getWords() {
   return this.questions[0].split(" ");
 }

 setPosition(e) {
   this.wordNumber += 1;
   var button = e.path[0];
   this.$.answer.appendChild(button);
   this.answer = this.answer+button.innerText+" ";
   if(this.wordNumber == this.questions[0].split(" ").length){
      if(this.answer.trim() == this.answers[0]) {
        this.$.verdict.innerText = "You're too cool!";
        return;
      }
      else {
        this.$.verdict.innerText = "Incorrect! Try again?";
        var retryButton = this.createButton();
        this.$.verdict.appendChild(retryButton);
        return;
      }
  }
 }

 retry(){
   history.go(0);
 }

 createButton() {
   var retryButton = document.createElement("paper-button");
   retryButton.classList.add("button");
   retryButton.innerText = "Retry?";
   retryButton.addEventListener("click", this.retry);
   return retryButton;
 }

}

customElements.define('hello-world', HelloWorld);
