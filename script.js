// script.js

async function fetchData(period = 'weekly') {
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Failed to fetch data');

    const data = await response.json();
    updateDashboard(data, period);
  } catch (error) {
    console.error(error);
  }
}

function updateDashboard(data, period) {
  const cards = document.querySelectorAll('.card');
  data.forEach((item, i) => {
    const current = item.timeframes[period].current;
    const previous = item.timeframes[period].previous;
    const card = cards[i];

    card.querySelector('.card__hours').textContent = `${current}hrs`;
    card.querySelector('.card__previous').textContent = `Last Week - ${previous}hrs`;
  });
}

// Setup filter buttons
document.querySelectorAll('.filter').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter.active')?.classList.remove('active');
    btn.classList.add('active');

    const period = btn.dataset.period;
    fetchData(period);
  });
});

// Initial load
fetchData();