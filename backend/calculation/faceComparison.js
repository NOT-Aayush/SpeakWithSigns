const euclideanDistance = (arr1, arr2) => {

    let sum = 0;

    for (let i = 0; i < arr1.length; i++) {

        const diff = arr1[i] - arr2[i];
        sum += diff * diff;
    }

    return Math.sqrt(sum);
};

export const findMatchingFace = async (descriptor,persons) => {

    let bestMatch = null;
    let smallestDistance = Infinity;

    for (const person of persons) {

        const savedDescriptor = Array.isArray(person.face_descriptor) ? person.face_descriptor : JSON.parse(person.face_descriptor);

        const distance = euclideanDistance(
            descriptor,
            savedDescriptor
        );

        if (distance < smallestDistance) {

            smallestDistance = distance;
            bestMatch = person;
        }
    }

    if (smallestDistance < 0.5) {

        return {
            matched: true,
            person: bestMatch,
            confidence: smallestDistance
        };
    }

    return {
        matched: false,
        person: {
            name: "Unknown"
        },
        confidence: smallestDistance
    };
};