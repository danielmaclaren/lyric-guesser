let count = 1;

function addSet() {  
    let set = count;
    let weight = document.getElementById("weight").value;
    let reps = document.getElementById("reps").value;

    document.getElementById("setrow").innerHTML += `
                <tr>
                    <td>${set}</td>
                    <td>${weight}</td>
                    <td>${reps}</td>
                </tr> `;
    
    count++;
}