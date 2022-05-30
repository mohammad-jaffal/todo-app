$(document).ready(function () {
    // localStorage.clear();


    class Todo {
        constructor(title, description, point) {
            this.id = Math.floor(Math.random() * 1000);
            this.title = title;
            this.description = description;
            this.point = point;
            this.done = false;
        }
    }

    var lists_map = JSON.parse(localStorage.getItem('todoLists'));


    if (!lists_map) {
        console.log("lists_map is empty");
        lists_map = {};
    } else {
        console.log(lists_map);
    }

    



    lists_map[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
    }





    for (var key in lists_map) {

        console.log('populating ' + lists_map[key].title);

        var c = "list-item"
        if(lists_map[key].done)
        c = "list-item-done"


        // $('#lists_container').prepend($(`<div class="list-item" id="list_item">
        //     <h2>${lists_map[key].title} ${lists_map[key].point}</h2>
        //     <p>${lists_map[key].description}</p>
        //     <div class="list-options">
        //         <button id="edit${key}" class="edit-btn"><img src="./assets/icons/edit.png"></button>
        //         <button id="fire${key}" class="fire-btn"><img src="./assets/icons/fire.png"></button>
        //         <button id="done${key}" class="done-btn"><img src="./assets/icons/done.png"></button>
        //     </div>
        // </div>`));

        // document.getElementById(`done`).addEventListener("click", function () {
        //     console.log(`done${key}`)
        // })




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


        var edit_btns = document.getElementsByClassName("edit-btn");
        for (const element of edit_btns) { // You can use `let` instead of `const` if you like
            element.addEventListener("click", function () {
                console.log(element.id)
            })
        }



        var fire_btns = document.getElementsByClassName("fire-btn");
        for (const element of fire_btns) { // You can use `let` instead of `const` if you like
            element.addEventListener("click", function () {
                console.log(lists_map[element.id])
                delete lists_map[element.id]
                localStorage.setItem('todoLists', JSON.stringify(lists_map));
                location.reload()
            })
        }


        var done_btns = document.getElementsByClassName("done-btn");
        for (const element of done_btns) { // You can use `let` instead of `const` if you like
            element.addEventListener("click", function () {
                console.log(element.id)
                $(`#list_item${element.id}`).css("background-color","grey")
                lists_map[element.id].done = true
                localStorage.setItem('todoLists', JSON.stringify(lists_map));
                location.reload()
            })
        }




    }






    $('#add').click(function () {


        var title = $('#title').val();
        var description = $('#description').val();



        if (title == "" || description == "") { }

        else {
            // generating random unique id



            var point = $('#point').val();

            var todo = new Todo(title, description, point);
            var temp_id = todo.id

            lists_map[temp_id] = todo;
            console.log(lists_map)

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
        console.log("reload")

        location.reload()

    });




    // localStorage.clear();

});