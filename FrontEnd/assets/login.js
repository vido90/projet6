//cette fonction sera exécuté lorsque le DOM de la page sera entièrement chargé.
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    //Lorsque l'utilisateur soumet le formulaire en cliquant sur le bouton de connexion, cet événement est capturé.
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        console.log('Étape 1 : Soumission du formulaire');
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        //stocke les informations d'identification
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
                    window.location.href = '../index.html';
                } else {
                    console.log('Erreur d\'authentification');
                    // Affichage du message d'erreur
                    const errorElement = document.querySelector('#error-message');
                    errorElement.textContent = 'Identifiants incorrects';
                    errorElement.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de l\'authentification :', error);
                // Affichage du message d'erreur
                const errorElement = document.querySelector('#error-message');
                errorElement.textContent = 'Erreur d\'authentification : ' + error.message;
                errorElement.style.display = 'block';
            });
    });
});