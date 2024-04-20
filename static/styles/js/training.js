let exercisecount = 1;
let set = { value: 1 };
let table = { value: 0};
let dict = {};


function addSet(tablenumber) {
    if (table.value != tablenumber) {
        if (dict[tablenumber] == undefined) {
            set.value = 1;
            table.value = tablenumber;
            dict[tablenumber] = set.value;
        } else {
            set.value = dict[tablenumber];
        }
    } else {
        set.value = dict[tablenumber];
    }
    
    

    let weight = document.getElementById("weight"+ tablenumber).value;
    let reps = document.getElementById("reps" + tablenumber).value;

    document.getElementById("setrow" + tablenumber).innerHTML += `
                <tr>
                    <td id="set${set.value}">${set.value}</td>
                    <td>${weight}</td>
                    <td>${reps}</td>
                </tr> `;
    set.value++;
    dict[tablenumber] = set.value;
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