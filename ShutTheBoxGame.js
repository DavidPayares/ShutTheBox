//this function turns up all the blocks
function initializeBlocks() {
  let blocks = [];
  let blocklength = 9;
  for (let i = 0; i < blocklength; i++) {
    blocks.push(true);
  }
  return blocks;
}

// function to show all the blocks
function showBlocks(blocks) {
  let blockShow = [];
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === true) {
      blockShow.push(i + 1);
    } else {
      blockShow.push('  ');
    }
  }
  return '| ' + blockShow.join(' | ') + ' |';
}

//this function simullates the value of rolling dices
function throwDices(sum) {
  let dices = [0, 0];
  if (sum > 6) {
    dices = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
  } else {
    dices = [Math.floor(Math.random() * 6) + 1];
  }
  return dices
}

//this function sums the values of the dices (1 or 2)
function sumDices(dices) {
  let sum = 0;
  for (let i = 0; i < dices.length; i++) {
    sum = sum + dices[i];
  }
  return sum;
}

//this functionfinds all possible pair of combinations given a dices sum
function findAllPossibleCombination(sum) {
  let combinations = [];
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= i; j++) {
      if (i + j === sum && i !== j) {
        combinations.push([i, j]);
      }else if (i == sum && j == sum){
        combinations.push([i]);
      }
    }
  }
  return combinations;
}

//this function returns the blocks that have been already turned down
function nonAvailableBlocks(blocks) {
  let nonAvailable = [];
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === false) {
      nonAvailable.push(i + 1);
    }
  }
  return nonAvailable;
}

//this function evaluates if a block turned down is in the possible par of combinations
function existsIn(blocksDown, diceOptions) {
  for (let i = 0; i < blocksDown.length; i++) {
    if (diceOptions[0] === blocksDown[i] || diceOptions[1] === blocksDown[i]) {
      return true;
    }
  }
  return false;
}

//this function returns the pair of available combinations that not include blocks already turned down
function availableCombinations(allCombinations, blocksDown) {
  const result = [];
  for (let i = 0; i < allCombinations.length; i++) {
    if (!existsIn(blocksDown, allCombinations[i])) {
      result.push(allCombinations[i]);
    }
  }
  return result;
}


//this function shows the pair of available combinations
function showOptions(possibleCombinations) {
  let show = '';
  for (let i = 0; i < possibleCombinations.length; i++) {
    show = show + "*" + "Option " + (i + 1) + ":   " + '| ' + possibleCombinations[i].join(' | ') + ' |';
    if (i !== possibleCombinations.length - 1) {
      show = show + "\n";
    }
  }
  return show;
}

//this function selects a combination
function selectCombination(choise, combination) {
  let selection = combination[choise - 1];
  return selection;
}

//this function turns down the selected blocks
function turnBlocksDown(choise, blocks) {
  for (let i = 0; i < choise.length; i++) {
    if ((choise[i] > 0)) {
      blocks[choise[i] - 1] = false;
    }
  }
  return blocks;
}

//this function sums the blocks up
function sumBlocksUp(blocks) {
  let sum = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === true) {
      sum = sum + (i + 1);
    }
  }
  return sum;
}

//this function return the selected combination based on if the player is the computer or not.
function choise(player, blocks, choises, choisesLength) {
  let option = 0
  if (player == 'human') {
    option = prompt('Blocks: \n' + blocks + '\n' + "Please choose an option with the blocks you want to turn down \n" + choises);
  } else {
    alert('Blocks: \n' + blocks + '\n' + choises);
    option = Math.floor(Math.random() * choisesLength) + 1;
  }
  return option
}


//this function represents the player's interface and input of answers.
function game(player) {

  //variables are initializated
  let sum = 45;
  let is = true;
  let blocksDown = initializeBlocks();
  let role = player == 'human' ? 'Your' : 'Computer';

  //while there are still blocks that can be turned down base on the dice, the program will continue rolling the dices
  while (is) {
    let dices = throwDices(sum);
    let combination = findAllPossibleCombination(sumDices(dices));
    let chooseCombination = availableCombinations(combination, nonAvailableBlocks(blocksDown));
    alert(role + ' dices: ' + '[ ' + dices.join(' ][ ') + ' ]' + '\n' + role + ' dices sum: ' + sumDices(dices));

    //while the sum of the dices combinations matches two blocks sum, the program will continue providing a combination solution
    if (chooseCombination.length > 0) {
      let validValue = true;
      //while the user's input is not a number between the options or any other character, the program will continua asking for a valid input.
      while (validValue) {

        let blocks = showBlocks(blocksDown);
        let choises = showOptions(chooseCombination);
        let opcion = choise(player, blocks, choises, chooseCombination.length);

        if (opcion > 0 && chooseCombination.length >= opcion) {
          alert(role + ' choise is: ' + opcion);
          blocksDown = turnBlocksDown(selectCombination(opcion, chooseCombination), blocksDown);
          sum = sum - (sum - sumBlocksUp(blocksDown));
          validValue = false;
        } else {
          alert('That\'s not a valid option. Please enter a valid one.');
        }
      }
    } else {
      alert('There is no more moves availables!');
      alert('These are the blocks up left: ' + showBlocks(blocksDown) + '\nand this is ' + role.toLowerCase() + ' final score: ' + sum);
      is = false;
    }
  }
  return sum;
}

function winner(scorePlayer, scoreComputer, name) {
  if (scorePlayer < scoreComputer) {
    alert('Congratulations |' + name.toUpperCase().split('').join('|') + '|\nYou are a WINNER!');
  } else if (scorePlayer == scoreComputer) {
    alert('it\'s a TIE!!');
  } else {
    alert('WHAT A BUMMER! \nThe |C|O|M|P|U|T|E|R| is the winner \nBetter luck next time');
  }
}


//the main interface and result of the game
function main() {
  alert('                                   Welcome to \n                         |S|H|U|T| |T|H|E| |B|O|X|\n \nYou will play against the computer; the one who has the lowest sum based on the remaining blocks up will be the winner \n\n                             Are you ready to play? \n                                 ***Press Enter***');
  let name = String(prompt('What is your name?'));
  alert('Perfect ' + name + '\nYou will play after the computers turn. Wish you luck! \n \n Computer Turn');
  const computerSum = game('computer');
  alert(name + ' now is your Turn! ');
  const humanSum = game('human');
  alert('Your score: ' + humanSum + '\nComputer score: ' + computerSum);
  winner(humanSum, computerSum, name)
}


main();