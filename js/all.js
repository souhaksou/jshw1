//querySelector
const add = document.querySelector(".btn_add");
const inputText = document.querySelector(".inputText");
const tab = document.querySelector(".tab");
const tabList = document.querySelectorAll(".tab>li");
const list = document.querySelector(".list");
const listNum = document.querySelector(".list_num");
const deleteAll = document.querySelector(".deleteAll");
//資料
let data = [];
//待完成計數器
let unfinishedNum = 0;
//tab計數器
let count = 0;
//更新畫面上資料之函式
function updateData(i) {
  let listData = "";
  unfinishedNum = 0;
  //tab選擇
  let switchNum = parseInt(i);
  switch (switchNum) {
    case 0:
      data.forEach(function (value, index) {
        listData += `<li><label class="checkbox" for=""><input type="checkbox" data-num="${index}" ${value.check}/>
          <span>${value.item}</span></label><a href="#" class="delete" data-delete="${index}"></a></li>`;
      });
      break;
    case 1:
      data.forEach(function (value, index) {
        if (value.check !== "checked") {
          listData += `<li><label class="checkbox" for=""><input type="checkbox" data-num="${index}" ${value.check}/>
          <span>${value.item}</span></label><a href="#" class="delete" data-delete="${index}"></a></li>`;
        }
      });
      break;
    case 2:
      data.forEach(function (value, index) {
        if (value.check === "checked") {
          listData += `<li><label class="checkbox" for=""><input type="checkbox" data-num="${index}" ${value.check}/>
          <span>${value.item}</span></label><a href="#" class="delete" data-delete="${index}"></a></li>`;
        }
      });
      break;
  }
  //待完成計算
  data.forEach(function (value, index) {
    if (value.check !== "checked") unfinishedNum++;
  });
  list.innerHTML = listData;
  listNum.textContent = unfinishedNum;
}
//輸入新資料
add.addEventListener("click", function (e) {
  //判斷是否輸入資料
  if (inputText.value == "") return;
  //新增資料
  data.push({ check: "", item: inputText.value });
  inputText.value = "";
  updateData(count);
});
//判斷勾選資料
list.addEventListener("click", function (e) {
  //篩選是否選擇到checkbox
  if (e.target.type == "checkbox") {
    //判斷資料是否被勾選
    let tick = e.target.checked;
    if (tick) data[e.target.dataset.num].check = "checked";
    else data[e.target.dataset.num].check = "";
  }
  //刪除單筆資料
  else {
    data.splice(e.target.dataset.delete, 1);
  }
  updateData(count);
});
//刪除所有資料
deleteAll.addEventListener("click", function (e) {
  data.splice(0, data.length);
  updateData(count);
});
//全部、待完成、已完成
tab.addEventListener("click", function (e) {
  let num = e.target.dataset.tabnum;
  if (num == count) return; //若選取同一個tab則跳出
  //更新tab
  tabList[count].classList.toggle("active"); //原先選取的tab取消
  tabList[num].classList.toggle("active"); //新的tab
  count = num; //將tab計數器更新
  updateData(count);
});
