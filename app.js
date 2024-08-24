console.log("Let's get this party started!");

let $userInput = $("#searchInput");
const $imageGenArea = $("#imageGenArea");
const $searchButton = $("#searchButton");
const $clearButton = $("#removeImagesButton");




function addImages(res)
{
    console.log("recieved res" + res);
    
    let $imageList = $("<div>");
    
    let $memeImage = $("<img>");
        
    let $randomImageUrl = res.data[(Math.floor(Math.random()) * (res.data.length))].images.original.url;
    $memeImage.attr("src", $randomImageUrl);

    $imageList.append($memeImage);
    // $imageList.setAttribute("width", $memeImage.width);    
    $imageList.attr("width", $memeImage.width());
    
    // $imageGenArea.appendChild($imageList);
    $imageGenArea.append($imageList);
};
$searchButton.on("click" , async function getImage(e){
    e.preventDefault();
    let search = $userInput.val();
    $userInput.val("");
    console.log("search clicked");

    try {
        const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
            params: { q: search, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym" }
        });
        addImages(response.data);
        console.log("axios response" + response);
    } catch (err) {
        console.error("Error fetching images:", err);
    }
    
});

$clearButton.on("click", function () {
    $imageGenArea.empty();
    console.log("clear button clicked");
});