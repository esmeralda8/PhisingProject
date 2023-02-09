// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA314ch0McJmhgbM3rFKvBejL8Hsn5thUw",
  authDomain: "cis454phishing.firebaseapp.com",
  projectId: "cis454phishing",
  storageBucket: "cis454phishing.appspot.com",
  messagingSenderId: "514638627549",
  appId: "1:514638627549:web:3a62b566d985e27f329134",
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

chrome.runtime.onMessage.addListener((msg, sender, resp) => {
  if (msg.command == "fetch") {
    console.log([Object.keys(msg)[1]]);
    db.collection("trustedSites")
      .doc("siteLabel")
      .get()
      .then((doc) => {
        if (doc.exists) {
          resp({
            type: "result",
            status: "success",
            data: doc.data(),
            request: msg,
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  if (msg.command == "post") {
    db.collection("trustedSites")
      .doc("siteLabel")
      .set(
        {
          [Object.keys(msg)[1]]: Object.keys(msg)[1],
        },
        { merge: true }
      )
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  if (msg.command == "erase") {
    console.log(msg);
    db.collection("trustedSites")
      .doc("siteLabel")
      .set(
        {
          [`${Object.keys(msg)[1]}`]: firebase.firestore.FieldValue.delete(),
        },
        { merge: true }
      );

    console.log([Object.keys(msg)[1]]);
  }

  return true;
});
