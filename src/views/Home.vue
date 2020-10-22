<template>
  <div class="container">
    <h1>Contacts list</h1>
    <div>
      <table>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>E-mail</th>
          <th>Х</th>
        </tr>
        <tr v-for="(contact, idx) in getAllContacts" :key="idx">
          <td>{{contact.id}}</td>
          <td><router-link tag="a" class="more-link" :to="'/details/' + contact.id">{{contact.name}}</router-link></td>
          <td>{{contact.email}}</td>
          <td><i @click="showPopup(contact.id)" class="fas fa-user-slash"></i></td>
        </tr>
      </table>
      <div v-bind:class="{ toggle: showDeleteBtn }" class="popupDeleteUser">
        <p>Вы уверены, что хотите удалить контакт ?</p>
        <div class="deleteBtn">
          <button @click="togglePopup()">Отменить</button>
          <button @click="deleteUser()">Удалить</button>
        </div>
      </div>
      <div class="newContact">
        <h2>Добавить нового пользователя:</h2>
        <input class="newContactInput" v-model="name" placeholder="Имя" type="text" required>
        <input class="newContactInput" v-model="email" placeholder="E-mail" type="email">
        <button @click="addContact()">Добавить</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default{
  data(){
    return{
      newUser: {},
      name: '',
      email: '',
      showDeleteBtn: true,
      id: null
    }
  },
  computed:{ 
    ...mapGetters(['getAllContacts'])
  },
  methods:{
    ...mapActions(['addContacts', 'deleteContact']),
    addContact(){
      this.newUser['name'] = this.name
      this.newUser['email'] = this.email
      this.newUser['id'] = this.getAllContacts.length + 1
      this.addContacts(this.newUser)
      this.newUser = {}
    },
    deleteUser(){
      console.log(this.id)
      this.$store.dispatch('deleteContact', this.id)
      this.showDeleteBtn = !this.showDeleteBtn
    },
    togglePopup(){
      this.showDeleteBtn = !this.showDeleteBtn
    },
    showPopup(id){
      this.id = id
      this.showDeleteBtn = !this.showDeleteBtn
    }
  }
}
</script>

<style lang="scss">
  .container {
    padding-top: 30px;
    max-width: 1070px;
    margin: auto;
    position: relative;
    table {
      border-collapse: collapse;
      width: 100%;
      th, td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
        .more-link{
          color: #4CAF50;
          text-decoration: none;
        }
      }
      tr:hover {background-color:#f5f5f5;}
    }
    h2{
      margin-top: 30px;
    }
    input {
      width: 100%;
      padding: 12px 20px;
      margin: 10px 0;
      box-sizing: border-box;
    }
    button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      float: right;
      margin-bottom: 30px;
    }
    i{
      cursor: pointer;
    }
    .popupDeleteUser, .popupEditText{
      position: absolute;
      display: block;
      margin: 0 35%;
      top: 160px;
      width:347px;
      height:120px;  
      background-color: #00b19f;
      color: white;
      text-align: center;
      p{
        font-weight: bold;
      }
      .deleteBtn{
        display: flex;
        justify-content: space-between;
        margin: 15px;
      }
    }
    .toggle{
          display: none;
        }
  }
</style>

