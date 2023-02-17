
let tagUl          = document.querySelector('.ulProducts')
let tagSectionCart = document.querySelector('.carrinho')
let arrayCarrinho  = []


function createCard (data) {

    for (cont in data) {
        const tagLi     = document.createElement ('li')
        const tagImg    = document.createElement ('img')
        const tagH2     = document.createElement ('h2')
        const tagH3     = document.createElement ('h3')
        const tagP      = document.createElement ('p')
        const tagH4     = document.createElement ('h4')
        const tagButton = document.createElement ('button')
        const tagA      = document.createElement ('a')


        tagLi.classList.add('listProducts')


        tagImg.src       = data[cont].img
        tagH2.innerText  = data[cont].tag
        tagH3.innerText  = data[cont].nameItem
        tagP.innerText   = data[cont].description
        tagH4.innerText  = "R$ " + data[cont].value.toFixed(2)
        tagA.innerText   = data[cont].addCart
        tagA.setAttribute('id', data[cont].id)


        tagUl.append     (tagLi)
        tagButton.append (tagA)
        tagLi.append     (tagImg, tagH2, tagH3, tagP, tagH4, tagButton)
    }

}

createCard(data)


tagUl.addEventListener('click', internalEventos)

function internalEventos(event) {
    let myClick   = event.target
    console.log(myClick)
    if (myClick.tagName == "A") {
        let produto = data[myClick.id]
        arrayCarrinho.push({
            ...produto,
            unicId: Date.now()
        })
        cart(arrayCarrinho)

        somar(arrayCarrinho)
}
}

function cart(){
    
    tagSectionCart.innerHTML = ''
    

    for(let i in arrayCarrinho){
            
        let tagDivImg    = document.createElement('li')
        let tagImg       = document.createElement('img')
        let tagDivTitle  = document.createElement('div')
        let tagH3        = document.createElement('h3')
        let tagSpan      = document.createElement('span')
        let tagButton    = document.createElement('button')
        
        
        tagDivImg.classList.add('productCart')
        tagDivImg.id = arrayCarrinho[i].unicId
        
        tagImg.src          = arrayCarrinho[i].img
        tagH3.innerText     = arrayCarrinho[i].nameItem
        tagSpan.innerText   = "R$" + arrayCarrinho[i].value
        tagButton.innerText = 'Remover produto'
        
        tagDivImg.append           (tagImg, tagDivTitle)
        tagDivTitle.append         (tagH3, tagSpan, tagButton)
        tagSectionCart.appendChild (tagDivImg)
    }
}


let tagH3Vendas = document.querySelector('#quantidade')
let tagH3Total =  document.querySelector('#total')


tagSectionCart.innerHTML = ""

function somar(arrayCarrinho){
    let total = 0
    for(let i = 0; i < arrayCarrinho.length; i++){
        total = total + arrayCarrinho[i].value
    }
    tagH3Total.innerText    = `R$ ${total.toFixed(2)}`
    tagH3Vendas.innerText   = arrayCarrinho.length
}


tagSectionCart.addEventListener('click', removeCarrinho)


function removeCarrinho(event){
    if(event.target.tagName == 'BUTTON'){
        let lugarId = event.target.closest('li').id
        console.log(lugarId)
        arrayCarrinho = arrayCarrinho.filter((valor) => {
            return valor.unicId != lugarId
        })
    }
    somar(arrayCarrinho)
    cart()
}

const tagButtonPesquisar = document.querySelector('.btn')

tagButtonPesquisar.addEventListener('click', function(event){
    let busca = document.querySelector("#searchBox").value.toLowerCase().trim()
    
    
    if(event.target.tagName == "A"){
        
        tagUl.innerHTML = ""
        
        createCard(data.filter(element => 
            element.nameItem.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(busca) ||
            element.tag.join('').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(busca)
            ))
        }
    }
)

const header = document.querySelector('.header')

header.addEventListener('click', function(event){
    
    if(event.target.tagName == "A" ){
        tagUl.innerHTML = ""
        if(event.target.innerText == "Todos"){
            createCard(data)
    }
    else{
        createCard(data.filter(filtrandoBotoes))
    }

    function filtrandoBotoes(element){
        if(element.tag.join('') == event.target.innerText){
            return element
        }
    }
}})