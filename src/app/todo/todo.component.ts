import { Component } from '@angular/core';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  
  // make todo array
  todos: string[] = [];
  // the variable that stores a new to do
  newTodo!: string;

  // the typewriter effect
  text = '';
  index = 0;
  message = 'TODO List made with ♥ by Jeffrey';
  deleting = false;

  // putting this in the constructor because it checks the state of the todos array.
  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos')!) || [];
  }

  // push to aray 
  addTodo() {
    if(this.newTodo.length > 0){
      this.todos.push(this.newTodo);
      this.newTodo = '';
      this.updateLocalStorage();
    }else{
      alert('Please fill in a to do.');
    }

  }

  // remove from array by filtering it
  removeTodo(todo: string) {
    this.todos = this.todos.filter(t => t !== todo);
    this.updateLocalStorage();
  }

  // reusable function to put the todos back in the localstorage
  updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // when the components get created run this function to get the typewriter effect.
  ngOnInit() {
    this.type();
  }

  type() {
    if (!this.deleting && this.index < this.message.length) {
      this.text += this.message[this.index];
      this.index++;
      setTimeout(() => this.type(), 100);
    } else if (this.deleting && this.text.length > 1) {
      this.text = this.text.slice(0, -1);
      setTimeout(() => this.type(), 100);
    } else if (this.text.length === 1) {
      this.text = this.message[0];
      this.deleting = false;
      this.index = 1;
      setTimeout(() => this.type(), 1000);
    } else {
      this.deleting = true;
      setTimeout(() => this.type(), 100);
    }
  }
  
}
