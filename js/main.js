var PostsArray = [];
//Salud, Ciencia, Arte, Deportes, Política, Historia, Entretenimiento, Educación,Título,Subtítulo,Nombre,Apellidos,Biografía,Imagen,Artículo
const getPostData = () => {
    let postTitulo=$("#Post-Titulo").val();
    let postSubtitulo=$("#Post-Subtitulo").val();
    let postNombre=$("#Post-Nombre").val();
    let postApellidos=$("#Post-Apellidos").val();
    let postBiografia=$("#Post-Biografia").val();
    let postImagen=$("#Post-Imagen").val();
    let postArticulo=$("#Post-Articulo").val();
    let postSalud=$("#Post-Salud").val();
    let postCiencia=$("#Post-Ciencia").val();
    let postArte=$("#Post-Arte").val();
    let postDeportes=$("#Post-Deportes").val();
    let postPolitica=$("#Post-Politica").val();
    let postHistoria=$("#Post-Historia").val();
    let postEntretenimiento=$("#Post-Entretenimiento").val();
    let postEducacion=$("#Post-Educacion").val();
    let PostObject = {postTitulo,postSubtitulo,postNombre,postApellidos,
        postBiografia,postImagen,postArticulo,postSalud,postCiencia,postArte,postDeportes,postPolitica,postHistoria,
        postEntretenimiento,postEducacion}
    //PostsArray.push(PostObject)
    printPosts();
    savePostsToDb(PostObject);
    //saveKodersToDb(PostObject);
}
//$("#save-koder").on("click",getKoderData)
$("#Save-Post").on("click",getPostData)
//$("#save-koder").on("click",saveKodersToDb)
const assignDeleteKoderListener = () => {
    $(".delete-koder").on("click",deletePostInDb)//deleteKoderInDb)
}
const printPosts= () => {
    $("#koders-table").find("tbody").empty();
    PostsArray.forEach((post,index) => {
        $("#koders-table").find("tbody").append(`
            <tr>
                <td>${index + 1}</td>
                <td>${post.postTitulo}</td>
                <td>${post.postSubtitulo}</td>
                <td>${post.postNombre}</td>
                <td>${post.postApellidos}</td>
                <td>${post.postBiografia}</td>
                <td>${post.postImagen}</td>
                <td>${post.postArticulo}</td>
                <td>${post.postSalud}</td>
                <td>${post.postCiencia}</td>
                <td>${post.postArte}</td>
                <td>${post.postDeportes}</td>
                <td>${post.postPolitica}</td>
                <td>${post.postHistoria}</td>
                <td>${post.postEntretenimiento}</td>
                <td>${post.postEducacion}</td>
                <td><div class="btn btn-danger delete-koder" data-post-index=${post.key}>X</div></td>
            </tr>
        `)
    })
    assignDeleteKoderListener();
}
const deletePost = (event) => {
    let PostIndex = $(event.target).data("post-index")
    PostsArray.splice(PostIndex,1)
    printPosts();
}
const getPostsFromDb = () => {
    PostsArray = [];
    $.ajax({
        url:"https://javascript-ajax-d0ce6.firebaseio.com/gerardo/posts/.json",
        method:"GET",
        success:(response)=>{
            $.each(response,(key,value)=>{
                PostsArray.push({...value,key})
                console.log(PostsArray)
            })
            printPosts();
        }
    })
}
const deletePostInDb = () => {
    let PostKey = $(event.target).data("post-index")
    $.ajax({
        url:`https://javascript-ajax-d0ce6.firebaseio.com/gerardo/posts/${PostKey}.json`,
        method:"DELETE",
        success:(response)=>{
            console.log(response);
            getPostsFromDb();
        }
    })
}
const savePostsToDb = (PostObject) => {
    PostsArray = [];
    $.ajax({
        url:"https://javascript-ajax-d0ce6.firebaseio.com/gerardo/posts/.json",
        method:"POST",
        data: JSON.stringify(PostObject),
        //dataType: JSON.stringify(kodersArray)
        success:(response)=>{
            console.log(response);
            getPostsFromDb();
        }
    })
}
getPostsFromDb();
