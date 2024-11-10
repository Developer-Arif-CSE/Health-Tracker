document.getElementById('health-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const waterIntake = parseFloat(document.getElementById('water-intake').value);
    const steps = parseInt(document.getElementById('steps').value);
    const calories = parseInt(document.getElementById('calories').value);
    const sleep = parseFloat(document.getElementById('sleep').value);

    const date = new Date().toLocaleDateString();
    
    const data = {
        date: date,
        waterIntake: waterIntake,
        steps: steps,
        calories: calories,
        sleep: sleep
    };

    saveDataToLocalStorage(data);
    updateDataDisplay();
    renderChart();
});

function saveDataToLocalStorage(data) {
    let healthData = JSON.parse(localStorage.getItem('healthData')) || [];
    healthData.push(data);
    localStorage.setItem('healthData', JSON.stringify(healthData));
}

function updateDataDisplay() {
    const healthData = JSON.parse(localStorage.getItem('healthData')) || [];
    const displayElement = document.getElementById('data-display');
    displayElement.innerHTML = '';

    healthData.forEach(data => {
        const dataDiv = document.createElement('div');
        dataDiv.innerHTML = `
            <strong>Date:</strong> ${data.date}<br>
            <strong>Water Intake:</strong> ${data.waterIntake} L<br>
            <strong>Steps:</strong> ${data.steps} steps<br>
            <strong>Calories Burned:</strong> ${data.calories} kcal<br>
            <strong>Sleep:</strong> ${data.sleep} hours
        `;
        displayElement.appendChild(dataDiv);
    });
}

function renderChart() {
    const healthData = JSON.parse(localStorage.getItem('healthData')) || [];
    const dates = healthData.map(data => data.date);
    const waterData = healthData.map(data => data.waterIntake);
    const stepsData = healthData.map(data => data.steps);
    const caloriesData = healthData.map(data => data.calories);
    const sleepData = healthData.map(data => data.sleep);

    const ctx = document.getElementById('healthChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Water Intake (L)',
                data: waterData,
                borderColor: '#4CAF50',
                fill: false
            },
            {
                label: 'Steps Taken',
                data: stepsData,
                borderColor: '#2196F3',
                fill: false
            },
            {
                label: 'Calories Burned',
                data: caloriesData,
                borderColor: '#FF9800',
                fill: false
            },
            {
                label: 'Hours of Sleep',
                data: sleepData,
                borderColor: '#9C27B0',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });
}

// Load saved data and render on page load
window.onload = function() {
    updateDataDisplay();
    renderChart();
};
