 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyD-f5L6Dw0xok2HXIzp9z89qlNvkkbJ0kE",
    authDomain: "modernlandiom.firebaseapp.com",
    databaseURL: "https://modernlandiom.firebaseio.com",
    projectId: "modernlandiom",
    storageBucket: "modernlandiom.appspot.com",
    messagingSenderId: "21653421615",
    appId: "1:21653421615:web:76af3d5efe5c3d9d3ed0da"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  messaging.getToken({vapidKey: "BMGEXZPgpojXCcIBXleikbgPJklcOrtOKhtDBCmjdIJ54mT2DQUV8MCLQfJFgNd2lqvKxeSETkPJkT5mZCoYkp0"});
  // Get registration token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
  function IntitalizeFireBaseMessaging() {
    messaging
        .requestPermission()
        .then(function () {
            console.log("Notification Permission");
            return messaging.getToken();
        })
        .then(function (token) {
            console.log("Token : "+token);
            $("#tokenFirebase").val(token);
        })
        .catch(function (reason) {
            console.log(reason);
        });
}

messaging.onMessage(function (payload) {
    console.log(payload);
    const notificationOption={
        body:payload.notification.body,
        icon:payload.notification.icon
    };

    if(Notification.permission==="granted"){
        var notification=new Notification(payload.notification.title,notificationOption);
    }

});
messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (newtoken) {
            console.log("New Token : "+ newtoken);
        })
        .catch(function (reason) {
            console.log(reason);
        })
})
IntitalizeFireBaseMessaging();