stats="";
input_text="";

function setup(){
    canvas=createCanvas(480,360);
    canvas.position(450,250);
    video=createCapture(VIDEO);
    video.hide();
    video.size(300 , 290);
}

function start(){
object_detector=ml5.objectDetector("cocossd" , modelLoaded);
document.getElementById("stats").innerHTML="Status : Detecting Objects !";
input_text=document.getElementById("input_id").value;
}

function modelLoaded(){
    console.log("model loaded !");
    stats=true;
}

function draw(){
    image(video , 0 , 0 , 300 , 290 );
    if(stats !=""){
object_detector=detect(video,gotResults);
for(i=0 ; i<objects.length;i++){
    document.getElementById("stats").innerHTML="Status : Object Detected";
    console.log(objects.length);
    fill();
    percent=floor(objects[1].confidence*100);
    text(objects[i].label+""+percent+"%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke("#32a852");
    rect(objects[i].x , objects[i].y , objects[i].height , objects[i].width);
    if(objects[i].label == input_text){
        video.stop();
        object_detector.detect(gotResults);
        document.getElementById("object_found").innerHTML=input_text + "Found";
        var synth=window.SpeechSynthesis;
        var utterThis= new SpeechSynthesisUtterance(input_text+"Found");
synth.speak(utterThis);

    }
    else{
        document.getElementById("object_found").innerHTML=inpu_text + "Not found";
    }
    }
    }
    function gotResults(error , results){
        if(error){
            console.error(error);
        }
        else{
            console.log(results);
            objects=results;
        }
    }
    }