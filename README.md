## Compile and run the project

# Se agrego EMAIL para poder autenticar a cada usuario.
# Se deja coleccion de postman en la carpeta postman en la raiz del proyecto.

```bash
# mongo db
# install docker
$ docker run -d --name mongodb -p 27017:27017 mongo

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod


#REGISTER

curl --location 'http://localhost:3000/auth/register' \
--form 'name="nicolas"' \
--form 'address="san jose"' \
--form 'lastName="alvarez"' \
--form 'password="1234567"' \
--form 'email="nicolas@gmail.com"' \
--form 'picture=@""'

#LOGIN

curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "nicolas@gmail.com",
    "password": "1234567"
}'

# UPDATE USER

curl --location --request PUT 'http://localhost:3000/user' \
--header 'Content-Type: application/json' \
--header 'Authorization: ••••••' \
--data '{
    "name": "jose"
}'

# UPDATE PICTURE

curl --location --request PATCH 'http://localhost:3000/user/picture' \
--header 'Authorization: ••••••' \
--form 'picture=@""'

# GET PICTURE

curl --location 'http://localhost:3000/user/picture/nicolas@gmail.com-WhatsApp Image 2024-09-30 at 7.35.42 PM.jpeg' \
--header 'Authorization: ••••••'

# GET USERS

curl --location 'http://localhost:3000/user' \
--header 'Authorization: ••••••'