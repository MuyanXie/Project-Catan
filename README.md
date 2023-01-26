# Project Catan

This project aims to promote an online room trading platform for the Catan Table games. Originally, within the game, the only trading mode is face-to-face instant trades. This platform tries to integrate more refined financial trading deals, such as Futures and Options, among the five resources: Lumber, Wool, Grain, Brick, Ore.

First of all, this documnet will domenstrate how the website functions and the main usage of the platform. Also, this document describes the REST API implementations within the backend using Java __Spring Boot__ and H2 Database and provide the REST API for frontend development using __React.js__. 

Interested in joining this project? Email me at muyansamxie@gmail.com

## How does the Platform Work?
Each player will first register. On the table of Catan a turn clock should be used to record the progress of turns of the game. We would use turn number as the Futures/Options execution date index and thus keeping track of current turn number is important.

Next, within the platform, players are provided with an interface to post their __Abundance__, which is basically the items they are willing to sell/trade. The player could create or delete their Abundance at any time. Also, a real time interface is provided to show all the Abundances of all the players to give all the players a sense of distribution of resources on the table. A REST API is designed to fulfill the get, create and delete operation of the database for Abundance.

At this point, as most players would have understood the rough abundance of recourses and willingness to trade of each player, they could initiate a __Futures__ or a __Options__ contract with the other player verbally.

__Futures Contract__: Each contract consists of 9 elements: Contract ID, Initiator, Acceptor, Items from Initiator, Items from Acceptor, #Turn the Contract will be executed, Collateral from the Initiator, Collateral from the Acceptor, and Status of the Contract. Examples of Futures trade will be provided in the next section.

__Options Contract__:

__Contract Trade__:

## Examplary Trade in Project Catan:

## Front End Outlook:

## REST API Documentation:
A Maven repository dependency *Open Api Documentation* has been embeded into pom.xml file in the Spring Boot Backend. You can access the api documentation file easily at http://localhost:8080/swagger-ui/index.html after launching the backend in local environment.
## Additional Information:

This project is implemented by Muyan(Sam) Xie, with all rights reserved.

Interested in implementing more features? Email me at muyansamxie@gmail.com


