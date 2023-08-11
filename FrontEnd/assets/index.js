


const buildHtml = (projet)=>{
    gallery.innerHTML = '';
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

