document.addEventListener('DOMContentLoaded', () => {
    const workoutForm = document.getElementById('workoutForm');
    const workoutName = document.getElementById('workoutName');
    const workoutDescription = document.getElementById('workoutDescription');
    const workoutMedia = document.getElementById('workoutMedia');
    const workoutList = document.getElementById('workoutList');
    const sessionList = document.getElementById('sessionList');
    const saveSessionButton = document.getElementById('saveSession');
  
    let workouts = JSON.parse(localStorage.getItem('workouts')) || [];
  
    function displayWorkouts() {
      workoutList.innerHTML = '';
      workouts.forEach((workout, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div>
            <h3>${workout.name}</h3>
            <p>${workout.description}</p>
            ${workout.media ? `<img src="${workout.media}" alt="${workout.name}"/>` : ''}
          </div>
          <div>
            <button onclick="editWorkout(${index})">Edit</button>
            <button onclick="deleteWorkout(${index})">Delete</button>
            <button onclick="addToSession(${index})">Add to Session</button>
          </div>
        `;
        workoutList.appendChild(li);
      });
    }
  
    workoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const mediaURL = workoutMedia.files.length ? URL.createObjectURL(workoutMedia.files[0]) : null;
  
      workouts.push({
        name: workoutName.value,
        description: workoutDescription.value,
        media: mediaURL
      });
  
      localStorage.setItem('workouts', JSON.stringify(workouts));
      workoutForm.reset();
      displayWorkouts();
    });
  
    window.editWorkout = (index) => {
      const workout = workouts[index];
      workoutName.value = workout.name;
      workoutDescription.value = workout.description;
      workouts.splice(index, 1);
      localStorage.setItem('workouts', JSON.stringify(workouts));
      displayWorkouts();
    };
  
    window.deleteWorkout = (index) => {
      workouts.splice(index, 1);
      localStorage.setItem('workouts', JSON.stringify(workouts));
      displayWorkouts();
    };
  
    window.addToSession = (index) => {
      const workout = workouts[index];
      const li = document.createElement('li');
      li.innerHTML = `
        <h4>${workout.name}</h4>
        <p>${workout.description}</p>
        ${workout.media ? `<img src="${workout.media}" alt="${workout.name}"/>` : ''}
      `;
      sessionList.appendChild(li);
    };
  
    saveSessionButton.addEventListener('click', () => {
      alert("Workout session saved!");
      sessionList.innerHTML = '';
    });
  
    // Modal controls
    document.getElementById('bookPT').addEventListener('click', () => {
      document.getElementById('ptModal').style.display = 'block';
    });
  
    document.getElementById('getNutrition').addEventListener('click', () => {
      document.getElementById('nutritionModal').style.display = 'block';
    });
  
    window.closeModal = (id) => {
      document.getElementById(id).style.display = 'none';
    };
  
    window.onclick = (event) => {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
      }
    };
  
    document.getElementById('ptForm').addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thanks! Your personal trainer request has been submitted.");
      closeModal('ptModal');
    });
  
    displayWorkouts();
  });
  





