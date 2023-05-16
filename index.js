import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: 'https://realtime-database-64b1d-default-rtdb.asia-southeast1.firebasedatabase.app/'
}

const app  = initializeApp(appSetting)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputFeildEl()
    
    console.log(inputValue)
})

onValue(shoppingListInDB, (snapshot) => {
    if(snapshot.exists()){
    const itemArray = Object.entries(snapshot.val())
    document.getElementById('shopping-list').innerHTML = ""

    itemArray.map((item) => {
        appendItemToShoppingListEl(item)
        
    })
} else{
     document.getElementById('shopping-list').innerHTML = "You Have No Item"
}
})

const clearInputFeildEl = () => {
    inputFieldEl.value = ""
}

const appendItemToShoppingListEl = (item) => {
    const currentItemId = item[0]
    const currentItem = item[1]
    const newItemEl = document.createElement('li')
    newItemEl.textContent = currentItem
    document.getElementById('shopping-list').append(newItemEl)

    newItemEl.addEventListener("click", () => {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${currentItemId}`)
        remove(exactLocationOfItemInDB)
    })
    console.log(item);
}