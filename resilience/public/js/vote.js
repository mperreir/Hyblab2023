
const colors = [('red', 1), ('orange', 2), ('yellow', 3), ('green', 4), ('blue', 5)];

async function vote() {
    // Get the vote from the database
    let response = await fetch('/resilience/api/vote', {
        method: 'GET',
    });
    let data = await response.json();
    console.log(data);

    let notes;

    let htmlVotes = document.getElementById("votes");

    await data.forEach(async solution => {
        let htmlSolution = document.createElement('div');
        htmlSolution.classList.add('solution');
        htmlSolution.textContent = solution.id;
        
        let htmlVote = document.createElement('div');
        htmlVote.classList.add('vote');
        colors.forEach((color, score) => {
            let note = document.createElement('div');
            note.classList.add('note');
            note.style.backgroundColor = color;
            note.style.color = color;

            note.addEventListener('click', async function () {
                console.log(solution.id, score);
            });

            htmlVote.appendChild(note);
        });
        
        htmlSolution.appendChild(htmlVote);
        htmlVotes.appendChild(htmlSolution);
    });

};







vote();






function map() {
    window.location = "./map.html"
}
