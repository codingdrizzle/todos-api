const express = require('express')
const Todos = require('./schema/todo')

const router = express.Router()

// Get all todos - route
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todos.find()
        res.json(todos)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Get a specific todo with an ID - route
router.get('/todos/:id', getTodosID, (req, res) => {
    res.status(200).json(res.todo)
})

// Post a new todo - route
router.post('/todos', async (req, res) => {
    const todo = new Todos({
        task: req.body.task,
        done: req.body.done 
    })

    try {
        const newTodo = await todo.save()
        res.status(201).json(newTodo)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// Patch or Update a todo with its ID - route
router.patch('/todos/:id', getTodosID, async (req, res) => {
    if(req.body.task != null){
        res.todo.task = req.body.task
    }
    if(req.body.done != null){
        res.todo.done = req.body.done
    }

    try {
        const updatedTodo = await res.todo.save()
        res.status(200).json(updatedTodo)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
} )

// Delete a todo with its ID - route
router.delete('/todos/:id', getTodosID, async (req, res) => {
    try {
        console.log(res.todo)
        await res.todo.remove()
        res.status(200).json({ message: `Successfully deleted task: ${res.todo}`})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
} )



// create middleware for any request that require a Todo ID
async function getTodosID(req, res, next){
    let todo
    try {
        todo = await Todos.findById(req.params.id)
        if(!todo){
            return res.status(404).json({message: "TODO NOT FOUND"})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }

    // create a todo variable on the res obj
    res.todo = todo

    next()
}


module.exports = router