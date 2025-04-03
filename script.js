document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workoutForm');
    const workoutName = document.getElementById('workoutName');
    const workoutDescription = document.getElementById('workoutDescription');
    const workoutMedia = document.getElementById('workoutMedia');
    const workoutList = document.getElementById('workoutList');
    const sessionList = document.getElementById('sessionList');
    const saveSessionButton = document.getElementById('saveSession');

    // Load saved workouts from local storage
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];

    // Display workouts in the list
    const displayWorkouts = () => {
        workoutList.innerHTML = '';
        workouts.forEach((workout, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div>
                    <h3>${workout.name}</h3>
                    <p>${workout.description}</p>
                    ${workout.media ? `<img src="${workout.media}" alt="${workout.name}" />` : ''}
                </div>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            workoutList.appendChild(listItem);
        });
    };

    // Add new workout
    workoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newWorkout = {
            name: workoutName.value,
            description: workoutDescription.value,
            media: workoutMedia.files.length ? URL.createObjectURL(workoutMedia.files[0]) : null
        };

        workouts.push(newWorkout);
        localStorage.setItem('workouts', JSON.stringify(workouts));
        workoutName.value = '';
        workoutDescription.value = '';
        workoutMedia.value = '';
        displayWorkouts();
    });

    // Edit workout
    workoutList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('edit-btn')) {
            const workout = workouts[index];
            workoutName.value = workout.name;
            workoutDescription.value = workout.description;
            workoutMedia.value = ''; // Reset file input for simplicity
            workouts.splice(index, 1); // Remove it temporarily to avoid duplicates
            localStorage.setItem('workouts', JSON.stringify(workouts));
            displayWorkouts();
        }
    });

    // Delete workout
    workoutList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('delete-btn')) {
            workouts.splice(index, 1);
            localStorage.setItem('workouts', JSON.stringify(workouts));
            displayWorkouts();
        }
    });

    // Add workout to session plan
    workoutList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('edit-btn')) {
            const workout = workouts[index];
            const sessionItem = document.createElement('li');
            sessionItem.innerHTML = `
                <h4>${workout.name}</h4>
                <p>${workout.description}</p>
                ${workout.media ? `<img src="${workout.media}" alt="${workout.name}" />` : ''}
            `;
            sessionList.appendChild(sessionItem);
        }
    });

    // Save session plan
    saveSessionButton.addEventListener('click', () => {
        alert('Session plan saved!');
        sessionList.innerHTML = ''; // Clear session plan after saving
    });

    // Initial display of workouts
    displayWorkouts();
});





