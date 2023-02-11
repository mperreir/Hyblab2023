
const colors = [('red', 1), ('orange', 2), ('yellow', 3), ('green', 4), ('blue', 5)];

async function vote() {
    // Get the description of the vote
    let description = await fetch('/resilience/data/vote.json');
    description = await description.json();

    // Get the vote from the database
    let response = await fetch('/resilience/api/vote', {
        method: 'GET',
    });
    let data = await response.json();
    console.log(data);

    let notes = {};

    let htmlVotes = document.getElementById("votes");

    for (const solution of data) {
        let htmlSolution = document.createElement('div');
        htmlSolution.classList.add('solution');
        htmlSolution.textContent = description[solution.id];

        let htmlVote = document.createElement('div');
        htmlVote.classList.add('vote');

        let htmlNotes = [];
        colors.forEach((color, score) => {
            let note = document.createElement('div');
            note.classList.add('note');
            note.style.backgroundColor = color;
            note.style.color = color;

            note.addEventListener('click', async function () {
                // Deselect all notes
                htmlNotes.forEach(note => {
                    note.classList.remove('selected');
                });

                // Select the note
                notes[solution.id] = score;
                console.log(notes);
                note.classList.add('selected');

                console.log(solution.id, score);
            });

            htmlVote.appendChild(note);
            htmlNotes.push(note);
        });

        htmlSolution.appendChild(htmlVote);
        htmlVotes.appendChild(htmlSolution);
    }

    let htmlSubmit = document.createElement('div');
    htmlSubmit.classList.add('submit');
    htmlSubmit.textContent = 'Submit';
    let submit = async function () {
        if (Object.keys(notes).length == data.length) {
            // Reformat the notes into req
            let req = Object.entries(notes).map(e => {
                return {
                    id: e[0],
                    note: e[1],
                }
            });

            console.log(req);
            await fetch('/resilience/api/vote', {
                method: 'POST',
                data: JSON.stringify(req),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            console.log('You must vote for all solutions');
        }

        htmlSubmit.removeEventListener('click', submit);
    };

    htmlSubmit.addEventListener('click', submit);
    htmlVotes.appendChild(htmlSubmit);

};

vote();

function map() {
    window.location = "./map.html"
}
