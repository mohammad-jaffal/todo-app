$(document).ready(function () {
    // localStorage.clear();
    
    class Todo {
        constructor(title, description, point) {
          this.title = title;
          this.description = description;
          this.point = point;
        }
      }



    var lists_map = JSON.parse(localStorage.getItem('todoLists'));
 

    if(!lists_map){
        console.log("lists_map is empty");
        lists_map = {};
    }else{
        console.log(lists_map);
    }
    

    // for (var key in lists_map) {
    
    //     console.log('populating '+ lists_map[key].title);

    //     $('#lists_container').prepend($(`<div class="list-item" id="list_item">
    //         <h2>${lists_map[key].title} ${lists_map[key].point}</h2>
    //         <p>${lists_map[key].description}</p>
    //         <div class="list-options">
    //             <button id="edit" class="edit-btn"><img src="./assets/icons/edit.png"></button>
    //             <button id="fire" class="fire-btn"><img src="./assets/icons/fire.png"></button>
    //             <button id="done" class="done-btn"><img src="./assets/icons/done.png"></button>
    //         </div>
    //     </div>`));
        
    // }
            
    


    $('#add').click(function () {

        
        var title = $('#title').val();
        var description = $('#description').val();



        if (title == "" || description == "") { }

        else {
            // generating random unique id
            var id = Math.floor(Math.random() * 1000);
            while(lists_map[id.toString()]){
                id = Math.floor(Math.random() * 1000);
            }
            
            
            var point = $('#point').val();

            var todo = new Todo(title, description, point);

            lists_map[id.toString()] = todo;

            localStorage.setItem('todoLists', JSON.stringify(lists_map));




            $('#lists_container').prepend($(`<div class="list-item" id="list_item">
            <h2>${lists_map[id.toString()].title} ${lists_map[id.toString()].point}</h2>
            <p>${lists_map[id.toString()].description}</p>
            <div class="list-options">
                <button id="edit" class="edit-btn"><img src="./assets/icons/edit.png"></button>
                <button id="fire" class="fire-btn"><img src="./assets/icons/fire.png"></button>
                <button id="done" class="done-btn"><img src="./assets/icons/done.png"></button>
            </div>
        </div>`));

        
            

            







        }

    });






    // localStorage.clear();

});