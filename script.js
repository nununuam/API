//When pressing search button, grab the value of input and assigned it to a variable
$('#searchButton').on('click', function(){
  const keyWords = $('input').val();
  
  //reset the footer to empty
  $('footer').empty();

//Grab the string and input it into the API search url
  const promise = $.ajax({
    url: `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(keyWords)}&hasImages=true`,
  });
  
  //If it works, then grab the data form that search word
  promise.then(
    (data) => {

      //asign the array of key number into a variable
      const keyNum = data.objectIDs;

      if(!keyNum){
        $('.image').html(`<p class ="badRequest">Try another word.</p>`)
        return;
      }
      //asign the length of the array into a variable +1, so when randomize it can be floor and get the last index
      const arrayList = keyNum.length +1;
      //randomize the arrayList
      const randomKey =  Math.floor(Math.random() * arrayList)

      //Let user know how may images that contain the word they search for
      $('.infos').html(`<p id = "numOfImg">There are ${arrayList} images that contain the word you searched for, "${keyWords}".`);

      //grab the specific key number from random indecis and put it into the object api
      const promise1 = $.ajax({
        url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${keyNum[randomKey]}`,
      });
      
      promise1.then(
        (keyData) => {

          //Grab link of the image and display it in the html
          const img = keyData.primaryImage;
          $('.image').html(`<img src = ${img}>`)

          //Assigned different type of data to a variable
          const department = keyData.department;
          const artistName= keyData.artistDisplayName;
          const bio = keyData.artistDisplayBio;
          const medium = keyData.medium;
          //add different type of data to html
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


$('#randomButton').on('click', function(){

  //add loader image
  $('.image').html('<div class="lds-dual-ring"></div>')
  //empty input value
  $('input').val('');
  //add disclaimer
  $('footer').html('There are some with no image and differernt informations are unknown.');
  $('.infos').empty();

  //grab all the objects from this api
  const promise2 = $.ajax({
    url: `https://collectionapi.metmuseum.org/public/collection/v1/objects`,
  });

  //if grabbing an api is successful continue
  promise2.then(
    (keys) => {
    
      //grabs the array 
      const objectsIdsArray = keys.objectIDs;
      //randomize a number between o and a number less then the length of the array 
      const randomizeIDs = Math.floor(Math.random() * objectsIdsArray.length)
      
      //Grab a id from particular index determined by random from this api
      const promise4 = $.ajax({
        url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectsIdsArray[randomizeIDs]}`,
      });

      //if grabing the particular id is successful continue
      promise4.then((aID) => {

        //grabbing the image url from the data and displaying on html
        const img = aID.primaryImage;
          $('.image').html(`<img src = ${img}>`)

          //Assigned different type of data to a variable
          const department = aID.department;
          const artistName= aID.artistDisplayName;
          const bio = aID.artistDisplayBio;
          const medium = aID.medium;

          //displaying different type of data in the html
          $('.keyInfos').html(`<p>Title: ${artistName} <br/>Bio: ${bio} <br/>Department: ${department} </br>Medium: ${medium}</p>`);
      });
      (error) => {
        console.log("bad request: ", error);
      }
    },
    (error) => {
      console.log("bad request: ", error);
    }
  );
});

