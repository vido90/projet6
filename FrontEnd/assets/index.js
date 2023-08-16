


const buildHtml = (projet)=>{
    gallery.innerHTML = ''; //nettoie le contenue précédent
    for (let i = 0; i < projet.length; i++) {        
        let figure = document.createElement("figure")
        let image = document.createElement("img")
        let figcaption = document.createElement("figcaption")

        image.src = projet[i].imageUrl;
        image.alt = projet[i].title;
        figcaption.innerText = projet[i].title; //crée une legende pour chaque image 
        
        figure.appendChild(image);
        figure.appendChild(figcaption); 
        gallery.appendChild(figure);

    }  
}

function filterDataByCategoryId(data, categoryId) {
    if (categoryId === 0) {
        return data;
    } else {
        return data.filter(element => element.category.id === categoryId);
    }
}

const buildFilterBtn = (categories)=>{
    category.innerHTML = '';
    let allButton = document.createElement('button'); //créer buttons pour afficher les catégories
    allButton.textContent = 'Tous';
    allButton.classList.add("buttons");
    allButton.classList.add("active");
    category.appendChild(allButton);
    allButton.addEventListener('click', () => {
        getAllWorks();
        const activeButton = document.querySelector('.category-buttons button.active');
            if (activeButton) {
                activeButton.classList.remove('active');
            }
        allButton.classList.add('active');

        const categoryButtons = document.querySelectorAll('.category-buttons button:not(:first-child)');
        categoryButtons.forEach(button => button.classList.remove('active'));
        
    }
    )

    for (let i = 0; i < categories.length; i++) {
        let oneButton = document.createElement('button');
        oneButton.textContent = categories[i].name;
        oneButton.classList.add("buttons");
        oneButton.addEventListener('click', () => {
            getFilterWorks(categories[i].id);
            const activeButton = document.querySelector('.category-buttons button.active');
            if (activeButton) {
                activeButton.classList.remove('active');
            }
            oneButton.classList.add('active');

            allButton.classList.remove('active');
        }); 
        category.appendChild(oneButton);

    }


    
} 

let gallery = document.querySelector(".gallery");
let category = document.querySelector(".category-buttons");



/*assync await permet de faire attendre le code d'après pour ne pas qu'il s'exécute en meme temps*/

const getAllWorks = async() => {
    fetch('http://localhost:5678/api/works')
		.then(rep => {
			const works = rep.json()
            return works
		})
        .then(rep => {
            buildHtml(rep)                             
                console.log(rep)   
                
        })
   
}

const getFilterWorks = async(filterid) => {
    fetch('http://localhost:5678/api/works')
		.then(rep => {
			const works = rep.json()
            return works
		})
        .then(rep => {
            const filteredData = filterDataByCategoryId(rep, filterid);
            buildHtml(filteredData);                             
                console.log(filteredData)   
                
        })
   
}
//renommer la fonction et changer le lien

const getCategories = async() => {
    fetch('http://localhost:5678/api/categories')
		.then(rep => {
			const categories = rep.json()
            return categories
		})
        .then(rep => {
            buildFilterBtn(rep)   //renomer ça                          
                console.log(rep)   
                
        })
   
} 
getAllWorks()
getCategories()

/* // bouton modifier
/* const token = localStorage.getItem('token');
if (token === null) {
    
    /* document.getElementById("edit1").style.display="none" */

/* else {
    /* document.getElementById("edit1").style.display="flex" */

/* console.log(token) */ 

// creation de la modale

let modal = null
const focusableSelector = "button, a, input, textarea"
let focusables = []


const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(":focus");

    modal.style.display = null;
    focusables[0].focus();
    modal.removeAttribute('aria-hiden');
    modal.setAttribute('aria-modal', true);

    //Appeler la fermetture de la modale
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
};



//fermer la modale 
const closeModal = function (e) {
    if (modal === null) return 
    e.preventDefault()
    window.setTimeout(function () {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.style.display = "none";
    modal.setAttribute('aria-hiden', 'true') /*l'element doit être masqué*/
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null

}
//// Définit la "border" du click pour fermer la modale
const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    debugger
    if (index >= focusables.length){
        index = 0
    }
    if (index < 0) {
        index.focusables.length - 1
    }
    focusables[index].focus()

}

// Selectionne les éléments qui ouvrent la modale
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)   
})

// Ferme la modale avec la touche echap
window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if(e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})

//récupération du token 
const token = localStorage.getItem('token');
const AlredyLogged = document.querySelector(".js-alredy-logged");

adminPanel()

// Gestion de l'affichage des boutons admin
function adminPanel() {
    document.querySelectorAll(".admin__modifer").forEach(a => {
        if (token === null) {
            return;
        }
        else {
            a.removeAttribute("aria-hidden")
            a.removeAttribute("style")
            AlredyLogged.innerHTML = "logout";
        }
    });
}

