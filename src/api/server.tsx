import { createServer, Model } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      todo: Model,
    },

    routes() {
      this.get("api/todos", (schema) => {
        return schema.all('todo')
      });
      this.post("api/todos", (schema, request) => {
        let payload = JSON.parse(request.requestBody)
        return schema.create('todo', payload)
      });

      this.post("api/updateTodo", (schema, request) => {
        
        let payload = JSON.parse(request.requestBody)
        let currentTodo = schema.find('todo',payload.id)
        return currentTodo?.update(payload)
      });
    },
  })

  return server
}