$(document).ready(function() {

    // get all todos listener
    $.getJSON("/api/todos")
    .then(addTodos)
    .catch(function(error) {
        console.log(error);
    });

    // add new todo listener
    $('#todoInput').keypress(function(event) {
        if(event.which == 13) {
            createTodo();
        }
    });

    // delete todo listener
    $('.list').on('click', 'span', function(event) {
        event.stopPropagation();
        removeTodo($(this).parent());

        // $(this).parent()   ---->   this refers to span's parent
    });

    // toggle completed todo listener
    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    });
});

// displaying all todos
function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

// making a todo into a list
function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    
    // jQuery's way to store extra data
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);

    if(todo.completed) {
        newTodo.addClass("done");
    }

    $('.list').append(newTodo);
}

// adding a new todo
function createTodo() {
    var userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo) {
        $('#todoInput').val("");
        addTodo(newTodo);
    })
    .catch(function(error) {
        console.log(error);
    });
}

// removing todo
function removeTodo(todo) {
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then(function(data) {
        todo.remove();
    })
    .catch(function(error) {
        console.log(error);
    })
}

// update todo 
function updateTodo(todo) {
    var clickedId = todo.data('id');
    var updateUrl = '/api/todos/' + clickedId;

    var isDone = !todo.data('completed');
    var updateData = {completed: isDone};

    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo) {
        todo.toggleClass('done');
        todo.data('completed', isDone);;
    })
    .catch(function(error) {
        console.log(error);
    })
}