import React from "react";

const Wordbank = (props) => {
  let count = 0;
  let completed = true;
  while (count < props.wordlist.length) {
    //Check if the wordsearch has been completed
    if (!props.wordlist[count][3]) {
      completed = false;
      break;
    }
    count++;
  }

  return (
    <div className='wordBankContainer'>
      <h2> Word Bank</h2>
      {props.wordlist.map((item) => (
        <p className={item[3] ? "found" : ""}> {item[0]} </p>
      ))}
      {completed && (
        <button
          onClick={() => {
            window.location.reload();
          }}>
          Play Again
        </button>
      )}
    </div>
  );
};

export default Wordbank;
