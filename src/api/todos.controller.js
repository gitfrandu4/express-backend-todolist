const model = require("./todos.model.js");

module.exports = {
	getAll,
	getTodo,
	createTodo,
	removeTodo,
	modifyTodo,
};

function getAll(req, res) {
	return model
		.find()
		.then((results) => {
			return res.json(results);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
}

function getTodo(req, res) {
	return model
		.findOne({ _id: req.params.id })
		.then((results) => {
			return res.json(results);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
}

function createTodo(req, res) {
	// Opción 1:
	// const todo = new model({
	//     title: "Nueva tarea"
	// })
	// todo.save().then(//....// )

	// Opción 2:
	return model
		.create(req.body)
		.then((results) => {
			return results.json(results);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
}

function removeTodo(req, res) {
	return model
		.findByIdAndRemove(req.params.id)
		.then((results) => {
			return res.json(results);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
}

function modifyTodo(req, res) {
	return model
		.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((results) => {
			return res.json(results);
		})
		.catch((err) => {
			return res.status(500).json(err);
		});
}
