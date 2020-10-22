<template>
    <div class="container">
        <div>
            <button class="stepBack" @click="stepBack()">Отменить последнее изменение <i class="fal fa-undo-alt"></i></button>
        </div>
        <table>
            <tr>
                <td v-for='(contactDetails, idx) in contactKey' :key='idx'>
                    {{contactDetails}} 
                    <i @click="showPopup($event.path[1].innerText, contact.id)" class="fas fa-trash"></i>
                    <i @click="showPopupEdit($event.path[1].innerText, contact.id)" class="fas fa-pen"></i>
                </td>
            </tr>
            <tr>
                <th v-for='(contactKeyDetails, idx) in contact' :key='idx'>
                    {{contactKeyDetails}} 
                </th>
            </tr>
        </table>
        <div class="newContact">
            <h2>Добавить новое поле:</h2>
            <input v-model="key" placeholder="Название" type="text" required>
            <input v-model="value" placeholder="Значение" type="text">
            <button @click="addField(contact.id)">Добавить</button>
        </div>
        <div v-bind:class="{ toggle: showDeleteBtn }" class="popupDeleteUser">
            <p>Вы уверены, что хотите удалить поле ?</p>
            <div class="deleteBtn">
                <button @click="togglePopup()">Отменить</button>
                <button @click="deleteField()">Удалить</button>
            </div>
        </div>
        <div v-bind:class="{ toggle: showEditText }" class="popupEditText">
            <p>Введите новое значение</p>
            <input v-model="newText" type="text" placeholder="Введите новое значение">
            <div class="deleteBtn">
                <button @click="togglePopupEdit()">Закрыть</button>
                <button @click="editText()">Изменить</button>
            </div>
        </div>
    </div>
</template>


<script>
import {mapGetters, mapActions} from 'vuex'

export default{ 
    data(){
        return{
            key: null,
            value: null,
            newField: {},
            showDeleteBtn: true,
            keyToDelite: null,
            idToDelite: null,
            showEditText: true,
            newText: '',
            savedData: [],
            countReturnBtn: 0
        }
    },
    computed: {
        ...mapGetters(['getContactById', 'getKeyContact', 'getAllContacts']),
        contact(){
            return this.getContactById(+this.$route.params.id)
        },
        contactKey(){
            return this.getKeyContact(+this.$route.params.id)
        }
    },
    created(){
        localStorage.setItem('list', JSON.stringify(this.getAllContacts))
    },
    methods:{
        ...mapActions(['addFieldContact', 'deleteFieldContact', 'updateItemText', 'returnStepBack']),
        addField(id){
            this.newField[this.key] = this.value
            this.newField['id'] = id
            this.addFieldContact(this.newField)
            this.newField = {}
        },
        deleteField(){
            const id = this.idToDelite
            const key = this.keyToDelite
            this.showDeleteBtn = !this.showDeleteBtn
            this.deleteFieldContact({key, id})
        },
        togglePopup(){
            this.showDeleteBtn = !this.showDeleteBtn
        },
        showPopup(key, id){
            localStorage.setItem('list', JSON.stringify(this.getAllContacts))
            console.log(this.countReturnBtn)
            this.keyToDelite = key
            this.idToDelite = id
            this.showDeleteBtn = !this.showDeleteBtn
        },
        showPopupEdit(key, id){
            localStorage.setItem('list', JSON.stringify(this.getAllContacts))
            this.keyToDelite = key
            this.idToDelite = id
            this.showEditText = !this.showEditText
        },
        togglePopupEdit(){
            this.showEditText = !this.showEditText
        },
        editText(){
            const id = this.idToDelite
            const key = this.keyToDelite
            const newText = this.newText
            this.updateItemText({id, key, newText})
        },
        stepBack(){
            this.savedData = JSON.parse(localStorage.getItem('list'))
            console.log(this.savedData, 'stepBack()')
            this.returnStepBack(this.savedData)
        }
    }
}
</script>

<style>
    .fa-trash{
        color: rgb(170, 170, 170);
    }
    i{
        margin: 5px;
    }
    .stepBack{
        float: left !important;
    }
</style>