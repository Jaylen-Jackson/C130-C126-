Song1 = "";
Song2 = "";
leftWristX = 0;
LeftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristscore = 0;
rightWristscore = 0;
Song1_status = ""
Song2_status = ""


function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup() 
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(result)
{
    if(result.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX" + leftWristX +"leftWristY" + leftWristY);

        rightWristX = result[0].pose.leftWrist.x;
        rightWristY = result[0].pose.leftWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY ="+ rightWrist);

        leftWristscore = result[0].pose.keypoints[9].score;
        rightWristscore = result[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist)
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#388dae")
    stroke("#388dae")

    Song1_status = song1.isPlaying();
    Song2_status = song2.isPlaying();

    if(rightWristscore > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song1").innerHTML = "playing harry potter song";

        }
    }

if(leftWristscore > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song2").innerHTML = "playing peter pan song";

        }

    }

}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}