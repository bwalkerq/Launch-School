'use strict'
function letterCaseCount(string) {
  const lowerArray = string.match(/[a-z]/g) || [];
  // returns an array of each character that matches the regex!! or an empty
  // array if no matches.
  const upperArray = string.match(/[A-Z]/g) || [];
  const neitherArray = string.match(/[^a-z]/gi) || [];

  return {
    lowercase: lowerArray.length,
    uppercase: upperArray.length,
    neither: neitherArray.length,
  };
}

function letterPercentages(string) {
  const length = string.length;
  let result = letterCaseCount(string);

  Object.keys(result).forEach(key => {
    result[key] = (result[key] / length * 100).toFixed(2);
  });

  return result
}

letterPercentages('abCdef 123');
// { lowercase: "50.00", uppercase: "10.00", neither: "40.00" }

letterPercentages('AbCd +Ef');
// { lowercase: "37.50", uppercase: "37.50", neither: "25.00" }

letterPercentages('123');
// { lowercase: "0.00", uppercase: "0.00", neither: "100.00" }