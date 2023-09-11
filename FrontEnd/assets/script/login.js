//cette fonction sera exécuté lorsque le DOM de la page sera entièrement chargé.

    const loginForm = document.querySelector('form');

    //Lorsque l'utilisateur soumet le formulaire en cliquant sur le bouton de connexion, cet événement est capturé.
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); //ce code empêche le comportement par défaut du formulaire, qui serait de recharger la page lorsque le bouton de soumission est cliqué. 
        //Cela permet au code JavaScript de gérer la soumission du formulaire sans rechargement de la page.

        console.log('Étape 1 : Soumission du formulaire');
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        //stocke les informations d'identification requestData est créé pour contenir les informations d'identification de l'utilisateur (email et mot de passe). il sera converti en format JSON pour l'envoyer à l'API.
        const requestData = {
            email: email,
            password: password
        };

        console.log('JSON envoyé dans la requête :', JSON.stringify(requestData));

        // Envoi de la requête POST à l'API pour l'authentification
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            // les then sont utilisés pour gérer la réponse de l'API en cas de succès 
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erreur d\'authentification');
                }
            })
            .then(data => {
                // Vérification de la réponse de l'API et redirection vers la page index
                if (data && data.token) {
                    console.log('Authentification réussie');
                    // Stockage du jeton dans le local storage ou dans une variable selon vos besoins
                    localStorage.setItem('token', data.token);
                    window.location.href = '../FrontEnd/index.html';
                } else {
                    console.log('Erreur d\'authentification');
                    // Affichage du message d'erreur
                    const errorElement = document.querySelector('#error-message');
                    errorElement.textContent = 'Identifiants incorrects';
                    errorElement.style.display = 'block';
                }
            })
            //pour gérer les erreurs
            .catch(error => {
                console.error('Une erreur s\'est produite lors de l\'authentification :', error);
                // Affichage du message d'erreur
                const errorElement = document.querySelector('#error-message');
                errorElement.textContent = 'Erreur d\'authentification : ' + error.message;
                errorElement.style.display = 'block';
            });
    });
