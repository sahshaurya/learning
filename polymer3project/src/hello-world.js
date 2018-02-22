
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
            <template is="dom-repeat" items="[[_getWords()]]">
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
}

 static get properties() {
   return {
     questions: Array,
     questionNumber: {type: Number, value: 0}
   }
 }

 _getWords() {
   return this.questions[0].split(" ");
 }

 setPosition(e) {
   var button = e.path[0];
   this.$.answer.appendChild(button);
 }

 getId(e) {
   console.log(e.path[0]);
 }
}

customElements.define('hello-world', HelloWorld);
