$(document).ready(function () {
    // localStorage.clear();


    class Todo {
        constructor(title, description, point) {
            this.id = Math.floor(Math.random() * 1000000);
            this.title = title;
            this.description = description;
            this.point = point;
            this.done = false;
        }
    }


    // get todos from local storge
    var lists_map = JSON.parse(localStorage.getItem('todoLists'));
    if (!lists_map) {
        lists_map = {};
    } 







// sort keys according to points 
    var lists_keys = Object.keys(lists_map)

    var lists_points = {}

    for (var i = 0; i < lists_keys.length; i++) {
        lists_points[lists_keys[i]] = lists_map[lists_keys[i]]['point']
    }



    lists_keys.sort(function (x, y) {
        return lists_points[x] - lists_points[y];
    });








    // creating todos
    for (var j = 0; j < lists_keys.length; j++) {
        var key = lists_keys[j]


        var c = "list-item"
        if (lists_map[key].done)
            c = "list-item-done"

        const card = document.createElement('div');
        card.id = `list_item${key}`;
        card.className = `${c}`
        card.innerHTML = `<h2>title: ${lists_map[key].title}</h2><h2>point: ${lists_map[key].point}</h2>
            <p>description: ${lists_map[key].description}</p>
            <div class="list-options">
                <button id="${key}" class="edit-btn"><img src="./assets/icons/edit.png"></button>
                <button id="${key}" class="fire-btn"><img src="./assets/icons/fire.png"></button>
                <button id="${key}" class="done-btn"><img src="./assets/icons/done.png"></button>
            </div>`;


        $('#lists_container').prepend(card);


        var edit_btns = $(".edit-btn");
        for (const element of edit_btns) {
            element.addEventListener("click", function () {
                localStorage.setItem("id_to_edit", element.id)
                $(".edit-container").css("display", "flex");
            })
        }



        var fire_btns = $(".fire-btn");
        for (const element of fire_btns) {
            element.addEventListener("click", function () {
                delete lists_map[element.id]
                localStorage.setItem('todoLists', JSON.stringify(lists_map));
                location.reload()
            })
        }


        var done_btns = $(".done-btn");
        for (const element of done_btns) { 
            element.addEventListener("click", function () {
                $(`#list_item${element.id}`).css("background-color", "grey")
                lists_map[element.id].done = true
                localStorage.setItem('todoLists', JSON.stringify(lists_map));
                location.reload()
            })
        }
    }



    // submit edit for a todo
    $('#submit_edit').click(function () {

        if ($('#edit_title').val() == '' || $('#edit_description').val() == '') {
            alert('fill all')
        }
        else {
            var id_to_edit = localStorage.getItem("id_to_edit")
            lists_map[id_to_edit].title = $('#edit_title').val()
            lists_map[id_to_edit].description = $('#edit_description').val()
            lists_map[id_to_edit].point = $('#edit_point').val()
            localStorage.setItem('todoLists', JSON.stringify(lists_map));
            location.reload()
        }
    })




    // add a todo
    $('#add').click(function () {

        var title = $('#title').val();
        var description = $('#description').val();

        if (title == "" || description == "") {
            alert("fill all")
        }

        else {
            // generating random unique id

            var point = $('#point').val();

            var todo = new Todo(title, description, point);
            var temp_id = todo.id

            lists_map[temp_id] = todo;
            localStorage.setItem('todoLists', JSON.stringify(lists_map));


            $('#lists_container').prepend($(`<div class="list-item" id="list_item">
            <h2>title: ${lists_map[temp_id.toString()].title}</h2><h2>point: ${lists_map[temp_id.toString()].point}</h2>
            <p>description: ${lists_map[temp_id.toString()].description}</p>
            <div class="list-options">
                <button id="edit_${temp_id}" class="edit-btn"><img src="./assets/icons/edit.png"></button>
                <button id="fire_${temp_id}" class="fire-btn"><img src="./assets/icons/fire.png"></button>
                <button id="done_${temp_id}" class="done-btn"><img src="./assets/icons/done.png"></button>
            </div>
        </div>`));



        }

        location.reload()

    });


    // localStorage.clear();

});