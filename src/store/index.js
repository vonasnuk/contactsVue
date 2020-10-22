import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contactsList:[
      {name: 'Leanne Graham', userName: 'Bret', email: 'Sincere@april.biz', id: 1},
      {name: 'Ervin Howell', userName: 'Antonette', email: 'Shanna@melissa.tv', id: 2},
      {name: 'Clementine Bauch', userName: 'Samantha', email: 'Nathan@yesenia.net', id: 3},
      {name: 'Patricia Lebsack', userName: 'Karianne', email: 'Julianne.OConner@kory.org', id: 4},
      {name: 'Chelsey Dietrich', userName: 'Kamren', email: 'Lucio_Hettinger@annie.ca', id: 5},
    ]
  },
  mutations: {
    updateContacts(state, contact){
      state.contactsList.push(contact)
    },
    deleteItem(state, id){ 
      const contact = state.contactsList.concat()
      const idx = contact.findIndex(t => t.id === id)
      contact.splice(idx, 1)
      state.contactsList = contact
    },
    newField(state, newField){    
      let contact = state.contactsList.concat() 
      const idx = contact.findIndex(t => t.id === newField.id)
      let newData = contact[idx]
      newData = Object.assign(newField, newData)
      contact[idx] = newData
      state.contactsList = contact
    },
    deleteFieldByKey(state, {key, id}){
      let contact = state.contactsList.concat() 
      const idx = contact.findIndex(t => t.id === id)
      let newData = contact[idx]
      let keyData = key.replace(/ +/g, ' ').trim();
      delete newData[keyData];
      contact[idx] = newData;
      state.contactsList = contact
    },
    editItemText(state, {id, key, newText}){
      let contact = state.contactsList.concat() 
      const idx = contact.findIndex(t => t.id === id)
      let newData = contact[idx]
      let keyData = key.replace(/ +/g, ' ').trim();
      newData[keyData] = newText
      contact[idx] = newData;
      state.contactsList = contact
    },
    returnItem(state, oldList){
      state.contactsList = oldList
    },
    copyList(state){
      console.log('work')
      state.copyList = state.contactsList
    }
  },
  actions: {
    addContacts({commit}, contact){
      commit('updateContacts', contact)
    },
    deleteContact({commit}, id){
      commit('deleteItem', id)
    },
    addFieldContact({commit}, newField){
      commit('newField', newField)
    },
    deleteFieldContact({commit}, {key, id}){
      commit('deleteFieldByKey', {key, id})
    },
    updateItemText({commit}, {id, key, newText}){
      commit('editItemText', {id, key, newText})
    },
    returnStepBack({commit}, oldList){
      commit('returnItem', oldList)
    }
  },
  getters: {
    getAllContacts: state => {
      return state.contactsList
    },
    getContactById: state => (id) => {
      return state.contactsList.find(el => el.id === id);
    },
    getKeyContact: state => (id) => {
      let contacts = state.contactsList.find(el => el.id === id);
      return Object.keys(contacts)
  }
}
})
