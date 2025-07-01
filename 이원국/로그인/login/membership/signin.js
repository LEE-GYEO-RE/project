function gopage() {
  const uid = document.getElementById("uid").value;
  const pwd = document.getElementById("pwd").value;

  if (!uid || !pwd) {
    alert("ID와 비밀번호를 모두 입력해주세요.");
    return;
  }

  // 중복 ID 확인 예시 (단순 localStorage 기준)
  if (localStorage.getItem("uid") == uid) {
    alert("이미 존재하는 ID입니다. 다른 ID를 입력해주세요.");
    return;
  }

  localStorage.setItem("uid", uid);
  localStorage.setItem("pwd", pwd);

  alert("회원가입이 완료되었습니다!");
  window.location.href = "login.html"; // 회원가입 후 이동할 페이지
}