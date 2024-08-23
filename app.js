console.log("Let's get this party started!");

let $userInput = $("#searchInput");
const $imageGenArea = $("#imageGenArea");
const $searchButton = $("#searchButton");
const $clearButton = $("#removeImagesButton");




function addImages(res)
{
    
    
    const $imageList = $("<div>");

    
    const $memeImage = $("<img>");
    
    
    $memeImage.src= res.data[Math.floor(Math.random() * (res.data.length))].images.original.url;
    $imageList.appendChild($memeImage);
    $imageList.setAttribute("width", $memeImage.width);    

    
    $imageGenArea.appendChild($imageList);
};
$searchButton.on("click" , async function getImage(e){
    e.preventDefault();
    let search = $userInput.val();
    $userInput.val("");

    const response = await axios.get(' http://api.giphy.com/v1/gifs/search', {params: {q: search, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"}});
    addImage(response.data);
});

$("#clearButton").on("click", function(event)
{
    if(event.target.tagName == "BUTTON")
    {
        $imageGenArea.empty();
    }
    
}
);
