let leads = []
const inputValue = document.getElementById("input-el")
const saveInput = document.getElementById("input-btn")
const saveTab = document.getElementById("tab-btn")
const deleteAll = document.getElementById("del-btn")
const ulElement = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"))
const deleteInd = document.getElementById("in-del-btn")

if(leadsFromLocalStorage){
    leads=leadsFromLocalStorage
    printLeads(leads)
}

saveTab.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        leads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(leads))
        printLeads(leads)
    })
})

saveInput.addEventListener("click", function(){
    leads.push(inputValue.value)
    inputValue.value=""
    localStorage.setItem("leads", JSON.stringify(leads))
    printLeads(leads)
})

function printLeads(leads){
    let listItems = ""
    for(let i=0; i<leads.length; i++){
        listItems+= `
            <li>
                <a target='_blank' href='${leads[i]}'> ${leads[i]} </a>
            </li>
        `
    }
    console.log(listItems)
    ulElement.innerHTML = listItems
}

deleteAll.addEventListener("dblclick", function(){
    localStorage.clear()
    leads=[]
    printLeads(leads)
})