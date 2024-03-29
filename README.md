# Project Catan
![CTS](Pictures/CTS.png)

This project aims to promote an online room trading platform for the Catan Table games. Originally, within the game, the only trading mode is face-to-face instant trades. This platform tries to integrate more refined financial trading deals, such as Futures, among the five resources: Lumber, Wool, Grain, Brick, Ore.

First of all, this documnet will domenstrate how the website functions and the main usage of the platform. Also, this document describes the REST API implementations within the backend using Java __Spring Boot__ and H2 Database and provide the REST API for frontend development using __React.js__. 

To be noticed, the folder Project-Catan-API-Test-Collection contains the Postman collections file for the backend APIs; The folder Project-Catan-REST-API-Documentation provides an easy access to API documentations from the backend.

Interested in joining this project? Email me at muyansamxie@gmail.com
## Tech Stack:
- __Java Spring Boot__
- H2 Relational Database
- __React.js__
- HTML/CSS
- JavaScript
- __Docker__
- __AWS EC2, S3, ELB, VPC and Cloudformation__ (for the server version, which is still under development)
- Maven
- Postman
- Swagger
- Git


## How does the Platform Work?
Each player will first register. On the table of Catan a turn clock should be used to record the progress of turns of the game. We would use turn number as the Futures execution date index and thus keeping track of current turn number is important.

Next, within the platform, players are provided with an interface to post their __Abundance__, which is basically the items they are willing to sell/trade. The player could create or delete their Abundance at any time. Also, a real time interface is provided to show all the Abundances of all the players to give all the players a sense of distribution of resources on the table. A REST API is designed to fulfill the get, create and delete operation of the database for Abundance.

At this point, as most players would have understood the rough abundance of recourses and willingness to trade of each player, they could initiate a __Futures__ contract with the other player verbally.

__Futures Contract__: Each contract consists of 9 elements: Contract ID, Initiator, Acceptor, Items from Initiator, Items from Acceptor, #Turn the Contract will be executed, Collateral from the Initiator, Collateral from the Acceptor, and Status of the Contract. Examples of Futures trade will be provided in the next section.

__Contract Exchange and Update__:
To perform contract exchange, the initiator of the contract will first post the contract to the platform. The platform will then check if the contract is valid. If the contract is valid, the contract request would be sent to the intended aceptor. The aceptor would then have the option to accept or reject the contract. If the contract is accepted, the contract would be updated to the database and the initiator and aceptor would be notified. If the contract is rejected, the contract would be deleted from the database and the initiator and aceptor would be notified.

To sell a contract, the initiator will need to post another contract that acts like a counter of the previous contract. If the proposal is accepted, the seller would be able to reach a balance and thus need not to pay the original amount.

Finally, an ADMIN panel is provided to the platform to check the status of all the contracts and to update the status of the contracts. The ADMIN panel is only accessible to the ADMIN user. The ADMIN user is the one who is responsible for the platform and is the only one who can create the ADMIN user. The ADMIN user is also the only one who can delete the ADMIN user. The ADMIN user is also the only one who can delete the contracts. The ADMIN user is also the only one who can delete the users. The ADMIN user is also the only one who can delete the Abundances.

Based on timed results, Catan Board Game with the financial complexs implemented would have the play time shortened from up to 90 min to a bare 50 min on average with the help of this platform in tracking futures trade.

## Installing the platform:
__WARNING__: If you wish to run the platform locally, please change the api_url in the frontend to http://localhost:8080 in the file Project-Catan-Frontend/src/config/config.js

Make sure you have Maven and NPM installed on your local computer. Before running the following command:

```
git clone https://github.com/MuyanXie/ProjectCatan.git
cd Project-Catan-Backend
mvn clean spring-boot:run # launching the backend
cd ..
cd Project-Catan-Frontend
npm install
npm start # launching the frontend
```

Or, if you have docker installed on your local computer, you can run the following command:

```
git clone https://github.com/MuyanXie/ProjectCatan.git
cd Project-Catan-Backend
docker build -t catan-backend .
docker run -p 8080:8080 catan-backend
cd ..
cd Project-Catan-Frontend
docker build -t catan-frontend .
docker run -p 3000:3000 catan-frontend
```

Opening your brower, you will be able to see the home page at http://localhost:3000/

## Using the Website:
 <ins>Registration and Signin:</ins>

Click participate, you will be promoted to the register page. You can register a new user or sign in with an existing user. After signing in, you will be able to see the home page of the platform:
<p>
  <img src="Pictures/Register.png#center" width="50%" height = "600" style="display: block; margin: 0 auto"/>
</p>
(Or you can sign in to the system use existing username and passwords)
<p>
  <img src="Pictures/Signin.png#center" width="50%" height = "500" style="display: block; margin: 0 auto" /> 
</p>

 <ins>Players:</ins>

After signing into your own account, you will be able to see the home page of the platform; You will see a page with all the players displayed:

<p>
  <img src="Pictures/Players.png#center" width="100%" height = "160%" style="display: block; margin: 0 auto" /> 
</p>

 <ins>Abundances:</ins>

Just as described above, Abundances are the items that a player is willing to sell/trade. You can create or delete your own Abundance at any time. Also, a real time interface is provided to show all the Abundances of all the players to give all the players a sense of distribution of resources on the table. A REST API is designed to fulfill the get, create and delete operation of the database for Abundance.
 <p>
  <img src="Pictures/Abundances.png#center" width="100%" height = "160%" style="display: block; margin: 0 auto" /> 
</p>

  <ins>Futures:</ins>

  Futures are the contracts that a player is willing to sell/trade. You can create or delete your own Futures at any time. Also, a real time interface is provided to show all the Futures of all the players to give all the players a sense of distribution of resources on the table. A REST API is designed to fulfill the get, create and delete operation of the database for Futures.

 <p>
  <img src="Pictures/Futures.png#center" width="100%" height = "160%" style="display: block; margin: 0 auto" /> 
</p>

  Also, a page is added to fulfill the function of adding a future contract with a certain player.

 <p>
  <img src="Pictures/AddFutures.png#center" width="100%" height = "160%" style="display: block; margin: 0 auto" /> 
</p>

<ins>Admin Panel</ins>:

The Admin Panel is only accessible to the ADMIN user. The ADMIN user is the one who is responsible for the platform and is the only one who can create the ADMIN user. The ADMIN user is also the only one who can delete the ADMIN user. The ADMIN user is also the only one who can delete all the contracts. The ADMIN user is also the only one who can delete all the users. The ADMIN user is also the only one who can delete all the Abundances.

 <p>
  <img src="Pictures/Admin.png#center" width="100%" height = "160%" style="display: block; margin: 0 auto" /> 
</p>

## REST API Documentation:
A Maven repository dependency *Open Api Documentation* has been embeded into pom.xml file in the Spring Boot Backend. You can access the api documentation file easily at http://localhost:8080/swagger-ui/index.html after launching the backend in local environment.

Also, you can download the __Swagger UI.html__ and __Swagger UI_files__ folder from Project-Catan-REST-API-Documentation to load a html view of REST API Documentation.

Troubleshooting Update (2023.1.26): Make sure to enable CROS access of Swagger UI.html to Swagger UI_files in your brower to render the correct content in the opened html webpage.

## Additional Information:

This project is implemented by Muyan(Sam) Xie, with all rights reserved.

Interested in implementing more features? Email me at muyansamxie@gmail.com

## License:
MIT License

## Project Update:
2023.4.12: The project is finally finished and packaged for release