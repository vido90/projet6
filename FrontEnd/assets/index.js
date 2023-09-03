


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
        figure.setAttribute('id', 'p-' +projet[i].id)

     

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
   
    
    modal.setAttribute('aria-hiden', 'true') /*l'element doit être masqué*/
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal.style.display = "none";
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

//récupération du token 
const token = localStorage.getItem('token');
const AlredyLogged = document.querySelector(".js-alredy-logged");
/* const btnEdit2 = document.querySelector("#btnedit2"); //Si c'est un id cest hashtag*/

function logout() {
    localStorage.removeItem('token'); // Supprimer le token de l'utilisateur
    
    window.location.href = './index.html'; // Rediriger vers la page d'accueil
}

 // Gestionnaire d'événements pour le bouton "Logout"
 AlredyLogged.addEventListener('click', logout);



adminPanel()

// Gestion de l'affichage des boutons admin
function adminPanel() {
    const editButtons = document.querySelectorAll(".edit-buttons");
    document.querySelectorAll(".admin__modifer").forEach(a => {
        if (token === null || AlredyLogged.innerHTML === "login") {
            editButtons.forEach(button => {
                button.style.display = "none";
            });

            AlredyLogged.removeEventListener('click', logout);
            
            return;
        }
        else {
            editButtons.forEach(button => {
                button.style.display = "block";
            });
            a.removeAttribute("aria-hidden")
            a.removeAttribute("style")
            AlredyLogged.innerHTML = "logout";
            AlredyLogged.addEventListener('click', logout);
            
        }
    });
}


//afficher les images
async function afficherImagesPortfolio() {
    const response = await fetch('http://localhost:5678/api/works'); // Récupérer les données des travaux
    const data = await response.json(); // Convertir la réponse en JSON
    const imageGallery = document.querySelector('.image-gallery'); // Sélectionner la div pour les images

    // Parcourir les données et afficher les images
    data.forEach(work => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('image-container'); // Ajoutez une classe pour cibler le conteneur
        imgContainer.setAttribute('id',work.id); // Permet d'identifier chaque image du portofolio

        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        const moveIcon = document.createElement('i');
        moveIcon.classList.add('fas', 'fa-arrows-alt');

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash', 'delete-icon'); // Classe pour l'icône de suppression
        deleteIcon.addEventListener('click', () => {
            //const elementId = deleteIcon.dataset.id; // Récupérez l'identifiant de l'élément
            handleDeleteClick(work.id);
        });

        const editText = document.createElement('p');
        editText.textContent = 'éditer'; // Texte "éditer"
        editText.classList.add('edit-text');
        
        imgContainer.appendChild(img);
        imgContainer.appendChild(deleteIcon);
        imgContainer.appendChild(moveIcon)
        imgContainer.appendChild(editText); // Ajout du texte "éditer"

        imageGallery.appendChild(imgContainer);


    });

    
}

afficherImagesPortfolio();

//Pour supprimer les images dans la modale 
function handleDeleteClick(elementId) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");

    if (confirmation) {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:5678/api/works/${elementId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        })
        .then(response => {
            if (response.ok) {
                // Supprimer l'élément du DOM après la suppression réussie
                const elementToDelete = document.getElementById(elementId);
                const projetToDelete = document.getElementById('p-' +elementId);

                if (elementToDelete) {
                    elementToDelete.remove();
                    projetToDelete.remove();
                }
                
            } else {
                console.error('Erreur lors de la suppression de l\'élément');
            }
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la suppression :', error);
        });
    }
}

// Sélectionne le lien "Ajouter un projet"
const addProjectLink = document.querySelector('.js-admin-projets');

// Sélectionne la deuxième fenêtre modale
const secondModal = document.querySelector('#modal2');

// Gestionnaire d'événement pour ouvrir la deuxième fenêtre modale
addProjectLink.addEventListener('click', (event) => {
    event.preventDefault(); // Empêche le comportement de lien par défaut
    secondModal.style.display = 'block'; // Affiche la deuxième modale
});


  //gestion du bouton left et close 
  document.addEventListener("DOMContentLoaded", function () {
    const returnToFirstModalLink = document.querySelector('.js-modale-return');
    const firstModal = document.querySelector('#modal1');
    const secondModal = document.querySelector('#modal2');

    returnToFirstModalLink.addEventListener('click', (event) => {
        event.preventDefault(); // Empêche le comportement de lien par défaut
        secondModal.style.display = 'none'; // Cache la deuxième modale
        firstModal.style.display = 'flex'; // Affiche la première modale
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const addPhotoButton = document.querySelector('.add-photo-button');
    const addPhotoInput = document.querySelector('.add-photo-input');
    const secondModal = document.querySelector('#modal2');
    const emptyImage = document.querySelector('.empty-image img');
    const maxFileSizeText = document.querySelector('.empty-image p');
    const closeModal2 = document.querySelector('#btnedit2');

    // Ajoute un gestionnaire d'événements pour le clic sur le bouton "Ajouter photo"
    addPhotoButton.addEventListener('click', () => {
        addPhotoInput.click();
    });

     // Ajoute un gestionnaire d'événements pour le clic sur le bouton "close" de la 2e modale
     closeModal2.addEventListener('click', () => {
        secondModal.style.display = "none";

    });

    // Ajoute un gestionnaire d'événements pour la modification de l'élément input 
    addPhotoInput.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const imageUrl = URL.createObjectURL(selectedFile);
            emptyImage.src = imageUrl;

            // Cache le bouton "Ajouter photo" et le texte "jpg, png: 4mo max" dans la deuxième modale
            addPhotoButton.style.display = 'none';
            maxFileSizeText.style.display = 'none';

            // Afficher la deuxième modale après avoir inséré l'image
            secondModal.style.display = 'block';
        }
    });

    //gestion d'ajout de photo et bouton valider 

    const title = document.querySelector('#titre');
    const category = document.querySelector('#categorie');
    const validerPhotoButton = document.querySelector('#modal2 .js-add-work');
    const modal = document.querySelector('#modal2');
    const galleryContainer = document.querySelector('.gallery'); //Portfolio
    const imgContainer = document.querySelector('.image-gallery');
    const newPhotoPreview = document.querySelector('.empty-image img');

    function updateValiderButtonState() {
        console.log("Title", title.value.trim());
        console.log("Category", category.value);

        if (title.value.trim() !== '' && category.value !== '0') {
            validerPhotoButton.classList.add('green-button');
        } else {
            validerPhotoButton.classList.remove('green-button');
        }
    }

    title.addEventListener('input', updateValiderButtonState);
    category.addEventListener('change', updateValiderButtonState);

    validerPhotoButton.addEventListener('click', () => {
        if (validerPhotoButton.classList.contains('green-button')) {
            
            // Créer un nouvel élément d'image
            const newImage = document.createElement('img');
            newImage.src = newPhotoPreview.src;
            newImage.alt = title.value;

            // Ajouter l'image à la galerie
            galleryContainer.appendChild(newImage);
            imgContainer.appendChild(newImage);
            
            // les données à envoyer au serveur
            const formData = new FormData();          
            formData.append('image', document.getElementById('file').files[0]);
            formData.append('title', document.getElementById('titre').value);
            formData.append('category', document.getElementById('categorie').value);           
             // Enregistrement des données dans la base de données
            const token = localStorage.getItem('token');
            console.log(formData);
            fetch(`http://localhost:5678/api/works`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },            
            body: formData
            })
            .then(response => response.json())
            .then(result => {
                console.log('Réponse du serveur:', result)

                

                // Mettre à jour la galerie dans la première modale en créant un nouvel élément figure
                const newFigure = document.createElement('figure');
                const newFigureImage = document.createElement('img');
                newFigureImage.src = newImage.src;
                newFigureImage.alt = title.value;
                newFigure.appendChild(newFigureImage);
                gallery.appendChild(newFigure);
            });


            

            // Fermer la troisième modale
            modal.style.display = 'none';
        }
    }); 

   
    //Mode edition 
    const editModeBlock = document.querySelector('.admin__rod.admin__modifer'); // Sélecteur pour le bloc de mode édition
    const publishChangesButton = document.querySelector('.admin__modifer button'); // Sélecteur pour le bouton "Publier les changements"
    const editableElements = document.querySelectorAll('.editable'); // Ajoutez la classe 'editable' aux éléments que vous voulez rendre éditables

    let isEditMode = false;

    editModeBlock.addEventListener('click', () => {
        isEditMode = !isEditMode;

        if (isEditMode) {
            enableEditMode();
            editModeBlock.classList.add('editing');
        } else {
            disableEditMode();
            editModeBlock.classList.remove('editing');
        }
    });

    function enableEditMode() {
        editableElements.forEach(element => {
            element.contentEditable = true;
        });
    }

    function disableEditMode() {
        editableElements.forEach(element => {
            element.contentEditable = false;
        });
    }

    publishChangesButton.addEventListener('click', () => {
        if (isEditMode) {
            // Appliquer le code pour publier les changements (par exemple, sauvegarder les données modifiées)
            // Réinitialiser le mode d'édition
            isEditMode = false;
            disableEditMode();
            editModeBlock.classList.remove('editing');
        }
    });
});








