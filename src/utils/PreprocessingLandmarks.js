export const preprocessLandmarks = (
    landmarks
) => {

    if (!landmarks) return null;

    return landmarks.flatMap(point => [
        point.x,
        point.y,
        point.z
    ]);
};