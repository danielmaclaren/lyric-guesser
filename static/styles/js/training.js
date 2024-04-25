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
                    <td><input type="button" value="Remove Set" + onclick="removeSet(${tablenumber}${currentset.value}, ${tablenumber})" id="removeset${tablenumber}${currentset.value}"></td>
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
    document.getElementById("settable").innerHTML += `
    <table id="setexercise${exercisecount}" class="table table-hover">
        <thead>
            <input type="hidden" name="exercisenumber" id="exercisenumber" value="${exercisecount}">
            <h2>*Exercise*</h2>
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
                <td><input type="button" value="Add Set" + onclick="addSet(${exercisecount})" id="addset${exercisecount}"></td>
            </tr>
        </tfooter>
    </table>
    `;
    exercisecount ++;
}