var express = require("express");
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/todos");

router.get("/", helpers.getTodos);

router.post("/", helpers.createTodo);

router.get("/:todoId", helpers.getTodo);

router.put("/:todoId", helpers.updateTodo);

router.delete("/:todoId", helpers.deleteTodo);

// shorthand

/* 
    router.route('/')
        .get(helpers.getTodos)
        .post(helpers.createTodo)

    router.route('/:todoId')
        .get(helpers.getTodo)
        .put(helpers.updateTodo)
        .delete(helpers.deleteTodo)
*/

module.exports = router;