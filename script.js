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
      console.log(keyNum[1]);


      const promise2 = $.ajax({
        url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${keyNum[1]}`,
      });
      
      promise2.then(
        (keyData) => {
          console.log(keyData);

          const department = keyData.department;
          const artistName= keyData.artistDisplayName;
          const bio = keyData.artistDisplayBio;
          $('.infos').html(`<p>Title: ${artistName} <br/>Bio: ${bio} <br/>Department: ${department}</p>`);

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



