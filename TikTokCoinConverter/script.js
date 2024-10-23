document.getElementById('convert-btn').addEventListener('click', () => {
    const coinAmount = document.getElementById('usd').value;
    const usdAmount = (coinAmount/200);
  
    // API НБ РБ для получения текущего курса USD к BYN
    const url = 'https://api.nbrb.by/exrates/rates/840?parammode=1';
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const rate = data.Cur_OfficialRate; // Курс BYN за 1 USD
        const scale = data.Cur_Scale; // Масштаб валюты (обычно 1 для USD)
        const bynAmount = (usdAmount * rate / scale).toFixed(2);
        document.getElementById('byn-result').textContent = `BYN: ${bynAmount}`;
        document.querySelector('.result').classList.add('show');
        console.log(usdAmount);
      })
      .catch(error => console.error('Ошибка получения данных:', error));
  });
  