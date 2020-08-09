const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var websites = [
    { name: 'SBI', url: 'https://www.onlinesbi.com', id: '1' },
    { name: 'MY GOV', url: 'https://www.mygov.in', id: '2' },
    { name: 'GITHUB', url: 'https://github.com', id: '3' },
];

const websiteType = new GraphQLObjectType({
    name: 'website',
    fields: ( ) => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
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
                return _.find(websites, { url: args.url });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
