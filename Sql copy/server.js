import knex from "knex" 


const options = {
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "desafio_sql"
    }
}
const KnexService = knex(options)

// Crear table

// KnexService.schema.createTable("books", (table) => {
//           table.increments("id")
//           table.string("title")
//           table.string("author")
//           table.integer("year")
// })
// .then(a =>console.log({a}))
// .catch(e=>console.log({e}))

// INSERTAR 

//  KnexService
//  .from("books")
//  .insert({title: "prueba", author: "martinet", year:"2022"})
//  .then(id => console.log(`insertado id: ${id[0]}`))
//  .catch(e => console.log({e}))

// ACTUALIZAR O CAMBIAR DATO

// KnexService
// .from("books")
// .where(({year: "2022"}))
// .update({year: 2021})

// BUSCAR, CONSULTAR

// const mostrar = () => {
//  KnexService
//  .from("books")
//  .select("title", "year")
//  .then(lista => lista.forEach(element => {
//      console.log(element)
//  }))
//  .then(a => console.log("--"))
// }
// mostrar()

// ELIMINAR

// KnexService
//  .from("books")
//  .where( {year: 2021})
//  .del()
//  .then(a =>{ console.log("eliminado", a)
//       mostrar()})
// .catch(e=> console.log({e}))



