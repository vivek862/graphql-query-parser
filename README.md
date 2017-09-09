# Keeping graphQL query  in a different file and injecting it where necessary. 

# graphql-query-parser

> Library for parsing graphql queries kept in json format to proper format required by apollo client

## Install

`npm i graphql-query-parser --save`

## Queries

### A simple query looks like the following 

getAllUsers: {
    'getUsers' :{
        result:`id
				name`
    }
}

### Usage

import queryParser from "graphql-query-parser";

queryParser(query,type);

### When used in actions in conjugation with apollo client it looks like following 
```
import queryParser from "graphql-query-parser";

const query = queryParser(queries.getAllUsers,"query");

query(query).then(result=>{
	console.log(result);
})

```

### Query with params
```
getSpecificUsers: {
    'getUsers' :{
        result:`id
				name`
    }
}
```

### When used in actions in conjugation with apollo client it looks like following 
```

import queryParser from "graphql-query-parser";

//add a variables object to the main query object
queries.getSpecificUsers.variables = {name:"%viv%"}
const query = queryParser(queries.getSpecificUsers,"query");
//console.log(query) => getUsers(name:'%viv%'){
							id
							name
						}

query(query).then(result=>{
	console.log(result);
})

```

### Let say we want the following kind of query formed 
```
query {
    list: items (search: "Test", limit: 10, inTrash: true, labels: [1,2,4]) {
        countAll
        data {
            id
            firstName
        }
    }
}
```

### Then in json we have to have queries like the following

```
getItemList: {
    'items' :{
        result:`countAll
        		data {
            		id
            		firstName
        		}`
    }
}
```
### And action code will be following

```
let filter = {
    search: "Test",
    limit: 10,
    inTrash: true,
    labels: [1, 2, 4]
};
//add a variables object to the main query object
queries.getItemList.variables = filter
const query = queryParser(queries.getItemList,"query");

query(query).then(result=>{
	console.log(result);
})
```

### Multiple queries
```
query {
    users {
        id
    }
    items {
        id
        name
    }
}
```
```typescript
client.query({
    users: {
        result: 'id'
    },
    items: {
        result: `
        id
        name`
    }
});
```

## Mutations

> Mutations using pattern: nameMutation(input: {}) ...

### Simple mutation
```
mutation {
    addUser (input: {firstName: "Ales", lastName: "Dostal"}) {
        id
    }
}
```
```typescript
client.mutation({
    addUser: {
        variables: {firstName: "Ales", lastName: "Dostal"},
        result: 'id'
    }
});
```

### Complex mutation
> As complex query. Difference between query is: `client.query(...)` to `client.mutation(....)`

## Token and headers customize

### Add token to http header
```typescript
let client = api({
    url: 'http://localhost:4000/graphql',
    headers: {
        Authorization: 'Bearer xxxx',
    }
});
```

### Customize http header
```typescript
let client = api({
    url: 'http://localhost:4000/graphql',
    headers: {
        Authorization: 'Bearer xxxx',
        ClientType: 'web',
        ...
    }
});
```
