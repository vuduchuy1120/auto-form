async function autoFillAriaLabel() {
  var parent = document.querySelectorAll('.lLfZXe.fnxRtf.EzyPc');
  parent.forEach(async function (child) {
    var childclick = child.querySelectorAll('span > div.V4d7Ke > div > div');
    var randomIndex = Math.floor(Math.random() * childclick.length);
    childclick[randomIndex].click();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });
}

async function autoClickRadioButton() {
  var parentElements = document.querySelectorAll('.SG0AAe');
  parentElements.forEach(async function (parentElement) {
    var childDivs = parentElement.querySelectorAll('.SG0AAe>div:not(.zfdaxb)');
    if (childDivs.length > 0) {
      var randomIndex = Math.floor(Math.random() * childDivs.length);
      var randomDiv = childDivs[randomIndex];
      randomDiv.querySelector('span').click();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  });
}

async function autoClickMultichoice() {
  var parentElements = document.querySelectorAll('.Y6Myld');

  function getRandomElements(arr, numElements) {
    if (numElements >= arr.length) {
      return arr;
    }
    const result = [];
    const shuffled = arr.slice();

    for (let i = 0; i < numElements; i++) {
      const randomIndex = Math.floor(Math.random() * shuffled.length);
      const randomElement = shuffled.splice(randomIndex, 1)[0];
      result.push(randomElement);
    }

    return result;
  }

  parentElements.forEach(async function (parentElement) {
    var childDivs = parentElement.querySelectorAll('.Y6Myld>div>div:not(.RVLOe)');
    if (childDivs.length > 0) {
      var x = Math.floor(Math.random() * childDivs.length) + 1;
      x = Math.min(x, childDivs.length);
      const numElementsToClick = x;

      const randomChildDivs = getRandomElements(Array.from(childDivs), numElementsToClick);

      const clickedElements = [];

      randomChildDivs.forEach(async function (childDiv) {
        var elementClick = childDiv.querySelector('span');
        if (!clickedElements.includes(elementClick)) {
          elementClick.click();
          clickedElements.push(elementClick);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      });
    }
  });
}

async function performActionsAndReload() {
  await autoClickRadioButton();
  await autoClickMultichoice();
  await autoFillAriaLabel();
  isActionsCompleted = true; // Đánh dấu rằng các hành động đã hoàn thành
}

async function performAndClick() {
  // Chờ cho performActionsAndReload() chạy xong
  await performActionsAndReload();

  // Tiếp tục với việc tìm và click nút "Next" hoặc "Submit" khi hành động đã hoàn thành
  var nextButtons = window.document.querySelectorAll('.l4V7wb.Fxmcue');
  for (var i = 0; i < nextButtons.length; i++) {
    var nextButton = nextButtons[i];
    if (nextButton.textContent.includes('Next') || nextButton.textContent.includes('Submit')) {
      if (isActionsCompleted) {
        nextButton.click();
        isActionsCompleted = false; // Đặt lại cờ khi đã click
      }
      break;
    }
  }

  // Lấy ra phần tử <a> có văn bản "Submit another response"
  var submitLink = document.querySelector('.c2gzEf>a');
  if (submitLink) {
    if (submitLink.textContent.includes('Submit another response')) {
      window.location.reload();
    }
  }
}

// Gọi hàm performAndClick() để bắt đầu quy trình
performAndClick();