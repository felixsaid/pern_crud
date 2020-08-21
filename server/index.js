const express = require("express");
const pool = require("./db");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // -> allows us to use req.body

//ROUTES//

//get all todos

app.get("/v2/api/todo", async (req, res) => {
  try {
    const get_all_todo = await pool.query("SELECT * FROM todo");
    res.json(get_all_todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get todos by id

app.get("/v2/api/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo_by_id = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
      [id]
    );

    const res_todos_id = todo_by_id.rows[0];

    res.json(res_todos_id);
  } catch (err) {
    console.error(err.message);
  }
});

//create todos

app.post("/v2/api/todo", async (req, res) => {
  try {
    const { description } = req.body;

    const create_todo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json(create_todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update todos

app.put("/v2/api/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const update_todo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete todos

app.delete("/v2/api/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const update_todo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );

    res.json("successfully deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5001, () => {
  console.log("Server is listening to port 5001");
});
