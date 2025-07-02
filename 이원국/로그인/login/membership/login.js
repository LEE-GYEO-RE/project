function logins() {
  // 1. 입력한 ID와 비밀번호 가져오기
  const id = document.getElementById("uid").value;
  const pwd = document.getElementById("pwd").value;

  // 2. 입력하지 않은 경우 경고
  if (!id || !pwd) {
    alert("ID와 비밀번호를 모두 입력해주세요.");
    return;
  }

  // 3. 저장된 사용자 목록 불러오기 (문자열 형태)
  let usersData = localStorage.getItem("users");

  // 4. 문자열을 배열로 바꾸기 (없으면 빈 배열로 시작)
  let users;
  if (usersData) {
    users = JSON.parse(usersData);
  } else {
    users = [];
  }

  // 5. 사용자 목록에서 일치하는 ID와 비밀번호 찾기
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    if (user.uid == id && user.pwd == pwd) {
      alert(user.id + "님, 로그인 성공!");
      window.location.href = "list.html";
      return;
    }

    if (user.uid === id && user.pwd !== pwd) {
      alert("비밀번호가 틀렸습니다.");
      return;
    }
  }

  // 6. 일치하는 ID 자체가 없을 경우
  alert("존재하지 않는 ID입니다.");
}