const graphql = require('graphql');
const _ = require('lodash');
const searchURLbyDomain = require('../visionapi');
const { GraphQLInt,GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var websites = [
    { name: 'SBI', url: 'https://www.onlinesbi.com', id: '1' },
    { name: 'MY GOV', url: 'https://www.mygov.in', id: '2' },
    { name: 'GITHUB', url: 'https://github.com', id: '3' },
];

const websiteType = new GraphQLObjectType({
    name: 'website',
    fields: ( ) => ({
        similarityFactor:{type:GraphQLString},
        url: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        website: {
            type: websiteType,
            args: { url: { type: GraphQLString } },
            resolve(parent, args){
                // code to get data from db / other source
                //similarity=searchURLbyDomain('http://www.nitkl.in').then(res=>{return res})
                return "Abel"
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
