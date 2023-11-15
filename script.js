// 각 td에 이벤트 리스너 추가
for (let i = 1; i <= 35; i++) {
    let td = document.getElementById("t" + i);
    td.addEventListener("click", write);
}

// td 객체를 저장할 배열
var tdList = [];

// td 객체
var tdObject = {
    title: "",
    content: "",
    category: ""
};

// writeButton을 클릭했을 때 Third Div를 보여주는 함수
// writeButton을 다시 클릭하면 새로운 table과 emptyPage가 생성됨
document.getElementById("writeButton").addEventListener("click", function() {
    var calendar = document.getElementById("calendar");
    var emptyPage = document.getElementById("emptyPage");

    // emptyPage에 저장된 객체가 있다면 calendar와 emptyPage를 초기화
    if (document.getElementById("emptyPage").hasChildNodes()) {
        // emptyPage 초기화
        while(emptyPage.hasChildNodes()) {
            emptyPage.removeChild(emptyPage.firstChild);
        }
        // calendar 초기화
        for(let i = 1; i <= 35; i++) {
            let Tds = document.getElementById("t"+i)
            while(Tds.hasChildNodes()) {
                Tds.removeChild(Tds.firstChild);
            }
        }
        // tdList 초기화
        tdList = [];

        // num 초기화
        num = 0;
    } else {
        calendar.style.display = "block";
        emptyPage.style.display = "block";
    }
});

var TdId; // 마지막으로 누른 td의 id를 저장하는 변수
var DivId; // 마지막으로 누른 div의 id를 저장하는 변수
var num = 0; // 작성한 일정의 개수

// td를 클릭했을 때 모달창을 띄우는 함수
// 데이터 셀 안을 클릭함. 테이블의 테두리는 클릭하지 않음
function write(event) {
    if (event.target.nodeName == "DIV") { // 작성한 일정을 클릭했다면
        // 수정창 띄우기
        var modal = document.getElementById("dailyModify");
        modal.style.display = "block";

        // 몇 번째 td인지 확인
        TdId = this.id;

        // div의 id를 확인
        DivId = event.target.id;

        // tdList[num]의 객체 수정
        document.getElementById("modifyTitle").value = tdList[DivId.split("d")[1]].title;
        document.getElementById("modifyContent").value = tdList[DivId.split("d")[1]].content;
        document.getElementById("modifyCategory").value = tdList[DivId.split("d")[1]].category;
    } else { // calendar의 빈 부분을 클릭했다면
        // 작성창 띄우기
        var modal = document.getElementById("dailyWrite");
        modal.style.display = "block";

        // 몇 번째 td인지 확인
        TdId = this.id;
    }
}

// saveButton을 클릭했을 때 모달창을 닫고 저장하는 함수
// 제목과 설명 항목에 값을 입력하지 않고 버튼을 클릭할 경우 경고창을 띄움
document.getElementById("saveButton").addEventListener("click", function() {
    // 입력할 value 저장
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    var category = document.getElementById("category").value;

    // 제목과 설명을 입력하지 않았을 때
    if (title == "" || content == "") {
        alert("입력란을 모두 채워주세요.");
    } else {
        tdList.push(Object.create(tdObject));
        
        // tdList에 title, content, category 정보 저장
        tdList[num].title = title;
        tdList[num].content = content;
        tdList[num].category = category;

        // title을 담을 div 생성
        var background = document.createElement("div");
        background.id = "d" + num;
        background.style.margin = "5px";
        background.style.padding = "5px";
        background.style.border = "1px groove #e7e7e7";
        background.style.borderRadius = "5px";

        // category 정보에 따른 배경색
        if (category == "todo") {
            background.style.backgroundColor = "rgba(57, 206, 180, 0.4)";
        } else if (category == "meeting") {
            background.style.backgroundColor = "rgba(255, 99, 71, 0.4)";
        } else if (category == "idea") {
            background.style.backgroundColor = "rgba(79, 118, 219, 0.4)";
        } else if (category == "shopping") {
            background.style.backgroundColor = "rgba(149, 165, 166, 0.4)";
        }

        // background에 title을 추가
        background.appendChild(document.createTextNode(title));

        // background를 block으로 만듬
        background.style.display = "block";

        // TpId에 해당하는 td에 background를 추가
        document.getElementById(TdId).appendChild(background);

        // emptyPage에 title을 추가
        var emptyPageBackground = document.createElement("div");
        emptyPageBackground.id = "e" + num;
        emptyPageBackground.style.margin = "5px";
        emptyPageBackground.style.padding = "5px";
        emptyPageBackground.style.border = "1px groove #e7e7e7";
        emptyPageBackground.style.borderRadius = "5px";

        // category 정보에 따른 배경색
        if (category == "todo") {
            emptyPageBackground.style.backgroundColor = "rgba(57, 206, 180, 1)";
        } else if (category == "meeting") {
            emptyPageBackground.style.backgroundColor = "rgba(255, 99, 71, 1)";
        } else if (category == "idea") {
            emptyPageBackground.style.backgroundColor = "rgba(79, 118, 219, 1)";
        } else if (category == "shopping") {
            emptyPageBackground.style.backgroundColor = "rgba(149, 165, 166, 1)";
        }

        // radio button 생성
        var radio = document.createElement("input");
        radio.type = "radio";

        // emptyPageBackground에 radio button과 title을 추가
        emptyPageBackground.appendChild(radio);
        emptyPageBackground.appendChild(document.createTextNode(title));

        // emptyBackground를 block으로 만듬
        emptyPageBackground.style.display = "block";
        
        // emptyPage에 emptyPag32eBackground를 추가
        document.getElementById("emptyPage").appendChild(emptyPageBackground);

        // 다음 함수 실행을 위해 초기화
        document.getElementById("title").value = "";
        document.getElementById("content").value = "";
        document.getElementById("category").value = "todo";

        // 모달창 닫기
        var modal = document.getElementById("dailyWrite");
        modal.style.display = "none";

        // num 증가
        num++;

        alert("계획이 추가되었습니다.")
    }
});

// cancelButton을 클릭했을 때 입력은 되지 않으며 모달창이 사라지는 함수
document.getElementById("cancelButton").addEventListener("click", function() {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    var modal = document.getElementById("dailyWrite");
    modal.style.display = "none";
});

// editButton을 클릭했을 때
// 제목, 설명, 분류 항목을 변경할 수 있도록 입력 박스가 변경됨
document.getElementById("editButton").addEventListener("click", function() {
    document.getElementById("modifyTitle").disabled = false;
    document.getElementById("modifyContent").disabled = false;
    document.getElementById("modifyCategory").disabled = false;

    document.getElementById("resaveButton").style.display = "inline-block";
    document.getElementById("recancelButton").style.display = "inline-block";

    document.getElementById("editButton").style.display = "none";
    document.getElementById("deleteButton").style.display = "none";
    document.getElementById("closeButton").style.display = "none";
});

// resaveButton을 클릭했을 때
// 변경된 제목, 설명, 분류 항목을 저장하고 모달창을 닫는 함수
document.getElementById("resaveButton").addEventListener("click", function() {
    // 입력할 value 저장
    var title = document.getElementById("modifyTitle").value;
    var content = document.getElementById("modifyContent").value;
    var category = document.getElementById("modifyCategory").value;
    
    // 제목과 설명을 입력하지 않았을 때
    if (title == "" || content == "") {
        alert("입력란을 모두 채워주세요.");
    } else {       
        // tdList에 title, content, category 정보 수정
        tdList[DivId.split("d")[1]].title = title;
        tdList[DivId.split("d")[1]].content = content;
        tdList[DivId.split("d")[1]].category = category;

        // 임시로 원래 div의 id를 temp로 만듬
        var tempId = DivId;
        document.getElementById(DivId).id = "temp";

        // title을 담을 div 생성
        var background = document.createElement("div");
        background.id = tempId;
        background.style.margin = "5px";
        background.style.padding = "5px";
        background.style.border = "1px groove #e7e7e7";
        background.style.borderRadius = "5px";

        // category 정보에 따른 배경색
        if (category == "todo") {
            background.style.backgroundColor = "rgba(57, 206, 180, 0.4)";
        } else if (category == "meeting") {
            background.style.backgroundColor = "rgba(255, 99, 71, 0.4)";
        } else if (category == "idea") {
            background.style.backgroundColor = "rgba(79, 118, 219, 0.4)";
        } else if (category == "shopping") {
            background.style.backgroundColor = "rgba(149, 165, 166, 0.4)";
        }

        // background에 title을 추가
        background.appendChild(document.createTextNode(title));

        // background를 block으로 만듬
        background.style.display = "block";

        // td를 수정
        document.getElementById(TdId).replaceChild(background, document.getElementById("temp"));

        // 임시로 원래 div의 id를 etemp로 만듬
        var etempId = "e" + tempId.split("d")[1];
        document.getElementById(etempId).id = "etemp";

        // emptyPage에 title을 추가
        var emptyPageBackground = document.createElement("div");
        emptyPageBackground.id = etempId;
        emptyPageBackground.style.margin = "5px";
        emptyPageBackground.style.padding = "5px";
        emptyPageBackground.style.border = "1px groove #e7e7e7";
        emptyPageBackground.style.borderRadius = "5px";

        // category 정보에 따른 배경색
        if (category == "todo") {
            emptyPageBackground.style.backgroundColor = "rgba(57, 206, 180, 1)";
        } else if (category == "meeting") {
            emptyPageBackground.style.backgroundColor = "rgba(255, 99, 71, 1)";
        } else if (category == "idea") {
            emptyPageBackground.style.backgroundColor = "rgba(79, 118, 219, 1)";
        } else if (category == "shopping") {
            emptyPageBackground.style.backgroundColor = "rgba(149, 165, 166, 1)";
        }

        // radio button 생성
        var radio = document.createElement("input");
        radio.type = "radio";

        // emptyPageBackground에 radio button과 title을 추가
        emptyPageBackground.appendChild(radio);
        emptyPageBackground.appendChild(document.createTextNode(title));

        // emptyBackground를 block으로 만듬
        emptyPageBackground.style.display = "block";
        
        // emptyPage를 수정
        document.getElementById("emptyPage").replaceChild(emptyPageBackground, document.getElementById("etemp"));

        // 모달창 닫기 전 원래대로 disabled
        document.getElementById("modifyTitle").disabled = true;
        document.getElementById("modifyContent").disabled = true;
        document.getElementById("modifyCategory").disabled = true;

        document.getElementById("resaveButton").style.display = "none";
        document.getElementById("recancelButton").style.display = "none";

        // 모달창 닫기
        var modal = document.getElementById("dailyModify");
        modal.style.display = "none";

        alert("저장되었습니다.")

        document.getElementById("editButton").style.display = "inline-block";
        document.getElementById("deleteButton").style.display = "inline-block";
        document.getElementById("closeButton").style.display = "inline-block";
    }
});

// recancelButton을 클릭했을 때
document.getElementById("recancelButton").addEventListener("click", function() {
    // 모달창 닫기 전 원래대로 disabled
    document.getElementById("modifyTitle").disabled = true;
    document.getElementById("modifyContent").disabled = true;
    document.getElementById("modifyCategory").disabled = true;

    document.getElementById("resaveButton").style.display = "none";
    document.getElementById("recancelButton").style.display = "none";

    // 모달창 닫기
    var modal = document.getElementById("dailyModify");
    modal.style.display = "none";

    document.getElementById("editButton").style.display = "inline-block";
    document.getElementById("deleteButton").style.display = "inline-block";
    document.getElementById("closeButton").style.display = "inline-block";
});

// deleteButton 클릭했을 때
document.getElementById("deleteButton").addEventListener("click", function() {    
    // td에서 삭제
    document.getElementById(TdId).removeChild(document.getElementById(DivId));

    // emptyPage에서 삭제
    document.getElementById("emptyPage").removeChild(document.getElementById("e" + DivId.split("d")[1]));

    // 모달창 닫기
    var modal = document.getElementById("dailyModify");
    modal.style.display = "none";

    alert("삭제되었습니다.");
});

// closeButton 클릭했을 때
document.getElementById("closeButton").addEventListener("click", function() {
    // 모달창 닫기
    var modal = document.getElementById("dailyModify");
    modal.style.display = "none";
});

// emptyPage에서 div를 클릭했을 때
document.getElementById("emptyPage").addEventListener("click", function(event) {
    if (event.target.id !== "emptyPage") {
        if (event.target.nodeName == "INPUT") { // radio button을 클릭했을 때
            event = event.target.parentNode;
        } else { // div를 클릭했을 때
            event = event.target;
        }
        // tdList에서 target의 id
        var calendarTarget = "d" + event.id.split("e")[1];
        
        // td에서 삭제
        var calendarElement = document.getElementById(calendarTarget);
        calendarElement.parentNode.removeChild(calendarElement);

        // emptyPage에서 삭제
        var emptyElement = document.getElementById(event.id);
        emptyElement.parentNode.removeChild(emptyElement);

        alert("삭제되었습니다.");
    }
});

// checkbox를 클릭했을 때
document.querySelectorAll("input[type=checkbox]").forEach(function(checkbox) {
    checkbox.addEventListener("click", function() {    
        if (this.checked) { // 체크 됨
            // calendar 변경
            for (let i = 0; i < tdList.length; i++) {
                let element = document.getElementById("d" + i);
                if (element) {
                    if (tdList[i].category == this.id) {
                        element.style.display = "block";
                    }
                }
            }

            // emptyPage 변경
            for (let i = 0; i < tdList.length; i++) {
                let element = document.getElementById("e" + i);
                if (element) {
                    if (tdList[i].category == this.id) {
                        element.style.display = "block";
                    }
                }
            }
        } else { // 체크 안 됨
            // calendar 변경
            for (let i = 0; i < tdList.length; i++) {
                let element = document.getElementById("d" + i);
                if (element) {
                    if (tdList[i].category == this.id) {
                        element.style.display = "none";
                    }
                }
            }

            // emptyPage 변경
            for (let i = 0; i < tdList.length; i++) {
                let element = document.getElementById("e" + i);
                if (element) {
                    if (tdList[i].category == this.id) {
                        element.style.display = "none";
                    }
                }
            }
        }
    });
});
