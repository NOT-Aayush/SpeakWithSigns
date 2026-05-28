const HAND_CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],
  [0,5],[5,6],[6,7],[7,8],
  [5,9],[9,10],[10,11],[11,12],
  [9,13],[13,14],[14,15],[15,16],
  [13,17],[17,18],[18,19],[19,20],
  [0,17]
];


export const drawHands = (results, ctx, canvas) => {

    if (!results.landmarks ||
        results.landmarks.length === 0) return;

    //ctx.clearRect(0,0,canvas.width,canvas.height);
    
    results.landmarks.forEach((hand) => {
        HAND_CONNECTIONS.forEach(([start, end]) => {

            const startPoint = hand[start];
            const endPoint = hand[end];

            ctx.beginPath();

            ctx.moveTo(
                startPoint.x * canvas.width,
                startPoint.y * canvas.height
            );

            ctx.lineTo(
                endPoint.x * canvas.width,
                endPoint.y * canvas.height
            );

            ctx.strokeStyle = "lime";

            ctx.lineWidth = 2;

            ctx.stroke();
        });
        
        hand.forEach((point) => {

            const x =
                point.x * canvas.width;

            const y =
                point.y * canvas.height;

            ctx.beginPath();

            ctx.arc(x, y, 8, 0,2 * Math.PI);

            ctx.fillStyle = "aqua";

            ctx.fill();
        });
    });
};
export const drawFace = (detections,ctx,name="unknown") =>{
    if(detections.length>0){
        //looping through each landmark prediction
        detections.forEach((detection)=>{
            const box = detection.detection.box;
            ctx.beginPath();
            ctx.rect(box.x,box.y,box.width,box.height)
            ctx.strokeStyle= "red";
            ctx.lineWidth =3;
            ctx.fillStyle = "gold"
            ctx.font = "30px Arial";
            ctx.fillText(
                name,
                box.x,
                box.y + box.height + 25);
            ctx.stroke();

        })
    }
}