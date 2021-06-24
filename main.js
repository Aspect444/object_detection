statuss = "";
object = [];

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640, 420);
    video.hide()
    od = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status : detecting objects"
}

function modelLoaded(){
    console.log("model is loaded");
    status = "true";
}

function got_results(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video, 0, 0, 640, 420);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        od.detect(video, got_results);
        for(i = 0; i < object.length; i++){
            height = object[i].height;
            width = object[i].width;
            position_x = object[i].x;
            position_y = object[i].y;
            percentage = floor(object[i].confidence * 100);
            name_of_object = object[i].label;
            fill(r, g, b);
            text( name_of_object + " " + percentage + "%", position_x + 15, position_y + 15); 
            noFill();
            stroke(r, g, b);
            rect(position_x, position_y, width, height);
            document.getElementById("status").innerHTML = "status : objects detected";
            document.getElementById("noo").innerHTML = "Number of objects detected are : " + object.length;
        }
    }
    else{
        document.getElementById("status").innerHTML = "status : no objects detected";
        document.getElementById("noo").innerHTML = "Number of objects detected are : " + object.length;
    }
}