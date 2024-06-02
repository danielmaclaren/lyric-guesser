let exercisecount = 1;
let currentset = { value: 1 };
let currenttable = { value: 0};
let dict = {};


function addSet(tablenumber) {
    if (currenttable.value != tablenumber) {
        if (dict[tablenumber] == undefined) {
            currentset.value = 1;
            currenttable.value = tablenumber;
            dict[tablenumber] = currentset.value;
        } else {
            currentset.value = dict[tablenumber];
        }
    } else {
        currentset.value = dict[tablenumber];
    }
    
    let weight = document.getElementById("weight"+ tablenumber).value;
    let reps = document.getElementById("reps" + tablenumber).value;
    
    document.getElementById("setrow" + tablenumber).innerHTML += `
                <tr id="exerciserow${tablenumber}${currentset.value}">
                    <td id="set${currentset.value}">${currentset.value}</td>
                    <td>${weight}</td>
                    <td>${reps}</td>
                    <td><input class="btn btn-primary btn-sm" type="button" value="Remove Set" + onclick="removeSet(${tablenumber}${currentset.value}, ${tablenumber})" id="removeset${tablenumber}${currentset.value}"></td>
                </tr> `;
                
    currentset.value++;
    dict[tablenumber] = currentset.value;
}

function removeSet(tablenumber, updatecurrentset) {
    document.getElementById("exerciserow" + tablenumber).remove();
    currentset.value--;
    dict[updatecurrentset] = currentset.value;
}

function addExercise() {

    let exercisetitle = document.getElementById("exercisetitle").value;

    document.getElementById("settable").innerHTML += `
    <table id="setexercise${exercisecount}" class="table table-hover">
        <thead>
            <input type="hidden" name="exercisenumber${exercisecount}" id="exercisenumber${exercisecount}" value="${exercisecount}">
            <h3>${exercisetitle}</h3>
            <tr>
                <th>Set</th>
                <th>Weight</th>
                <th>Reps</th>
            </tr>
        </thead>
        <tbody id="setrow${exercisecount}">    
        </tbody>
        <tfooter>
            <tr>
                <td></td>
                <td><input type="text" name="weight" id="weight${exercisecount}"></td>
                <td><input type="text" name="reps" id="reps${exercisecount}"></td>
                <td><input class="btn btn-primary btn-sm" type="button" value="Add Set" onclick="addSet(${exercisecount});  addSetClicked(${exercisecount});" id="addset${exercisecount}"></td>
            </tr>
        </tfooter>
    </table>
    `;
    exercisecount ++;
}

function clearText() {
    let exercisetitle = document.getElementById("exercisetitle");
    exercisetitle.value = '';
}

function addExerciseClicked() {
    let exercisetitle = document.getElementById("exercisetitle").value;

    fetch('/addexerciseclick', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ exercisetitle: exercisetitle })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function addSetClicked(exercisecount) {
    let weight = document.getElementById(`weight${exercisecount}`).value;
    let reps = document.getElementById(`reps${exercisecount}`).value;

    var workoutObj = {
        weight: weight,
        reps: reps
    };
    fetch('/addsetclick', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ workoutObj: workoutObj })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}