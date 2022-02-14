require('dotenv').config()
const express = require('express'); 
const { MongoClient, } = require('mongodb');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/users');

const start = async () => {
//Connect to the database
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.ayboq.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async (err) => {
    if(err){
        throw err;
    }
    const collection = client.db(process.env.DATABASE).collection(process.env.COLLECTION);
    const cursor = collection.find();
    const data = await cursor.toArray()     
    // Provide resolver functions for your schema fields
    const resolvers = {
      Query: {
        user: () => data,
      },
    };
    
    const server = new ApolloServer({ typeDefs, resolvers });  
    const app = express(); 

    server.start().then(() => {
        server.applyMiddleware({ app });
        app.listen({ port: 4000 }, () =>
          console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
        );
        client.close();
    });    
});
}
start();
