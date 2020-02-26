const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLSchema,
     GraphQLObjectType,
      GraphQLString,
        GraphQLID,
        GraphQLInt,
        GraphQLList
    } = graphql

var books = [
    {name: "treasure island", genre:'Fantasy', id:'1', authorId: "1"},
    {name: "Huck finn", genre:'Fantasy', id:'2', authorId: "2"},
    {name: "Moby Dick", genre:'Fantasy', id:'3', authorId: "3"},
    {name: "The Giver", genre:'Fantasy', id:'4', authorId: "2"},
    {name: "Cat in the Hat", genre:'Fantasy', id:'5', authorId: "3"},
]

var authors = [
    {name:"bud billiken", age: 69, id: "1"},
    {name:"Jack Frost", age: 72, id: "2"},
    {name:"Seymour Butts", age: 21, id: "3"}
]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () =>({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args){
                console.log(parent)
                return _.find(authors, {id:parent.authorId})
            }
        }

    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () =>({
        id: {type: GraphQLID },
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList (BookType),
            resolve(parent,args){
                return _.filter(books, {authorId: parent.id})
            }
        }

    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args:{ id: {type: GraphQLID}},
            resolve(parent, args){
                //code to get data from db/ other source
                return _.find(books,{id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id:{type: GraphQLID }},
            resolve(parent, args){
                return _.find(authors,{id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return  books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return  authors
            }
        }
    } 
})

module.exports = new GraphQLSchema({
    query: RootQuery
})