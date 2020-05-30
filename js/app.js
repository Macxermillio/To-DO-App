//varriables
const addBtn = document.getElementById('addBtn'),
      taskfield = document.getElementById('box1'),
      fstTask  =  document.getElementById('fstTask'),
      progTask = document.getElementById('inpTask'),
      c = document.getElementById('d'),
      world = document.getElementById('center-cont'),
      completed =document.getElementById('compTask');

      const taskd = document.getElementsByClassName('task1');    
      //const editde = inputf();





//listeners

listeners();

function listeners() {

    addBtn.addEventListener('click', addTask)
    document.addEventListener('DOMContentLoaded', localStorageLoad);
    document.addEventListener('DOMContentLoaded', progLocalStorageLoad);
    document.addEventListener('DOMContentLoaded', comLocalStorageLoad);
    c.addEventListener('click', comDeleteChild);
    
}



//functions

function addTask(e) {

    e.preventDefault();
    
    const formFill = document.createElement('div');
    formFill.innerHTML = `
    <div id="card">
            <h1>What You Wanna Do?</h1>
            <form action="">
                <div id="one">
                    <label for="title">Activity:</label>
                    <input type="text" id="title" value="">
                    <span style="color: red; display: none; font-family:monospace;" id="warning">Fill in the text field above! </span>
                </div>
                <div id="two">
                    <label for="description">Description:</label>
                    <textarea id="description"> </textarea>
                </div>
            
                <button type="submit" id="save">Save</button>
                <a id="cancel">Cancel</a>
            </form>
        </div>
    
    `;

    fstTask.appendChild(formFill);

    formLive();
    




}

function formLive() {

    const save = document.getElementById('save');
         
    const cancel = document.getElementById('cancel');

    save.addEventListener('click', store );

    cancel.addEventListener('click', removeCard)

   

    


}

function removeCard(e) {

   e.target.parentElement.parentElement.remove() ;
    
}

function store(e) {
    e.preventDefault();
   const  task = document.getElementById('title'),
          warning = document.getElementById('warning')
          details = document.getElementById('description');
    //console.log( task.value);
    //console.log(details.value);
        if(task.value.length > 0){

            const TaskInfo = {
                name: task.value,
                nature: details.value,
                created: timeNow
            }
            
            display(TaskInfo);
            addToStorage(TaskInfo);
            e.target.parentElement.parentElement.remove();

            }else {
                
            warning.style.display = "block";
        }
    
    
    
}

function display(info) {
    let postTask = document.createElement('div');

    postTask.innerHTML = `
    <div  class="task1">
        <div  id="flex">
            <div   id="text">
                <li class="real"  >${info.name}</li>
            </div>
            <img class="move" src="images/photo-symbol-to-share-with-right-arrow.svg">
            <div class="delt">x</div>
        </div>
        <div style="display:none;" id="dits">
            <h4>Description:</h4>
            <p style="display:block; width: 80%;"  >${info.nature}</p>
            <textarea style="display:none;" id="fedit"  >${info.nature}</textarea>
            <p>Created: ${info.created}</p>
            <a  style="display:block;" class="edit">edit</a>
            <a  style="display:none;" class="save">save</a>
            
        </div>
        
        
    </div>
    
    `;
   fstTask.appendChild(postTask);
   

    
}


//adds events listener to the tasks cards, also includes those functions
//Live();


    Live();


function Live() {
    

    
     fstTask.addEventListener("click", function(e){

        let taskb; 
        // this deletes the card
        if(e.target.classList.contains('delt')){
            
            taskb = e.target.parentElement.firstChild.nextElementSibling.innerText;
            e.target.parentElement.parentElement.remove();
        }
        //this moves it
        if(e.target.classList.contains('move')) {

            const  fbody  = e.target.parentElement.parentElement;
            const    ftask = fbody.children[0].children[0].children[0].innerText;
            const       fdetails = fbody.children[1].children[1].innerText;
            const   ftime = fbody.children[1].children[3].innerText;
                
                   
  
           const TaskInfo = {
                     name: ftask,
                      nature: fdetails,
                      created: ftime
                }
  
               progDisplay(TaskInfo);
                 progAddToStorage(TaskInfo);
                console.log(TaskInfo);
                removeLS(ftask);
            e.target.parentElement.parentElement.remove();
        }
        //this shows the details of the task
        if(e.target.classList.contains('real')){

            const body = e.target.parentElement.parentElement.parentElement.children[1];
           if(body.style.display == "none"){
            body.style.display = "block";
           } else{
            body.style.display = "none";

           };
           console.log('y');

            

        };
        
        //this one engenders edits
        if(e.target.classList.contains('edit')){
            e.target.style.display = 'none';
            e.target.nextElementSibling.style.display = "block";
            e.target.previousElementSibling.previousElementSibling.style.display = "block";
            e.target.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "none";

        }

        if(e.target.classList.contains('save')) {

            const taskName = e.target.parentElement.previousElementSibling.firstChild.nextElementSibling.firstChild.nextElementSibling.innerHTML;
           const taskDescription = e.target.previousElementSibling.previousElementSibling.previousElementSibling.value;

           const theEdit = {
               name: taskName,
               nature: taskDescription,
               created: e.target.previousElementSibling.previousElementSibling.innerHTML
           }
           
           console.log(taskDescription);
           
           deleteChild();
           editLS(theEdit);
           
        }

       // console.log(taskb);
        removeLS(taskb);
     });
}



function addToStorage(Info) {
    //console.log(Info);

    let task = getFromSTorage();

    task.push(Info);

    localStorage.setItem('tasks', JSON.stringify( task ));


    
}

function getFromSTorage(){

    let NewTask;
    const storage = localStorage.getItem('tasks');

    if(storage === null){
        NewTask = [];
        //console.log(NewTask);
    } else {
       NewTask = JSON.parse(storage);
    }

return NewTask;

}

function localStorageLoad(){
    let content = getFromSTorage();

    


    content.forEach ( function(i){

        let postTask = document.createElement('div');

        postTask.innerHTML = `
        <div class="task1">
        <div  id="flex">
            <div  id="text">
                <li class="real" >${i.name}</li>
            </div>
            <img class="move" src="images/photo-symbol-to-share-with-right-arrow.svg">
            <div class="delt">x</div>
        </div>
        <div style="display:none;" id="dits">
            <h4>Description:</h4>
            <p style="display:block; width: 80%;" >${i.nature}</p>
            <textarea style="display:none;" id="fedit"  >${i.nature}</textarea>
            <p>Created: ${i.created}</p>
            <a  style="display:block;" class="edit">edit</a>
            <a  style="display:none;" class="save">save</a>
        </div>
        
        
    </div>
        `;
       fstTask.appendChild(postTask);
        
        
        
       
    }) 

   //Live();
}



function removeLS(task){

    let content = getFromSTorage();
    //console.log(content)
    const delt = task;

    //console.log(delt);
   
    
content.forEach(function (Ls, index){
      
    if(Ls.name == delt) {
        content.splice(index, 1);
    }
})

localStorage.setItem('tasks', JSON.stringify(content));
}

function editLS(edit){

    let content = getFromSTorage();
    //console.log(content)
    const delt = edit;

    //console.log(delt);
   
    
content.forEach(function (ls, index){
      
    if(ls.name == delt.name) {
      
        content[index] = delt;
    }
})

localStorage.setItem('tasks', JSON.stringify(content));
localStorageLoad();
}

function deleteChild() { 
     
    
    //e.firstElementChild can be used. 
    let child = fstTask.lastElementChild;  
    while (child) { 
        fstTask.removeChild(child); 
        child = fstTask.lastElementChild; 
    } 
} 
//progressive field adding etc

function progDisplay(info) {
    let postTask = document.createElement('div');

    postTask.innerHTML = `
    <div  class="task1">
        <div  id="flex">
            <div   id="text">
                <li class="real"  >${info.name}</li>
            </div>
            <img class="move" src="images/photo-symbol-to-share-with-right-arrow.svg">
            <div class="delt">x</div>
        </div>
        <div style="display:none;" id="dits">
            <h4>Description:</h4>
            <p style="display:block; width: 80%;"  >${info.nature}</p>
            <textarea style="display:none;" id="fedit"  >${info.nature}</textarea>
            <p>${info.created}</p>
            <a  style="display:block;" class="edit">edit</a>
            <a  style="display:none;" class="save">save</a>
            
        </div>
        
        
    </div>
    
    `;
   progTask.appendChild(postTask);
   

    
}

function progAddToStorage(Info) {
    //console.log(Info);

    let task = progGetFromSTorage();

    task.push(Info);

    localStorage.setItem('prog', JSON.stringify( task ));


    
}

function progGetFromSTorage(){

    let NewTask;
    const storage = localStorage.getItem('prog');

    if(storage === null){
        NewTask = [];
        //console.log(NewTask);
    } else {
       NewTask = JSON.parse(storage);
    }

return NewTask;

}

function progLocalStorageLoad(){
    let content = progGetFromSTorage();

    


    content.forEach ( function(i){

        let postTask = document.createElement('div');

        postTask.innerHTML = `
        <div class="task1">
        <div  id="flex">
            <div  id="text">
                <li class="real" >${i.name}</li>
            </div>
            <img class="move" src="images/photo-symbol-to-share-with-right-arrow.svg">
            <div class="delt">x</div>
        </div>
        <div style="display:none;" id="dits">
            <h4>Description:</h4>
            <p style="display:block; width: 80%;" >${i.nature}</p>
            <textarea style="display:none;" id="fedit"  >${i.nature}</textarea>
            <p>${i.created}<p/>
            <a  style="display:block;" class="edit">edit</a>
            <a  style="display:none;" class="save">save</a>
        </div>
        
        
    </div>
        `;
       progTask.appendChild(postTask);
        
})

localStorage.setItem('prog', JSON.stringify(content));
}

function progDeleteChild() { 
     
    
    //e.firstElementChild can be used. 
    let child = fstTask.lastElementChild;  
    while (child) { 
        fstTask.removeChild(child); 
        child = fstTask.lastElementChild; 
    } 
} 

progLive();

function progLive() {
    

    
    progTask.addEventListener("click", function(e){

       let taskb; 
       // this deletes the card
       if(e.target.classList.contains('delt')){
           
           taskb = e.target.parentElement.firstChild.nextElementSibling.innerText;
           e.target.parentElement.parentElement.remove();
       }
       //this moves it
       if(e.target.classList.contains('move')) {

           const  fbody  = e.target.parentElement.parentElement;
           const    ftask = fbody.children[0].children[0].children[0].innerText;
           const       fdetails = fbody.children[1].children[1].innerText;
               
                  
 
          const TaskInfo = {
                    name: ftask,
                    nature: fdetails,
                    created: fbody.children[1].children[3].innerText


               }
               console.log(TaskInfo)
              comDisplay(TaskInfo);
               comAddToStorage(TaskInfo);
               progRemoveLS(ftask);
               fbody.remove();
           //e.target.parentElement.parentElement.
       }
       //this shows the details of the task
       if(e.target.classList.contains('real')){

           const body = e.target.parentElement.parentElement.parentElement.children[1];
          if(body.style.display == "none"){
           body.style.display = "block";
          } else{
           body.style.display = "none";

          };
          console.log('y');

           

       };
       
       //this one engenders edits
       if(e.target.classList.contains('edit')){
           console.log(e.target.parentElement.previousElementSibling.previousElementSibling);
           e.target.style.display = 'none';
           e.target.nextElementSibling.style.display = "block";
           e.target.parentElement.previousElementSibling.previousElementSibling.style.display = "block";
           e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.style.display = "none"

       }

       if(e.target.classList.contains('save')) {

  console.log(e.target.parentElement.previousElementSibling.innerHTML)
          const taskName = e.target.parentElement.parentElement.previousElementSibling.firstChild.nextElementSibling.firstChild.nextElementSibling.innerHTML;
          const taskDescription = e.target.parentElement.previousElementSibling.previousElementSibling.value;

          const theEdit = {
              name: taskName,
             nature: taskDescription,
            created: e.target.parentElement.previousElementSibling.innerHTML
          }
          
          console.log(theEdit);
          
          progDeleteChild();
          progEditLS(theEdit);
       }

      // console.log(taskb);
       progRemoveLS(taskb);
    });
}

function progEditLS(edit){

    let content = progGetFromSTorage();
    //console.log(content)
    const delt = edit;

    //console.log(delt);
   
    
content.forEach(function (ls, index){
      
    if(ls.name == delt.name) {
      
        content[index] = delt;
    }
})

localStorage.setItem('prog', JSON.stringify(content));
progLocalStorageLoad();
}

function progDeleteChild() { 
     
    
    //e.firstElementChild can be used. 
    let child = progTask.lastElementChild;  
    while (child) { 
        progTask.removeChild(child); 
        child = progTask.lastElementChild; 
    } 
} 


function progRemoveLS(task){

    let content = progGetFromSTorage();
    //console.log(content)
    const delt = task;

    //console.log(delt);
   
    
content.forEach(function (Ls, index){
      
    if(Ls.name == delt) {
        content.splice(index, 1);
    }
})

localStorage.setItem('prog', JSON.stringify(content));
}


let time = new Date();
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let days = ['0','Mon','Tue', 'Wed', 'Thu','Fri','Sat','Sun'];
month = time.getMonth();
realMonth = months[month];
day = days[time.getDay()];
date = time.getDate();
hour = time.getHours();
minutes = time.getMinutes();

timeNow = `${hour}:${minutes} ${realMonth} ${date}`;

console.log(timeNow);

function comDisplay(info){
    let postTask = document.createElement('div');

    postTask.innerHTML = `
    <div  class="task1">
        <div  id="flex">
            <div   id="text">
                <li class="real"  >${info.name}</li>
            </div>
            <img class="move" src="images/photo-symbol-to-share-with-right-arrow.svg">
            <div class="delt">x</div>
        </div>
        <div style="display:none;" id="dits">
            <h4>Description:</h4>
            <p style="display:block; width: 80%;"  >${info.nature}</p>
           
            <p>${info.created}</p>
           
            
        </div>
        
        
    </div>
    
    `;
   completed.appendChild(postTask);

}


function comAddToStorage(Info) {
    //console.log(Info);

    let task = comGetFromSTorage();

    task.push(Info);

    localStorage.setItem('com', JSON.stringify( task ));


    
}

function comGetFromSTorage(){

    let NewTask;
    const storage = localStorage.getItem('com');

    if(storage === null){
        NewTask = [];
        //console.log(NewTask);
    } else {
       NewTask = JSON.parse(storage);
    }

return NewTask;

}

function comLocalStorageLoad(){
    let content = comGetFromSTorage();

    


    content.forEach ( function(i){

        let postTask = document.createElement('div');

        postTask.innerHTML = `
        <div class="task1">
        <div  id="flex">
            <div  id="text">
                <li class="real" >${i.name}</li>
            </div>
            <img class="move" src="images/photo-symbol-to-share-with-right-arrow.svg">
            <div class="delt">x</div>
        </div>
        <div style="display:none;" id="dits">
            <h4>Description:</h4>
            <p style="display:block; width: 80%;" >${i.nature}</p>
            
            <p>${i.created}<p/>
            
        </div>
        
        
    </div>
        `;
       completed.appendChild(postTask);
        
})

localStorage.setItem('com', JSON.stringify(content));
}

comLive();
function comLive(){

   

    completed.addEventListener('click', function(e){

        if(e.target.classList.contains('delt')){
            let taskb = e.target.parentElement.firstChild.nextElementSibling.innerText;
            e.target.parentElement.parentElement.remove();
            
            comRemoveLS(taskb);
        }

        if(e.target.classList.contains('real')){

            const body = e.target.parentElement.parentElement.parentElement.children[1];
           if(body.style.display == "none"){
            body.style.display = "block";
           } else{
            body.style.display = "none";
 
           };
           console.log('y');
 
            
 
        };

        

    })

}

function comRemoveLS(task){

    let content = comGetFromSTorage();
    //console.log(content)
    const delt = task;

    //console.log(delt);
   
    
content.forEach(function (Ls, index){
      
    if(Ls.name == delt) {
        content.splice(index, 1);
    }
})

localStorage.setItem('com', JSON.stringify(content));
}

function comDeleteChild() { 
     
    
    //e.firstElementChild can be used. 
    let child = completed.lastElementChild;  
    while (child) { 
        completed.removeChild(child); 
        child = completed.lastElementChild; 
    } 

    clear();
    
} 

function clear() {
    let content = comGetFromSTorage();

    for( let i = 0; i <= content.length; i++ ){
        content.shift();
        localStorage.setItem('com', JSON.stringify(content));
    }
     
} 
