# GitHub Stitch example: twitter

> Example adding twitter handles to User entity

## Usage

Start a server at [http://localhost:3000](http://localhost:3000)

```
npm start
```

You can use the [GraphiQL app](https://github.com/skevy/graphiql-app) to send
queries. Don’t forget to set the `Authorization` header to `bearer <your token here>`.

Or send a request with `curl`

```bash
curl http://localhost:3000/ \
  -XPOST \
  -H"Authorization: bearer <your token here>" \
  -H"Content-Type: application/json" \
  -d '{"query":"{ viewer { twitter } }"}'
```

Which returns something like this

```json
{"data":{"viewer":{"twitter":"gr2m"}}}
```

## license

[MIT](LICENSE.md)
