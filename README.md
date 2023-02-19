<p align="center">
  <img src="Logo.png" width="124" />
</p>

# NoSQL-IPFS
Database driver for NoSQL over IPFS.

Providing a MongoDB like NoSQL experience over a decentralized architecture (IPFS).


## Driver - Usage

```bash
npm i nosql-ipfs
```

## Steps to Run the Application
To run the complete application including Web UI, HTTP Microservice wrapping the database
* clone the repo: https://github.com/Mustafa2856/nosql_ipfs
* in 2 different terminals run the following commands
```bash
npm i
npm run serve
```

```bash
cd frontend
npm i
npm start
```

Your HTTP Microservice would be running at http://localhost:3000 & your Web Client would be running at http://localhost:3001

## Inspiration
Most Databases Storage services are Centralized, So Single Point of Failure {Slow Speed, Bottleneck Point Leading to Less Efficiency & No-Fault Tolerance} is Possible. Also, from Security Point of View, Data Breaches would lead to Huge Financial Losses.
Therefore, we decided to Build NoSQL-IPFS.

## What it Basically Does?
NoSQL-IPFS is NoSQL Database service that provides users with all functions of a normal database, but in a decentralized manner (using IPFS Storage).
It has the same capabilities as a standard NoSQL database, including the ability to create, add and update databases, but it is still decentralised to avoid security risks. 
This website has exceptional efficiency and outperforms conventional solutions because to IPFS's robust file sharing mechanism and sophisticated processing techniques.

Use a decentralized database with your data being encrypted and stored over a decentralized web on IPFS.

## Similar Tools
* OrbitDB: A decentralized Redis like database based on IPFS

## Future Work for NoSQL-IPFS
* Roles & Access Control
* Sharding
