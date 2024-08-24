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

#################################################################



Issues and fixes:
Here are a few observations.

    You're using both jQuery and vanilla JavaScript interchangeably, which can lead to confusion and potential bugs.

const $imageList = $("<div>");
$imageList.appendChild($memeImage); // Vanilla JS method

Here, $imageList is a jQuery object, but appendChild is a vanilla JavaScript method. This will not work because appendChild is not a method on a jQuery object.

Fix it this way:

$imageList.append($memeImage); // jQuery method

    The code tries to set an attribute using vanilla JavaScript's setAttribute on a jQuery object.

$imageList.setAttribute("width", $memeImage.width);

This will throw an error because jQuery objects don't have the setAttribute method.

Fix it this way:
$memeImage.attr("width", $memeImage.width());

    You attempted to set the image source using .src, which is a vanilla JS property. Since $memeImage is a jQuery object, .src won't work.

$memeImage.src = res.data[Math.floor(Math.random() * (res.data.length))].images.original.url;

This doesn't update the image source because .src is not a recognized property on jQuery objects.

Fix it like this:
$memeImage.attr("src", randomImageUrl);

    The code does not properly handle the asynchronous nature of the API call, and there is a small typo in the function call.

const response = await axios.get(' http://api.giphy.com/v1/gifs/search', {params: {q: search, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"}});
addImage(response.data);

The function addImage is undefined (likely a typo).
There is no error handling for the API call, which can lead to unhandled promise rejections.

Fix it this way:

try {
    const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
        params: { q: search, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym" }
    });
    addImages(response.data);
} catch (err) {
    console.error("Error fetching images:", err);
}

    The click handler for clearing images checks for the event's target.tagName, which is unnecessary because the handler is already attached to the button itself.

if (event.target.tagName == "BUTTON") {
    $imageGenArea.empty();
}

This check is redundant and can be simplified and you can directly call the .empty() method without additional conditions.

Fix:
$clearButton.on("click", function () {
    $imageGenArea.empty();
});

    Ensure your function names and variables are descriptive and consistent (e.g., addImages vs. addImage).



Revised code should be something like this:

console.log("Let's get this party started!");

let $userInput = $("#searchInput");
const $imageGenArea = $("#imageGenArea");
const $searchButton = $("#searchButton");
const $clearButton = $("#removeImagesButton");

function addImages(res) {
    const $imageList = $("<div>");
    const randomImageUrl = res.data[Math.floor(Math.random() * res.data.length)].images.original.url;
    const $memeImage = $("<img>").attr("src", randomImageUrl);

    $imageList.append($memeImage);
    $imageGenArea.append($imageList);
}

$searchButton.on("click", async function (e) {
    e.preventDefault();
    let search = $userInput.val();
    $userInput.val("");

    try {
        const response = await axios.get('http://api.giphy.com/v1/gifs/search', {
            params: { q: search, api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym" }
        });
        addImages(response.data);
    } catch (err) {
        console.error("Error fetching images:", err);
    }
});

$clearButton.on("click", function () {
    $imageGenArea.empty();
});
