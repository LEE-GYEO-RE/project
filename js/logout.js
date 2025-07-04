window.onload = function () {
    const uid = localStorage.getItem("uidId");
    const isAdmin = localStorage.getItem("isAdmin") == "true"; //문자열 비교 필요

    const loginLink = document.querySelector('a[href="login.html"]');
    const signupLink = document.querySelector('a[href="signin.html"]');
    const logoutBtn = document.getElementById("logoutBtn");
    const userWelcome = document.getElementById("userWelcome");

    if (uid) {
        if (loginLink) loginLink.style.display = "none";
        if (signupLink) signupLink.style.display = "none";
        logoutBtn.style.display = "inline";

        //관리자 여부에 따른 문구 변경
        userWelcome.textContent = isAdmin
            ? `관리자 ${uid}님 환영합니다!`
            : `${uid}님 환영합니다!`;
    } else {
        if (loginLink) loginLink.style.display = "inline";
        if (signupLink) signupLink.style.display = "inline";
        logoutBtn.style.display = "none";
        userWelcome.textContent = "로그인 해주세요";
    }

    logoutBtn.onclick = function () {
        localStorage.removeItem("uidId");
        localStorage.removeItem("isAdmin");
        alert("로그아웃 되었습니다.");
        location.href = "/login.html";
    };
};