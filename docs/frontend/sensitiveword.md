---
title: 敏感词校验
categories:
 - frontEnd
tags:
 - JS
---

<!-- more -->



```js
/**
 * @param {content} String 待校验文本内容
 * @param {wordList} Array 词汇对照表
 * @param {maxLen} Number 词汇对照表最大词长
 */
function getSensitiveWord(content, wordList, maxLen) {
  const len = content.length;
  for (let i = 0; i < len; i++) {
    let repeatWord = '';
    for (let j = i + 1; j - i <= maxLen; j++) {
      const str = content.substring(i, j);
      if (repeatWord === str) break;
      if (wordList.includes(str)) {
        return str;
      }
      repeatWord = str;
    }
  }
  return '';
}

/**
 * @param {content} Array[String] | String 待校验文本内容
 * @param {list} Array 词汇对照表
 * return target word
 */
export default function checkSensitiveWord(content, list) {
  const wordList = list.map(v => v.trim());
  const wordListMap = wordList.reduce((p, n) => ({ [n]: n, ...p }), {});

  let maxLen = 0;
  for (const key in wordListMap) {
    if (key.length > maxLen) {
      maxLen = key.length;
    }
  }

  if (!Array.isArray(content)) {
    return getSensitiveWord(content, wordList, maxLen);
  }

  let targetWord = '';
  let index = 0;
  while(index < content.length) {
    targetWord = getSensitiveWord(content[index], wordList, maxLen);
    if (targetWord) break;
    index += 1;
  }
  return targetWord;
};
```