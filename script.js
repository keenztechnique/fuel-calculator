function calculateFuel() {
  // Получаем исходные данные
  const startFuel = parseFloat(document.getElementById('startFuel').value) || 0;
  const refuel = parseFloat(document.getElementById('refuel').value) || 0;
  const sampleFuel = parseFloat(document.getElementById('sampleFuel').value) || 0;
  const economyFuel = parseFloat(document.getElementById('economyFuel').value) || 0;

  // Функция перевода часов и минут в десятичные часы
  function getTimeInHours(hoursId, minutesId) {
    const h = parseFloat(document.getElementById(hoursId).value) || 0;
    const m = parseFloat(document.getElementById(minutesId).value) || 0;
    return h + (m / 60);
  }

  const groundHours = getTimeInHours('groundHours', 'groundMinutes');
  const airHours = getTimeInHours('airHours', 'airMinutes');
  const vsuHours = getTimeInHours('vsuHours', 'vsuMinutes');

  // Точные расчеты по нормам (Земля: 366, Воздух: 638, ВСУ: 77)
  const exactGroundSpent = groundHours * 366;
  const exactAirSpent = airHours * 638;
  const exactVsuSpent = vsuHours * 77;

  // Строгое правило: округлять до целого ТОЛЬКО после общего сложения
  const totalExactSpent = exactGroundSpent + exactAirSpent + exactVsuSpent;
  const targetSpentRounded = Math.round(totalExactSpent);

  // Израсходовано = положено по норме минус введенная экономия
  const actualSpent = targetSpentRounded - economyFuel;

  // Наличие после полета = Наличие до - Слито пробы - Фактически израсходовано
  const endFuel = startFuel - sampleFuel - actualSpent + refuel;

  // Выводим результаты на экран
  document.getElementById('targetSpent').innerText = targetSpentRounded.toLocaleString('ru-RU');
  document.getElementById('actualSpent').innerText = actualSpent.toLocaleString('ru-RU');
  document.getElementById('endFuel').innerText = endFuel.toLocaleString('ru-RU');

  document.getElementById('resultBlock').style.display = 'block';
}
