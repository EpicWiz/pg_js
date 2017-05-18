$(function () {
  let charNames = ['angeal', 'cloud', 'genesis', 'sephiroth'];
  let myChar = '';
  let died = false;
  let currentEnemy;
  let defenderAlive = false;
  let enemiesLeft = 3;

  let charObj = {
    angeal: {
      health: 100,
      attack: 8,
      counter: 5,
    },
    cloud: {
      health: 120,
      attack: 8,
      counter: 10,
    },
    genesis: {
      health: 150,
      attack: 8,
      counter: 20,
    },
    sephiroth: {
      health: 180,
      attack: 8,
      counter: 25,
    },

  };

  $('.charImg').on('click', function () {
      myChar = this.id;

      /*for (let i = 0; i < charNames.length; i++) {
        let hpRoll = healthSetup();
        charObj[charNames[i]].health = hpRoll;
      }*/ //FOR VERSION 2.0

      let me = charNames.indexOf(myChar);
      charNames.splice(me, 1);

      $('.chooseChar, .characters').css('display', 'none');
      gameSetup();
    });

  $(document).on('click', '.charImg2', function () {
    if (defenderAlive === true) {
      if (charObj[myChar].health < 1) {
        alert('Start a new game to try again.');
      } else {
        alert('You\'re already fighting someone!');
      }
    } else {
      $('#gameInfo').html('');
      defenderAlive = true;
      currentEnemy = charNames[$(this).attr('id') - 1];
      $('#e' + $(this).attr('id')).html('');
      changeDefender(charNames[$(this).attr('id') - 1]);
    }

  });

  $(document).on('click', '.charImg3', function () {
    if (charObj[myChar].health < 1) {
      alert('You\'re dead, what are you trying to do?');
    } else {
      alert('You can\'t fight yourself.');
    }
  });

  $(document).on('click', '#fight', function () {
    if (enemiesLeft > 0) {
      if (died === true) {
        alert('You can\'t fight while you\'re dead!');
      } else {
        if (currentEnemy !== undefined && enemiesLeft > 0) {
          $('#gameInfo').html('');
          $('#gameInfo').append('<p>You hit ' + currentEnemy + ' for ' + charObj[myChar].attack + ' HP.');
          charObj[currentEnemy].health = charObj[currentEnemy].health - charObj[myChar].attack;
          $('#defHP').text(charObj[currentEnemy].health);
          charObj[myChar].attack = charObj[myChar].attack + 8;

          if (charObj[currentEnemy].health < 1) {
            $('#defender').html('');
            defenderAlive = false;
            $('#gameInfo').append(currentEnemy.toUpperCase() + ' is dead!');
            enemiesLeft = enemiesLeft - 1;
            currentEnemy = undefined;
            if (enemiesLeft < 1) {alert('YOU WIN!');}
          } else {
            $('#gameInfo').append('<p>' + currentEnemy + ' hit you for ' + charObj[currentEnemy].counter + 'HP!');
            charObj[myChar].health = charObj[myChar].health - charObj[currentEnemy].counter;
            $('#myHP').text(charObj[myChar].health);
            if (charObj[myChar].health < 1) {
              alert('You died!');
              died = true;
            }
          }
        } else if (currentEnemy === undefined && enemiesLeft > 0) {alert('Select a new opponent.');}
      }
    } else {
      alert('There\'s nobody left to fight!');
    }
  });

  /*let healthSetup = () => {
    let x = Math.floor(Math.random() * 101) + 100;
    return x;
  };*/ //FOR VERSION 2.0

  let changeDefender = (x) => {
    $('#defender').append(
      '<div class="charWrapE">' +
      '<h2 id="eDefender">' + x.toUpperCase() + '</h2>' +
      '<img id="cDef" class="charImg2" src="assets/images/' +
      x +
      '1.png" alt="defender">' +
      '<h2 id="defHP">' + charObj[x].health + '</h2>' +
      '</div>');
  };

  let gameSetup = () => {
    $('#gameTitle').text('Final Fantasy RPG');
    $('#yourChar').text('Your Character:');
    $('#yourChar').after(
      '<div class="charWrap">' +
      '<h2 id="myChar">' +
      myChar.toUpperCase() +
      '</h2>' +
      '<img class="charImg3" src="assets/images/' +
      myChar +
      '1.png" alt="your character">' +
      '<h2 id="myHP">' + charObj[myChar].health + '</h2>' +
      '</div>'
    );
    $('#eAvailable').text('Enemies Available to Attack:');
    $('#e1').html(
      '<div class="charWrapE">' +
      '<h2 id="e1Name">' + charNames[0].toUpperCase() + '</h2>' +
      '<img id="1" class="charImg2" src="assets/images/' +
      charNames[0] +
      '1.png" alt="e1">' +
      '<h2 id="e1HP">' + charObj[charNames[0]].health + '</h2>' +
      '</div>'
    );
    $('#e2').html(
      '<div class="charWrapE">' +
      '<h2 id="e2Name">' + charNames[1].toUpperCase() + '</h2>' +
      '<img id="2" class="charImg2" src="assets/images/' +
      charNames[1] +
      '1.png" alt="e2">' +
      '<h2 id="e2HP">' + charObj[charNames[1]].health + '</h2>' +
      '</div>'
    );
    $('#e3').html(
      '<div class="charWrapE">' +
      '<h2 id="e3Name">' + charNames[2].toUpperCase() + '</h2>' +
      '<img id="3" class="charImg2" src="assets/images/' +
      charNames[2] +
      '1.png" alt="e3">' +
      '<h2 id="e3HP">' + charObj[charNames[2]].health + '</h2>' +
      '</div>'
    );
    $('#fightSection').text('Fight Section:');
    $('#fightSection').after('<button id="fight" class="btn btn-danger btn-lg">Fight</button>');
    $('#defender').append('<h1>Defender:</h1>');
  };

});

/*
<div class="charWrap">
  <h2 id="myChar">Cloud</h2>
  <img class="charImg2" src="assets/images/cloud1.png" alt="your character">
  <h2 id="myHP">100HP</h2>
</div>

<div class="charWrap">
  <h2 id="e3Name">Genesis</h2>
  <img id="enemy3" class="charImg2" src="assets/images/sephiroth1.png" alt="enemy3">
  <h2 id="e3HP">100HP</h2>
</div>

<button class="btn btn-danger btn-lg" onclick="fight()">Fight</button>

*/
