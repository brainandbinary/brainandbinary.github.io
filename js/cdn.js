var imgs = [
    "https://www.tellychakkar.com/sites/www.tellychakkar.com/files/styles/display_665x429/public/images/story/2012/12/15/sonakshi-sinha.jpg?itok=wsol9lh1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRU3sNdMzWjgHm4NpefuhtpdftNkg-kbvKcSKDRZGCGsGBoaPBv"
];
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getAd(){
    return imgs[getRandomInt(0, 1)];
}
$('#ad').html('<img class="img-fluid img-thumbnail " src="'+getAd()+'">');
