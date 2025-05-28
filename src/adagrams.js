const HAND_SIZE = 10;
const LETTER_POOL = {
  A: 9, B: 2, C: 2, D: 4, E: 12, F: 2,
  G: 3, H: 2, I: 9, J: 1, K: 1, L: 4,
  M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6,
  S: 4, T: 6, U: 4, V: 2, W: 2, X: 1,
  Y: 2, Z: 1
};

const SCORE_CHART = {
  A: 1, E: 1, I: 1, O: 1, U: 1,
  L: 1, N: 1, R: 1, S: 1, T: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10
};

// const SCORE_CHART = {
//   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
//   2: ['D', 'G'],
//   3: ['B', 'C', 'M', 'P'],
//   4: ['F', 'H', 'V', 'W', 'Y'],
//   5: ['K'],
//   8: ['J', 'X'],
//   10: ['Q', 'Z']
// };

export const drawLetters = () => {
  // Implement this method for wave 1
  let letters = []
  let total_pool = []

  for (const [letter, count] of Object.entries(LETTER_POOL)) {
    total_pool.push(...Array(count).fill(letter)); // ... unpacks the inner array 
  }

  for (let i = 0; i < HAND_SIZE; i++) {
    const r = Math.floor(Math.random() * total_pool.length);
    letters.push(total_pool[r]);
    total_pool.splice(r, 1); // Should remove just the element at r
  }
  return letters;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  // Implement this method for wave 2
  let lettersInHandCopy = [...lettersInHand];
  input = input.toUpperCase();

  for (let character of input) {
    const charIndex = lettersInHandCopy.indexOf(character);
    if (charIndex === -1) {
      return false;
    }
    lettersInHandCopy.splice(charIndex, 1);
  }
  return true;
};

export const scoreWord = (word = "") => {
  // if (typeof word !== "string") return 0;

  word = word.toUpperCase();
  let score = 0;
  
  for (let character of word) {
    score += SCORE_CHART[character];
  }

  if (word.length >= 7) {
    score += 8;
  }
  return score;
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
  let highScore = 0;
  let highest = []

  for (let word of words) {
    const score = scoreWord(word);

    if (score > highScore) {
      highScore = score;
      highest = [word]; // array only has new highest word now 
    } else if (score === highScore) {
      highest.push(word)
    }
  }

  let winningWord = highest[0];

  if (highest.length > 1) {
    winningWord = tiebreaker(highest);
  }

  return ({
    word: winningWord,
    score: highScore
  })
};

export const tiebreaker = (tiedWords) => {
  let topChoices = [];
  let currentShortestLength = HAND_SIZE + 1;

  for (let word of tiedWords) {
    const currentLength = word.length;

    if (currentLength === 10) {
      return word;
    }
    if (currentLength < currentShortestLength) {
      currentShortestLength = currentLength;
      topChoices = [word];
    } else if (currentLength === currentShortestLength) {
      topChoices.push(word);
    }
  }

  return topChoices[0];
};
