


const buildHtml = (projet)=>{
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

const buildFilterBtn()=>{
    for()
}

let gallery = document.querySelector(".gallery")


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
/*  //renommer la fonction et changer le lien
//const getAllWorks = async() => {
    //fetch('http://localhost:5678/api/works')
		//.then(rep => {
			const works = rep.json()
            return works
		//})
        .then(rep => {
            buildHtml(rep)   //renomer ça                          
                console.log(rep)   
                
        })
   
} */
getAllWorks()



