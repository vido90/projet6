


const buildHtml = ()=>{
    console.log("coucou")
}

/*assync await permet de faire attendre le code d'après pour ne pas qu'il s'exécute en meme temps*/

const getAllWorks = async() => {
    fetch('http://localhost:5678/api/works')
		.then(rep => {
			const works = rep.json()
            return works
		})
        .then(rep => {
            buildHtml()
            console.log(rep)
        })
}

getAllWorks()