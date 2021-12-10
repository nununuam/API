$('#searchButton').on('click', function(){
  const keyWords = $('input').val();
  console.log (keyWords);

  const promise = $.ajax({
    url: `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(keyWords)}`,
  });
  
  promise.then(
    (data) => {
      console.log(data);
      const keyNum = data.objectIDs;
      const arrayList = keyNum.length +1;
      const randomKey =  Math.floor(Math.random() * arrayList)

      console.log(arrayList);
      console.log(randomKey);


      const promise2 = $.ajax({
        url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${keyNum[randomKey]}`,
      });
      
      promise2.then(
        (keyData) => {
          console.log(keyData);

          const department = keyData.department;
          const artistName= keyData.artistDisplayName;
          const bio = keyData.artistDisplayBio;
          const medium = keyData.medium;

          $('.infos').html(`<p>Title: ${artistName} <br/>Bio: ${bio} <br/>Department: ${department} </br>Medium: ${medium}</p>`);
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



