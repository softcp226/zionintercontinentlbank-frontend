const selector = (name, value) => {
  document.querySelector(`#${name}`).innerHTML = value;
};

const setUser = (userInfo, ip_address) => {
  document.querySelector("#person-image").src = userInfo.passport;

  // document.querySelector(
  //   "#ip_address"
  // ).innerHTML = `Logged User Ip Address: ${ip_address}`;

  document.querySelector(
    "#full-name"
  ).innerHTML = `${userInfo.first_name} ${userInfo.last_name}`;
  document.querySelector("#balance").innerHTML = `$${userInfo.balance
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

  //   document.querySelector("#balance").innerHTML =
};

let getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  // return "";
  window.location.href = "/signin.html";
};

(async () => {
  let token = getCookie("token");
  let user = getCookie("user");
  try {
    const response = await fetch(
      "https://zionintercontinentalb-backend.glitch.me/api/user/fetchSelf",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token, user }),
      },
    );
    const result = await response.json();
    console.log(result);
    if (result.error) return window.location.replace("/signin.html");
    setUser(result.message, result.ip_address);
  } catch (err) {
    if (result.error) return window.location.replace("/signin.html");
  }
})();

// fetch_user({ token });
