/**
 * Created by Administrator on 2017/1/10.
 */
import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: [],
        activeClass: 'isFinished'
    },
    created: function(){
      window.onbeforeunload = ()=>{
          let todoString = JSON.stringify(this.newTodo);
          let dataString = JSON.stringify(this.todoList);

          window.localStorage.setItem('todoEdit',todoString);
          window.localStorage.setItem('myTodos',dataString);
      };

      let oldDataString = window.localStorage.getItem('myTodos');
      let oldData = JSON.parse(oldDataString);
      this.todoList = oldData || [];

      let oldTodoString = window.localStorage.getItem('todoEdit');
      let oldTodo = JSON.parse(oldTodoString);
      this.newTodo = oldTodo || [];
    },
    methods: {
        addTodo: function(){
            this.todoList.push({
                title: this.newTodo,
                createdAt: new Date(),
                year: new Date().getFullYear(),
                month: new Date().getMonth()+1,
                date: new Date().getDate(),
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                second: new Date().getSeconds(),
                done: false
            });
            this.newTodo = ''
        },
        addClass: function(todo){
              todo.style.textDecoration = 'line-through';
        },
        removeTodo: function(todo){
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index,1)
        }
    }
});