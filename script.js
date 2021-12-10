//When pressing search button, grab the value of input and assigned it to a variable
$('#searchButton').on('click', function(){
  const keyWords = $('input').val();
  console.log (keyWords);

//Grab the string and input it into the API search url
  const promise = $.ajax({
    url: `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(keyWords)}`,
  });
  
  //If it works, then grab the data form that search word
  promise.then(
    (data) => {
      console.log(data);
      //asign the array of key number into a variable
      const keyNum = data.objectIDs;
      //asign the length of the array into a variable +1, so when randomize it can be floor and get the last index
      const arrayList = keyNum.length +1;
      //randomize the arrayList
      const randomKey =  Math.floor(Math.random() * arrayList)

      //Let user know how may images that contain the word they search for
      $('.infos').html(`<p id = "numOfImg">There are ${arrayList} images that contain the word you searched for, "${keyWords}".`);

      console.log(arrayList);
      console.log(randomKey);

      //grab the specific key number from random indecis and put it into the object api
      const promise2 = $.ajax({
        url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${keyNum[randomKey]}`,
      });
      
      promise2.then(
        (keyData) => {
          console.log(keyData);
          //Grab link of the image and display it in the html
          const img = keyData.primaryImage;
          console.log(img)
          $('.image').html(`<img src = ${img}>`)

          //Assigned different type of data to a variable
          const department = keyData.department;
          const artistName= keyData.artistDisplayName;
          const bio = keyData.artistDisplayBio;
          const medium = keyData.medium;

          $('.keyInfos').html(`<p>Title: ${artistName} <br/>Bio: ${bio} <br/>Department: ${department} </br>Medium: ${medium}</p>`);
        },
        (error) => {
          console.log("bad request: ", error);
        }
      );
    },

    (error) => {
      console.log("bad request: ", error);
    }
  );
  
});
/*
$('#randomButton').on('click', function(){
  const promise2 = $.ajax({
    url: `https://collectionapi.metmuseum.org/public/collection/v1/objects`,
  });
  const promise2 = $.ajax({
    url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${keyNum[randomKey]}`,
  });
  
  promise2.then(
    (randomKey) => {
      consosle.log(randomKey);
    },
    (error) => {
      console.log("bad request: ", error);
    }
  );
});
*/
