var Percent = document.getElementById("percent");
var Percentage = 0;
var Progress = document.getElementById('progress');
var interval;
progress();


function progress() {
  resetProgress();

  interval = setInterval(frame, 100);

  function frame() {
    if (Percentage >= 100) {
      clearInterval(interval);
      $('.loader').css('animation', 'Fade 1s ease forwards')
    }

    

    else {
      Percentage++;
      Percent.innerText = Percentage + '%';
      Progress.style.width = Percentage + '%';
    }
  }
}

function resetProgress() {
  Percentage = 0;
  clearInterval(interval)
  Percent.innerText = Percentage + '%';
}
