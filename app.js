/**
 * Created by Administrator on 2017/1/10.
 */
import Vue from 'vue';
import './main.css';
import AV from 'leancloud-storage'

var APP_ID = '0f9uTIkIW3Dvx4e6uNGk5MUc-gzGzoHsz';
var APP_KEY = 'Sma0bnOKSIPWb6I5HGVq0TmT';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todoList: [],
        currentUser: null,
        activeClass: 'isFinished',
        picked: 'picked',
        actionType: 'signUp',
        formData: {
            username: '',
            password: ''
        }
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
      this.newTodo = oldTodo || '';

      this.currentUser = this.getCurrentUser();
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
        },
        signUp: function () {
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
            }, (error) => {
                alert('×¢²áÊ§°Ü')
            });
        },
        login: function () {
            AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
                this.currentUser = this.getCurrentUser()
            }, (error) => {
                alert('µÇÂ¼Ê§°Ü')
            });
        },
        getCurrentUser: function () {
            let current = AV.User.current()
            if (current) {
                let {id, createdAt, attributes: {username}} = current;
                return {id, username, createdAt}
            } else {
                return null
            }
        },
        logout: function () {
            AV.User.logOut();
            this.currentUser = null;
            window.location.reload()
        }
    }
});