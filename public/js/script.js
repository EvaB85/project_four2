console.log("jscripting...")

$( document ).ready(function() {
  $(".dropdown-trigger").dropdown();
  $('.modal').modal();
  console.log( "ready!" );

  let vars = [];
  let keyValue = null;
  let q = document.URL.split('?')[1];
  if (q != undefined){
    let qs = q.split('&');
    for (let i = 0; i < qs.length; i++){
      keyValue = qs[i].split('=');
      vars.push(keyValue[1]);
      vars[keyValue[0]] = keyValue[1];
    }
    if (vars.toast) {
      M.toast({html: 'You must be logged in to view that page.'});
    }
  }

  $('a.repo-post').on('click', function(e) {
    e.preventDefault();
    var gitid = $(this).attr('data-id');
    var url = '/repos/' + gitid;
    var reponame = $(this).attr('data-name');
    console.log("in the js hijack!")
    $.ajax({
      method: "POST",
      url: url,
      data: {gitid:gitid, reponame:reponame}
    }).done(function(data) {
    console.log(data);
    console.log('#############this is the url', url);
    window.location = url;
    })
  });


});
