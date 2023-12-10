const loader = document.getElementById("loader");
loader.style.display = 'none';

function handleCredentialResponse(response) {
  loader.style.display = 'flex';
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // redirect to profile page
      location.href = 'http://localhost/SafeTaurant/';
    }
  };
  xhttp.open("POST", "http://localhost/SafeTaurant/controllers/save-user.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("response="+response.credential);
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id: "276837291915-d0k06btbho776nl1orhe8luorjfsq4po.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large", width: 200 }  // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
}