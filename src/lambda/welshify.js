// welsh is obviously just rolling a 6 sided die and adding that many ys per vowel, then vomiting hs and ws - http://www.xkcdb.com/8290

const getRandomYs = () => {
    const numYs = Math.floor(Math.random() * Math.floor(6)) + 1;
    return "y".repeat(numYs);
};

// h/w addition code from https://stackoverflow.com/a/1772997/5847190
const welshify = (str) => {
    return str.replace(/[aeiou]/g, getRandomYs)
              .replace(/(.{5})/g, "$1h")
              .replace(/(.{3})/g, "$1w")
              .replace(/d/g, "dd")
              .replace(/l/g, "ll");
}

export function handler(event, context, callback) {
    console.log(event.body);
    const welshText = welshify(JSON.parse(event.body).inputText);
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ welshText })
    })
}
