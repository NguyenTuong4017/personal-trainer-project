//extract the id from the url
export  function getId(url){
    const parts = url.split("/");
    const id = parts[parts.length - 1];
    return id;
  };

