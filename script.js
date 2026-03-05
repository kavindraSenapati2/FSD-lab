function setErr(rowId, errId, msg) {
  document.getElementById(rowId).className = "input-row err";
  var e = document.getElementById(errId);
  e.textContent = "⚠ " + msg;
  e.classList.add("show");
}

function setOk(rowId, errId) {
  document.getElementById(rowId).className = "input-row ok";
  document.getElementById(errId).classList.remove("show");
}

function checkStrength() {
  var pw = document.getElementById("password").value;
  var segs = ["s1","s2","s3","s4","s5"].map(function(id){ return document.getElementById(id); });
  var hint = document.getElementById("pwHint");

  var score = 0;
  if (pw.length >= 6)           score++;
  if (pw.length >= 10)          score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;

  var colors = ["","#ef4444","#f97316","#eab308","#22c55e","#10b981"];
  var labels = ["","Very Weak","Weak","Fair","Strong","Very Strong"];

  segs.forEach(function(s, i) {
    s.style.background = i < score ? colors[score] : "#e5e7eb";
  });

  hint.textContent = pw.length === 0 ? "Password strength indicator" : "Strength: " + labels[score];
  hint.style.color = pw.length === 0 ? "#9ca3af" : colors[score];
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("name").addEventListener("blur", function () {
    this.value.trim() === ""
      ? setErr("row-name", "nameErr", "Name must not be empty.")
      : setOk("row-name", "nameErr");
  });

  document.getElementById("email").addEventListener("blur", function () {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value.trim() === "")       setErr("row-email","emailErr","Email must not be empty.");
    else if (!re.test(this.value.trim())) setErr("row-email","emailErr","Enter a valid email address.");
    else                                  setOk("row-email","emailErr");
  });

  document.getElementById("password").addEventListener("blur", function () {
    this.value.length < 6
      ? setErr("row-password","passErr","Password must be at least 6 characters.")
      : setOk("row-password","passErr");
  });

  document.getElementById("mobile").addEventListener("blur", function () {
    (isNaN(this.value) || this.value.length !== 10)
      ? setErr("row-mobile","mobileErr","Enter a valid 10-digit mobile number.")
      : setOk("row-mobile","mobileErr");
  });

  document.getElementById("mobile").addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });
});

function validateForm() {
  var name   = document.getElementById("name").value.trim();
  var email  = document.getElementById("email").value.trim();
  var pass   = document.getElementById("password").value;
  var mobile = document.getElementById("mobile").value;
  var re     = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var ok     = true;

  if (name === "") { setErr("row-name","nameErr","Name must not be empty."); ok = false; }
  else setOk("row-name","nameErr");

  if (email === "") { setErr("row-email","emailErr","Email must not be empty."); ok = false; }
  else if (!re.test(email)) { setErr("row-email","emailErr","Enter a valid email address."); ok = false; }
  else setOk("row-email","emailErr");

  if (pass.length < 6) { setErr("row-password","passErr","Password must be at least 6 characters."); ok = false; }
  else setOk("row-password","passErr");

  if (isNaN(mobile) || mobile.length !== 10) { setErr("row-mobile","mobileErr","Enter a valid 10-digit mobile number."); ok = false; }
  else setOk("row-mobile","mobileErr");

  if (ok) {
    var btn = document.getElementById("submitBtn");
    btn.textContent = "Creating account...";
    btn.disabled = true;

    setTimeout(function () {
      document.getElementById("successBox").classList.add("show");
      btn.textContent = "✔ Account Created";

      setTimeout(function () {
        document.getElementById("regForm").reset();
        ["row-name","row-email","row-password","row-mobile"].forEach(function(id){
          document.getElementById(id).className = "input-row";
        });
        document.querySelectorAll(".seg").forEach(function(s){ s.style.background = "#e5e7eb"; });
        document.getElementById("pwHint").textContent = "Password strength indicator";
        document.getElementById("pwHint").style.color = "#9ca3af";
        document.getElementById("successBox").classList.remove("show");
        btn.textContent = "Create Account →";
        btn.disabled = false;
      }, 3000);
    }, 700);
  }

  return false;
}
